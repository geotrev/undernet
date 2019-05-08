![Undernet](site/assets/images/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![dependencies Status](https://david-dm.org/geotrev/undernet.svg)](https://david-dm.org/geotrev/undernet) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet) ![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)

# Undernet

A modular, configuration-first front-end framework. No strings.

What does Undernet include?

- Style defaults for common page elements: buttons, form inputs, typography, and the like.
- Flex grid for advanced layout options.
- Interactive components powered by JavaScript.
- Highly brandable and extendable.

## Install via npm or yarn

```sh
$ npm install -D undernet
```

```sh
$ yarn add -D undernet
```

### Styles

See [branding documentation](https://www.undernet.io/docs/overview/branding) to setup a custom pipeline with Undernet's SCSS.

### Components / JS

See [JS documentation](https://www.undernet.io/docs/overview/javascript) to learn how to setup and use Undernet's API for interactive components.

Currently available list of components:

- [Modals](https://www.undernet.io/docs/components/modals)
- [Accordions](https://www.undernet.io/docs/components/accordions)
- [Dropdowns](https://www.undernet.io/docs/components/dropdowns)
- [Tooltips](https://www.undernet.io/docs/components/tooltips)

Each require a specific HTML structure to allow for proper accessibility and interactivity for the user. Examples included in the links above.

## Contribute

See CONTRIBUTING.md for more details on git flow and recommendations for pull requests/issues.

### Fork and clone for development / contributing

First fork the project on Github. Then set up locally.

```sh
$ git clone git@github.com:USER_NAME/undernet.git
$ cd undernet/
$ npm install
```

The site is both a demo and marketing tool. It is built with my own webpack setup called [Pulsar](https://github.com/geotrev/pulsar). It's basically just Webpack + React, so don't panic. :)

### Run the dev server

```sh
$ npm run watch
```

### Make a production build (mostly for sanity checks)

```sh
$ npm run build
```

### Run Jest tests (for site + framework)

```sh
$ npm test
```

### Load tests on file save

```sh
$ npm run test:watch
```

### Building the framework

The site itself is a demo of the framework, so you should be able to work on the framework source itself while the site runs in the background.

The build environment works in any bash/unix environment. If you're on Windows, that means you'll need [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) or an equivalent solution.

If you've already run `npm install`, these commands should Just Work™.

```sh
$ npm run build:dist
```

The script processes the SCSS and JS, then compiles the output to the `dist/` folder.

### Rebuild assets on the fly

To continually reload fresh JS assets while running the site's dev server, run the below command in a separate terminal session.

```sh
$ npm run js:watch
```

### New releases

To make a release build for npm, run the following command, where the third keyword should be one of `major`, `minor` or `patch`:

```sh
$ npm version (major|minor|patch)
```

This will do a few things:

1. Run the full test suite to ensure the library is stable.
2. Increment the package by the version you specify, and tag it appropriately
3. Run a custom node script to update appropriate files with the new version
4. Rerun the test suite to update snapshots for the build, then build all package assets
5. Create new content hashes to be used with cdn subresource integrity links in the docs
6. Add all new build assets to the version commit and open a prompt for the release's commit message

The release commit is usually in this format: `[Version X.X.X] This release does x, y, and z.`

The commit will be ready to merge to master. After that, the repo can be published to npm.
