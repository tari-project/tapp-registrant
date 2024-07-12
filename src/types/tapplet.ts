export const imagesPathPattern = new RegExp("^.*/images/[^/]+.svg$")
export const versionPattern = new RegExp("^([1-9]d*|0)(.(([1-9]d*)|0)){2}$")
export const integrityPattern = new RegExp("^sha[1-9][0-9]{0,2}-([A-Za-z0-9+/=]{86})==$")

export type TappCategory = "TEST" | "USER" | "OTHER" | ""
export type TappStatus = "WIP" | "TEST" | "PROD" | "DEPRECATED" | ""
export type SupportedChain = "MAINNET" | "STAGENET" | "NEXTNET" | ""

export enum ManifestAction {
  CREATE_EMPTY_MANIFEST,
  CREATE_AND_FILL_MANIFEST,
  QUIT,
}

export type InitProgramAction =
  | ManifestAction.CREATE_EMPTY_MANIFEST
  | ManifestAction.CREATE_AND_FILL_MANIFEST
  | ManifestAction.QUIT

export type NpmPackageJson = {
  name: string
  version: string
  author: string
  licence: string
}

export interface NpmPackageDist {
  name: string
  version: string
  tarball: string
  integrity: string
}
