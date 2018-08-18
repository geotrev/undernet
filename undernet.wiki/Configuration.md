`_config.scss` is where you'll spend the majority of your time styling Undernet. If you must, you can also delve into `elements/` and `components/` and amend custom styles if you need to. Simply make overrides at the bottom of the file, or duplicate and `@import` into `undernet.scss`

Note that you shouldn't delete or change the names of the variables in these files as that will cause errors when compiling into CSS.

## Table of Contents

Undernet adds styling to five core element groups:

1.  [Global](#1-global)
2.  [Grid](#2-grid)
3.  [Typography](#3-typography)
4.  [Buttons](#4-buttons)
5.  [Forms](#5-forms)

In addition, JavaScript-powered interactive components have sections as well, and follow a similar pattern to the below group settings.

### 1. Global

From here you can define a global scope class which, when defined, acts as a flag for you to start using Undernet elements or components inside it.

Say you define `$scope` as `undernet`. This means this will not work on its own:

```html
<div class="narrow grid"> ... </div>
```

Instead, you need to have a parent class somewhere with `undernet`:

```html
<div class="undernet">
  <div class="narrow grid"> ... </div>
</div>
```

This is helpful for encapsulating Undernet when adding it to existing projects.

Also here, you can find other global definitions for typography, spacing, z-index legend, and colors. These are used everywhere in the framework so make sure not to delete them, or in the case of maps, delete the entire collection.

### 2. Grid

Control various aspects of Undernet's flex grid, including breakpoints, grid widths, grid sections (vertical blocks of content), offset + flex order class utilities (both optional).

### 3. Typography

Options for common text tags. For `$text-header-styles` and `$text-header-sizes`, you can input your own css properties in sass-style `key: value` format and they will automatically be added. Since the web design is 90% typography, special care was paid to ensuring text options are as flexible as possible.

### 4. Buttons

Customize your buttons here, including default buttons, `$button-sizes`, `$button-types`, and links.

### 5. Forms

Settings for consistent, cross-browser form elements. Elements include fieldset, legend, input (text, radio, and checkbox), and textarea, among others.

Next: [Grid ►](grid)
