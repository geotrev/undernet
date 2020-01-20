---
title: JavaScript
description: API and patterns for using Undernet's JavaScript interactive components and utilities.
permalink: /overview/:basename
---

# {{ page.title }}

The JS API for Undernet is fairly straightforward. The main rule of thumb is to only use the JS when you know the DOM is ready.

Enabling Undernet, including all its component scripts, is as easy as this:

```html
<body>
  <!-- add page content here -->

  <script src="path/to/undernet.min.js"></script>
  <script>
    // Undernet is now attached to the `window`
    if (document)
      document.addEventListener("DOMContentLoaded", function() {
        Undernet.start()
      })
  </script>
</body>
```

## Core API

You can enable and disable all components on the global `Undernet` object using the `start` and `stop` methods.

### start

```js
Undernet.start(scopeString, useFocusRing)
```

#### `scopeString` (string)

Default: `undefined`

Limits Undernet's initialization to a specific DOM with selector string `scopeString`. E.g., `#my-element-id`. Scroll down to learn more.

#### `useFocusRing` (boolean)

Default: `false`

Enables a utility which adds a distinct focus ring on elements focused while using a keyboard. Scroll down to learn more.

### stop

```js
Undernet.stop(scopeString, useFocusRing)
```

#### `scopeString` (string)

Default: `undefined`

Runs a teardown of components previously initialized via `start(scopeString)`.

#### `useFocusRing` (boolean)

Default: `false`

Disables the focus ring utility.

## Individual Components

You can use the same API above to enable or disable individual components, as well. The main difference is there isn't a second `useFocusRing` parameter.

### start

```js
Undernet.Modals.start()
Undernet.Accordions.start("#wrapper-element")

// or, if you're using named imports via npm:
Modals.start()
Accordions.start("#wrapper-element")
```

### stop

```js
Undernet.Modals.stop()
Undernet.Accordions.stop("#wrapper-element")

// or, if you're using named imports via npm:
Modals.stop()
Accordions.stop("#wrapper-element")
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

## Scope

By default, the `start` and `stop` methods will search the entire DOM to enable/disable components. This is undesirable in frameworks like React, which are fragment-based. To work around this issue, you can pass a selector string which will keep track of Undernet only within the scope specified.

As a practical but simple example, `start` Undernet or a single component when the React component is mounted, and then `stop` if the React component will be unmounted. Use the ID selector (or class, attribute, etc) of the outermost element for the scope:

```js
export default function Sidebar(props) {
  useEffect(() => {
    Collapsibles.start("#sidebar-wrapper")
    return () => Collapsibles.stop("#sidebar-wrapper")
  }, [])

  return <div id="sidebar-wrapper"> ... </div>
}
```

Now all Collapsibles used are scoped to the `#sidebar-wrapper` element!

NOTE: Be careful about using Undernet this way if you have child components; calling Undernet in a child will duplicate events and cause bugs.

### Handling DOM State

If you're removing/adding nodes from/to the DOM, you'll need to be careful. Undernet isn't smart enough to know that your DOM changed. Luckily most UI frameworks provide lifecycle functionality that tells us the DOM is rendered or about to re-render, so we can piggy-back off that!

Let's extend the sidebar example from before, but this time we'll toggle its visibility using a button:

```js
export default function Sidebar(props) {
  // We'll use a state dependency to determine when to `start` Collapsibles
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true)

  // No need to `start` here, but we do want to `stop` on unmount still
  useEffect(() => {
    return () => Collapsibles.stop("#sidebar-wrapper")
  }, [])

  // Whenever sidebarIsVisible changes, we'll check its value:
  // If it's not visible, do nothing
  // Else, it's visible, so start collapsibles in the sidebar scope
  useEffect(() => {
    if (sidebarIsVisible) Collapsibles.start("#sidebar-wrapper")
  }, [sidebarIsVisible])

  // If the sidebar is visible on click, stop collapsibles before the sidebar is removed from the DOM
  const handleClick = e => {
    if (sidebarIsVisible) Collapsibles.stop("#sidebar-wrapper")
    setSidebarIsVisible(!sidebarIsVisible)
  }

  return (
    <>
      <button onClick={handleClick}>Toggle Sidebar</button>
      {sidebarIsVisible && <div id="sidebar-wrapper"> ... </div>}
    </>
  )
}
```

In this component, we have a button that when clicked will toggle visibility of the sidebar, which has some collapsible instances inside it.

`Collapsibles.start` is now dependent on `sidebarIsVisible`, and will call on initial render (and subsequent re-renders) if the state is `true`.

When the button is clicked, we want to stop collapsibles if `sidebarIsVisible` is currently `true`, but before state is flipped in the setter.

The cycle continues for each time the button is clicked.

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
const focusTrap = createFocusTrap()
focusTrap.start(selector, options)
```

#### `selector` (string)

**Required**

A string to be queried in the DOM; it will be treated as the container of possible focusable elements. If this is the only parameter given, `tab` and `shift+tab` will be the key-bindings used for trapping.

```js
focusTrap.start(".wrapper-element")
```

#### `options` (object)

Default: `{}`

Customize trapping behavior using the below options.

##### `options.useArrows` (boolean)

Default: `false`

Trap focus using up and down arrows.

```js
focusRing.start(".wrapper-element", { useArrows: true })
```

##### `options.children` (array)

Default: `[]`

Provide a custom array of elements to trap focus within. This overrides the element querying functionality of the utility.

```js
const children = document.querySelectorAll(".my-focusable-element")
focusTrap.start(".wrapper-element", { children })
```

NOTE: You should still pass a selector string for the wrapper as a fallback, in case `children` comes back empty and you aren't using a guard for that case explicitly.

##### `options.matchers` (array)

Default: `["a", "button", "input", "object", "select", "textarea", "[tabindex]"]`

Override the default matchers for focusable elements. Elements with `is-visually-hidden` are _always_ excluded from the resulting focusable elements.

```js
focusRing.start(".wrapper-element", { matchers: ["button", "input", ".elements-with-this-class"] })
```

{% include partials/edit-on-github.html %}
