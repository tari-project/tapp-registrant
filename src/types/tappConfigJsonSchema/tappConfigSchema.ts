export const tappConfigSchema = {
  type: "object",
  properties: {
    packageName: {
      type: "string",
    },
    version: {
      type: "string",
    },
    supportedChain: {
      type: "array",
      items: {
        type: "string",
      },
    },
    requiredPermissions: {
      type: "array",
      items: {
        type: "string",
      },
    },
    optionalPermissions: {
      type: "array",
      items: {
        type: "string",
      },
    },
  },
  required: ["packageName", "version", "supportedChain", "requiredPermissions"],
}
