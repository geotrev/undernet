Monolith is a set of configurable components, so the most effective way to use it is to integrate it with your asset pipeline. Monolith can easily sit inside its own folder for you to customize when needed, then you can link to its compiled css and js via your global layouts.

1.  [Basic Setup](#basic-setup)
2.  [Advanced](#advanced)

### Download

#### Stable Build

* [Download SCSS](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.scss.zip)
* [Download CSS](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.css.zip)
* [Download JS (compiled)](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.js.zip)
* [Download JS (modules)](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.modules.js.zip)

#### Prerelease Build

* [Download SCSS](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.scss.zip)
* [Download CSS](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.css.zip)
* [Download JS (compiled)](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.js.zip)
* [Download JS (modules)](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.modules.js.zip)

### Basic Setup

Link the compiled CSS and JS in your layout, and enable JS components.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I'm using Monolith!</title>
    <link rel="stylesheet" href="path/to/monolith.min.css">
    <!-- Add new styles after -->
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/monolith.bundle.min.js" async></script>
    <script type="text/javascript">
      // Monolith is now on the `window` object.
      Monolith.start()
      // or only start a single component
      Monolith.accordions().start()
    </script>
  </body>
</html>
```

_Note: Monolith's JS does not run simply from importing or requiring the file. You specifically need to call its `start()` method or on one of its individual  components as shown above._

### Advanced

If you choose to use the `getmonolith` node module, things are easier in some places but harder in others. Overall, it's a lot more flexible, though. Especially for React! 🎉

#### SCSS

This is the trickiest part. First, you need to import function helpers, the original config, and mixin helpers into your new config file. From there, apply all overrides to the original config _before_ its import statement.

What variables are in the original config? [Check that out here.](https://github.com/geotrev/getmonolith.io/blob/master/scss/_config.scss)

```css
@import "~getmonolith/scss/helpers/functions/base";
// config overrides here!
@import "~getmonolith/scss/config";
@import "~getmonolith/scss/helpers/mixins/base";
```

In separate stylesheets, if you need access to these variables and they aren't available, just `@import` this new config file.

Finally, you can include the rest of the elements styling, but make sure it's all only included once!

```css
@import "path/to/newConfig";
// elements
@import "~getmonolith/scss/elements/global/base";
@import "~getmonolith/scss/helpers/classes/base";
@import "~getmonolith/scss/elements/grid/base";
@import "~getmonolith/scss/elements/typography/base";
@import "~getmonolith/scss/elements/link/base";
@import "~getmonolith/scss/elements/button/base";
@import "~getmonolith/scss/elements/form/base";
// components
@import "~getmonolith/scss/components/modal";
@import "~getmonolith/scss/components/accordions";
```

#### JavaScript

The default export from `getmonolith` or the compiled `monolith.js` file is the `Monolith` object. Simply refer to it when using the library. Simply swap `getmonolith` for the direct file path if you aren't using webpack.

```js
// es5 require()
var Monolith = require("getmonolith")
// ... or es2015 import
import Monolith from "getmonolith"
// ... then start all javascript components on page load
Monolith.start()
// or run a specific component
Monolith.modals().start()
```

Or...

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/monolith.js" async></script>
    <script type="text/javascript" async>
      // Monolith is attached to the `window` object now.
      Monolith.start()
      // or run a specific component
      Monolith.modals().start()
    </script>
  </body>
</html>
```

Next: [Configuration ►](configuration)
