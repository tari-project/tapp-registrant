import { checkbox, input, select, confirm } from "@inquirer/prompts";
import inquirer from "inquirer";
import {
  SupportedChain,
  TappCategory,
  TappStatus,
  imagesPathPattern,
  integrityPattern,
  versionPattern,
} from "../types/index.js";

export async function getPackageName(defaultValue = "package-name") {
  return await input({
    message: "Enter tapplet name",
    default: defaultValue,
  });
}

export async function getPackageVersion(defaultValue = "1.0.0") {
  return await input({
    message: "Enter tapplet version",
    default: defaultValue,
  });
}

export async function getDisplayName(defaultValue = "Tapplet name") {
  return await input({
    message: "Enter tapplet display name",
    default: defaultValue,
  });
}

export async function getStatus(
  defaultValue?: TappStatus
): Promise<TappStatus> {
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
  });
}

export async function getCategory(
  defaultValue?: TappCategory
): Promise<TappCategory> {
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
  });
}

export async function getAuthorName(defaultValue?: string) {
  return await input({
    message: "Enter author's name",
    default: defaultValue,
  });
}

export async function getAuthorWebsite(defaultValue?: string) {
  return await input({
    message: "Enter author's website",
    default: defaultValue,
  });
}

export async function getSummary(defaultValue = "Tapplet summary") {
  return await input({
    message: "Enter short summary",
    default: defaultValue,
  });
}

export async function getDescription(defaultValue = "Tapplet description") {
  return await input({
    message: "Enter long summary",
    default: defaultValue,
  });
}

export async function getLogoPath(defaultValue = "src/images/logo.svg") {
  return await input({
    message: "Enter logo image path",
    default: defaultValue,
    validate: (input) =>
      imagesPathPattern.test(input) ?? "provided path is invalid",
  });
}

export async function getBackgroundPath(
  defaultValue = "src/images/background.svg"
) {
  return await input({
    message: "Enter background image path",
    default: defaultValue,
    validate: (input) =>
      imagesPathPattern.test(input) ?? "provided path is invalid",
  });
}

export async function getCodeowners(defaultValue?: string) {
  const codeowners = [];

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
    ]);

    codeowners.push(`@${codeowner}`);

    if (addMore === false) {
      break;
    }
  }
  return codeowners;
}

export async function getRegistryUrl(
  defaultValue = "https://registry.npmjs.org/"
) {
  return await input({
    message: "Enter registry url",
    default: defaultValue,
  });
}

export async function getDistTarball(defaultValue?: string) {
  return await input({
    message: "Enter package tarball url (use 'npm view <NAME>' to check)",
    default: defaultValue,
  });
}

export async function getIntegrity(defaultValue = "sha512-<hash>") {
  return await input({
    message: "Enter npm package integrity (use 'npm view <NAME>' to check)",
    default: defaultValue,
    validate: (input) =>
      integrityPattern.test(input) ?? "provided value is invalid",
  });
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
  });
}

export async function getManifestVersion(defaultValue = "1.0.0") {
  return await input({
    message: "Enter tapplet manifest version",
    default: defaultValue,
    validate: (input) =>
      versionPattern.test(input) ?? "provided version is invalid",
  });
}

export async function getConfirmation(message = "OK?", defaultValue = false) {
  return await confirm({
    message,
    default: defaultValue,
  });
}
