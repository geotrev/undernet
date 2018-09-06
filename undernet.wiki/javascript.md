# JavaScript

Using Undernet's JS requires learning its API. Luckily it's very simple:

1. You can `start` and `stop` every component in a simple call, such as `Undernet.start()`.
2. You can be even more precise by only calling `start` and `stop` on a single component, such as `Undernet.Modals.start()`.

## Using Script Tags

Just like in the [Introduction](/docs/overview/introduction) article, the fastest option is to add the compiled assets right to your layout. Then in a separate script tag, initiate your component(s):

```html
<!DOCTYPE html>
<html>
  <head>
    ...
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/undernet.js" async></script>
    <script type="text/javascript" async>
      // Undernet is attached to the `window` object now.
      document.addEventListener('DOMContentLoaded', Undernet.start())
    </script>
  </body>
</html>
```

## Using React

Undernet works great with React. All you need to do after importing from the npm module is call start/stop to update as the DOM changes:

```js
export default class MyComponent extends React.Component {
  // Add event listeners
  componentDidMount() {
    Undernet.start()
  }
  // Remove any lingering event listeners.
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

## Using Webpack



## Customizing Component Imports

Note: This is really only an option if you are using the unminified, unpackaged JavaScript modules (see the [Downloads](/docs/overview/download) page to get those assets).

You may not want to include *every single* component in your project--that's totally fair! For example, let's say you don't need the Accordion component. How do you edit the JavaScript modules to exclude that import?

Here's the main Undernet.js file which imports every component. Simply comment out the related lines from the file, and they wont compile with the rest of your app:

```js
import Modal from "./components/modal"
// import Accordion from "./components/accordion"
import Utils from "./utils"
const Modals = new Modal()
// const Accordions = new Accordion()
const Utilities = new Utils()
const Undernet = {
  Modals,
  // Accordions,
  Utilities,
}
Undernet.start = () => {
  Undernet.Modals.start()
  // Undernet.Accordions.start()
}
Undernet.stop = () => {
  Undernet.Modals.stop()
  // Undernet.Accordions.stop()
}
```

And voíla! No more Accordions.
