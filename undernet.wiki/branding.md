# Branding

If you want to leverage the power of Undernet's `scss` variables, customizing your component includes, or simply already use `scss` to build your styles, then this option is for you.

If you're using npm and webpack, make a global scss file like below.

```scss
@import "~undernet/scss/helpers/functions";
/* Add config overrides here! */
@import "~undernet/scss/config";
@import "~undernet/scss/helpers/mixins";
```

*NOTE: There should be no selector definitions (classes, ids, etc) in this file because it's used to keep all of your custom brand vars, mixins, and utilities. Import this file into your other stylesheets to get access to the overrides.*

If you're not using webpack, remove the `~` in the import and make it an absolute path.

Next, in a separate stylesheet, import any or all of Undernet's components:

```csss
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
