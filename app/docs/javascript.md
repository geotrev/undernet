The API for Undernet's scripts is straightforward. The main rule of thumb is to use the scripts when you know the DOM (or VDOM) is fully rendered.

Enabling Undernet, including all its component plugins, is as easy as this:

```html
<script src="path/to/undernet.js"></script>
<script>
  // Undernet is now attached to the `window`
  if (document) document.addEventListener("DOMContentLoaded", Undernet.start
</script>
```

The `Undernet` object will be attached to `window`. It gives you these components:

```js
Undernet.Modals
Undernet.Collapsibles
Undernet.Accordions
Undernet.Tooltips
Undernet.Dropdowns
```

And a couple utilities:

```js
Undernet.createFocusRing
Undernet.createFocusTrap
```

There are the ways to enable or stop any given plugin, using `.start()` and `.stop()`, respectively. Like so:

```js
Undernet.Modals.start()
```

You might be wondering what the difference is between enabling all of Undernet vs. just one component? By using `Undernet.start()`, the following scripts are initialized:

```js
Undernet.Modals.start()
Undernet.Collapsibles.start()
Undernet.Accordions.start()
Undernet.Tooltips.start()
Undernet.Dropdowns.start()

const focusRing = Undernet.createFocusRing()
focusRing.start()
```

The main difference here is that you get a focus ring, in addition to the component plugins. Head down to the Utilities section on this page to learn how it works.

## Using Modules

If you use npm, the default export is the `Undernet` object, same as if you use the CDN. Importing this gives you everything, including all JS components and utilities.

```js
import Undernet from "undernet" 
```

You can also do a named import of just one component. Bonus: it's tree-shakable if you use tools which enable it (webpack and rollup both offer it out of the box).

```js
import { Modals, createFocusRing } from "undernet"
```

## Scope

Undernet is a global framework by default. This means it will capture the entire document when searching for its component instances. This won't mesh well when you're using React, for example, where React components could be tapping into Undernet with redundancy. If you do this in the ways described in the sections above, you'll inadvertently reset Undernet component instances outside the scope of your React, Vue, etc., component. Not good.

The solution? **You can limit Undernet instances to a DOM fragment with a scope option.** We'll achieve this by passing an element to the `start` and `stop` methods. Everything within that element is where Undernet will search for component instances.

Let's look at some examples, using React to demonstrate how scope works.

As described, the DOM must be ready before Undernet can run. Initialize in `componentDidMount`. Likewise, when the component is about to removed from the DOM or VDOM, stop Undernet in `componentWillUnmount`. 

Since you need the real DOM node, you can use `ref.current` and pass it to `.start()`.

```js
class Sidebar extends React.Component {
  constructor() {
    super()
    this.sidebarRef = React.createRef()
  }
  componentDidMount() {
    Collapsibles.start(this.sidebarRef.current)
  }
  componentWillUnmount() {
    Collapsibles.stop(this.sidebarRef.current)
  }
  render() {
    return <div ref={this.sidebarRef}> ... </div>
  }
}
```

Now all Collapsibles used are scoped to the markup defined in `<Sidebar />`.

One thing to note, however, is having a React, Vue, etc. component with child components that depend on the same Undernet instance. If this happens, you should pass down the exact Undernet (or Undernet component) instance and element ref as props to `start`/`stop`. 

Extending the previous example, here's how that might look:

```js
class Sidebar extends React.Component {
  ...
  // Sidebar passes down the instance and element ref
  render() {
    return (
      <div ref={this.sidebarRef}>
        <SidebarSection collapse={Collapsibles} collapseElementRef={this.sidebarRef}>
      </div>
    )
  }
}
```

Then, in the new child component called `SidebarSection`:

```js
class SidebarSection extends React.Component {
  ...
  static propTypes = {
    collapse: types.func.isRequired,
    collapseElementRef: PropTypes.shape({ current: PropTypes.element }),
  }
  componentDidUpdate() {
    collapse.stop(collapseElementRef.current)
  }
  render() {
    return (...)
  }
}
```

It's not ideal, but otherwise you may run into behavior oddities due to the duplication in events.

### Handling DOM State

If you're specifically removing nodes from the DOM or virtual DOM, you'll need to be careful. Undernet isn't smart enough to know that your DOM changed, but luckily most UI frameworks provide lifecycle methods that tell us the DOM is rendered or about to re-render.

Let's extend the sidebar example from before, but this time we'll toggle its visibility using a button:

```js
class Sidebar extends React.Component {
  constructor() {
    super()
    this.sidebarRef = React.createRef()
    this.state = { sidebarIsVisible: true }
  }
  componentDidMount() {
    Collapsibles.start(this.sidebarRef.current)
  }
  componentWillUnmount() {
    Collapsibles.stop(this.sidebarRef.current)
  }
  // whenever state updates, check if the sidebar is visible
  // if it's visible, start collapsibles in the sidebar scope
  // otherwise, do nothing
  componentDidUpdate() {
    if (this.state.sidebarIsVisible) {
      Collapsibles.start(this.sidebarRef.current)
    }
  }
  // if the sidebar is visible, stop collapsibles before the sidebar is removed from the DOM
  handleClick(e) {
    e.preventDefault()
    if (this.state.sidebarIsVisible) {
      Collapsibles.stop(this.sidebarRef.current)
    }
    this.setState({ sidebarIsVisible: !this.state.sidebarIsVisible })
  }
  render() {
    return (
      <React.Fragment>
        <button onClick={this.handleClick}>Toggle Sidebar</button>
        {this.state.sidebarIsVisible && <div ref={this.sidebarRef}> ... </div>}
      </React.Fragment>
    )
  }
}
```

In this component, we have a button that, when clicked, toggles visibility of the sidebar just beneath it, which we'll presume has collapsible instances within it.

When the button is clicked, we want to "stop" collapsibles in the DOM by checking if `sidebarIsVisible` is currently `true`, before `setState` is called.

Then, to "start" collapsibles again, we re-check `sidebarIsVisible` in `componentDidUpdate`; if it's `true`, we know the sidebar has been re-rendered, so we can start collapsibles again. 

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

#### selector (string)

**Required**

A string to be queried in the DOM; it's the "container" of possible focusable elements.

```js
focusTrap.start(".my-element")
```

#### options (object)

Default: `{}`

Change how focus behavior works or what elements to search for.

##### options.useArrows (boolean)

Default: `false`

Trap focus using up and down arrows.

```js
focusRing.start(".my-element", { useArrows: true })
```

##### options.children (array)

Default: `undefined`

Provide an array the nodes to be used for the focus trap behavior.

```js
const children = document.querySelectorAll(".special-button")
focusTrap.start(null, { children })
```

##### options.matchers (array)

Default: `["a", "button", "input", "object", "select", "textarea", "[tabindex]"]`

Override the default matchers for focusable elements. You can provide a new kind of matcher, a subset of the defaults, or both:

```js
focusRing.start(".my-element", { matchers: ["button", "input", ".elements-with-this-class"] })
```

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/javascript.md">Edit this page on Github!</a></p>
