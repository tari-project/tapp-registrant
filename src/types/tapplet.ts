export const imagesPathPattern = new RegExp("^.*/images/[^/]+.svg$")
export const versionPattern = new RegExp("^([1-9]d*|0)(.(([1-9]d*)|0)){2}$")
export const integrityPattern = new RegExp("^sha[1-9][0-9]{0,2}-([A-Za-z0-9+/=]{86})==$")

export type TappCategory = "TEST" | "USER" | "OTHER"
export type TappStatus = "WIP" | "TEST" | "PROD" | "DEPRECATED"
export type SupportedChain = "MAINNET" | "STAGENET" | "NEXTNET"

type Author = {
  name: string
  website: string
}

type About = {
  summary: string
  description: string
}

type Design = {
  logoPath: string
  backgroundPath: string
}

type Repository = {
  type: string
  url: string
  codeowners: string[]
}

type Location = {
  packageName: string
  registry: string
  distTarball: string
  integrity: string
}

type Source = {
  location: Record<"npm", Location>
}

export type TappManifest = {
  packageName: string
  version: string
  displayName: string
  status: TappStatus
  category: TappCategory
  author: Author
  about: About
  design: Design
  repository: Repository
  source: Source
  supportedChain: SupportedChain[]
  manifestVersion: string
}

export type NpmPackageJson = {
  name: string
  version: string
  author: string
  licence: string
}
