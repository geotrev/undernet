Customizing Undernet's CSS requires using the partial scss files that contain all of the framework's variables, mixins, and other helpers.

To get a sense of what you have the easiest control over, reference the `_config.scss` file which includes core variables for all elements, utilities, and interactive components.

## Scope

Undernet has a special feature that helps you control where its styles are applied, since it targets not _only_ certain class definition, but html tags as well (such as `p` and `button`).

In the context of the framework, a scope is simply a wrapper class. When enabled, it will force all selector and tag definitions of the framework to not receive styling outside its defined scope.

For example, if a scope isn't enabled...

```html
<div class="grid">
  <button>Press me!</button>
  <p>This is some random text</p>
</div>
```

The above will be styled using Undernet's stylesheets, regardless of where it is in the document.

Now, let's say the scope is set to `my-scope`.

```css
/* in _config.scss */
$scope: "my-scope";
```

In order for the previous html snippet to work, you will need to add a `div` or some other element as a container around the Undernet classes and elements.

```html
<div class="my-scope">
  <div class="grid">
    <button>Press me!</button>
    <p>This is some random text</p>
  </div>
</div>

<button>Press me, too!</button>
<p>This is some other random text!<p>
```

Now any elements within the `my-scope` wrapper will use Undernet's styling, and the other elements will not.

By default, the `$scope` variable is set to an empty string, disabling it. It can be changed in `_config.scss`.

## SCSS

You can compile your SCSS to browser-compatible CSS using the [`node-sass` npm package](https://npmjs.org/package/node-sass), or whichever build tool your project already uses.

Try it with `node-sass`:

```sh
$ cd yourProjectFolder/
$ npm install -D node-sass
```

Now you can start compiling your css using the command line!

```sh
# assumes the folder is `css/`
$ node-sass --output-style compressed css/undernet.scss css/undernet.css
```

Then link to the css in your stylesheet.

```html
<!DOCTYPE html>
<html>
  <head>
    ...
    <link rel="stylesheet" href="css/undernet.css" />
  </head>
  <body>
    ...
  </body>
</html>
```

## NPM

If you use these tools, extending Undernet requires a bit of setup. It also assumes you have a SCSS compiler (node-sass, sass gem, etc).

First, import in a new global SCSS file: 1) functions, 2) default config, and 3) mixins.

You can import this file in other stylesheets to get access to the mixin and variable definitions while not risking duplication of selector definitions.

```css
@import "~undernet/scss/utilities/functions";
/* Add config overrides here! */
@import "~undernet/scss/config";
@import "~undernet/scss/utilities/mixins";
```

Next, in a separate stylesheet, import Undernet's other stylesheets. Order is important here: make sure the new config comes before your reset. Everything else should import after the reset file.

_NOTE: Only import the below **one time** in your application!_

_NOTE #2: The below imports have a `~` preceeding the import path; this is a Webpack feature. If you're not using webpack, you will need to use another package like css-import or import straight from the `node_modules` directory in your proejct._

```css
@import "path/to/new_config";
/* remove reset below if you are scoping */
@import "~undernet/scss/elements/reset";
/* Scope is defined in the config. Remove the scope wrapper if you aren't needing it. */
/* .#{$scope} { */
@import "~undernet/scss/utilities/classes";
@import "~undernet/scss/layout/grid";
@import "~undernet/scss/elements/typography";
@import "~undernet/scss/elements/button";
@import "~undernet/scss/elements/form";
@import "~undernet/scss/components/modal";
@import "~undernet/scss/components/accordion";
@import "~undernet/scss/components/dropdown";
@import "~undernet/scss/components/tooltips";
/* } */
/* Remove the overrides if you aren't using a scope. */
@import "~undernet/scss/utilities/scope-overrides";
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
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/branding.md">Edit this page on Github!</a></p>
