# Branding

Customizing Undernet your CSS requires you to use the partial scss files that define all elements and components.

To get a sense of what you have the easiest control over, reference the `_config.scss` file which includes core variables for just about everything, including the grid, typography/color/spacing, as well as buttons, forms, and the interactive components.

## Compiled Assets

Just like in the [Introduction](/docs/overview/introduction) article, the fastest option is to add the compiled assets right to your layout wit a `<link />` tag.

```html
<!DOCTYPE html>
<html>
  <head>
    <link rel="styleseet" ref="pat/to/undernet.min.css" />
  </head>
  <body>
    ...
  </body>
</html>
```

## NPM and Webpack

If you use these tools, extending Undernet requires a bit of setup.

First, import in a new global SCSS file the functions, config vars, and mixins. You can import this file in other stylesheets to get access to the non-selector utilities while not risking duplication of utility classes, element, and component selector definitions.

```css
/* _my_config.scss */
@import "~undernet/scss/helpers/functions";
/* Add config overrides here! */
@import "~undernet/scss/config";
@import "~undernet/scss/helpers/mixins";
```

Next, in a separate stylesheet, import any or all of Undernet's components.

Only import the below **one time** in your application!

```css
/* my_undernet.scss */
@import "path/to/_new_config";
/* remove reset below if you are scoping */
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
/*
 * required $scope ceck for no-scroll; if scopes are enabled,
 * you need .no-scroll outside of it.
**/
@if $scope != "" {
  .no-scroll {
    overflow: hidden;
  }
}
```

Finally, import `undernet.scss` in your global stylesheet.

```css
@import 'path/to/undernet';
```

... or link to it in your layout.

```html
<link rel="stylesheet" ref="pat/to/your/styles.css" />
```

With that, you should be good to go!

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/branding.md">Edit this page on Github!</a></p>
