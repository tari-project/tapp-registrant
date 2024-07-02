#! /usr/bin/env node
import { Command } from "commander";
import { createManifest } from "./scripts/createManifest.js";
import { registerTapp } from "./scripts/register-tapp.js";
import figlet from "figlet";
import { updateTappVersion } from "./scripts/updateTappVersion.js";

console.log(figlet.textSync("TAPPLET REGISTRANT"));

const program = new Command();
program
  .version("1.0.1")
  .description("The tapplet registration tool")
  .option("-i, --init", "Create manifest file")
  .option("-r, --register", "Register the tapplet")
  .option("-u, --update", "Update tapplet version")
  .option("-l, --list", "List registered tapplets")
  .parse(process.argv);

const options = program.opts();
async function listRegisteredTapplets() {
  //TODO
  try {
    const detailedFilesPromises = {
      tapplet: "tapp-example",
      version: "1.0.0",
      author: "karczuRF",
    };

    console.table(detailedFilesPromises);
  } catch (error) {
    console.error("Error occurred while reading the directory!", error);
  }
}

if (options.init) {
  createManifest();
}
if (options.list) {
  listRegisteredTapplets();
}
if (options.update) {
  updateTappVersion();
}
if (options.register) {
  registerTapp();
}
