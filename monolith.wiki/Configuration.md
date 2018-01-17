You’ll rarely ever need to edit Monolith components directly, but if you want to, you can do so in `components/`. For this article, we’ll look at `_config.scss`, which is where all core styling is set up for Monolith.

## Table of Contents
Monolith has five core sections, all of which can be included/excluded, in any combination, from your project(s):

1. [Global](#1-global)
2. [Grid](#2-grid)
3. [Typography](#3-typography)
4. [Buttons](#4-buttons)
5. [Forms](#5-forms)

### 1. Global

Global settings for Monolith are pretty self-explanatory. The only thing worth pointing out is if you change any of these values or variable names, be sure to double check that they are still being used appropriately in the rest of your configuration.

Note: the other four component sections inherit from global in most cases. You can quickly override this however by simply re-assigning to individual styles. It’s best to be consistent, though, so proceed in that direction with caution. ;)

Options:

```sass
$scope: '';
```
```sass
$global-space: 16px;
$global-ease: ease-out 0.2s;
```
```sass
$global-font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif !default;
$global-font-serif: Constantia, "Lucida Bright", Lucidabright, "Lucida Serif", Lucida, "DejaVu Serif", "Bitstream Vera Serif", "Liberation Serif", Georgia, serif;
$global-monospace: monospace, monospace;
$global-font-size: 16px;
```
```sass
$primary-color: goldenrod;
$secondary-color: crimson;
$tertiary-color: teal;
$black: #000111;
$gray100: #111;
$gray200: #222;
$gray400: #444;
$gray600: #666;
$gray800: #888;
$gray900: #ddd;
$white: #ffffff;
```
```sass
$status-palette: (
  warning: khaki,
  success: green,
  destroy: red,
  notice: steelblue
);
```
```sass
$global-border-radius: 4px;
$global-border-width: 2px;
$global-outline: 2px solid $primary-color;
```

### 2. Grid

Monolith comes with a handy flex grid for layouts. It’s nothing fancy – and you can exclude it from your project if you already use one. Otherwise, you have a very wide set of options for naming your grid classes, creating grid widths, grid sections (containers with vertical padding), as well as breakpoints and column spacing.

Options:

```sass
$grid-classes: (
  grid: 'grid',
  row: 'row',
  column: 'column',
);
```
```sass
$grid-widths: (
  fluid: 100%,
  narrow: 768px,
  wide: 1200px,
);
```
```sass
$grid-sections: (
  small: 48px,
  medium: 96px,
  large: 144px,
);
```
```sass
$breakpoints: (
  xsmall: 0,
  small: 576px,
  medium: 768px,
  large: 992px,
  xlarge: 1200px,
);
```
```sass
$grid-gutter: $global-space;
$grid-width: 992px;
```
```sass
$order-threshold: 20;
```
```sass
$columns: 12;
$column-padding-top: 0;
$column-padding-bottom: $global-space;
$column-gutter: $global-space / 2;
```
```sass
$column-offset-classes: true;
$column-order-classes: true;
```

### 3. Typography

Typography can be tough to get right on the web. Here, you’ll have the flexibility to customize the key properties (margin, font-size, etc) on a per-breakpoint scale, as well as give unique stylings to each heading (h1-h6). In addition, you can customize a few other text tags like `mark`, `code`, and `p`.

Options:

```sass
$type-header-sizes: (
  xsmall: (
    h1: (
      font-size: 32px,
      margin-bottom: 20px,
    ),
    // => also includes h2-h6
  ),
  // => also includes `medium` and `large` breakpoints
);
```
```sass
$type-header-styles: (
  h1: (
    color: $gray200,
    font-style: normal,
    font-weight: bold,
  ),
  // => also includes h2-h6
);
```
```sass
$type-header-line-height: 1.3;
```
```sass
$type-p-color: $gray200;
$type-p-font-size: 16px;
$type-p-font-style: normal;
$type-p-font-weight: normal;
$type-p-line-height: 1.5;
$type-p-margin-bottom: 16px;
```
```sass
$type-code-font: $global-monospace;
$type-code-font-size: 1em;
$type-code-color: $black;
$type-code-background: lighten($gray900, 5%);
$type-code-border: none;
$type-code-radius: $global-border-radius;
$type-code-padding: 0 4px;
```
```sass
$type-pre-padding: $global-space;
```
```sass
$type-strong-font-style: normal;
$type-strong-font-weight: bold;
```
```sass
$type-em-font-style: italic;
$type-em-font-weight: normal;
```
```sass
$type-small-font-size: 75%;
$type-small-font-weight: inherit;
```
```sass
$type-mark-padding: 10px;
$type-mark-color: $gray200;
$type-mark-background: status(warning);
```

### 4. Buttons

There is a lot of flexibility in how you want to configure your buttons. Monolith encourages you to take control of the styles that matter first, and simply add on extras later as a separate stylesheet if you need to. Options here will allow you to change any of the `default`, `:active`, `:hover`, and `:focus` states to your hearts content. Be sure to include those later if you need to add extra styles!

Options:

```sass
$button-sizes: (
  small: (
    padding: 8px 14px,
    font-size: 14px,
  ),
  medium: (
    padding: 12px 18px,
    font-size: 16px,
  ),
  large: (
    padding: 16px 22px,
    font-size: 20px,
  ),
  huge: (
    padding: 20px 30px,
    font-size: 24px,
  ),
);
```
```sass
// Default button
$button-padding: 10px $global-space;
$button-margin: 0 0 $global-space 0;
$button-border-radius: $global-border-radius;
$button-border-style: solid;
$button-border-width: $global-border-width;
$button-font-size: $global-font-size;
$button-font-style: normal;
$button-font-weight: normal;
$button-font: $global-font-sans;
$button-decoration: none;
$button-decoration-hover: none;
```
```sass
$button-background: $white;
$button-background-hover: $button-background;
$button-background-active: lighten($gray900, 10%);
$button-background-focus: $button-background;
```
```sass
$button-color: $gray200;
$button-color-hover: $button-color;
$button-color-active: $button-color;
$button-color-focus: $button-color;
```
```sass
$button-border-color: $gray800;
$button-border-color-hover: $gray600;
$button-border-color-active: $gray400;
$button-border-color-focus: $gray600;
```
```sass
$button-box-shadow: none;
$button-box-shadow-hover: $button-box-shadow;
$button-box-shadow-active: $button-box-shadow;
$button-box-shadow-focus: $button-box-shadow;
```
```sass
// Branded & specialized buttons
$button-types: (
  primary: (
    background: lighten($primary-color, 5%),
    background-hover: $primary-color,
    background-active: darken($primary-color, 2%),
    background-focus: $primary-color,
    color: $white,
    color-hover: $white,
    color-active: $white,
    color-focus: $white,
    border-color: transparent,
    border-color-hover: transparent,
    border-color-active: transparent,
    border-color-focus: transparent,
    box-shadow: none,
    box-shadow-hover: none,
    box-shadow-active: none,
    box-shadow-focus: none,
  ),
  // => also includes `secondary`, `tertiary`, `inverted`, `inverted-outline`,
  //    and status buttons for: `warning`, `destroy`, `success`, and `notice`
);
```
```sass
// Text links
$link-color: lighten($primary-color, 10%);
$link-decoration: none;
$link-decoration-hover: underline;
$link-font: $global-font-sans;
$link-style: normal;
$link-weight: normal;
$link-font-size: $global-font-size;
$link-hover: $primary-color;
$link-active: $link-hover;
```

### 5. Forms

Forms are difficult to get right. To make sure these work across-browser, there are a lot of duplicate styling options you won’t see below. You can (almost 100%) guarantee they look similar on any platform/device!

Options:

```sass
// Form tag
$form-margin: 0;
$form-padding: 0;
$form-background: transparent;
$form-box-shadow: none;
$form-border: none;
$form-font: $global-font-sans;
$form-radius: $global-border-radius;
```
```sass
// Input + Textarea
$input-font-size: $global-font-size;
$input-font: $form-font;
$input-box-shadow: none;
$input-border: $global-border-width solid $gray800;
$input-padding: 12px;
$input-margin: 8px 0 $global-space 0;
$input-border-radius: $form-radius;
$input-background: $white;
$input-resize: vertical;
```
```sass
// Input + Textarea states
$input-hover-background: $input-background;
$input-hover-border: $global-border-width solid $gray600;
$input-hover-box-shadow: $input-box-shadow;
$input-focus-background: $input-background;
$input-focus-border: $global-border-width solid $primary-color;
$input-focus-box-shadow: $input-box-shadow;
$input-disabled-background: $gray900;
$input-disabled-color: $gray400;
$input-disabled-border: $global-border-width solid $input-disabled-background;
$input-disabled-resize: none;
```
```sass
// Radio and Checkbox
$input-option-row-breakpoint: small;
$input-option-row-padding-bottom: $global-space;
$input-option-column-padding-bottom: $global-space;
$input-option-padding: 0;
$input-option-margin: 0 12px 0 0;
$input-option-label-padding-right: $global-space;
$input-option-label-padding-bottom: $global-space;
$input-option-input-margin-right: $global-space / 2;
$input-option-margin-top: 8px;
```
```sass
// Fieldset
$fieldset-border: $global-border-width solid $gray900;
$fieldset-border-radius: $form-radius;
$fieldset-box-shadow: none;
$fieldset-background: transparent;
$fieldset-margin: 0;
$fieldset-padding: $global-space;
```
```sass
// Fieldset legend
$fieldset-legend-font: $form-font;
$fieldset-legend-font-size: $global-font-size;
$fieldset-legend-padding: 12px 20px;
$fieldset-legend-color: $gray200;
$fieldset-legend-background: $white;
$fieldset-legend-box-shadow: 0 8px 30px $gray800;
$fieldset-legend-border: none;
$fieldset-legend-border-radius: $global-border-radius;
```
