# Branding

Customizing Undernet your CSS requires you to use the partial scss files that define all elements and components.

To get a sense of what you have the easiest control over, reference the `_config.scss` file which includes core variables for just about everything, including the grid, typography/color/spacing, as well as buttons, forms, and the interactive components.

## SCSS

You can build your CSS from SCSS using the [`node-sass` npm package](https://npmjs.org/package/node-sass), or whichever build tool your project already uses. The below example uses `node-sass`.

```sh
$ cd yourProjectFolder/
$ npm install
$ node-sass --output-style compressed undernet.scss undernet.css
```

Now you can start compiling your css using the command line!

```sh
$ sass css/undernet.scss:css/undernet.css --style compressed
```

Assumes your scss files are inside a folder named `css/`.

Then link to the css in your stylesheet.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="styleseet" ref="css/undernet.css" />
  </head>
  <body>
    ...
  </body>
</html>
```

## NPM and Webpack

If you use these tools, extending Undernet requires a bit of setup. It also assumes you're using a [webpack config](https://github.com/webpack-contrib/sass-loader) that can parse scss.

First, import in a new global SCSS file the functions, config vars, and mixins.

You can import this file in other stylesheets to get access to the mixin and var definitions while not risking duplication of class selectors.

```css
@import "~undernet/scss/helpers/functions";
/* Add config overrides here! */
@import "~undernet/scss/config";
@import "~undernet/scss/helpers/mixins";
```

Next, in a separate stylesheet, import any or all of Undernet's components.

Only import the below **one time** in your application!

```css
@import "path/to/new_config";
/* remove reset below if you are scoping */
@import "~undernet/scss/elements/reset";
/* .#{$scope} { */
@import "~undernet/scss/helpers/classes";
@import "~undernet/scss/elements/grid";
@import "~undernet/scss/elements/typography";
@import "~undernet/scss/elements/link";
@import "~undernet/scss/elements/button";
@import "~undernet/scss/elements/form";
@import "~undernet/scss/components/modal";
@import "~undernet/scss/components/accordion";
/* } */
/*
 * required $scope check for no-scroll;
 * if scopes are enabled, you need .no-scroll outside of it.
**/
@if $scope != "" {
  .no-scroll {
    overflow: hidden;
  }
}
```

Finally, import `undernet.scss` in your global stylesheet.

```css
@import "path/to/undernet";
```

... or link to it in your layout. Although, webpack should handle this for it if you're using [HtmlWebpackPlugin](https://github.com/jantimon/html-webpack-plugin) or similar.

```html
<link rel="stylesheet" ref="path/to/your/styles.css" />
```

With that, you should be good to go!

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/branding.md">Edit this page on Github!</a></p>
