The API for Undernet's scripts is straightforward. The main rule of thumb is to use the scripts when you know the DOM is fully rendered.

Enabling Undernet, including all its component plugins, is as easy as this:

```html
<script src="path/to/undernet.js"></script>
<script>
  // Undernet will be attached to the `window`
  if (document) document.addEventListener("DOMContentLoaded", Undernet.start)
</script>
```

## Core API

There are a few ways to use Undernet. The most direct way is using the `start` and `stop` methods off the default `Undernet` object:

### start

```js
Undernet.start(scopeString, enableFocusRing)
```

#### `scopeString` (string)

Default: `undefined`

Limits Undernet's initialization to a specific DOM with selector string `scopeString`. E.g., `#my-element-id`.

#### `enableFocusRing` (boolean)

Default: `false`

Enables a utility which adds a distinct focus ring on elements focused while using a keyboard.

### stop

```js
Undernet.stop(scopeString, enableFocusRing)
```

#### `scopeString` (string)

Default: `undefined`

Runs a teardown of components previously initialized via `start(scopeString)`.

#### `enableFocusRing` (boolean)

Default: `false`

Disables the focus ring utility.

## Using Modules

If you use npm, the default export is the `Undernet` object. Importing this gives you everything, including all JS components and utilities.

```js
import Undernet from "undernet" 
```

You can also do a named import of just one component. Bonus: it's tree-shakable if you use tools which enable it (webpack and rollup both offer it out of the box).

```js
import { Modals, createFocusRing } from "undernet"
```

## Scope

Undernet is a global framework by default. This means it will capture the entire document when searching for its component instances. Sadly that won't mesh well when you're using UI frameworks like React, for example, where React components could be tapping into Undernet with redundancy. If you do this in the ways described in the sections above, you'll inadvertently reset Undernet's internal trackers, resulting in components being changed outside the scope of your given React component.

The solution? **Force initialization to a DOM fragment.** You can achieve this by passing a selector string to the `start` and `stop` methods of Undernet or one of its components. The selector string will be queried and Undernet will limit its search to within that element.

Let's look at some examples, using React with hooks to demonstrate how scope works.

---

As described, the DOM must be ready before Undernet can run. Run `.start` in a `useEffect` block with no dependencies (empty array) so it only runs once. Likewise, when the component(s) are about to removed from the DOM, stop Undernet by returning a function which calls `.stop`. Use the outer-most element's id as your scope string.

```js
export default function Sidebar(props) {
  useEffect(() => {
    Collapsibles.start("#sidebar-wrapper")
    return () => Collapsibles.stop("#sidebar-wrapper")
  }, [])
  return (
    <div id="sidebar-wrapper"> ... </div>
  )
}
```

Now all Collapsibles used are scoped to the markup defined in `<Sidebar />`.

NOTE: Don't initialize an Undernet scope within a child React component. This will duplicate events and cause unexpected behavior.

### Handling DOM State

If you're specifically removing nodes from the DOM or virtual DOM, you'll need to be careful. Undernet isn't smart enough to know that your DOM changed, but luckily most UI frameworks provide lifecycle methods that tell us the DOM is rendered or about to re-render, so we can piggy-back off that!

Let's extend the sidebar example from before, but this time we'll toggle its visibility using a button:

```js
export default function Sidebar(props) {
  const [sidebarIsVisible, setSidebarIsVisible] = useState(true)
  // This time, we'll remove `.start` and have this `.stop` during component unmount.
  useEffect(() => {
    return () => Collapsibles.stop("#sidebar-wrapper")
  }, [])
  // Whenever sidebarIsVisible changes, we'll check its value
  // If it's not visible, do nothing and return;
  // Else, it's visible, so start collapsibles in the sidebar scope
  useEffect(() => {
    if (sidebarIsVisible) Collapsibles.start("#sidebar-wrapper")
  }, [sidebarIsVisible])
  // If the sidebar is visible, stop collapsibles before the sidebar is removed from the DOM
  const handleClick = (e) => {
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

When the button is clicked, we want to stop collapsibles in the DOM by checking if `sidebarIsVisible` is currently `true`, before its setter is called. If they are, set visibility to `false`.

Then, when `sidebarIsVisible` is `true` again (sometime in the future), we know the sidebar DOM is ready, so we can start collapsibles again. 

## Utilities

Undernet comes with two utilities out of the box: `createFocusRing` and `createFocusTrap`. They can be initialized with `start` and `stop` methods like the rest of the component APIs. The only difference is there is no scope available.

### createFocusRing

This will create global event listeners on the page for keyboard and mouse behavior.

If tab, space, or arrow keys are being used, you're in "keyboard mode" so a bright focus ring will show when elements are focused.

As soon as a mouse is in use again, the ring goes away.

If you use the utility, whether through `Undernet.start()` or directly like in the previous examples, you should only initialize it once on a page. Enabling it multiple times will create inconsistent behavior between keyboard and mouse interactions, showing the ring when a mouse is used, and potentially hiding it for keyboard users.

### createFocusTrap

This is less of a common utility, and moreso offered to allow you the same focus trap behavior that the components use. Better to use a utility that's not implemented two times in different ways! 

It's instantiated the same way as `createFocusRing`:

```js
import { createFocusTrap } from "undernet"
const focusTrap = createFocusTrap()
focusTrap.start(selector, options)
```

Using it is slightly different than in previous APIs.

#### `selector` (string)

**Required**

A string to be queried in the DOM; it's the "container" of possible focusable elements.

```js
focusTrap.start(".my-element")
```

#### `options` (object)

Default: `{}`

Change how focus behavior works or what elements to search for.

##### `options.useArrows` (boolean)

Default: `false`

Trap focus using up and down arrows.

```js
focusRing.start(".my-element", { useArrows: true })
```

##### `options.children` (array)

Default: `undefined`

Provide an array the nodes to be used for the focus trap behavior.

```js
const children = document.querySelectorAll(".special-button")
focusTrap.start(null, { children })
```

##### `options.matchers` (array)

Default: `["a", "button", "input", "object", "select", "textarea", "[tabindex]"]`

Override the default matchers for focusable elements. You can provide a new kind of matcher, a subset of the defaults, or both:

```js
focusRing.start(".my-element", { matchers: ["button", "input", ".elements-with-this-class"] })
```

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/javascript.md">Edit this page on Github!</a></p>
