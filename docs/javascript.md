# JavaScript

Using Undernet's JS requires knowing its API. Luckily it's very simple!

1. You can `start` and `stop` all of Undernet's components in a single call. E.g., `Undernet.start()`
2. Contain initialization by only calling `start` and `stop` on a single component. E.g., `Undernet.Modals.start()`
3. Do the same as #2 but with named imports for proper tree shaking. E.g., `Modals.start()`

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
      document.addEventListener('DOMContentLoaded', Undernet.start())
    </script>
  </body>
</html>
```

## Using NPM

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

You may not want to include _every single_ component in your project. For example, let's say you only need the [Modal](/docs/components/modals) component. Grab component you need directly through destructured imports.

```js
import { Modals } from "undernet"
Modals.start()
```

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/javascript.md">Edit this page on Github!</a></p>
