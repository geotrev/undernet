Monolith is a set of configurable components, so the most effective way to use it is to integrate it with your asset pipeline. Monolith can easily sit inside its own folder for you to customize when needed, then you can link to it via your global stylesheets/layouts.

1.  [Basic Installation](#basic-installation)
2.  [Advanced](#advanced)

### Basic Installation

[Download SCSS](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.scss.zip)
[Download CSS](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.css.zip)
[Download JS (compiled)](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.js.zip)
[Download JS (modules)](https://github.com/geotrev/getmonolith.io/raw/master/dist/monolith.modules.js.zip)

[Download SCSS (prerelease)](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.scss.zip)
[Download CSS (prerelease)](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.css.zip)
[Download JS (compiled, prerelease)](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.js.zip)
[Download JS (modules, prerelease)](https://github.com/geotrev/getmonolith.io/raw/develop/dist/monolith.modules.js.zip)

#### Contents

```
monolith-scss/
— components/
— elements/
— helpers/
— _config.scss
— monolith.scss
```

* `components/`: Helpful JavaScript components for common UI patterns, including modals, dropdowns, and accordions.
* `elements/`: Visual styling for HTML elements.
* `helpers/`: Mixins, functions, and class helpers to help with generating styles in `elements/`.
* `_config.scss`: Configuration for core components. E.g., branding, color, typography, spacing, etc.
* `monolith.scss`: Where all components are imported and optional global scope is enabled.

### Import all the things

The easiest option for setup is to import directly. You can still edit the config if you want to reduce the amount of overrides in your own stylesheets.

#### SCSS

SCSS import or add a `<link>` in your `<head>` tag:

```sass
// import scss if you are including config changes, otherwise css works too:
@import "path/to/monolith";
```

Or...

```html
<link rel="stylesheet" href="path/to/monolith.css">
```

#### JavaScript

To include the javascript, there is also two similar options: import the module via `require`/`import` or via HTML (just before the end of your `body` content):

```js
// es5 require()
var Monolith = require("path/to/monolith")
// ... or es6 import
import Monolith from "path/to/monolith"
// ... then start all javascript components on page load
Monolith.start()
// or run a specific component
Monolith.COMPONENT_NAME().start()
```

_Note: if you use the npm package, replace `path/to/monolith` with `getmonolith`._

Or...

```html
<!-- at the end of your body tag -->
<script type="text/javascript" src="path/to/monolith.js" async></script>
<script type="text/javascript" async>
  // Monolith is attached to the `window` object now.
  Monolith.start()
  // or run a specific component
  Monolith.COMPONENT_NAME().start()
</script>
```

_Note: Monolith does not run simply from importing or requiring the file. You specifically need to call its `start()` method._

### Advanced

If you choose to use the `getmonolith` node module, things are easier in some places but harder in others. Overall, it's a lot more flexible, though. Especially for React! 🎉

#### SCSS

This is the trickiest part. First, you need to import function helpers, the original config, and mixin helpers into your new config file. From there, apply all overrides to the original config _before_ its import statement.

What variables are in the original config? [Check that out here.](https://github.com/geotrev/getmonolith.io/blob/master/scss/_config.scss)

```sass
@import "~getmonolith/scss/helpers/functions/base";
// config overrides here!
@import "~getmonolith/scss/config";
@import "~getmonolith/scss/helpers/mixins/base";
```

In separate stylesheets, if you need access to these variables and they aren't available, just `@import` this new config file.

Finally, you can include the rest of the elements styling, but make sure it's all only included once!

```sass
// config
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
```

#### JavaScript

The default export from `getmonolith` is the `Monolith` object. See the [basic installation](#basic-installation) on `import`/`require` options.

Next: [Configuration ►](configuration)
