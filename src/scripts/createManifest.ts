import * as fs from "fs";
import input from "@inquirer/input";
import confirm from "@inquirer/confirm";
import select from "@inquirer/select";
import { checkbox } from "@inquirer/prompts";

import { getTappManifest } from "../helpers/index.js";
import { registerTapp } from "./registerTapp.js";
import {
  TappManifest,
  imagesPathPattern,
  versionPattern,
} from "../types/tapplet.js";
import { MANIFEST_FILE } from "../constants.js";
import { initOctokitAndGetAuthUser } from "../helpers/repo.js";

export function writeManifestFile(manifest: TappManifest): void {
  const json = JSON.stringify(manifest, null, 2);

  fs.writeFileSync(MANIFEST_FILE, json);
}

export async function createManifest() {
  const { user } = await initOctokitAndGetAuthUser();

  let manifest: TappManifest = {
    packageName: "",
    version: "",
    displayName: "",
    status: "TEST",
    category: "TEST",
    author: {
      name: "",
      website: "",
    },
    about: {
      summary: "",
      description: "",
    },
    design: {
      logoPath: "",
      backgroundPath: "",
    },
    repository: {
      type: "git",
      url: "",
      codeowners: [],
    },
    source: {
      location: {
        npm: {
          packageName: "",
          registry: "",
          distTarball: "",
          integrity: "",
        },
      },
    },
    supportedChain: ["MAINNET", "STAGENET", "NEXTNET"],
    manifestVersion: "",
  };

  manifest.packageName = await input({
    message: "Enter tapplet name",
    default: "tapplet",
  });

  manifest.version = await input({
    message: "Enter tapplet version",
    default: "1.0.0",
  });

  manifest.displayName = await input({
    message: "Enter tapplet display name",
    default: "The Tapplet description",
  });

  manifest.status = await select({
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
  });

  manifest.category = await select({
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
  });

  manifest.author.name = await input({
    message: "Enter author's name",
    default: user.login,
  });
  manifest.author.website = await input({
    message: "Enter author's website",
    default: user.repos_url,
  });

  manifest.about.summary = await input({
    message: "Enter short summary",
  });
  manifest.about.description = await input({
    message: "Enter long summary",
  });

  manifest.design.logoPath = await input({
    message: "Enter logo image path",
    default: "src/images/logo.svg",
    validate: (input) =>
      imagesPathPattern.test(input) ?? "provided path is invalid",
  });

  manifest.design.backgroundPath = await input({
    message: "Enter background image path",
    default: "src/images/background.svg",
    validate: (input) =>
      imagesPathPattern.test(input) ?? "provided path is invalid",
  });

  manifest.source.location.npm.packageName = manifest.packageName;
  manifest.source.location.npm.registry = await input({
    message: "Enter registry url",
    default: "https://registry.npmjs.org/",
  });
  manifest.source.location.npm.distTarball = await input({
    message: "Enter package tarball url",
    default: `https://registry.npmjs.org/${manifest.packageName}/-/${manifest.packageName}-${manifest.version}.tgz`,
  });
  manifest.source.location.npm.integrity = await input({
    message: "Enter npm package integrity",
    default: "sha512-...",
  });
  manifest.supportedChain = await checkbox({
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

  manifest.manifestVersion = await input({
    message: "Enter tapplet manifest version",
    default: "1.0.0",
    validate: (input) =>
      versionPattern.test(input) ?? "provided version is invalid",
  });

  console.log("About to create manifest");
  console.log(manifest);
  const isManifestAccepted = await confirm({
    message: "Is this OK?",
  });

  if (isManifestAccepted) {
    writeManifestFile(manifest);

    const isRegistrationAccepted = await confirm({
      message: "Manifest created. Register the tapplet now?",
      default: false,
    });

    if (isRegistrationAccepted) {
      console.log("\x1b[42m%s\x1b[0m", "Registration process has started!");
      const tappletManifest = getTappManifest();
      console.log("Tapplet manifest version:", tappletManifest.version);
      await registerTapp();
    } else {
      console.log(
        "\x1b[42m%s\x1b[0m",
        "Manifest created successfully! To register the tapplet use 'tapp-registrant -r'"
      );
    }
  } else {
    console.log(
      "\x1b[42m%s\x1b[0m",
      "The manifest has been created but must be corrected manually before registration"
    );
  }
}
