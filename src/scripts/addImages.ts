import { Octokit } from "octokit";
import path from "path";
import fs from "fs";
import {
  BASE_BRANCH,
  BG_FILE,
  IMAGES_DIR,
  LOGO_FILE,
  SRC_DIR,
  TAPPLET_REGISTRY_REPO,
} from "../constants.js";

export async function getSha(
  owner: string,
  filePath: string,
  octokit: Octokit
): Promise<string> {
  const param = {
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    file_path: filePath,
    branch: BASE_BRANCH,
  };
  const resultSha = await octokit.request(
    "GET /repos/{owner}/{repo}/contents/{file_path}",
    param
  );
  console.log(`The ${filePath} SHA:", ${resultSha.data.sha}`);
  return resultSha.data.sha;
}

export async function addImagesToRegistry(
  packageName: string,
  owner: string,
  branchName: string,
  octokit: Octokit
) {
  const imagesPathLocal = path.join(SRC_DIR, IMAGES_DIR);
  const logoPathTappRegistry = path.join(SRC_DIR, packageName, IMAGES_DIR);

  const logoFile = path.join(imagesPathLocal, LOGO_FILE);
  const logoFileRegistry = path.join(logoPathTappRegistry, LOGO_FILE);
  // Convert to base64-encoded string
  const imageBase64 = fs.readFileSync(logoFile).toString("base64");
  const resultImageSha = await getSha(owner, logoFileRegistry, octokit);
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    path: logoFileRegistry,
    message: `Add ${LOGO_FILE}`,
    content: imageBase64,
    branch: branchName,
    sha: resultImageSha,
  });

  const bgFile = path.join(imagesPathLocal, BG_FILE);
  const bgFileRegistry = path.join(logoPathTappRegistry, BG_FILE);
  const bgBase64 = fs.readFileSync(bgFile).toString("base64");
  const resultBgSha = await getSha(owner, bgFileRegistry, octokit);
  await octokit.rest.repos.createOrUpdateFileContents({
    owner,
    repo: TAPPLET_REGISTRY_REPO,
    path: bgFileRegistry,
    message: `Add ${BG_FILE}`,
    content: bgBase64,
    branch: branchName,
    sha: resultBgSha,
  });
}
