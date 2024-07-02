import { getTappManifest } from "./getTappManifest.js";
import { writeManifestFile } from "./createManifest.js";
import { input } from "@inquirer/prompts";

function bumpVersion(version: string): string {
  // Increment the version number
  let [major, minor, patch] = version.split(".").map(Number);
  patch++;
  version = `${major}.${minor}.${patch}`;
  return version;
}

export async function updateTappVersion() {
  let manifest = getTappManifest();
  manifest.version = await input({
    message: "Enter the newest tapplet version",
    default: bumpVersion(manifest.version),
  });
  manifest.manifestVersion = bumpVersion(manifest.manifestVersion);

  manifest.source.location.npm.distTarball = await input({
    message: "Enter package tarball url",
    default: `https://registry.npmjs.org/${manifest.packageName}/-/${manifest.packageName}-${manifest.version}.tgz`,
  });
  manifest.source.location.npm.integrity = await input({
    message: "Enter npm package integrity",
    default: "sha512-...",
  });

  writeManifestFile(manifest);
}
