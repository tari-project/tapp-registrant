import * as fs from "fs"
import * as path from "path"
import { NpmPackageJson } from "../types/tapplet.js"
import { MANIFEST_FILE, SRC_DIR, TAPP_CONFIG_FILE } from "../constants.js"
import { TappletManifest } from "../types/registry.js"
import { TappletConfig } from "../types/tappConfig.js"

export function getTappManifest(): TappletManifest {
  const manifestPath = path.resolve(MANIFEST_FILE)

  const tappData = fs.readFileSync(manifestPath, "utf8")
  return JSON.parse(tappData)
}

export function writeManifestFile(manifest: TappletManifest): void {
  const json = JSON.stringify(manifest, null, 2)

  fs.writeFileSync(MANIFEST_FILE, json)
}

export function getPackageJson(): NpmPackageJson {
  const packagePath = path.resolve("package.json")

  const packageData = fs.readFileSync(packagePath, "utf8")
  return JSON.parse(packageData)
}

export function removeManifestFile(): void {
  const manifestPath = path.resolve(".", MANIFEST_FILE)
  fs.rmSync(manifestPath)
}

export function writeConfigFile(config: TappletConfig): void {
  const json = JSON.stringify(config, null, 2)

  fs.writeFileSync(TAPP_CONFIG_FILE, json)
}

export function getManifestJson(): TappletConfig {
  const packagePath = path.resolve("tapplet.config.json")

  const packageData = fs.readFileSync(packagePath, "utf8")
  return JSON.parse(packageData)
}
