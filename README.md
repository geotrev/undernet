![Undernet](src/assets/images/un-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet)

# Undernet

A powerful, configuration-first front-end framework.

## In the box

The framework features:

- A flex-grid for layouts
- Styling for common tags: buttons, paragraphs, headers, etc.
- Configuration file to apply core brand styling to all elements, including an option for name-spacing.
- Functional JavaScript components: modals, accordions, etc.

## Getting Started

There's two ways to get started:

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
      // Undernet is now on the `window` object.
      Undernet.start()
      // or only start a single component
      Undernet.Accordions.start()
    </script>
  </body>
</html>
```

### Use SCSS (recommended)

For the most control over your CSS, it's highly recommended to integrate the SCSS modules with your asset pipeline. Simply link to the main `undernet.scss` file in your main stylesheet (only once!) before your other styles (or anywhere, if you've added an optional scope to the components):

```css
@import "path/to/undernet";
```

You can then easily customize `_config.scss` with your intended brand attributes. This is where you'd also define a scope to isolate Undernet styles.

For more details on the config, check out the [Getting Started](https://undernet.io/docs/getting-started) page.

### NPM / JS modules

Another option is to use the npm package and borrow the modules you need. This is great for webpack where you can tree shake the modules you won't be needing.

```shell
$ npm install --save-dev undernet
```

Check out the [Examples](https://undernet.io/examples) page to see necessary dependencies/markup for a given component.

Then require or import the dependency in your js, or add it to a script tag in your main layout (see the **Easiest** method above for the script example).

```js
import Undernet from "undernet"

// start all components
Undernet.start()

// or only use a single component, e.g. the Modal:
Undernet.Modals.start()
```

#### React

Undernet fully supports use in React. You simply need to call the `.start()` method in `componentDidMount()`, and then `.stop()` in `componentDidUnmount()`:

```js
export default class SomeComponent extends React.Component {
  componentDidMount() {
    Undernet.Modals.start()
  }

  componentDidUnmount() {
    Undernet.Modals.stop()
  }

  render() {
    return <div>// ... modal markup here!</div>
  }
}
```

## Contribute

See CONTRIBUTING.md for more details.

### Fork and clone

Clone the repo and re-clone the wiki contents.

```shell
$ git clone git@github.com:USER_NAME/undernet.git
$ cd undernet/
$ npm run setup
```

The site is both a demo and marketing tool. It is built with my own webpack setup called [Pulsar](https://github.com/geotrev/pulsar).

### Run the dev server

```shell
$ npm run watch
```

### Make production builds

```shell
$ npm run build
```

### Run tests with istanbuljs/nyc coverage stats

```shell
$ npm run test
```

### Load tests on file save

```shell
$ npm run test:w
```

### Testing and development

The site itself is a demo of the framework, so you should be able to work on the framework source itself while the site runs in the background.

**NOTE**: The build environment works only for macOS at the moment.

To compile and test the framework in this project, you'll need to have a stable version of ruby to compile the framework. I recommend using [ruby-install](https://www.ruby-lang.org/en/documentation/installation/#ruby-install) and managing your version for this project with [chruby](https://www.ruby-lang.org/en/documentation/installation/#chruby) or [rvm](https://www.ruby-lang.org/en/documentation/installation/#rvm). Use whatever setup is easiest for your machine.

Then globally install `sass` and `rollup`. Don't use `npm`'s sass package as it doesn't have the same cli flags as the gem package.

```shell
$ gem install sass
$ npm install -g rollup
$ npm run build:development
```

From there, everything should build correctly: the framework scss and js will be prettified by `prettier` and distributions of js and css will be output using `babel-cli`, `rollup`, `sass`, and a few macOS specific commands for zipping/prepping files for release.

### New releases

New releases are simply zipped and compiled files. You can create a new release using:

```shell
$ npm run build:release
```

This will compile and zip framework assets for a new version.
