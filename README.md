![Undernet](src/assets/images/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet)

# Undernet

A powerful, configuration-first front-end framework.

## In the box

The framework features:

- Layout utilities including a flex grid and spacing classes
- CSS styling for common elements: forms, buttons, headers, etc
- Interactive components using JS: modals, accordions, and dropdowns
- Powerful configuration options for all of the above.

## Easy setup

Setting up and using Undernet is fairly straightforward:

### Easiest

Simply download the compiled assets and add them to your layout. Great for prototyping.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I'm using Undernet!</title>
    <link rel="stylesheet" href="path/to/undernet.min.css">
    <!-- Add new styles after -->
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/undernet.bundle.min.js" async></script>
    <script type="text/javascript">
      Undernet.start()
    </script>
  </body>
</html>
```

## Advanced setup

If you prefer to have more control over the styles and components, you are free to use the uncompiled SCSS modules along with the JS modules (via npm or as static assets).

### SCSS

For the most control over your CSS, it's highly recommended to integrate the SCSS modules with your asset pipeline. Simply link to the main `undernet.scss` file in your main stylesheet (only once!) before your other styles (or anywhere, if you've added an optional scope to the styles):

```css
@import "path/to/undernet";
```

You can then easily customize `_config.scss` with your intended brand attributes. This is where you'd also define a scope to isolate Undernet styles.

For more details on customizing branding, check out the [Branding](https://undernet.io/docs/overview/branding) page.

### NPM / JS modules

Another option is to use the npm package and borrow the modules you need. This is great for webpack where you can choose to import specific components directly.

```sh
$ npm install --save-dev undernet
```

Check out the [documentation](https://undernet.io/docs/overview/javascript) to see the necessary DOM structure for a given component.

Then require or import the dependency in your js, or add it to a script tag in your main layout (see the **Easy setup** method above for script usage).

```js
// import everything
import Undernet from "undernet"
Undernet.start()

// or import a specific component:
import Modals from "undernet/js/dist/components/modal"
Modals.start()
```

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

To compile and test the framework in this project, you'll need to have a stable version of ruby for sass. I recommend using [ruby-install](https://www.ruby-lang.org/en/documentation/installation/#ruby-install) and managing your version for this project with [chruby](https://www.ruby-lang.org/en/documentation/installation/#chruby) or [rvm](https://www.ruby-lang.org/en/documentation/installation/#rvm). Use whatever setup is easiest for your machine.

Then globally install `sass` and `rollup`:

```sh
$ gem install sass
$ npm run build:development
$ npm link
```

From there, everything should build correctly: the framework scss and js will be prettified by `prettier` and distributions of js and css will be output using `@babel`, `rollup`, `sass`, and a few macOS specific commands for zipping/prepping files for release. The output typically takes 5-10 seconds at most.

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
3. Generate new sha-256 hashes for CDN access (see `docs/introduction.md`, "Get Started" section).

All that's left is a `npm publish` and the new version is out in the wild! Crazy cool!
