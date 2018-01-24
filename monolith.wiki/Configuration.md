You’ll rarely ever need to edit Monolith components directly, but if you want to, you can do so in `components/`. For this article, we’ll look at `_config.scss`, which is where all core styling is set up for Monolith. This is merely a starting point; it's expected that you'll add extra configuration, such as variables and maps, to better suit your needs.

## Table of Contents
Monolith has five core sections, all of which can be included/excluded, in any combination, from your project(s):

1. [Global](#1-global)
2. [Grid](#2-grid)
3. [Typography](#3-typography)
4. [Buttons](#4-buttons)
5. [Forms](#5-forms)

### 1. Global

Global settings for Monolith are pretty self-explanatory. The only thing worth pointing out is if you change any of these values or variable names, be sure to double check that they are still being used appropriately in the rest of your configuration.

In most cases, the other components also inherit from global variables. You can quickly override this however by simply re-assigning to new variables you define in this file. It's ultimately up to you on the degree of consistency you need.

**Options**

* Scope: A parent class you can define which will completely* scope all of monolith's components within
* Spacing: Define a global spacing variable.
* Font: Choose your font families for sans serif and serif fonts, 
* Color Palette: A set of colors for branding.
* Borders: Defines radius, width, and styling of your borders. 

*With the exception of global styles, which you can comment out of component imports (`monolith.scss`).

### 2. Grid

Monolith comes with a handy flex grid for layouts. It’s nothing fancy – and you can exclude it from your project if you already use one. Otherwise, you have a very wide set of options for naming your grid classes, creating grid widths, grid sections (containers with vertical padding), as well as breakpoints and column spacing.

**Options**

* Class Names: Change the names of your grid classes. Don't like `grid`? Use `container` or something else instead.
* Widths: Horizontal spacing modifiers for `.grid`.
* Sections: Vertical spacing modifiers for `.grid`.
* Breakpoints: Used for media queries _and_ the grid classes for monolith.
* Gutters: Define your global gutters for the grid.
* Offset: Switch `$column-offset-classes` to true to include offsets.
* Order: Switch `$column-order-classes` to true to include flex ordering modifiers. 

_Note: You'll need to define an order threshold to ensure there is a default order property placed on all column elements. I.e., for `20`, you will end up with all columns having their order set to `20`, but using an order class will override this._

### 3. Typography

Typography can be tough to get right on the web. Here, you’ll have the flexibility to customize the key properties (margin, font-size, etc) on a per-breakpoint scale, as well as give unique stylings to each heading (h1-h6).

**Options**

* Headers: Styles for `h1`-`h6`, as well as `p`.
* Inline Type: Includes modifiers for `mark`, `pre`, `code`, `em`, and the like.
* Lists: Choose how to space your `ul` and `li` elements.

### 4. Buttons

There is a lot of flexibility in how you want to configure your buttons. Monolith encourages you to take control of the styles that matter first, and simply add on extras later as a separate stylesheet if you need to. Options here will allow you to change any of the `default`, `:active`, `:hover`, and `:focus` states to your hearts content. Be sure to include those later if you need to add extra styles!

**Options**

* Defaults: Define the core default button style.
* Sizes: There are a four extra sizes to add to or remove from in `$button-sizes`.
* Types: Create a complete button style, including active/hover/focus states, by creating more definitions in `$button-types`.
* Links: Passively included in the button section are styles for anchor links.

### 5. Forms

You can (almost 100%) guarantee your forms will look on any platform/device!

**Tags**

* Form
* Fieldset
* Legend
* Inputs: button, text, radio, checkbox
* Textarea

**Other options**

* Rows & Columns: Define column/radio row and column spacing properties. Wrap inputs with these to create cross-browser compatible flex rows and columns.

Next: [Grid ►](grid)