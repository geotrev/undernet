`_config.scss` is where you'll spend the majority of your time styling Undernet. If you must, you can also delve into `elements/` and amend custom styles if you need to.

Note that you shouldn't delete or change the names of the variables in these files as that will cause errors when compiling into CSS.

## Table of Contents

Undernet adds styling to five core element groups:

1.  [Global](#1-global)
2.  [Grid](#2-grid)
3.  [Typography](#3-typography)
4.  [Buttons](#4-buttons)
5.  [Forms](#5-forms)

### 1. Global

From here you can define a global scope class which, when defined and enabled, acts as a flag\* for you to start using Undernet elements or components inside it.

Say you define `$scope` as `mono`. This means this will not work on its own:

```html
<div class="narrow grid"> ... </div>
```

Instead, you need to have a parent class somewhere with `.mono`:

```html
<div class="mono">
  <div class="narrow grid"> ... </div>
</div>
```

This is helpful for encapsulating Undernet when adding it to existing projects.

Also here, you can find other global definitions for typography, spacing, and colors. These are used everywhere in the framework so make sure not to delete them, or in the case of maps, delete the entire collection.

### 2. Grid

Undernet comes with a handy flex grid for layouts. It’s nothing fancy – and you can exclude the correlating folder in `elements/` if you already use one. Otherwise, you have a very wide set of options for naming your grid classes, creating grid widths, grid sections (containers with vertical padding), as well as breakpoints and column spacing.

**Options**

* `$grid-classes`: Change the names of your grid classes. `grid`, `row`, and `column` are the defaults.
* `$grid-widths`: Horizontal spacing modifiers for `.grid`.
* `$grid-sections`: Vertical spacing modifiers for `.grid`.
* `$breakpoints`: Used for media queries _and_ the grid classes for undernet. Note if you remove one, make sure it isn't mentioned in other configurations with `map-get`!
* Spacing & Gutters: Configure gutters and other spacing for column containers.
* `$column-offset-classes`: Switch to `false` to exclude conventional offset modifiers. `true` by default.
* `$column-order-classes`: Switch to `false` to exclude flex order modifiers. `true` by default.

_Note: You'll need to define an order threshold to ensure there is a default order property placed on all column elements (the default is `20`). I.e., for `15`, you will end up with all columns having their order set to `15`, but using an order class will override this. This enables you to have some siblings with order classes but not others, preventing strange browser side effects._

### 3. Typography

Typography gives you the flexibility to customize the key properties (margin, font-size, etc) on a per-breakpoint scale, as well as give unique stylings to each heading, paragraph, and several inline tags.

**Options**

* `$type-header-styles` (map): Styles for `h1`-`h6`.
* `$type-header-sizes` (map): Defines breakpoint behavior for header font-size and margin.
* Inline Type: Includes modifiers for `mark`, `pre`, `code`, `em`, and other inline text tags.
* Lists: Choose how to space your `ul` and `li` elements.

### 4. Buttons

There is a lot of flexibility in how you can configure your buttons. Undernet encourages you to take control of the styles that matter first, and simply add on extras later as a separate stylesheet if you need to. Options here will allow you to change any of the default, `:active`, `:hover`, or `:focus` states to your hearts content. If you override these configurations in a new stylesheet, be sure to account for the various states.

**Options**

* Defaults: Define the core default button style.
* `$button-sizes` (map): Custom button sizes.
* `$button-types` (map): Defines custom button stylings. Defaults are `primary`, `secondary`, `tertiary`, `inverted`, `inverted-outline`, and four status styles.
* `<a>`: Styles for anchor links.

### 5. Forms

Included elements are `<form>`, `<fieldset>`, `<legend>`, inputs types including `text`, `radio` and `checkbox`, and `<textarea>`.

**Options**

* Rows & Columns: Define column/radio row and column spacing properties. Wrap inputs with these to create cross-browser compatible flex rows and columns.

Next: [Grid ►](grid)
