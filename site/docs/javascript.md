---
title: JavaScript
description: API and patterns for using Undernet's JavaScript interactive components and utilities.
permalink: /overview/:basename
---

# {{ page.title }}

The JS API for Undernet is fairly straightforward. The main rule of thumb is to only use the JS when you know the DOM is ready.

Enabling Undernet, including all its component scripts, is as easy as this:

```html
<!-- At the end of body content -->
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/undernet@{{ site.package.version }}/dist/undernet.bundle.min.js"
  integrity="{{ site.package.cdn_integrity_js }}"
  crossorigin="anonymous"
></script>
<script type="text/javascript">
  // Undernet is now  attached to the `window`
  if (document)
    document.addEventListener("DOMContentLoaded", function() {
      Undernet.start()
    })
</script>
```

## Core API

You can enable and disable all components on the global `Undernet` object using the `start` and `stop` methods.

### start

This method starts and sets up events for one or more components on the page.

```js
Undernet.start(id, useFocusRing)
```

#### `id` (string)

Default: `undefined`

Runs a setup of a component with the specified id. If none is found, nothing happens.

#### `useFocusRing` (boolean)

Default: `false`

Enables the focus ring utility. [Learn more](#createfocusring).

### stop

This method stops and tears down events for one or more components on the page.

```js
Undernet.stop(id, disableFocusRing)
```

#### `id` (string)

Default: `undefined`

Runs a teardown of a component with the specified id. If none is found, nothing happens.

#### `disableFocusRing` (boolean)

Default: `false`

Disables the focus ring utility.

## Individual Components

You can use the same API above to enable or disable individual components, as well. The main difference is there isn't a second `useFocusRing` or `disableFocusRing` parameter when using this method.

### start

```js
Undernet.Modals.start()
Undernet.Collapsibles.start("#wrapper-element")

// or, if you're using named imports via npm:
Modals.start()
Collapsibles.start("#wrapper-element")
```

### stop

```js
Undernet.Modals.stop()
Undernet.Collapsibles.stop("#wrapper-element")

// or, if you're using named imports via npm:
Modals.stop()
Collapsibles.stop("#wrapper-element")
```

## Using Modules

If you use npm, the default export is the `Undernet` object, whose API is the same as above.

```js
import Undernet from "undernet"
Undernet.start()
```

You can also do a named import of just one component or utility. Bonus: it's tree-shakable if you use tools which enable the feature (webpack and rollup, for example).

```js
import { Modals } from "undernet"
Modals.start()
```

## Initialize by ID

By default, using `.start` or `.stop` will cause Undernet to search the entire document for component instances. When using a UI framework such as React, however, that isn't desirable. Instead, you can `start` a single component instance by passing in its component ID, such as `data-collapsible='some-unique-id'`.

Here's an example of how that looks in practice:

```js
import { Collapsibles } from "undernet"
const COLLAPSIBLE_ID = "sidebar-collapsible"

export default function Sidebar(props) {
  useEffect(() => {
    Collapsibles.start(COLLAPSIBLE_ID)
    return () => Collapsibles.stop(COLLAPSIBLE_ID)
  }, [])

  return (
    <div data-collapsible={COLLAPSIBLE_ID} class="collapsible">
      ...
    </div>
  )
}
```

When the component mounts, `useEffect` runs one time to `start` the collapsible returned in JSX. Then, the `stop` call is made in the return value, aka when the component is about to be unmounted.

### Handling DOM State

If you're removing/adding nodes from/to the DOM, you'll need to be careful. Undernet isn't smart enough to know that your DOM changed. Luckily most UI frameworks provide lifecycle functionality that tells us the DOM is rendered or about to re-render, so we can use those tools to their fullest extent.

Let's extend the sidebar example from before, but this time we'll toggle its visibility using a button:

```js
const COLLAPSIBLE_ID = "sidebar-collapsible"

export default function Sidebar(props) {
  // We'll use a state effect to track sidebar visibility
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true)

  // Only `stop` when the component will unmount; it won't run
  // if Collapsibles.stop has already been called.
  useEffect(() => {
    return () => Collapsibles.stop(COLLAPSIBLE_ID)
  }, [])

  // Run Collapsibles.start if the sidebar is toggled to `true`
  useEffect(() => {
    if (sidebarIsVisible) Collapsibles.start(COLLAPSIBLE_ID)
  }, [sidebarIsVisible])

  // If the sidebar is visible on click, stop Collapsibles before t
  // he sidebar is removed from the DOM and sidebarIsVisible is set to `false`
  const handleClick = e => {
    if (sidebarIsVisible) Collapsibles.stop(COLLAPSIBLE_ID)
    setSidebarIsVisible(!sidebarIsVisible)
  }

  return (
    <>
      <button onClick={handleClick}>Toggle Sidebar</button>
      {sidebarIsVisible && (
        <div data-collapsible={COLLAPSIBLE_ID} class="collapsible">
          ...
        </div>
      )}
    </>
  )
}
```

In this example, we have a button that when clicked will toggle a piece of state, `sidebarIsVisible`, to either `true` or `false`.

When the button is clicked and `sidebarIsVisible` is currently `true`, run `Collapsible.stop` before the corresponding node is removed from the DOM and `sidebarIsVisible` is set to `false`.

`Collapsibles.start` will run in the opposite case of `sidebarIsVisible` being set to `true` via the same button click.

## Utilities

Undernet comes with two utilities out of the box: `createFocusRing` and `createFocusTrap`. They can be initialized with `start` and `stop` methods. The only difference is there is no scope available.

### createFocusRing

This will create global event listeners on the page for keyboard and mouse behavior.

```js
import { createFocusRing } from "undernet"
const focusRing = createFocusRing()
focusRing.start()
```

If tab, space, or arrow keys are being used, you're in "keyboard mode," enabling a bright focus ring around the actively focused element.

As soon as a mouse is in use again, the ring goes away.

If you use the utility, whether through this utility or `Undernet.start` or `Undernet.stop`, only initialize it **once** on a page. Enabling it multiple times will create inconsistent results.

### createFocusTrap

This utility is offered in case you need the functionality outside of the components provided in Undernet.

It's instantiated the same way as `createFocusRing`, but takes two parameters:

```js
import { createFocusTrap } from "undernet"
const focusTrap = createFocusTrap(selector, options)
focusTrap.start()
```

#### `selector` (string)

**Required**

A string to be queried in the DOM; it will be treated as the container of possible focusable elements. If this is the only parameter given, `tab` and `shift+tab` will be the key-bindings used for trapping.

```js
const focusTrap = createFocusTrap(".wrapper-element")
```

#### `options` (object)

Default: `{}`

Customize trapping behavior using the below options.

##### `options.useArrows` (boolean)

Default: `false`

Trap focus using up and down arrows.

```js
const focusTrap = createFocusTrap(".wrapper-element", { useArrows: true })
```

##### `options.children` (array)

Default: `[]`

Provide a custom array of elements to trap focus within. This overrides the element querying functionality of the utility.

```js
const children = document.querySelectorAll(".my-focusable-element")
const focusTrap = createFocusTrap(".wrapper-element", { children })
```

NOTE: You should still pass a selector string for the wrapper as a fallback, in case `children` comes back empty and you aren't using a guard for that case explicitly.

##### `options.matchers` (array)

Default: `["a", "button", "input", "object", "select", "textarea", "[tabindex]"]`

Override the default matchers for focusable elements. Elements with `is-visually-hidden` are _always_ excluded from the resulting focusable elements.

```js
const focusTrap = createFocusTrap(".wrapper-element", {
  matchers: ["button", "input", ".elements-with-this-class"],
})
```

{% include partials/edit-on-github.html %}
