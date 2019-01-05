![Undernet](src/assets/images/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet)

# Undernet

A modular, configuration-first front-end framework. No strings.

The framework features:

- Layout utilities including a flex grid and spacing classes
- CSS styling for common elements: forms, buttons, headers, etc
- Common interactive components using JS: modals, accordions, and dropdowns
- Powerful configuration options for all of the above.

## Install via npm or yarn

```sh
$ npm install -S undernet
```

```sh
$ yarn add -D undernet
```

### Components / JS

See [javascript documentation](https://www.undernet.io/docs/overview/javascript) to learn how to setup and use Undernet's scripts for interactive components.

Here are the current components included:

- [Modals](https://www.undernet.io/docs/components/modals)
- [Accordions](https://www.undernet.io/docs/components/accordions)
- [Dropdowns](https://www.undernet.io/docs/components/dropdowns)

### Styles

See [branding documentation](https://www.undernet.io/docs/overview/branding) to setup a custom pipeline with Undernet's SCSS modules.

## Contribute

See CONTRIBUTING.md for more details on git flow and recommendations for pull requests/issues.

### Fork and clone for development

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
$ npm link
```

From there, everything should build correctly: the framework scss and js will be prettified by `prettier` and distributions of js and css will be output using `@babel`, `rollup`, `node-sass`, and a few macOS specific commands for zipping/prepping files for release. The output typically takes 5-10 seconds at most.

### Rebuild assets on the fly

To rebuild fresh js assets while running the site's dev server, run this in a separate session to auto-reload assets while you work:

```sh
$ npm run js:watch
```

### New releases

New releases are simply zipped and compiled files to be distributed on npm, then for use on a CDN, such as jsdelivr.

To run a release build, run the following two commands, where `VERSION` is the semver value incremented from `package.json`:

```sh
$ update-version --tag=VERSION
$ npm run build:release
```

These will do three things:

1. Increment the project version across multiple files that require it.
2. Build all assets with the new version.
3. Generate new sha-256 hashes for CDN subresource integrity (added to `docs/download.md`).

The result is a repo state ready to publish to npm!
