import { initTapplet } from "../helpers/cli.js"
import { ManifestAction } from "../types/tapplet.js"
import { createAndFillInManifest } from "./createAndFillInManifest.js"
import { createAndFillInTappConfig } from "./createAndFillInTappConfig.js"
import { writeEmptyManifest } from "./writeEmptyManifest.js"

export async function init(): Promise<void> {
  const initAction = await initTapplet()
  if (initAction === ManifestAction.CREATE_EMPTY_MANIFEST) {
    writeEmptyManifest()
    return
  }
  if (initAction === ManifestAction.CREATE_AND_FILL_MANIFEST) {
    createAndFillInManifest()
    return
  }
  if (initAction === ManifestAction.CREATE_CONFIG) {
    createAndFillInTappConfig()
    return
  }
  return
}
