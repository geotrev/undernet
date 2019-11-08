The API for Undernet's JS is very simple. 

Initiating the JS requires the DOM being ready to search. For this reason, ensure you only use it in the appropriate state of page load. 

For an inline `<script>` tag, this means only using the script in a `DOMContentLoaded` event listener, or in React's `componentDidMount` lifecycle method, just to name two examples. See the [download page](/docs/overview/download) for more detailed examples.

## Importing Options

The default export is the `Undernet` object. Importing this gives you everything, including all JS components and utilities.

## API Pattern

Whether you're using `Undernet`, or one of the named modules, there are two ways to enable the components on a page. 

Using the "start" method, you can enable components. This also turns on the focus outline utility.

```js
import Undernet from "undernet"
Undernet.start()
```

The components can conversely be stopped by using the "stop" method.

```js
import Undernet from "undernet"
Undernet.stop()
```

If you're using named imports, you can start or stop the component in an identical fashion.

```js
import { Modals } from "undernet"
Modals.start()
```

Because using a singular component leaves out the focus outline, you can start (or stop, if you wish) that separately too.

```js
import { Modals, ContextUtil } from "undernet"
Modals.start()
ContextUtil.enableFocusOutline()
```

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/javascript.md">Edit this page on Github!</a></p>
