import { writeConfigFile } from "../helpers/readWriteJson.js"
import { TappletConfig } from "../types/tappConfig.js"

export function writeEmptyTappConfig(): TappletConfig {
  const config: TappletConfig = {
    packageName: "",
    version: "",
    supportedChain: [],
    requiredPermissions: [],
    optionalPermissions: [],
  }
  writeConfigFile(config)
  console.log("\x1b[42m%s\x1b[0m", "An empty tapp config file created successfully!")
  return config
}
