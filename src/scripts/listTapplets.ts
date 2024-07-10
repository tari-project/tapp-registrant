import https from "https"
import { RegistryManifest, TappletsList } from "../types/registry.js"

export function listRegisteredTapplets(name?: string) {
  // TODO change manifest source
  const url = "https://raw.githubusercontent.com/karczuRF/tapp-registry/main/dist/tapplets-registry.manifest.json"
  let registry: RegistryManifest
  https
    .get(url, (res) => {
      let body = ""

      res.on("data", (chunk) => {
        body += chunk
      })

      res.on("end", () => {
        try {
          registry = JSON.parse(body)

          if (name) {
            console.log(`List all registered versions of: ${name}`)
            const tapp = Object.values(registry.registeredTapplets).find((tapplet) => tapplet.id === name)
            tapp
              ? console.table(tapp?.versions)
              : console.log("\x1b[41m%s\x1b[0m", `Not found any registered version of ${name}`)
          } else {
            const tappletsList: TappletsList = {}
            Object.keys(registry.registeredTapplets).forEach((packageName) => {
              const tapplet = registry.registeredTapplets[packageName]
              tappletsList[packageName] = {
                id: tapplet.id,
                displayName: tapplet.metadata.displayName,
                versions: Object.keys(tapplet.versions),
              }
            })
            console.table(tappletsList)
          }
        } catch (error: unknown) {
          if (error instanceof Error) console.error(error.message)
        }
      })
    })
    .on("error", (error) => {
      console.error(error.message)
    })
}
