Using Undernet's JS requires knowing its API. Luckily it's very simple!

1. Undernet's scripts can be enabled using a one line `start()` method, enabling all of its components.

```js
Undernet.start()
```

2. The scripts can conversely be stopped by using the `stop()` method.

```js
Undernet.stop()
```

3. If you're using Webpack and are importing components, you can `start()` or `stop()` the component in a similar fashion.

```js
Modals.start()
// or...
Modals.stop()
```

## Compiled Assets

Just like in the [Introduction](/docs/overview/introduction) article, the fastest option is to add the compiled assets right to your layout. Then in a separate script tag, call the API.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/undernet.bundle.min.js"></script>
    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", Undernet.start())
    </script>
  </body>
</html>
```

## Using NPM & Webpack

Easily import with npm.

```js
import Undernet from "undernet"
Undernet.start()
```

### Use only a single component

If you want to be more concise, you can avoid starting _every_ component by instead calling the exact one you need.

```js
import Undernet from "undernet"
Undernet.Modals.start()
```

### Customizing Component Imports

You may not want to include _every single_ component in your project. For example, let's say you only need the [Tooltip](/docs/components/tooltips) component.

To that end, `import` the component directly as a named import.

```js
import { Tooltips } from "undernet"
Tooltips.start()
```

Undernet is a fully modular package in this way, enabling [tree shaking](https://webpack.js.org/guides/tree-shaking/). Note that this will only work with modern JavaScript tooling like Rollup and Webpack.

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/javascript.md">Edit this page on Github!</a></p>
