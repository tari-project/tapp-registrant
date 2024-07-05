import { getTappManifest } from "../helpers/index.js"
import { integrityPattern } from "../types/index.js"
import { writeManifestFile } from "./createManifest.js"
import { input } from "@inquirer/prompts"

function bumpVersion(version: string): string {
  // Increment the version number
  // eslint-disable-next-line prefer-const
  let [major, minor, patch] = version.split(".").map(Number)
  patch++
  version = `${major}.${minor}.${patch}`
  return version
}

export async function updateTappVersion() {
  const manifest = getTappManifest()
  manifest.version = await input({
    message: "Enter the newest tapplet version",
    default: bumpVersion(manifest.version),
  })
  manifest.manifestVersion = bumpVersion(manifest.manifestVersion)

  manifest.source.location.npm.distTarball = await input({
    message: "Enter package tarball url (use 'npm view <NAME>' to check)",
    default: `https://registry.npmjs.org/${manifest.packageName}/-/${manifest.packageName}-${manifest.version}.tgz`,
  })
  manifest.source.location.npm.integrity = await input({
    message: "Enter npm package integrity (use 'npm view <NAME>' to check)",
    default: "<sha512>",
    validate: (input) => integrityPattern.test(input) ?? "provided value is invalid",
  })

  writeManifestFile(manifest)
}
