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

import { init } from "./scripts/init.js"
import { writeEmptyManifest } from "./scripts/writeEmptyManifest.js"

console.log(figlet.textSync("TAPPLET REGISTRANT"))

const program = new Command()
program.name("tapp-registrant").version("1.1.1").description("The tapplet registration tool")
program
  .command("init")
  .description("Init the tapplet registration process")
  .action(() => {
    init()
  })
program
  .command("create")
  .description("Create an empty manifest file")
  .action(() => {
    writeEmptyManifest()
  })
program
  .command("fill-in")
  .description("Create and fill in the manifest file")
  .action(() => {
    createManifest()
  })
program
  .command("register")
  .description("Register the tapplet")
  .action(() => {
    registerTapp()
  })
program
  .command("update")
  .description("Update tapplet version")
  .action(() => {
    updateTappVersion()
  })
program
  .command("deprecate")
  .description("Deprecate the given tapplet version")
  .argument("<version>", "tapplet version to deprecate")
  .action((version) => {
    deprecateTappVersion(version)
  })
program
  .command("list")
  .description("List registered tapplets")
  .argument("[name]", "(optional) tapplet name to find in the registry")
  .action((name) => {
    listRegisteredTapplets(name)
  })
program
  .command("ghp")
  .description("Find and add GitHub Access Token")
  .action(() => {
    getGhp()
  })

program.parse()
