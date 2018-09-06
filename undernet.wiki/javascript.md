# JavaScript

The default export from Undernet, or the compiled undernet.js file, is the `Undernet` object. Refer to it when using the library for your components.

## Script Tags

Add the compiled assets right to your layout, then in a separate script, initiate your component(s):

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

## React

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
