Undernet's CSS is the backbone of the framework. It's written in a module format and precompiled using Sass.

The framework adopts a few conventions which help provide a predictable workflow. 

- All direction-based properties are named based on their text flow, rather than physical left vs. right, or top vs. bottom, vernacular. [You can read more about logical properties here.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- All classes and Sass utilities adopt specific naming patterns to make them more predictable and easier to learn, so you can work faster.

## Configuration

Configure all Sass using `_config.scss`, included in the source code. You can customize three categories of framework styling:

1. **Globals** - Fonts, sizing, colors, and the like; the smallest scale that applies to most all other parts of the framework.
2. **Elements** - Styles tags such as buttons, inputs, and headers; limited only to single HTML elements.
3. **Components** - Composed HTML for UI patterns, some of which are interactive with JavaScript.

## Naming Patterns

Variables, functions, mixins, and classes each follow patterns to provide better understanding of the utility's intention.

### Variables

All Sass variables are constructed with the pattern of `grouping-noun-property-value-state`. `grouping` is the only piece consistent in every variable, all others use some combination of the rest, but always in the correct order.

Here's a few examples:

- `$grid-padding`: Grouping = `grid`; Property = `padding`
- `$type-p-margin-bottom`:  Grouping = `type`; Noun = `p`; Property = `margin-bottom`
- `$button-base-states`: Grouping = `button`; Noun = `base-styles`
- `$link-text-decoration-hover`: Grouping = `link`; Property = `text-decoration`; State = `hover`
- `$modal-dialog-margin-narrow`: Grouping = `modal`; Noun = `container`; Property = `margin`; State = `narrow`

See the variables available in `_config.scss`.

### Functions

There are only a handful of functions. Each is written as `noun-value`. A function name always describes the thing it returns. E.g., `spacing-value` takes a size, such as `xs` or `lg`, and returns the value (from `$global-spacing-increments`). 

See the functions available in `utilities/_functions.scss`.

### Mixins

Mixins adapt naming conventions as well. All mixins use the prefix `create-`. What is described after is some combination of elements, nouns, properties, or other object(s). E.g., `create-grid-column-classes`, `create-header-sizes`, etc. 

See the mixins available in `utilities/_mixins.scss`.

### Classes

Classes are a bit more unique compared to variables or other Sass utilities. Classes take one of two forms, a **Root** or a **Modifier**. Within that scope, they are named using a pattern similar to that of Sass variables.

See the classes available in `utilities/_classes.scss`.

#### Roots

A root class is one that describes what it _is_. For example, `dropdown-menu`, or `modal-dialog`. Nothing particularly special here.

#### Modifiers

Modifiers are a bit more complex. Their primary role is to _modify_ an element's existing styles in some way. Sometimes modifiers are only able to be used in the context of another root, and sometimes they can be used more generally like utilities.

A modifier class will have a structure like so: `verb-breakpoint-property-value-size`. All modifiers have a verb prefix, but not all modifiers have the other pieces, but the order is always consistent.

Here's a few examples:

- `is-lg`: modifies a `button` to make it `lg` in size.
- `is-xl-8`: modifies a `column` to make it 8 columns across at the `xl` breakpoint.
- `has-font-size-sm`: modifies the element to have a `sm` font-size.
- `has-padding-block-start-md`: modifies the element to have `md` spacing from the `block-start` position.
- `is-drop-inline-end`: modifies a `dropdown-menu` to "drop" from the `inline-end` position.

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

Now, let's say the scope is set to `my-scope`:

```css
/* in _config.scss */
$style-scope: "my-scope";
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
<p>This is some other random text!</p>
```

Now any elements within the `my-scope` wrapper will use Undernet's styling, and the other elements will not.

By default, the `$style-scope` variable is set to an empty string, disabling it. It can be changed in `_config.scss`.

## Setup & Installation

Customizing Undernet's CSS requires using the partial scss files that contain all of the framework's variables, mixins, and other helpers.

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

Then link to the output file in your stylesheet.

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

```scss
// custom-undernet-config.scss
@import "~undernet/src/scss/utilities/functions";
// Add config overrides here!
@import "~undernet/src/scss/config";
@import "~undernet/src/scss/utilities/mixins";
```

Next, in a separate stylesheet, import Undernet's other stylesheets. Order is important here: make sure the new config comes before your reset. Everything else should import after the reset file.

_NOTE: Only import the below **one time** in your application!_

_NOTE #2: The below imports have a `~` preceeding the import path; this is a Webpack feature. If you're not using webpack, you will need to use another package like css-import or import straight from the `node_modules` directory in your project._

```scss
// custom-undernet.scss
@import "utilities/functions";
@import "config";
@import "utilities/mixins";
// Enable a scope in _config.scss
// Read more here: https://www.undernet.io/docs/overview/css
//
// .#{$style-scope} {
//
// Reset within scope is optional
@import "utilities/reset";
@import "layout/grid";
@import "elements/typography";
@import "elements/button";
@import "elements/form";
@import "components/dropdown";
@import "components/modal";
@import "components/accordion";
@import "components/tooltip";
@import "utilities/classes";
// }
@import "utilities/scope-overrides";
```

Finally, import `custom-undernet.scss` in your global Sass stylesheet. Again, only once.

```css
@import "path/to/custom-undernet";
```

... or link to the _compiled_ CSS in your layout.

```html
<link rel="stylesheet" ref="path/to/custom-undernet.css" />
```

With that, you should be good to go!

---

<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/css.md">Edit this page on Github!</a></p>
