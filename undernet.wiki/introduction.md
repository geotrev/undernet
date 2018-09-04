# Introduction

Thanks for using Undernet! Hit the ground running in your next project with this fully modular, highly configurable front-end framework.

Undernet is also extremely light, carrying no external dependencies apart from needing a `scss` compiler if you aren't using the vanilla `css`.

Contribute on [Github](https://www.github.com/geotrev/undernet/issues) if you have requests or a bug to report. Be sure to [read the notes](https://www.github.com/geotrev/undernet/master/CONTRIBUTING.md) on contributing a bug or pull request.

Finally, go to the [download page](/docs/overview/download) to get Undernet's assets. Happy coding!

## Easy Setup

To use Undernet's CSS and JavaScript the quickest, link them in your template directly:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I'm using Undernet!</title>
    <link rel="stylesheet" href="path/to/undernet.min.css">
    <!-- Add new styles after -->
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/undernet.bundle.min.js" async></script>
    <script type="text/javascript">
      document.addEventListener('DOMContentLoaded', Undernet.start())
    </script>
  </body>
</html>
```

## Advanced Setup

If you want to leverage the power of Undernet's `scss` variables, customizing your component includes, or simply already use `scss` to build your styles, then this option is for you.

### SCSS

If you're using npm and webpack, make a global scss file like below.

```css
@import "~undernet/scss/helpers/functions";
/* Add config overrides here! */
@import "~undernet/scss/config";
@import "~undernet/scss/helpers/mixins";
```

*NOTE: There should be no selector definitions (classes, ids, etc) in this file because it's used to keep all of your custom brand vars, mixins, and utilities. Import this file into your other stylesheets to get access to the overrides.*

If you're not using webpack, remove the `~` in the import and make it an absolute path.

Next, in a separate stylesheet, import any or all of Undernet's components:

```css
@import "path/to/new/config";

/* remove globals if you are scoping! */
@import "elements/reset";

/* .#{$scope} { */
@import "helpers/classes";
@import "elements/grid";
@import "elements/typography";
@import "elements/link";
@import "elements/button";
@import "elements/form";

@import "components/modal";
@import "components/accordion";
/* } */

/* Modals need .no-scroll to be out of $scope in order to function properly. */

@if $scope != "" {
  .no-scroll {
    overflow: hidden;
  }
}
```

Only import the above one time in your application (unlike the first bit off `scss`).

### JS

The default export from Undernet, or the compiled undernet.js file, is the `Undernet` object. Simply refer to it when using the library. See the [JavaScript API](/docs/overview/javascript) for more documentation

#### Script Tags

```js
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
      var start = Undernet.start()
      // or run a specific component
      var start = Undernet.Modals.start()
      document.addEventListener('DOMContentLoaded', start)
    </script>
  </body>
</html>
```

#### React

Undernet works great with React. All you need to do after importing from the npm module is add the following lifecycle method calls:

```js
...
export default class MyComponent extends React.Component {
  ...
  // Add event listeners
  componentDidMount() {
    Undernet.Modals.start()
  }
  // Remove any lingering event listeners.
  componentWillUnmount() {
    Undernet.Modals.stop()
  }
  // Undernet doesn't track state; restart the components
  componentDidUpdate() {
    Undernet.Modals.stop()
    Undernet.Modals.start()
  }
  ...
}
```

*NOTE: In this case, we're calling stop/start methods on a component method. Again, see the [JavaScript API](/docs/overview/javascript) for more documentation.*
