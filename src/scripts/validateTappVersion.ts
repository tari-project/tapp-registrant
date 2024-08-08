import { TappletManifest } from "../types/registry.js"
import { getPackageDist } from "./getPackageDist.js"

export async function validateTappVersion(tappManifest: TappletManifest): Promise<boolean> {
  const { version, integrity } = await getPackageDist(tappManifest.packageName, tappManifest.version)

  // compare version from manifest and npm package
  const isValidVersion = tappManifest.version === version
  if (!isValidVersion) {
    console.error("\x1b[41m%s\x1b[0m", "The tapplet version mismatch!")
    return false
  }

  const isValidIntegrity = tappManifest.source.location.npm.integrity === integrity
  if (!isValidIntegrity) {
    console.error("\x1b[41m%s\x1b[0m", "The tapplet checksum (integrity) mismatch!")
    return false
  }
  return true
}
