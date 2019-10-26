Using Undernet's JS requires knowing its API. Luckily it's very simple! To see options for bundling the scripts in your project, scroll down to the **Bundling Options** section.

## Available Components & Plugins

A number of components are available for you to use in your site:

1. Modals
2. Tooltips
3. Dropdowns
4. Accordions

Additionally, there are two utilities you can use to manipulate certain behavior outside of components using the `ContextUtil` plugin:

1. **Focus Trap**: Use `ContextUtil.captureFocus(selector)` to trap focus within a given container. `selector` can be any valid class, id, attribute, or other identifier in the DOM. E.g., `.my-cool-class`. To release focus, use `ContextUtil.releaseFocus()`; it assumes you are releasing focus on the same element you captured focus on, so don't call `captureFocus` twice in a row!
2. **Focus Outline**: Use `ContextUtil.enableFocusOutline()` to enable a focus outline when keyboard navigation activity is detected (tab, shift, spacebar, enter, escape, arrow keys, etc). Use `ContextUtil.disableFocusOutline()` to manually turn it off.

## API Pattern

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

## Bundle & Install Options

There's two main ways to gain access to the JavaScript: the static assets and NPM package.

### CDN or Static Assets

The fastest way forward is using the CDN. Alternatively, if you want to get access to the raw distribution files, download them and then link them in your layout.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script type="text/javascript" src="/path/to/undernet.bundle.min.js"></script>
    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", Undernet.start())
    </script>
  </body>
</html>
```

Both the minified and source code files are available via the [download article](/docs/overview/download).

### NPM

_NOTE: The plugin uses global variables such as `window` and `document`, which can break server-side rendering. To avoid issues, the scripts internally guard against these globals. This should not affect SEO in any meaningful way, provided your HTML is semantically structured._

Easily import with npm. First, install the dependency:

```sh
$ npm i -D undernet
```

Then whip it up:

```js
import Undernet from "undernet"
Undernet.start()
```

The above is useful if you need all the components at once on a single page. If you only need one or two, you can target that component script directly:

```js
import Undernet from "undernet"
Undernet.Modals.start()
```

[Tree shaking](https://webpack.js.org/guides/tree-shaking/) is also available for more precise dependency control if you're using a module bundler like Webpack or Rollup:

```js
import { Tooltips } from "undernet"
Tooltips.start()
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/javascript.md">Edit this page on Github!</a></p>
