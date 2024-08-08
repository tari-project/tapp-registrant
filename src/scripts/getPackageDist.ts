import * as childProcess from "child_process"
import { getPackageJson } from "../helpers/index.js"
import { NpmPackageDist } from "../types/index.js"

export async function getPackageDist(packageName?: string, version?: string): Promise<NpmPackageDist> {
  const _name = packageName ?? getPackageJson().name
  const _nameVersion = version ? `${_name}@${version}` : `${_name}`
  const npmCommand = `npm view ${_nameVersion} --json`
  const output = childProcess.execSync(npmCommand)
  const jsonOutput = JSON.parse(output.toString())

  return {
    name: jsonOutput.name,
    version: jsonOutput.version,
    tarball: jsonOutput.dist.tarball,
    integrity: jsonOutput.dist.integrity,
  }
}
