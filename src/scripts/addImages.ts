import { Octokit } from "octokit"
import path from "path"
import fs from "fs"
import { BG_FILE, IMAGES_DIR, LOGO_FILE, SRC_DIR, TAPPLET_REGISTRY_REPO } from "../constants.js"
import { getRepoContentSha } from "./getRepoContent.js"

export async function addImagesToRegistry(packageName: string, owner: string, branchName: string, octokit: Octokit) {
  // local file
  const imagesPathLocal = path.join(SRC_DIR, IMAGES_DIR)
  const logoFile = path.join(imagesPathLocal, LOGO_FILE)
  const imageBase64 = fs.readFileSync(logoFile).toString("base64")

  // registry repo file
  const logoPathTappRegistry = path.join(SRC_DIR, packageName, IMAGES_DIR)
  const logoFileRegistry = path.join(logoPathTappRegistry, LOGO_FILE)
  const logoSha = await getRepoContentSha(
    {
      owner,
      filePath: logoFileRegistry,
      repo: TAPPLET_REGISTRY_REPO,
      branch: branchName,
    },
    octokit
  )
  console.log(logoSha ? "The file already exists so it will be updated" : "The new file will be added to the repo")

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    path: logoFileRegistry,
    message: `Add ${LOGO_FILE}`,
    content: imageBase64,
    branch: branchName,
    sha: logoSha,
  })

  // local file
  const bgFile = path.join(imagesPathLocal, BG_FILE)
  const bgBase64 = fs.readFileSync(bgFile).toString("base64")

  //registry repo file
  const bgFileRegistry = path.join(logoPathTappRegistry, BG_FILE)
  const bgSha = await getRepoContentSha(
    {
      owner,
      filePath: bgFileRegistry,
      repo: TAPPLET_REGISTRY_REPO,
      branch: branchName,
    },
    octokit
  )
  console.log(bgSha ? "The file already exists so it will be updated" : "The new file will be added to the repo")

  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    path: bgFileRegistry,
    message: `Add ${BG_FILE}`,
    content: bgBase64,
    branch: branchName,
    sha: bgSha,
  })
}
