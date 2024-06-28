#! /usr/bin/env node
import { Command } from "commander";
import { initTapp } from "./scripts/init-tapp.js";
import { registerTapp } from "./scripts/register-tapp.js";
import figlet from "figlet";

console.log(figlet.textSync("TAPPLET REGISTRANT"));

const program = new Command();
program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-i, --init", "Init the registration process")
  .option("-r, --register", "Register the tapplet")
  .option("-l, --list", "List registered tapplets")
  .parse(process.argv);

const options = program.opts();
async function listRegisteredTapplets() {
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
  console.log("Init process started");
  initTapp();
}
if (options.list) {
  listRegisteredTapplets();
}
if (options.register) {
  console.log("Register process started");
  registerTapp();
}
