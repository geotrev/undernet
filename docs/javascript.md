# JavaScript

Using Undernet's JS requires knowing its API. Luckily it's very simple!

1. You can `start` and `stop` all of Undernet's components in a single call. E.g., `Undernet.start()`
2. Contain initialization by only calling `start` and `stop` on a single component. E.g., `Undernet.Modals.start()`

## Compiled Assets

Just like in the [Introduction](/docs/overview/introduction) article, the fastest option is to add the compiled assets right to your layout. Then in a separate script tag, call the API.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/undernet.bundle.min.js"></script>
    <script type="text/javascript">
      // Undernet is attached to the `window` object now.
      document.addEventListener('DOMContentLoaded', Undernet.start())
    </script>
  </body>
</html>
```

## Using NPM, Webpack, & React

You can easily install the npm module and use Undernet in React. All you need to do after importing from the npm module is call start/stop to update as the DOM changes. There will likely be a package in the future that React-ifies these components for better state management. For now, this should do.

```js
import Undernet from 'undernet'
// Or locally...
var Undernet = require('path/to/undernet')
// Then, set up your component:
export default class MyComponent extends React.Component {
  // Add event listeners
  componentDidMount() {
    Undernet.start()
  }
  // Remove any lingering event listeners if the DOM changes.
  componentWillUnmount() {
    Undernet.stop()
  }
  // Undernet doesn't track state; restart the components
  componentDidUpdate() {
    Undernet.stop()
    Undernet.start()
  }
}
```

Fun fact: this is how the components are showcased in the component docs.

### Customizing Component Imports

You may not want to include *every single* component in your project. For example, let's say you only need the [Modal](/docs/components/modals) component. Simply import the component you need directly from its file at the path `js/dist/components/`.

```js
import Modal from 'undernet/js/dist/components/modal'
Modal.start()
```

*NOTE: Some components, such as Modals in the above example, rely on a helper `Utils` class. If you end up deleting unnecessary components to keep your project clean, remember to keep `utils.js`!*

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/javascript.md">Edit this page on Github!</a></p>
