---
title: JavaScript
description: API and patterns for using Undernet's JavaScript interactive components and utilities.
permalink: /overview/:basename
---

# {{ page.title }}

The JS API for Undernet is fairly straightforward. The main rule of thumb is to only use the JS when you know the DOM is ready. You can choose to start [all components on the page](#core-api) or simply [choose one by its id](#handling-single-components).

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

### `start`

This method starts and sets up events for one or more components on the page.

```js
Undernet.start(id, useFocusRing)
```

#### Parameters

##### `id` (string)

Default: `undefined`

Initializes one of each component with the specified `data-*` attribute value (e.g., its component id). If a component isn't found, nothing happens.

##### `useFocusRing` (boolean)

Default: `false`

Enables the focus ring utility. [Learn more](#createfocusring).

### `stop`

This method tears down events for one or more components on the page. If the component has an overlay of any kind, such as a dropdown or modal, the overlay is closed before the teardown.

```js
Undernet.stop(id, disableFocusRing)
```

#### Parameters

##### `id` (string)

Default: `undefined`

Runs a teardown of one of each component with the specified `data-*` attribute value (e.g., its component id). If a component isn't found, nothing happens.

##### `disableFocusRing` (boolean)

Default: `false`

Disables the focus ring utility and removes the `using-keyboard` class from the page.

---

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

---

## Handling Single Components

By default, using `start` or `stop` will cause Undernet to search the entire `document` for components. When using a UI framework such as React, however, that isn't desirable. Instead, you can start/stop a single component instance by passing the unique component id to the API call (e.g., `data-collapsible='some-unique-id'` would be initialized by `start('some-unique-id)`).

Here's an example of how that looks in practice with React hooks:

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

When the component mounts, `useEffect` triggers `start` on the collapsible returned in JSX. Then, the `stop` call is made in the effect's return value, or when the component is about to be unmounted.

### Handling DOM State

If you're removing/adding nodes from/to the DOM, you'll need to be careful. Undernet isn't smart enough to know that your DOM changed. Luckily most UI frameworks provide render-tied lifecycle hooks, so we can piggy back off of those!

Let's extend the sidebar example from before, but this time we'll toggle its visibility using a button:

```js
const COLLAPSIBLE_ID = "sidebar-collapsible"

export default function Sidebar(props) {
  // 1
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true)

  // 2
  useEffect(() => {
    return () => Collapsibles.stop(COLLAPSIBLE_ID)
  }, [])

  // 4
  useEffect(() => {
    if (sidebarIsVisible) Collapsibles.start(COLLAPSIBLE_ID)
  }, [sidebarIsVisible])

  // 3
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

Using the comments above, here are the steps that occur:

1. We create a state variable and state setter to indicate when the sidebar collapsible is visible. **The sidebar is visible by default.**

2. When the component mounts, we simply return the `stop` call, as we'll be handling `start` elsewhere. In this case, `stop` will be called when the component is unmounted. Calling `stop` even if the component isn't visible is perfectly safe.

3. Every time the toggle button is clicked, we check if the sidebar is visible. If it is, we call `stop` on the collapsible to clean up events in preparation for removing the component HTML from the page. Then, we set `sidebarIsVisible` to its opposite boolean value.

4. Finally, a `useEffect` block runs because `sidebarIsVisible` was updated. If the new value is `true`, or the sidebar was newly made visible on the page, we run `start` to make the collapsible work again. Otherwise nothing happens.

---

## Utilities

Undernet comes with two utilities out of the box: `createFocusRing` and `createFocusTrap`. They can be initialized with `start` and `stop` methods as well. The signature of these utilities are different, however.

### createFocusRing

Create global event listeners on the page for keyboard and mouse behavior.

This function takes no arguments.

```js
import { createFocusRing } from "undernet"
const focusRing = createFocusRing()
focusRing.start()
```

If `tab`, `space`, `enter`, or arrow keys are being used, you're in "keyboard mode," enabling a bright focus ring around the actively focused element.

As soon as a mouse is in use again, the ring goes away.

If you use the utility, whether through this utility or `Undernet.start`, only initialize it **once** on a page. Enabling it multiple times will create inconsistent behavior.

### createFocusTrap

Create a focus trap within an container, optionally with custom behavior.

This utility is offered in case you need the functionality outside of the components provided in Undernet.

The function takes two arguments.

```js
import { createFocusTrap } from "undernet"
const focusTrap = createFocusTrap(selector, options)
focusTrap.start()
```

#### `selector` (string)

**Required**

A string to be queried in the DOM; it will be treated as the container of possible focusable elements. If this is the only parameter given, `tab` and `shift+tab` will be the key-bindings used for trapping.

```js
const focusTrap = createFocusTrap(".some-wrapper-element")
```

#### `options` (object)

Default: `{}`

Customize trapping behavior using the below options.

##### `options.useArrows` (boolean)

Default: `false`

Trap focus using up and down arrows.

```js
const focusTrap = createFocusTrap(".some-wrapper-element", { useArrows: true })
```

##### `options.children` (array)

Default: `[]`

Provide a custom array of elements to trap focus within. This overrides the element querying functionality of the utility.

```js
const children = document.querySelectorAll(".focusable-element-class")
const focusTrap = createFocusTrap(".wrapper-element", { children })
```

NOTE: You should still pass a selector string for the wrapper as a fallback, in case `children` comes back empty. The main benefit being the selector will bail gracefully if there are still no children to trap focus on.

##### `options.matchers` (array)

Default: `["a", "button", "input", "object", "select", "textarea", "[tabindex]"]`

Override the default matchers for focusable elements. Elements with `is-visually-hidden` are _always_ excluded from the resulting focusable elements.

```js
const focusTrap = createFocusTrap(".wrapper-element", {
  matchers: ["button", "input", ".elements-with-this-class"],
})
```

{% include partials/edit-on-github.html %}
