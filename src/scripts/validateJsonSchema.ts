import { tappletManifestSchema } from "../types/manifestJsonSchema/tappletManifestSchema.js"
import { getTappManifest } from "../helpers/readWriteJson.js"
import { Ajv } from "ajv"

export function validateJsonSchema(): boolean {
  const ajv = new Ajv()
  const tappManifest = getTappManifest()

  const isManifestValid = ajv.validate(tappletManifestSchema, tappManifest)
  if (isManifestValid) {
    console.log("\x1b[42m%s\x1b[0m", "The tapplet manifest json data is valid!")
  } else {
    console.error("\x1b[41m%s\x1b[0m", "The tapplet manifest json data is invalid:", ajv.errors)
  }
  return isManifestValid
}
