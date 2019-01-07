![Undernet](src/assets/images/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet)

# Undernet

A modular, configuration-first front-end framework. No strings.

What does Undernet include?

- Style defaults for common page elements: buttons, form inputs, typography, and the like.
- Flex grid for advanced layout options.
- Interactive components powered by JavaScript.
- Highly brandable and extendable.

## Install via npm or yarn

```sh
$ npm install -S undernet
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

Each require a specific HTML structure to allow for proper accessibility and interactivity for the user. Examples included in the links above.

## Contribute

See CONTRIBUTING.md for more details on git flow and recommendations for pull requests/issues.

### Fork and clone for development / contributing

First fork the project on Github. Then set up locally.

```sh
$ git clone git@github.com:USER_NAME/undernet.git
$ cd undernet/
$ npm install && npm link
```

The site is both a demo and marketing tool. It is built with my own webpack setup called [Pulsar](https://github.com/geotrev/pulsar). It's basically just Webpack + React, so don't panic. :)

### Run the dev server

```sh
$ npm run watch
```

### Make a production build

```sh
$ npm run build
```

### Run tests with istanbuljs/nyc coverage stats (for the site only)

```sh
$ npm run test
```

### Load tests on file save (also for the site)

```sh
$ npm run test:w
```

### Building the framework

The site itself is a demo of the framework, so you should be able to work on the framework source itself while the site runs in the background.

The build environment works only for macOS at the moment.

If you've already run `npm install`, these commands should Just Work™.

```sh
$ npm run build:development
```

The script processes the SCSS and JS, then compiles the output to a `dist/` folder.

### Rebuild assets on the fly

To continually reload fresh JS assets while running the site's dev server, run the below command in a separate terminal session.

```sh
$ npm run js:watch
```

### New releases

To run a release build, run the following command, where `VERSION` is the semver value incremented from `package.json`:

```sh
$ update-version --tag=VERSION && npm run build:release
```

These will do three things:

1. Increment the project version across docs, package.json, and in `scss/undernet.scss`
2. Build all assets to `dist/` with the new version.
3. Generate new sha-256 hashes for CDN subresource integrity (added to `docs/download.md`).

The result is a repo state ready to publish to npm!
