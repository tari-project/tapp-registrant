export function listRegisteredTapplets(name?: string) {
  //TODO
  try {
    const detailedFilesPromises = {
      tapplet: name ?? "tapp-example",
      version: "1.0.0",
      author: "karczuRF",
    }

    console.table(detailedFilesPromises)
  } catch (error) {
    console.error("Error occurred while reading the directory!", error)
  }
}
