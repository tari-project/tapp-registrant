import { initTapplet } from "../helpers/cli.js"
import { ManifestAction } from "../types/tapplet.js"
import { createManifest } from "./createManifest.js"
import { writeEmptyManifest } from "./writeEmptyManifest.js"

export async function init(): Promise<void> {
  const initAction = await initTapplet()
  if (initAction === ManifestAction.CREATE_EMPTY_MANIFEST) {
    writeEmptyManifest()
    return
  }
  if (initAction === ManifestAction.CREATE_AND_FILL_MANIFEST) {
    createManifest()
    return
  }
  return
}
