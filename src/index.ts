#! /usr/bin/env node
import { Command } from "commander";
import {
  createManifest,
  deprecateTappVersion,
  listRegisteredTapplets,
  registerTapp,
  updateTappVersion,
} from "./scripts/index.js";
import figlet from "figlet";

console.log(figlet.textSync("TAPPLET REGISTRANT"));

const program = new Command();
program
  .version("1.0.1")
  .description("The tapplet registration tool")
  .option("-i, --init", "Create manifest file")
  .option("-r, --register", "Register the tapplet")
  .option("-u, --update", "Update tapplet version")
  .option("-d, --deprecate <VERSION>", "Deprecate the given tapplet version")
  .option("-l, --list", "List registered tapplets")
  .parse(process.argv);

const options = program.opts();

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
if (options.deprecate) {
  deprecateTappVersion(options.deprecate);
}
