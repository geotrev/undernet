![Undernet](.bin/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![dependencies Status](https://david-dm.org/geotrev/undernet.svg)](https://david-dm.org/geotrev/undernet) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet) ![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg) [![Netlify Status](https://api.netlify.com/api/v1/badges/b895bcd0-9455-4818-a94b-8d33e5907517/deploy-status)](https://app.netlify.com/sites/undernet-prod/deploys)

# Undernet

A modular, configuration-first front-end framework. No strings.

What does Undernet provide?

- Style defaults for common page elements: buttons, form inputs, typography, and the like.
- Flex grid for advanced layout options.
- Interactive components powered by JavaScript.
- Highly brandable and extendable.

The main site, https://undernet.io is run on Jekyll and hosted using Netlify.

## Install via npm or yarn

```sh
$ npm install -D undernet
```

```sh
$ yarn add -D undernet
```

### Configuration & Setup

See [Download documentation](https://www.undernet.io/overview/download) to learn how to include the framework in various pipelines, ranging from CDN to fine-tuned control with the NPM package or source code.

### Styles

See [CSS documentation](https://www.undernet.io/overview/css) to learn the patterns of Undernet's Sass and classes that power the core of the framework.

### JavaScript

See [JS documentation](https://www.undernet.io/overview/javascript) to learn about the JS API and its options, including components and utilities.

Currently available list of components:

- [Modals](https://www.undernet.io/components/modals)
- [Tooltips](https://www.undernet.io/components/tooltips)
- [Collapsibles](https://www.undernet.io/components/collapsibles)
- [Accordions](https://www.undernet.io/components/accordions)
- [Dropdowns](https://www.undernet.io/components/dropdowns)

Each component requires a specific HTML structure to allow for proper accessibility and interactivity for the user. Examples included in the links above.

In addition, there are focus trap and focus ring helpers to assist with accessible behavior for custom needs.

## Contribute

See CONTRIBUTING.md for details on git flow and recommendations for pull requests/issues.

### Fork and clone for development

To develop Undernet, it requires dependencies for the framework and the website, which is the demo itself. You'll need node, npm, and ruby. Make sure you have the version specified in `.ruby-version`. I recommend installing with `rvm`, or a combination of tools like `chruby` (to manage versions) and `ruby-install` (to install rubies).

```sh
$ git clone git@github.com:USER_NAME/undernet.git
$ cd undernet/
$ gem install bundler
$ npm run setup
```

The site is built with Jekyll. Example repos showcasing CDN, NPM + React, and raw source (Coming Soon™) will demonstrate how the framework can be used in various ways.

### Run the dev server of the site

```sh
$ npm run watch
```

### Watch site scripts (separate terminal session)

```sh
$ npm run watch:scripts
```

### Make a production build (including site scripts)

```sh
$ npm run build
```

### Run framework tests (using Jest)

```sh
$ npm run test
```

### Run tests in watch mode

```sh
$ npm run test:watch
```

### Building the framework

The framework source is built using babel, node-sass, and a few node scripts.

The build environment works in any unix environment where node and npm are available. If you're on Windows, that means you'll need [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) with node version 10.x or greater.

First, run `npm install` if you haven't already. Then try building the lib and CSS dist:

```sh
$ npm run build:dist
```

If you're feeling brave, you can do a full release build to test that assets compile correctly into the `lib/` and `dist/` folders.

Make sure to run this with a clean tree state:

```sh
$ npm run build:dist:release
```

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
4. Build all package assets for publishing
5. Create new content hashes to be used with CDN subresource integrity links in the docs
6. Add all new build assets to the version commit and open a prompt for the release's commit message

The release commit should be in this format: `[Version X.X.X] This release does x, y, and z.`

The state of the branch will be ready to push to `master` and publish via `npm publish`. I recommend using `npm publish --dry-run` to confirm the output is what you expect. Then remove the flag and a new version is out in the world!
