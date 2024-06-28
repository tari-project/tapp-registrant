import * as fs from "fs";
import * as path from "path";
import { TappManifest } from "../types/tapplet.js";
import { MANIFEST_FILE } from "../constants.js";

export function getTappManifest(): TappManifest {
  const manifestPath = path.resolve(MANIFEST_FILE);

  const tappData = fs.readFileSync(manifestPath, "utf8");
  return JSON.parse(tappData);
}
