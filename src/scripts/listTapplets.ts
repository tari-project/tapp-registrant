export function listRegisteredTapplets() {
  //TODO
  try {
    const detailedFilesPromises = {
      tapplet: "tapp-example",
      version: "1.0.0",
      author: "karczuRF",
    }

    console.table(detailedFilesPromises)
  } catch (error) {
    console.error("Error occurred while reading the directory!", error)
  }
}
