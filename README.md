# The Tapplet Registrant tool

The Tapplet Registrant is a simple tool that allows you to quickly register your tapplet in the Taru Universe Tapplets Registry.


## Registration process

#### 1. GitHub Access Token

Make sure the GitHub Access Token is created and added to the `~/.npmrc` file. See [Working with the npm registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry).

```
//npm.pkg.github.com/:_authToken=TOKEN
```

To add the GitHyb Access Token run

```
tapp-registrant ghp
```

#### 2. Create and publish npm package

To [view registry info](https://docs.npmjs.com/cli/v10/commands/npm-view) run

```
npm view
```
_Note:_ The tapplet version in the `tapplet.manifest.json` and `package.json` must be the same.


#### 3. Init Tapplet Manifest

To init the Tapplet registration process run

```
tapp-registrant init
```

#### 4. Validate Manifest file

To validate the Tapplet manifest file run

```
tapp-registrant check-manifest
```

#### 4. Register the tapplet to the Tapplets Registry

To register the Tapplet to the registry run

```
tapp-registrant register
```

## Update process

To update the Tapplet already register in the registry run

```
tapp-registrant update
```

## Deprecate process

To deprecate the given tapplet version run

```
tapp-registrant deprecate <version>
```

## More

To see all available commands run

```
tapp-registrant
```