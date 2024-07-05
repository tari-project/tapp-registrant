import { Octokit } from "octokit"
import "dotenv/config"
import { CreateBranchArgs, CreateFileArgs, CreatePullRequestArgs, GetUserArgs } from "../types/registry-repo.js"
import path from "path"
import fs from "fs"
import { BASE_BRANCH, BG_FILE, IMAGES_DIR, LOGO_FILE, SRC_DIR, TAPPLET_REGISTRY_REPO } from "../constants.js"
import { getGhp } from "./getGhp.js"

export async function getAuthenticatedUser({ octokit }: GetUserArgs) {
  const { data } = await octokit.rest.users.getAuthenticated()
  return data
}

export async function createBranch({ octokit, owner, repo, branchName, baseBranchName }: CreateBranchArgs) {
  const baseBranchSha = (
    await octokit.rest.repos.getBranch({
      owner,
      repo,
      branch: baseBranchName,
    })
  ).data.commit.sha

  await octokit.rest.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: baseBranchSha,
  })
  return branchName
}

export async function createFile({ octokit, owner, repo, filePath, fileContent, branchName }: CreateFileArgs) {
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: filePath,
    message: `Add ${filePath}`,
    content: fileContent,
    branch: branchName,
  })
  return filePath
}

export async function createPullRequest({
  octokit,
  owner,
  branchName,
  repo = TAPPLET_REGISTRY_REPO,
  base = BASE_BRANCH,
  prTitle,
}: CreatePullRequestArgs) {
  const title = prTitle ?? `${branchName}`

  const pr = await octokit.rest.pulls.create({
    owner,
    repo,
    base,
    title,
    head: branchName,
  })
  return pr
}

export async function initOctokitAndGetAuthUser() {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    getGhp()
  }

  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  })

  const user = await getAuthenticatedUser({ octokit })
  return { octokit, user }
}

export async function getSha(owner: string, filePath: string, octokit: Octokit): Promise<string> {
  const param = {
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    file_path: filePath,
    branch: BASE_BRANCH,
  }
  const resultSha = await octokit.request("GET /repos/{owner}/{repo}/contents/{file_path}", param)
  console.log(`The ${filePath} SHA:", ${resultSha.data.sha}`)
  return resultSha.data.sha
}

export async function addImagesToRegistry(packageName: string, owner: string, branchName: string, octokit: Octokit) {
  const imagesPathLocal = path.join(SRC_DIR, IMAGES_DIR)
  const logoPathTappRegistry = path.join(SRC_DIR, packageName, IMAGES_DIR)

  const logoFile = path.join(imagesPathLocal, LOGO_FILE)
  const logoFileRegistry = path.join(logoPathTappRegistry, LOGO_FILE)
  // Convert to base64-encoded string
  const imageBase64 = fs.readFileSync(logoFile).toString("base64")
  const resultImageSha = await getSha(owner, logoFileRegistry, octokit)
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    path: logoFileRegistry,
    message: `Add ${LOGO_FILE}`,
    content: imageBase64,
    branch: branchName,
    sha: resultImageSha,
  })

  const bgFile = path.join(imagesPathLocal, BG_FILE)
  const bgFileRegistry = path.join(logoPathTappRegistry, BG_FILE)
  const bgBase64 = fs.readFileSync(bgFile).toString("base64")
  const resultBgSha = await getSha(owner, bgFileRegistry, octokit)
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    path: bgFileRegistry,
    message: `Add ${BG_FILE}`,
    content: bgBase64,
    branch: branchName,
    sha: resultBgSha,
  })
}
