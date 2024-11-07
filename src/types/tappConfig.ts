import { SupportedChain, TariPermission } from "./index.js"

export interface TappletConfig {
  packageName: string
  version: string
  supportedChain: SupportedChain[]
  requiredPermissions: TariPermission[]
  optionalPermissions: TariPermission[]
}
