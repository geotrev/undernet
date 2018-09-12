# Branding

Customizing Undernet's SCSS requires you to use partial scss files that define all the element and component styles.

To get a sense of what you have the easiest control over, reference the `_config.scss` file which includes core variables for just about everything, including the grid, typography/color/spacing, as well as buttons, forms, and the interactive components.

## NPM and Webpack

If you use these tools, extending Undernet is fairly straight forward. First, import in a new global SCSS file the functions, config vars, and mixins. You can import this file in other stylesheets to get access to the non-selector utilities while not risking duplication of utility classes, elements, and components.

```css
@import "~undernet/scss/helpers/functions";
/* Add config overrides here! */
@import "~undernet/scss/config";
@import "~undernet/scss/helpers/mixins";
```

Next, in a separate stylesheet, import any or all of Undernet's components.

Only import the below **one time** in your application!

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

Finally, import `undernet.scss` in your global stylesheet:

```css
@import 'path/to/undernet';
```

With that, you should be good to go!

<p class="has-right-text">Is this article inaccurate? <a href="https://www.github.com/geotrev/undernet/wiki/branding">Edit this page on Github!</a></p>
