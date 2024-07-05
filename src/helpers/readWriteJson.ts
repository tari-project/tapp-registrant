import * as fs from "fs"
import * as path from "path"
import { NpmPackageJson, TappManifest } from "../types/tapplet.js"
import { MANIFEST_FILE } from "../constants.js"

export function getTappManifest(): TappManifest {
  const manifestPath = path.resolve(MANIFEST_FILE)

  const tappData = fs.readFileSync(manifestPath, "utf8")
  return JSON.parse(tappData)
}

export function writeManifestFile(manifest: TappManifest): void {
  const json = JSON.stringify(manifest, null, 2)

  fs.writeFileSync(MANIFEST_FILE, json)
}

export function getPackageJson(): NpmPackageJson {
  const packagePath = path.resolve("package.json")

  const packageData = fs.readFileSync(packagePath, "utf8")
  return JSON.parse(packageData)
}
