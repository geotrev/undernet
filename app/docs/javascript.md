The API for Undernet's JS is very simple. 

Initiating the JS requires the DOM being ready to search. For this reason, ensure you only use it in the appropriate state of page load. 

For an inline `<script>` tag, this means only using the script in a `DOMContentLoaded` event listener, or in React's `componentDidMount` lifecycle method, just to name two examples. See the [download page](/docs/overview/download) for more detailed examples.

## Importing Options

The default export is the `Undernet` object. Importing this gives you everything, including all JS components and utilities.

You can also do a named import of just one component or the `ContextUtil` helper, which controls things like the global focus outline and focus trapper.

### Components

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
ContextUtil.setFocusRing()
```

### Utilities

As mentioned, there's an optional `ContextUtil` helper which allows you to extend some of the tools used by components.

#### Focus Trap

The focus trap utility is used in [Modals](/docs/components/modals) and [Dropdowns](/docs/components/dropdowns) to constrain keyboard navigation to a given container.

In this case, `tab` and `shift+tab` will never let the user exit the container.

Pass in the container's unique `id`, `class`, or other `attribute` as the target for the trap:

```js
ContextUtil.setFocusTrap("#element-id")
```

To disable the focus trap, you can use:

```js
ContextUtil.unsetFocusTrap()
```

Notice that you don't need to pass in a selector on the `unset` method. The utility expects to track one focus trap at a time. This means you should use the same instance of `ContextUtil` to set and unset the trap.

As a side note, make sure that if you use this utility, you allow the user to escape focus by some other means, such as with the `escape` key.

#### Focus Ring

A key factor in accessibility is the focus ring, which in the case of Undernet, appears when a user starts using their keyboard to navigate a page (tab, shift, spacebar, escape, enter, etc). If you try it now, you'll see a blue box-shadow (or white, on dark background) applied to elements.

The utility creates global event listeners to achieve this effect. A class, `using-keyboard` is added to `<body>`.

To enable it:

```js
ContextUtil.setFocusRing()
```

To disable:

```js
ContextUtil.unsetFocusRing()
```

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/javascript.md">Edit this page on Github!</a></p>
