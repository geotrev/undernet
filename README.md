![Undernet](src/assets/images/github-logo.png?raw=true)

[![CircleCI](https://circleci.com/gh/geotrev/undernet/tree/master.svg?style=svg)](https://circleci.com/gh/geotrev/undernet/tree/master) [![devDependencies Status](https://david-dm.org/geotrev/undernet/dev-status.svg)](https://david-dm.org/geotrev/undernet?type=dev) [![npm version](https://badge.fury.io/js/undernet.svg)](https://badge.fury.io/js/undernet)

# Undernet

A powerful, configuration-first front-end framework.

## In the box

The framework features:

- A flex-grid for layouts
- Styling for common tags: buttons, paragraphs, headers, etc.
- Configuration file to apply core brand styling to all elements, including an option for name-spacing.
- Functional JavaScript components: modals, accordions, etc.

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

Another option is to use the npm package and borrow the modules you need. This is great for webpack where you can tree shake the modules you won't be needing.

```sh
$ npm install --save-dev undernet
```

Check out the [documentation](https://undernet.io/docs/overview/javascript) to see the necessary DOM structure for a given component.

Then require or import the dependency in your js, or add it to a script tag in your main layout (see the **Easy setup** method above for script usage).

```js
import Undernet from "undernet"

// start all components
Undernet.start()

// or only use a single component, e.g. the Modal:
// NOTE: if you use Undernet.start(), you're effectively doing nothing with this property call
Undernet.Modals.start()
```

#### React

Undernet fully supports use in React. You simply need to call the `.start()` property in `componentDidMount()`, and then `.stop()` in `componentWillUnmount()` (to prevent unnecessary event listeners when the components are no longer visible):

```js
export default class SomeComponent extends React.Component {
  componentDidMount() {
    Undernet.Modals.start()
  }

  componentWillUnmount() {
    Undernet.Modals.stop()
  }

  render() {
    return <div>
      // ... modal markup here!
    </div>
  }
}
```

Since Undernet doesn't have visibility into React's state, and that's something you're worried about (i.e., adding new components dynamically), then add this bit to cover your bases:

```js
export default class SomeComponent extends React.Component {
  ...
  componentDidUpdate() {
    Undernet.Modals.stop()
    Undernet.Modals.start()
  }
  ...
}
```

## Contribute

See CONTRIBUTING.md for more details on git flow and recommendations for pull requests/issues.

### Fork and clone for development

Clone the repo and re-clone the wiki contents.

```sh
$ git clone git@github.com:USER_NAME/undernet.git
$ cd undernet/
$ npm run setup
```

The site is both a demo and marketing tool. It is built with my own webpack setup called [Pulsar](https://github.com/geotrev/pulsar). It's basically just Webpack + React, so don't panic.

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
```

From there, everything should build correctly: the framework scss and js will be prettified by `prettier` and distributions of js and css will be output using `@babel`, `rollup`, `sass`, and a few macOS specific commands for zipping/prepping files for release. The output typically takes 5-10 seconds at most.

### Rebuild assets on the fly

To rebuild fresh js assets while running the site's dev server, run this in a separate session to auto-reload assets while you work:

```sh
$ npm run js:watch
```

### New releases

New releases are simply zipped and compiled files. You can create a new release using:

```sh
$ npm run build:release
```

This will compile and zip framework assets for a new version.
