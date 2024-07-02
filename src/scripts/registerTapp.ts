import "dotenv/config";
import { addImagesToRegistry } from "./addImages.js";
import path from "path";

import {
  BASE_BRANCH,
  MANIFEST_FILE,
  REGISTRY_OWNER,
  SRC_DIR,
  TAPPLET_REGISTRY_REPO,
  VER_DIR,
} from "../constants.js";
import {
  createBranch,
  createFile,
  createPullRequest,
  initOctokitAndGetAuthUser,
} from "../helpers/repo.js";
import { getTappManifest } from "../helpers/index.js";

export async function registerTapp() {
  const { octokit, user } = await initOctokitAndGetAuthUser();

  // TODO adjust here the tapp-registry owner
  const owner = REGISTRY_OWNER;
  if (!owner) {
    throw new Error("Registration error: owner not found");
  }

  const tappletManifest = getTappManifest();

  const branchName = `${tappletManifest.packageName}@${tappletManifest.version}`;
  console.log(`Branch name: ${branchName}`);
  console.log(`Branch created by: ${user.login}`);
  try {
    const createdBranch = await createBranch({
      octokit,
      owner,
      repo: TAPPLET_REGISTRY_REPO,
      branchName,
      baseBranchName: BASE_BRANCH,
    });
    console.log(`Branch created: ${createdBranch}`);
  } catch (error) {
    console.log(`Branch not created!`);
    throw error;
  }

  try {
    const filePath = path.join(
      SRC_DIR,
      tappletManifest.packageName,
      VER_DIR,
      tappletManifest.version,
      MANIFEST_FILE
    );
    const manifestFileContent = Buffer.from(
      JSON.stringify(tappletManifest)
    ).toString("base64");

    createFile({
      octokit,
      owner,
      repo: TAPPLET_REGISTRY_REPO,
      filePath,
      fileContent: manifestFileContent,
      branchName,
    });
  } catch (error) {
    throw error;
  }

  try {
    await addImagesToRegistry(
      tappletManifest.packageName,
      owner,
      branchName,
      octokit
    );
  } catch (error) {
    throw error;
  }

  try {
    const pr = await createPullRequest({ octokit, owner, branchName });
    console.log("PR created with data", pr);
  } catch (error) {
    throw error;
  }
}
