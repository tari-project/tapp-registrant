import {
  getConfirmation,
  getPackageName,
  getPackageVersion,
  getPermissions,
  getSupportedChains,
} from "../helpers/cli.js"
import { getPackageJson, writeConfigFile } from "../helpers/readWriteJson.js"
import { writeEmptyTappConfig } from "./writeEmptyTappConfig.js"

export async function createAndFillInTappConfig() {
  try {
    const config = writeEmptyTappConfig()
    const packageJson = getPackageJson()

    config.packageName = await getPackageName(packageJson.name)
    config.version = await getPackageVersion(packageJson.version)
    config.supportedChain = await getSupportedChains()
    config.permissions.requiredPermissions = await getPermissions()
    config.permissions.optionalPermissions = await getPermissions("Select all optional permissions")

    console.log("About to create tapplet config")
    console.log(config)
    const isFileAccepted = await getConfirmation("Is this OK?", true)

    if (isFileAccepted) {
      writeConfigFile(config)
      console.log("\x1b[42m%s\x1b[0m", "Tapplet config created successfully!")
    } else {
      console.log("Tapplet config file creation failed. Start the process over or create the config manually")
    }
  } catch (err) {
    console.log(err)
    console.log("\x1b[41m%s\x1b[0m", "Tapplet config file creation failed")
  }
}
