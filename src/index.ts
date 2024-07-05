#! /usr/bin/env node
import { Command } from "commander"
import {
  createManifest,
  deprecateTappVersion,
  listRegisteredTapplets,
  registerTapp,
  updateTappVersion,
} from "./scripts/index.js"
import figlet from "figlet"
import { getGhp } from "./helpers/getGhp.js"

console.log(figlet.textSync("TAPPLET REGISTRANT"))

const program = new Command()
program
  .version("1.0.11")
  .description("The tapplet registration tool")
  .option("-i, --init", "create manifest file")
  .option("-r, --register", "register the tapplet")
  .option("-u, --update", "ipdate tapplet version")
  .option("-d, --deprecate <VERSION>", "deprecate the given tapplet version")
  .option("-l, --list", "list registered tapplets")
  .option("-g, --ghp", "find and add GitHub Access Token")
  .parse(process.argv)

const options = program.opts()

if (options.init) {
  createManifest()
}
if (options.list) {
  listRegisteredTapplets()
}
if (options.update) {
  updateTappVersion()
}
if (options.register) {
  registerTapp()
}
if (options.deprecate) {
  deprecateTappVersion(options.deprecate)
}
if (options.ghp) {
  getGhp()
}
