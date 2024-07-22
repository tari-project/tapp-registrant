import { writeManifestFile } from "../helpers/readWriteJson.js"
import { TappletManifest } from "../types/registry.js"

export function writeEmptyManifest(): TappletManifest {
  const manifest: TappletManifest = {
    packageName: "",
    version: "",
    displayName: "",
    status: "",
    category: "",
    author: {
      name: "",
      website: "",
    },
    about: {
      summary: "",
      description: "",
    },
    audits: [
      {
        auditor: "",
        reportUrl: "",
      },
    ],
    design: {
      logoPath: "",
      backgroundPath: "",
    },
    repository: {
      type: "git",
      url: "",
      codeowners: [],
    },
    source: {
      location: {
        npm: {
          packageName: "",
          registry: "",
          distTarball: "",
          integrity: "",
        },
      },
    },
    supportedChain: [],
    permissions: [],
    manifestVersion: "",
  }
  writeManifestFile(manifest)
  console.log("\x1b[42m%s\x1b[0m", "An empty manifest file created successfully!")
  return manifest
}
