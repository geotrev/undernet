Undernet's CSS is the backbone of the framework. It's written in Sass and compiled to regular ol' CSS.

The framework adopts a few conventions which provide a predictable workflow. 

- CSS classes use a Root-Variant-Modifier syntax (RVM for short). It's similar to BEM, if that is in your toolkit.
- All direction-based properties are named based on their text flow, rather than physical left vs. right, or top vs. bottom, vernacular. [You can read more about logical properties here.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- All Sass utilities (variables, mixins, functions) adopt specific naming conventions to make them more predictable and easier to learn, so you can extend them yourself.

## Configuration

Configure all Sass using `_config.scss`, included in the source code. You can customize three categories of framework styling:

1. **Globals** - Fonts, sizing, colors, and the like; the smallest scale that applies to most all other parts of the framework.
2. **Elements** - Styles tags such as buttons, inputs, and headers; limited only to single HTML elements.
3. **Components** - Composed HTML for UI patterns, some of which are interactive with JavaScript.

## Naming Patterns

Variables, functions, mixins, and classes each follow a naming pattern to provide better understanding of the utility's intention.

### Variables

All Sass variables are constructed with the pattern of `grouping-element-property-value-state`. `grouping` is the only piece consistent in every variable, all others use some combination of the rest, but always in the correct order.

Here's a few examples:

- `$grid-padding`: Grouping = `grid`; Property = `padding`
- `$type-p-margin-bottom`:  Grouping = `type`; Element = `p`; Property = `margin-bottom`
- `$button-base-states`: Grouping = `button`; Noun = `base-styles`
- `$link-text-decoration-hover`: Grouping = `link`; Property = `text-decoration`; State = `hover`
- `$modal-dialog-margin-narrow`: Grouping = `modal`; Element = `container`; Property = `margin`; State = `narrow`

See the variables available in `_config.scss`.

### Functions

There are only a handful of functions. Each is written as `noun-value`. A function name always describes the thing it returns. E.g., `spacing-value` takes a size, such as `xs` or `lg`, and returns the value (from `$global-spacing-increments`). 

See the functions available in `utilities/_functions.scss`.

### Mixins

Mixins adapt naming conventions as well. All mixins use the prefix `create-`. What is described after is some combination of elements, nouns, properties, or other object(s). E.g., `create-grid-column-classes`, `create-header-sizes`, etc. 

See the mixins available in `utilities/_mixins.scss`.

### Classes

All classes in Undernet follow a naming pattern similar to the likes of BEM or other frameworks. All classes can be broken down as either a Root, Variant, or Modifier.

See the classes available in `utilities/_classes.scss`.

#### Roots

An example of a root class would be `button`, `dropdown-menu`, or `modal-dialog`. These classes define the main object in which styles are scoped to.

#### Variants

Variants are either scoped to a root, or act as generic utilities that any element can adopt. Their structure includes a verb prefix, followed by the noun or property being changed.

For example, the class `button` has simple variants, e.g., `is-primary` or `is-lg`. These define one change and nothing else.

Variants can also take form with respect to responsive classes. In grid columns and display utility classes, for example, the breakpoint is added immediately following the verb: `is-xl-8` or `is-md-d-none`. This is to differentiate the breakpoints from size modifiers.

#### Modifiers

In Undernet, modifiers will use a preceeding `--`. For example, `padding`, `margin`, and `font-size` modifiers all add `--xs`, `--sm`, `--md`, `--lg`, or `--xl` to describe increases or decreases in the value desired.

In the case of spacing, these modifiers will differ from the default `has-m` or `has-p` classes, which apply the `$global-spacing` variable (defaults to `16px`).

An example class would be `has-font-size--lg` or `has-p-block-start--sm`.

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

```css
/* myConfig.scss */
@import "~undernet/src/scss/utilities/functions";
/* Add config overrides here! */
@import "~undernet/src/scss/config";
@import "~undernet/src/scss/utilities/mixins";
```

Next, in a separate stylesheet, import Undernet's other stylesheets. Order is important here: make sure the new config comes before your reset. Everything else should import after the reset file.

_NOTE: Only import the below **one time** in your application!_

_NOTE #2: The below imports have a `~` preceeding the import path; this is a Webpack feature. If you're not using webpack, you will need to use another package like css-import or import straight from the `node_modules` directory in your project._

```css
@import "path/to/myConfig";
/* Scope is defined in the config. Remove the scope wrapper if you aren't needing it. */
/* .#{$style-scope} { */
/* Reset within scope is optional */
@import "~undernet/src/scss/elements/reset";
@import "~undernet/src/scss/utilities/classes";
@import "~undernet/src/scss/layout/grid";
@import "~undernet/src/scss/elements/typography";
@import "~undernet/src/scss/elements/button";
@import "~undernet/src/scss/elements/form";
@import "~undernet/src/scss/components/modal";
@import "~undernet/src/scss/components/accordion";
@import "~undernet/src/scss/components/dropdown";
@import "~undernet/src/scss/components/tooltips";
/* } */
/* Remove the overrides if you aren't using a scope. */
@import "~undernet/src/scss/utilities/scope-overrides";
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
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/css.md">Edit this page on Github!</a></p>
