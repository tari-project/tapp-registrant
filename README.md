# The Tapplet Registrant tool

To check available options run

```
tapp-registrant --help
```

## Registration process

#### 1. GitHub Access Token

Make sure the GitHub Access Token is created and added to the `~/.npmrc` file. See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

```
//npm.pkg.github.com/:_authToken=TOKEN
```

#### 2. Create and publish npm package

To check npm package info run

```
npm view <PACKAGE_NAME>
```

#### 3. Init Tapplet Manifest

To create the Tapplet Manifest file run

```
tapp-registrant --init
```

#### 4. Register the tapplet to the Tapplets Registry

To register the Tapplet to the registry run

```
tapp-registrant --register
```

## Update process

To update the Tapplet already register in the registry run

```
tapp-registrant --update
```
