import { getConfirmation } from "../helpers/cli.js"
import { removeManifestFile } from "../helpers/readWriteJson.js"

export async function removeManifest(): Promise<void> {
  const isRemovalAccepted = await getConfirmation("Do you want to remove tapplet.manifest.json file?")
  if (isRemovalAccepted) {
    removeManifestFile()
    console.log("\x1b[42m%s\x1b[0m", "The manifest file removed successfully!")
  }
}
