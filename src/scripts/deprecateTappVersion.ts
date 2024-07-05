import { getTappManifest } from "../helpers/index.js";
import { input } from "@inquirer/prompts";
import { versionPattern } from "../types/tapplet.js";
import {
  BASE_BRANCH,
  MANIFEST_FILE,
  REGISTRY_OWNER,
  SRC_DIR,
  TAPPLET_REGISTRY_REPO,
  VER_DIR,
} from "../constants.js";
import path from "path";
import {
  createBranch,
  createPullRequest,
  initOctokitAndGetAuthUser,
} from "../helpers/repo.js";
import { PrPrefix } from "../types/index.js";
import { getStatus } from "../helpers/cli.js";
import { getRepoContentSha } from "./getRepoContent.js";

export async function deprecateTappVersion(version: string) {
  if (!versionPattern.test(version)) throw new Error("Version not valid");

  // get current manifest file
  let manifest = getTappManifest();
  manifest.version = version;
  manifest.status = await getStatus("DEPRECATED");

  // remove these fields because it's not needed anymore
  manifest.source.location.npm.distTarball = await input({
    message: "Enter package tarball url (only if needed)",
    default: "",
  });
  manifest.source.location.npm.integrity = await input({
    message: "Enter npm package integrity (only if needed)",
    default: "",
  });

  const { octokit } = await initOctokitAndGetAuthUser();
  const owner = REGISTRY_OWNER;
  if (!owner) {
    throw new Error("Registration error: owner not found");
  }

  // note: branch name needs to be exactly like this for github workflows
  const branchName = `deprecate/${manifest.packageName}@${manifest.version}`;
  const filePath = path.join(
    SRC_DIR,
    manifest.packageName,
    VER_DIR,
    manifest.version,
    MANIFEST_FILE
  );
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
    const manifestSha = await getRepoContentSha(
      {
        owner,
        filePath,
        repo: TAPPLET_REGISTRY_REPO,
        branch: branchName,
      },
      octokit
    );
    const manifestFileContent = Buffer.from(JSON.stringify(manifest)).toString(
      "base64"
    );
    await octokit.rest.repos.createOrUpdateFileContents({
      owner,
      repo: TAPPLET_REGISTRY_REPO,
      path: filePath,
      message: `Deprecate ${manifest.version}`,
      content: manifestFileContent,
      branch: branchName,
      sha: manifestSha,
    });
  } catch (error) {
    throw error;
  }

  // create PR to deprecate version
  try {
    const prPrexix: PrPrefix = "Deprecate";
    const prTitle = `${prPrexix}/${manifest.packageName}@${manifest.version}`;
    const pr = await createPullRequest({ octokit, owner, branchName, prTitle });
    console.log(
      "\x1b[42m%s\x1b[0m",
      "PR created successfully with status:",
      pr.status
    );
  } catch (error) {
    throw error;
  }
}
