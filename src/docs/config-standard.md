# Tapplet manifest specification standard

To register a taplet in the Taplet Registry, the following standard must be followed. Compliance with the standard is required for registration and use of the tapplet to be possible.

## JSON Schema

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "packageName": {
      "type": "string"
    },
    "version": {
      "type": "string"
    },
    "supportedChain": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "requiredPermissions": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "optionalPermissions": {
      "type": "array",
      "items": {
        "type": "string"
      }
    }
  },
  "required": [
    "packageName",
    "version",
    "supportedChain",
    "requiredPermissions"
  ]
}
```

## Verify your definition

In order to verify that your chain definition adheres to the above standard, you can use tools such as
[JSON Schema Validator](https://www.jsonschemavalidator.net/).

Alternatively, you can use the Tapp-Registrant utility command

```
tapp-registrant validate-manifest
```
