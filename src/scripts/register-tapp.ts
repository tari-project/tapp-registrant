import { Octokit } from "octokit";
import "dotenv/config";
import {
  CreateBranchArgs,
  CreateFileArgs,
  CreatePullRequestArgs,
  GetUserArgs,
} from "../types/registry-repo";
import { getTappManifest } from "./get-tapp-data";
import path from "path";

export const TAPPLET_REGISTRY_REPO = "tapp-registry";
export const BASE_BRANCH = "main";
export const PR_TITLE_PREFIX = "New Tapplet:";
export const SRC_DIR = "src";
export const MANIFEST_FILE = "tapplet.manifest.json";
export const REGISTRY_OWNER = "karczuRF";

async function getAuthenticatedUser({ octokit }: GetUserArgs) {
  try {
    const { data } = await octokit.rest.users.getAuthenticated();
    return data;
  } catch (err) {
    throw err;
  }
}

async function createBranch({
  octokit,
  owner,
  repo,
  branchName,
  baseBranchName,
}: CreateBranchArgs) {
  try {
    const baseBranchSha = (
      await octokit.rest.repos.getBranch({
        owner,
        repo,
        branch: baseBranchName,
      })
    ).data.commit.sha;

    await octokit.rest.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${branchName}`,
      sha: baseBranchSha,
    });
    return branchName;
  } catch (error) {
    throw error;
  }
}

async function createFile({
  octokit,
  owner,
  repo,
  filePath,
  fileContent,
  branchName,
}: CreateFileArgs) {
  try {
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: filePath,
      message: `Add ${filePath}`,
      content: Buffer.from(fileContent).toString("base64"),
      branch: branchName,
    });
    return filePath;
  } catch (error) {
    throw error;
  }
}

async function createPullRequest({
  octokit,
  owner,
  branchName,
  repo = TAPPLET_REGISTRY_REPO,
  base = BASE_BRANCH,
  prTitle,
}: CreatePullRequestArgs) {
  const title = prTitle ?? `${branchName}`;

  try {
    const pr = await octokit.rest.pulls.create({
      owner,
      repo,
      base,
      title,
      head: branchName,
    });
    return pr;
  } catch (err) {
    throw err;
  }
}

export async function registerTapp() {
  if (!process.env.GITHUB_ACCESS_TOKEN) {
    throw new Error("Registration error: github access token not found");
  }
  const octokit = new Octokit({
    auth: process.env.GITHUB_ACCESS_TOKEN,
  });

  const user = await getAuthenticatedUser({ octokit });
  const tappletManifest = getTappManifest();

  // TODO add owner
  const owner = REGISTRY_OWNER;
  if (!owner) {
    throw new Error("Registration error: owner not found");
  }

  const branchName = `${tappletManifest.packageName}@${tappletManifest.version}`;
  console.log(`Branch name: ${branchName}`);
  console.log(`Branch created by: ${user}`);
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
      tappletManifest.version,
      MANIFEST_FILE
    );
    const fileContent = JSON.stringify(tappletManifest);
    const createdFile = await createFile({
      octokit,
      owner,
      repo: TAPPLET_REGISTRY_REPO,
      filePath,
      fileContent,
      branchName,
    });
    console.log(`File added: ${createdFile}`);
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

registerTapp();
