# Branding

Customizing your Undernet CSS requires using the partial scss files that define all elements and components.

To get a sense of what you have the easiest control over, reference the `_config.scss` file which includes core variables for all elements, utilities, and interactive components.

## SCSS

You can build your CSS from SCSS using the [`node-sass` npm package](https://npmjs.org/package/node-sass), or whichever build tool your project already uses.

```sh
$ cd yourProjectFolder/
$ npm install -D node-sass
```

Now you can start compiling your css using the command line!

```sh
$ node-sass --output-style compressed css/undernet.scss css/undernet.css
```

Assumes your scss files are inside a folder named `css/`.

Then link to the css in your stylesheet.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" ref="css/undernet.css" />
  </head>
  <body>
    ...
  </body>
</html>
```

## NPM

If you use these tools, extending Undernet requires a bit of setup. It also assumes you also have a SCSS compiler set up (node-sass, sass gem, etc).

First, import in a new global SCSS file: 1) functions, 2) default config, and 3) mixins.

You can import this file in other stylesheets to get access to the mixin and variable definitions while not risking duplication of class definitions.

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
/* Scope is defined in the original config, and can be overriden using your new config */
/* .#{$scope} { */
@import "~undernet/scss/helpers/classes";
@import "~undernet/scss/elements/grid";
@import "~undernet/scss/elements/typography";
@import "~undernet/scss/elements/link";
@import "~undernet/scss/elements/button";
@import "~undernet/scss/elements/form";
@import "~undernet/scss/components/modal";
@import "~undernet/scss/components/accordion";
@import "~undernet/scss/components/dropdown";
/* } */
@import "~undernet/scss/helpers/scope-overrides"
```

Finally, import `undernet.scss` in your global stylesheet.

```css
@import "path/to/undernet";
```

... or link to the _compiled_ CSS in your layout.

```html
<link rel="stylesheet" ref="path/to/undernet.css" />
```

With that, you should be good to go!

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/branding.md">Edit this page on Github!</a></p>
