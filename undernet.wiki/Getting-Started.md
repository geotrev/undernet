Undernet is a set of configurable components, so the most effective way to use it is to integrate it with your asset pipeline. Undernet can easily sit inside its own folder for you to customize when needed, then you can link to its compiled css and js via your global layouts.

1.  [Basic Setup](#basic-setup)
2.  [Advanced](#advanced)

### Download

#### Stable Build

* [Download SCSS](https://github.com/geotrev/undernet/raw/master/dist/undernet.scss.zip)
* [Download CSS](https://github.com/geotrev/undernet/raw/master/dist/undernet.css.zip)
* [Download JS (compiled)](https://github.com/geotrev/undernet/raw/master/dist/undernet.js.zip)
* [Download JS (modules)](https://github.com/geotrev/undernet/raw/master/dist/undernet.modules.js.zip)

#### Prerelease Build

* [Download SCSS](https://github.com/geotrev/undernet/raw/develop/dist/undernet.scss.zip)
* [Download CSS](https://github.com/geotrev/undernet/raw/develop/dist/undernet.css.zip)
* [Download JS (compiled)](https://github.com/geotrev/undernet/raw/develop/dist/undernet.js.zip)
* [Download JS (modules)](https://github.com/geotrev/undernet/raw/develop/dist/undernet.modules.js.zip)

### Basic Setup

Link the compiled CSS and JS in your layout, and enable JS components.

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
      Undernet.accordions().start()
    </script>
  </body>
</html>
```

_Note: Undernet's JS does not run simply from importing or requiring the file. You specifically need to call its `start()` method or on one of its individual  components as shown above._

### Advanced

If you choose to use the `undernet` node module, things are easier in some places but harder in others. Overall, it's a lot more flexible, though. Especially for React! 🎉

#### SCSS

This is the trickiest part. First, you need to import function helpers, the original config, and mixin helpers into your new config file. From there, apply all overrides to the original config _before_ its import statement.

What variables are in the original config? [Check that out here.](https://github.com/geotrev/undernet/blob/master/scss/_config.scss)

```css
@import "~undernet/scss/helpers/functions/base";
// config overrides here!
@import "~undernet/scss/config";
@import "~undernet/scss/helpers/mixins/base";
```

In separate stylesheets, if you need access to these variables and they aren't available, just `@import` this new config file.

Finally, you can include the rest of the elements styling, but make sure it's all only included once!

```css
@import "path/to/newConfig";
// elements
@import "~undernet/scss/elements/global/base";
@import "~undernet/scss/helpers/classes/base";
@import "~undernet/scss/elements/grid/base";
@import "~undernet/scss/elements/typography/base";
@import "~undernet/scss/elements/link/base";
@import "~undernet/scss/elements/button/base";
@import "~undernet/scss/elements/form/base";
// components
@import "~undernet/scss/components/modal";
@import "~undernet/scss/components/accordions";
```

#### JavaScript

The default export from `undernet` or the compiled `undernet.js` file is the `Undernet` object. Simply refer to it when using the library. Simply swap `undernet` for the direct file path if you aren't using webpack.

```js
// es5 require()
var Undernet = require("undernet")
// ... or es2015 import
import Undernet from "undernet"
// ... then start all javascript components on page load
Undernet.start()
// or run a specific component
Undernet.modals().start()
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
    <script type="text/javascript" src="path/to/undernet.js" async></script>
    <script type="text/javascript" async>
      // Undernet is attached to the `window` object now.
      Undernet.start()
      // or run a specific component
      Undernet.modals().start()
    </script>
  </body>
</html>
```

Next: [Configuration ►](configuration)
