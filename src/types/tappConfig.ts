import { SupportedChain, TariPermission } from "./index.js"
export interface TappletPermissions {
  requiredPermissions: TariPermission[]
  optionalPermissions: TariPermission[]
}
export interface TappletConfig {
  packageName: string
  version: string
  supportedChain: SupportedChain[]
  permissions: TappletPermissions
}
