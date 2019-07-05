Using Undernet's JS requires knowing its API. Luckily it's very simple! To see options for bundling the scripts in your project, scroll down to the **Bundling Options** section.

## Available Components & Plugins

A number of components are available for you to use in your site:

1. Modals
2. Tooltips
3. Dropdowns
4. Accordions

Additionally, there are two utilities you can use to manipulate certain behavior outside of components using the `ContextUtil` plugin:

1. Focus Trapping: Use `ContextUtil.captureFocus(selector)` to trap focus within a given container. `selector` can be any valid class, id, attribute, or other identifier in the DOM. E.g., `.my-cool-class`. To release focus, use `ContextUtil.releaseFocus()`; it assumes you are releasing the focus on the same element you captured focus on, so don't call `captureFocus` twice in a row!
2. Focus Outline: Use `ContextUtil.enableFocusOutline()` to enable a focus outline when keyboard navigation activity is detected (spacebar, enter, escape, arrow keys, etc). Use `ContextUtil.disableFocusOutline()` to manually turn it off.

# API Patterns

Undernet's components and focus outline plugin can all be enabled using a one line "start" method:

```js
Undernet.start()
```

2. The components can conversely be stopped by using the "stop" method.

```js
Undernet.stop()
```

3. If you're using Webpack and are importing individual components, you can start or stop the component in a similar fashion.

```js
Modals.start()
// or...
Modals.stop()
```

## Bundling

There's two main ways to gain access to the JavaScript: the CDN and NPM package. The API is the same in either case.

### CDN

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

### NPM

_NOTE: The plugin uses global variables such as `window` and `document`, which means Undernet can't run reliably for [server side rendering](https://medium.com/@baphemot/whats-server-side-rendering-and-do-i-need-it-cb42dc059b38) (SSR). Take care in guarding the scripts from running if you plan to take advantage of SSR._

Easily import with npm. First, install the dependency:

```sh
$ npm i -D undernet
```

Then whip it up:

```js
import Undernet from "undernet"
Undernet.start()
```

#### Use only a single component

If you want to be more concise, you can avoid starting _every_ component by instead calling the exact one you need.

```js
import Undernet from "undernet"
Undernet.Modals.start()
```

#### Customizing Component Imports

You may not want to include _every single_ component in your project. For example, let's say you only need the [Tooltip](/docs/components/tooltips) component.

To that end, `import` the component directly as a named import.

```js
import { Tooltips } from "undernet"
Tooltips.start()
```

Undernet is a fully modular package in this way, enabling [tree shaking](https://webpack.js.org/guides/tree-shaking/). Note that this will only work with modern JavaScript tooling like Rollup and Webpack.

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/javascript.md">Edit this page on Github!</a></p>
