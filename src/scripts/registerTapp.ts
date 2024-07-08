import "dotenv/config"
import { addImagesToRegistry } from "./addImages.js"
import path from "path"

import { BASE_BRANCH, MANIFEST_FILE, REGISTRY_OWNER, SRC_DIR, TAPPLET_REGISTRY_REPO, VER_DIR } from "../constants.js"
import { createBranch, createFile, createPullRequest, initOctokitAndGetAuthUser } from "../helpers/repo.js"
import { getTappManifest } from "../helpers/index.js"
import { PrPrefix } from "../types/index.js"

export async function registerTapp() {
  const { octokit } = await initOctokitAndGetAuthUser()

  // TODO adjust here the tapp-registry owner
  const owner = REGISTRY_OWNER
  if (!owner) {
    throw new Error("Registration error: owner not found")
  }

  const tappletManifest = getTappManifest()

  // note: branch name needs to be exactly like this for github workflows
  const branchName = `add/${tappletManifest.packageName}@${tappletManifest.version}`
  try {
    const createdBranch = await createBranch({
      octokit,
      owner,
      repo: TAPPLET_REGISTRY_REPO,
      branchName,
      baseBranchName: BASE_BRANCH,
    })
    console.log(`Branch created: ${createdBranch}`)
  } catch (error) {
    console.log(`Branch not created!`)
    throw error
  }

  try {
    const filePath = path.join(SRC_DIR, tappletManifest.packageName, VER_DIR, tappletManifest.version, MANIFEST_FILE)
    const manifestFileContent = Buffer.from(JSON.stringify(tappletManifest)).toString("base64")

    createFile({
      octokit,
      owner,
      repo: TAPPLET_REGISTRY_REPO,
      filePath,
      fileContent: manifestFileContent,
      branchName,
    })
  } catch (error) {
    console.log(`File not created!`)
    throw error
  }

  try {
    await addImagesToRegistry(tappletManifest.packageName, owner, branchName, octokit)
  } catch (error) {
    console.log(`Could not add images to the registry!`)
    throw error
  }

  try {
    const prPrexix: PrPrefix = "Add"
    const prTitle = `${prPrexix}/${tappletManifest.packageName}@${tappletManifest.version}`
    const pr = await createPullRequest({ octokit, owner, branchName, prTitle })
    console.log("\x1b[42m%s\x1b[0m", `PR created successfully with status: ${pr.status}`)
  } catch (error) {
    console.log("\x1b[41m%s\x1b[0m", `PR creation failed!`)
    throw error
  }
}
