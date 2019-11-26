The API for Undernet's JS is very simple. 

Initiating the JS requires the DOM being ready to search. For this reason, ensure you only use it in the appropriate state of page load. 

For an inline `<script>` tag, this means only using the script in a `DOMContentLoaded` event listener, or in React's `componentDidMount` lifecycle method, just to name two examples. See the [download page](/docs/overview/download) for more detailed examples.

## Importing Options

The default export is the `Undernet` object. Importing this gives you everything, including all JS components and utilities.

You can also do a named import of just one component (bonus: it's tree-shakable in the npm module!).

### Components

Whether you're using `Undernet`, or one of the named modules, there are two ways to enable the components on a page. Note: the below examples use npm for the examples, as that is where the most flexibility exists. **You won't be able to do named imports if you're using a CDN or hosting the minified files.**

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

Because using a singular component leaves out the focus ring functionality included with `Undernet.start()`, you can start (or stop, if you wish) that separately to retain that feature, if desired..

```js
import { Modals, createFocusRing } from "undernet"
Modals.start()
const newRing = createFocusRing()
newRing.start()
```

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/javascript.md">Edit this page on Github!</a></p>
