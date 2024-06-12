import * as fs from "fs";
import * as path from "path";
import { TappManifest } from "../types/tapplet";

export function getTappManifest(): TappManifest {
  const manifestPath = path.resolve("tapplet.manifest.json");

  const tappData = fs.readFileSync(manifestPath, "utf8");
  return JSON.parse(tappData);
}
