import { SupportedChain } from "./tapplet.js"
import { TariPermission } from "./tariPermissions.js"

interface Author {
  name: string
  website: string
}

interface About {
  summary: string
  description: string
}

interface Audits {
  auditor: string
  reportUrl: string
}
interface Design {
  logoPath: string
  backgroundPath: string
}

interface Repository {
  type: string
  url: string
  codeowners: string[]
}

interface Location {
  packageName: string
  registry: string
  distTarball: string
  integrity: string
}

interface Source {
  location: Record<"npm", Location>
}

export interface TappletManifest {
  packageName: string
  version: string
  displayName: string
  status: string
  category: string
  author: Author
  about: About
  audits: Audits[]
  design: Design
  repository: Repository
  source: Source
  supportedChain: SupportedChain[]
  permissions: TariPermission[]
  manifestVersion: string
}

export interface RegistryManifest {
  manifestVersion: string
  registeredTapplets: {
    [packageName: string]: {
      id: string
      metadata: {
        displayName: string
        author: Author
        logoUrl: string
        backgroundUrl: string
        about: About
        codeowners: string[]
        audits: Audits[]
        category: string
      }
      versions: {
        [version: string]: {
          integrity: string
          registryUrl: string
        }
      }
    }
  }
}

export interface TappletsList {
  [packageName: string]: {
    id: string
    displayName: string
    versions: string[]
  }
}
