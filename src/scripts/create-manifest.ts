import * as fs from "fs";
import { MANIFEST_FILE } from "../constants.js";
import { Manifest } from "../types/manifest.js";

export function createManifest(manifest: Manifest) {
  const json = JSON.stringify(manifest, null, 2);

  fs.writeFileSync(MANIFEST_FILE, json);
}
