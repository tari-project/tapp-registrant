import { Octokit } from "octokit";

export interface GetUserArgs {
  octokit: Octokit;
}

export interface CreateBranchArgs {
  octokit: Octokit;
  owner: string;
  repo: string;
  branchName: string;
  baseBranchName: string;
}

export interface CreateFileArgs {
  octokit: Octokit;
  owner: string;
  repo: string;
  filePath: string;
  fileContent: string;
  branchName: string;
}

export interface CreatePullRequestArgs {
  octokit: Octokit;
  owner: string;
  branchName: string;
  repo?: string;
  base?: string;
  prTitle?: string;
}

export type PrPrefix = "Add" | "Deprecate";
