import { getConfirmation, getTappManifest, writeManifestFile } from "../helpers/index.js"
import { integrityPattern } from "../types/index.js"
import { input } from "@inquirer/prompts"
import { registerTapp } from "./index.js"

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

  console.log("About to update manifest")
  console.log(manifest)
  const isManifestAccepted = await getConfirmation("Is this OK?", true)
  writeManifestFile(manifest)
  if (isManifestAccepted) {
    writeManifestFile(manifest)
    console.log("\x1b[42m%s\x1b[0m", "Manifest created successfully!")
    const isRegistrationAccepted = await getConfirmation("Register the tapplet right now?")

    if (isRegistrationAccepted) {
      console.log("\x1b[42m%s\x1b[0m", "Registration process has started!")
      await registerTapp()
    } else {
      console.log("To register the tapplet use 'tapp-registrant register'")
    }
  } else {
    console.log("Manifest file creation failed. Start the process over or create the manifest manually")
  }
}
