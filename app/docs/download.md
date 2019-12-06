There's three ways to grab Undernet for your project: CDN, NPM, or the raw source code.

See related documentation to learn the coding patterns and API in the framework's [CSS](/docs/overview/cs) and [JavaScript](/docs/overview/javascript).

## CDN (easiest)

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [jsdelivr](https://jsdelivr.com). Note that this route doesn't allow you to customize the CSS like the other options.

Include the link tag before your custom CSS, and the script tag at the end of your `<body>` content.

```html
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/undernet@6.0.0/dist/undernet.min.css"
      integrity="sha256-CCXHgVlt68r/j/PKF3UN+LRGsKMI1Xlsvi2O2zjRupA="
      crossorigin="anonymous"
    />
    <!-- add app styling here -->
  </head>
  <body>
    <!-- add app content here -->
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/undernet@6.0.0/dist/undernet.bundle.min.js"
      integrity="sha256-/7qzKFwnWrXFElITB8gG0RLFvunoxxi0wDfyLfDTpgo="
      crossorigin="anonymous"
    ></script>
    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", Undernet.start)
    </script>
  </body>
</html>
```

## NPM or Yarn

You can also install and setup with npm or yarn.

### JavaScript

```sh
$ npm install -D undernet
```

```sh
$ yarn add -D undernet
```

Note that Undernet uses global DOM variables such as `window`, `document`, and `navigator`, which can break server-side rendering. To avoid conflicts, component scripts internally check for these variables before execution. This should not affect SEO in any meaningful way as content isn't generated dynamically.

### Sass

With NPM, you need to set up two files which import Undernet's Sass partials. In these examples, the Webpack shorthand `~` is used to access `node_modules`, but any tool will do.

The first file is your config, which will have Sass utilities including variables, functions, and mixins. This can be imported wherever you want, as many times as you need, to get access to those utilities.

In your app, create a file called `_custom-config.scss` like so:

```scss
@import "~undernet/src/scss/utilities/functions";
// Add config overrides here!
@import "~undernet/src/scss/config";
@import "~undernet/src/scss/utilities/mixins";
```

Note the comment; you can insert or import your variable overrides before the original `config`.

The next file includes the base framework, including all elements, components, and class utilities you might need. **Only import this file once per page/global stylesheet**, otherwise you'll duplicate the selectors for each redundant import. Your app's Sass entry file is a good place to import it.

Create a file called `_custom-undernet.scss` like so:

```scss
@import "path/to/custom-config";
// .#{$style-scope} {
@import "~undernet/src/scss/utilities/reset";
@import "~undernet/src/scss/layout/grid";
@import "~undernet/src/scss/elements/typography";
@import "~undernet/src/scss/elements/button";
@import "~undernet/src/scss/elements/form";
@import "~undernet/src/scss/components/dropdown";
@import "~undernet/src/scss/components/modal";
@import "~undernet/src/scss/components/accordion";
@import "~undernet/src/scss/components/tooltip";
@import "~undernet/src/scss/utilities/classes";
// }
@import "~undernet/src/scss/utilities/globals";
```

Finally, import `custom-undernet.scss` to your app's Sass entry file, wherever that might be:

```css
@import "path/to/custom-undernet";
// all your other styles after
```

... or link to the compiled CSS in your layout.

```html
<link rel="stylesheet" ref="path/to/custom-undernet.css" />
```

## Source Files

Lastly, if you want to host the source files or minified versions diretly, you can do that too:

### Minified & Compiled

Use these assets if you need static instances of the CDN bundled files.

- CSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.css.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.js.zip)

### Uncompiled & Unminified

Going this route allows for far more customization. Use this option if you intend to remove or customize your build by removing components and features you don't need.

- SCSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.scss.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.modules.js.zip)

Note that if you plan to start Undernet's JS inline via `<script>` tag, it's recommended to add an event listener for `DOMContentLoaded` to ensure the page is ready.

```html
<script>
  if (document) document.addEventListener("DOMContentLoaded", Undernet.start)
</script>
```

Similarly, if you are in a UI framework such as React, the appropriate lifecycle method would be `componentDidMount`. If you take this route, be sure to tear down the events in the corresponding `componentWillUnmount`.

```js
componentDidMount() {
  Undernet.start()
}
componentWillUnmount() {
  Undernet.stop()
}
```

In the case of React hooks, you can use `useState`:

```js
const observedState = []
const componentUnmountFn = Undernet.stop
const componentMountFn = () => {
  Undernet.start()
  return componentUnmountFn
}
useEffect(componentMountFn, observedState)
```

If you're using a framework to affect DOM state (including removing nodes from the DOM), you might want to be careful. Undernet isn't smart enough to know that your DOM changed, so you should "stop" right before changing state, and "start" once the DOM is rendered and ready again.

Let's look at a real world example, again using React hooks:

```js
const [showSidebar, setShowSidebar] = useState(true)
handleClick(e) {
  e.preventDefault()
  // stop accordions if sidebar is visible, right before we close it!
  if (showSidebar) {
    Accordion.stop(".sidebar-wrapper")
  }
  setShowSidebar(false)
}
useEffect(() => {
  // if sidebar has become visible, start accordions again
  if (showSidebar) {
    Accordion.start(".sidebar-wrapper")
  }
}, [showSidebar])
```

In this example, we have a `handleClick` function that is connected to a button to hide a sidebar containing an accordion.

We want to "stop" accordions from the DOM by checking if `showsidebar` is currently `true`, before `setShowSidebar` is called.

Then, to "start" accordions again, an effect is implemented re-checking `showSidebar`; if it's `true`, we know the sidebar has been re-expanded, so we can start them again. 

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/download.md">Edit this page on Github!</a></p>
