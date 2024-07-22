import { checkbox, input, select, confirm } from "@inquirer/prompts"
import inquirer from "inquirer"
import {
  InitProgramAction,
  ManifestAction,
  SupportedChain,
  TappCategory,
  TappStatus,
  imagesPathPattern,
  integrityPattern,
  versionPattern,
} from "../types/index.js"
import { permissions } from "@tariproject/tarijs"

export async function getPackageName(defaultValue = "package-name") {
  return await input({
    message: "Enter tapplet name",
    default: defaultValue,
  })
}

export async function getPackageVersion(defaultValue = "1.0.0") {
  return await input({
    message: "Enter tapplet version",
    default: defaultValue,
  })
}

export async function getDisplayName(defaultValue = "Tapplet name") {
  return await input({
    message: "Enter tapplet display name",
    default: defaultValue,
  })
}

export async function getStatus(defaultValue?: TappStatus): Promise<TappStatus> {
  return await select({
    message: "Select the project status",
    choices: [
      {
        name: "mvp",
        value: "WIP",
        description: "A minimum viable product",
      },
      {
        name: "test",
        value: "TEST",
        description: "Tapplet is in the test phase",
      },
      {
        name: "prod",
        value: "PROD",
        description: "Tapplet is ready to be used",
      },
      {
        name: "deprecated",
        value: "DEPRECATED",
        description: "Tapplet version is deprecated",
      },
    ],
    default: defaultValue,
  })
}

export async function getCategory(defaultValue?: TappCategory): Promise<TappCategory> {
  return await select({
    message: "Select the tapplet category",
    choices: [
      {
        name: "test",
        value: "TEST",
        description: "Tapplet for testing purposes only",
      },
      {
        name: "user",
        value: "USER",
        description: "Tapplet to improve UX",
      },
      {
        name: "other",
        value: "OTHER",
        description: "other",
      },
    ],
    default: defaultValue,
  })
}

export async function getAuthorName(defaultValue?: string) {
  return await input({
    message: "Enter author's name",
    default: defaultValue,
  })
}

export async function getAuthorWebsite(defaultValue?: string) {
  return await input({
    message: "Enter author's website",
    default: defaultValue,
  })
}

export async function getSummary(defaultValue = "Tapplet summary") {
  return await input({
    message: "Enter short summary",
    default: defaultValue,
  })
}

export async function getDescription(defaultValue = "Tapplet description") {
  return await input({
    message: "Enter long summary",
    default: defaultValue,
  })
}

export async function getLogoPath(defaultValue = "src/images/logo.svg") {
  return await input({
    message: "Enter logo image path",
    default: defaultValue,
    validate: (input) => imagesPathPattern.test(input) ?? "provided path is invalid",
  })
}

export async function getBackgroundPath(defaultValue = "src/images/background.svg") {
  return await input({
    message: "Enter background image path",
    default: defaultValue,
    validate: (input) => imagesPathPattern.test(input) ?? "provided path is invalid",
  })
}

export async function getCodeowners(defaultValue?: string) {
  const codeowners = []

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { codeowner, addMore } = await inquirer.prompt([
      {
        type: "input",
        name: "codeowner",
        message: "Enter tapplet's code owner",
        default: defaultValue,
      },
      {
        type: "confirm",
        name: "addMore",
        message: "Add more owners?",
        default: false,
      },
    ])

    codeowners.push(`@${codeowner}`)

    if (addMore === false) {
      break
    }
  }
  return codeowners
}

export async function getRegistryUrl(defaultValue = "https://registry.npmjs.org/") {
  return await input({
    message: "Enter registry url",
    default: defaultValue,
  })
}

export async function getDistTarball(defaultValue?: string) {
  return await input({
    message: "Enter package tarball url (use 'npm view <NAME>' to check)",
    default: defaultValue,
  })
}

export async function getIntegrity(defaultValue = "sha512-<hash>") {
  return await input({
    message: "Enter npm package integrity (use 'npm view <NAME>' to check)",
    default: defaultValue,
    validate: (input) => integrityPattern.test(input) ?? "provided value is invalid",
  })
}

export async function getSupportedChains(): Promise<SupportedChain[]> {
  return await checkbox({
    message: "Select all supported chains",
    choices: [
      {
        name: "MAINNET",
        value: "MAINNET",
        checked: true,
      },
      {
        name: "STAGENET",
        value: "STAGENET",
        checked: true,
      },
      {
        name: "NEXTNET",
        value: "NEXTNET",
        checked: true,
      },
    ],
    instructions: true,
  })
}

export async function getManifestVersion(defaultValue = "1.0.0") {
  return await input({
    message: "Enter tapplet manifest version",
    default: defaultValue,
    validate: (input) => versionPattern.test(input) ?? "provided version is invalid",
  })
}

export async function getConfirmation(message = "OK?", defaultValue = false) {
  return await confirm({
    message,
    default: defaultValue,
  })
}

export async function initTapplet(): Promise<InitProgramAction> {
  return await select({
    message: "What do you want to do?",
    choices: [
      {
        name: "Create an empty tapplet.manifest.json",
        value: ManifestAction.CREATE_EMPTY_MANIFEST,
        description: "Creates an empty tapplet.manifest.json",
      },
      {
        name: "Create and fill in the tapplet.manifest.json",
        value: ManifestAction.CREATE_AND_FILL_MANIFEST,
        description: "Creates an tapplet.manifest.json file and helps fill in the required fields",
      },
      {
        name: "Quit",
        value: ManifestAction.QUIT,
        description: "Quit the program",
      },
    ],
  })
}

export async function getPermissions(): Promise<permissions[]> {
  return await checkbox({
    message: "Select all permissions required by the tapplet",
    choices: [
      {
        name: "NftGetOwnershipProof",
        value: "TariPermissionNftGetOwnershipProof",
        checked: false,
      },
      {
        name: "AccountBalance",
        value: "TariPermissionAccountBalance",
        checked: false,
      },
      {
        name: "AccountInfo",
        value: "TariPermissionAccountInfo",
        checked: false,
      },
      {
        name: "AccountList",
        value: "TariPermissionAccountList",
        checked: false,
      },
      {
        name: "KeyList",
        value: "TariPermissionKeyList",
        checked: false,
      },
      {
        name: "TransactionGet",
        value: "TariPermissionTransactionGet",
        checked: false,
      },
      {
        name: "TransactionSend",
        value: "TariPermissionTransactionSend",
        checked: false,
      },
      {
        name: "GetNft",
        value: "TariPermissionGetNft",
        checked: false,
      },
      {
        name: "TransactionsGet",
        value: "TariPermissionTransactionsGet",
        checked: false,
      },
      {
        name: "SubstatesRead",
        value: "TariPermissionSubstatesRead",
        checked: false,
      },
      {
        name: "TemplatesRead",
        value: "TariPermissionTemplatesRead",
        checked: false,
      },
    ],
    instructions: true,
  })
}
