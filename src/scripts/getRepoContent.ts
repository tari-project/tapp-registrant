import { Octokit } from "octokit"

interface GetRepoContentArgs {
  owner: string
  repo: string
  filePath: string
  branch: string
}

export async function getRepoContentSha(params: GetRepoContentArgs, octokit: Octokit): Promise<string | undefined> {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{file_path}", {
      owner: params.owner,
      repo: params.repo,
      file_path: params.filePath,
      branch: params.branch,
    })
    if (response.status === 200) {
      console.log(`The ${params.filePath} SHA:, ${response.data.sha}`)
      return response.data.sha
    }
  } catch (error: any) {
    if (error.status === 404) {
      console.log(`The ${params.filePath} not found`)
      return undefined
    } else {
      throw error
    }
  }
}

export async function checkIfPathExists(params: GetRepoContentArgs, octokit: Octokit): Promise<boolean> {
  try {
    const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{file_path}", {
      owner: params.owner,
      repo: params.repo,
      file_path: params.filePath,
      branch: params.branch,
    })
    return response.status === 200
  } catch (error: any) {
    if (error.status === 404) {
      return false
    } else {
      throw error
    }
  }
}
