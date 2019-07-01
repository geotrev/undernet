Undernet uses a flex grid that behaves largely like other CSS grids: using rows with nested columns, and spacing/positioning modifiers to enable more complex layouts.

The grid is mobile first, so any [breakpoint classes](#breakpoint-classes) and modifiers take effect from the breakpoint value and wider (ie, `medium` is `768px` and wider).

An important part of Undernet's grid is it allows you to customize the class names to your liking. This change won't have any effect on the rest of the framework, and is useful in preventing namespace collisions. The default values are as you might expect:

```scss
$grid-classes: (
  grid: "grid",
  row: "row",
  column: "column",
) !default;
```

If you need a more custom, 2-dimensional layout, look into [Grid CSS](https://css-tricks.com/snippets/css/complete-guide-grid/).

Also worth note, but not included in detail in this article, are offset and order utility classes which can be used with grid columns to move content across the grid. [Read more about those here.](/docs/layout/offset-order)

## Grid Container

The basic wrapper of a layout uses the `grid` class. Grid's are automatically centered (`margin: 0 auto`) and have a left and right gutter.

<div class="grid has-center-text has-padding filler">
  .grid
</div>

```html
<div class="grid">
  I’m 992px wide! (default width of a grid)
</div>
```

### Grid Widths

Widths are exactly what they sound like. For example, declaring a grid with a `.narrow` class will give you a grid horizontally narrower than the default.

<div class="narrow grid has-center-text has-padding filler">
  .narrow.grid
</div>
<div class="grid has-center-text has-padding filler">
  .grid
</div>
<div class="wide grid has-center-text has-padding filler">
  .wide.grid
</div>
<div class="fluid grid has-center-text has-padding filler">
  .fluid.grid
</div>

```html
<div class="narrow grid">
  .narrow.grid
</div>
<div class="grid">
  .grid
</div>
<div class="wide grid">
  .wide.grid
</div>
<div class="fluid grid">
  .fluid.grid
</div>
```

### Grid Sections

Sections do the same, but add top and bottom padding. This can be helpful for creating content folds with colored backgrounds (i.e., for marketing pages).

<div class="small-section grid has-center-text filler">
  .small-section.grid
</div>
<div class="medium-section grid has-center-text filler">
  .medium-section.grid
</div>
<div class="large-section grid has-center-text filler">
  .large-section.grid
</div>

```html
<div class="small-section grid">
  .small-section.grid
</div>
<div class="medium-section grid">
  .medium-section.grid
</div>
<div class="large-section grid">
  .large-section.grid
</div>
```

## Rows & Columns

Like other grid systems, layouts are defined with rows and columns.

<div class="grid">
  <div class="row filler-bg">
    <div class="column filler has-padding">
      .column
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="column">
      .column
    </div>
  </div>
</div>
```

Rows have no padding or margin, and automatically fill the width of their parent (usually a grid, but not a requirement). Columns, by default, have left, right, and bottom padding.

_NOTE: columns must be inside a row, or a parent that has `display: flex`._

### Multiple Columns

If you add a column element inside a row, they stack next to each other with equal width.

<div class="grid filler-bg">
  <div class="row">
    <div class="column has-no-padding-bottom has-no-padding-left">
      <p class="filler has-padding">.column</p>
    </div>
    <div class="column has-no-padding-bottom has-no-padding-right">
      <p class="filler has-padding">.column</p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="column">
      .column
    </div>
    <div class="column">
      .column
    </div>
  </div>
</div>
```

### Multiple Rows

Add more rows within your columns for more advanced layouts. Just make sure the direct descendants of those inner-rows continue to be columns.

<div class="grid filler-bg">
  <div class="row">
    <div class="column">
      <div class="row">
        <div class="column filler has-padding">
          <p class="has-white-text">.column</p>
          <div class="row filler-bg">
            <div class="xsmall-12 column has-black-text">
              .row
            </div>
            <div class="column">
              <p class="has-no-margin filler has-padding">.column</p>
            </div>
            <div class="column">
              <p class="has-no-margin filler has-padding">.column</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="column">
      <div class="row">
        <div class="column">
          .column
        </div>
        <div class="column">
          .column
        </div>
      </div>
    </div>
  </div>
</div>
```

### Breakpoint Classes

Undernet comes with helpful breakpoint classes to define how columns should behave at and above a certain size. For example, if you set `medium-6` on a column, content will be at half-width in its row as long as the device width is `768px` (the default medium value) or wider.

<div class="grid filler-bg">
  <div class="row">
    <div class="xsmall-12 large-8 columns">
      <div class="row">
        <div class="column filler has-padding">
          <p class="has-white-text">.xsmall-12.large-8.columns</p>
          <div class="row filler-bg">
            <div class="xsmall-12 columns has-black-text">
              .row
            </div>
            <div class="xsmall-12 large-6 columns">
              <p class="has-no-margin filler has-padding">.xsmall-12.large-6.columns</p>
            </div>
            <div class="xsmall-12 large-6 columns">
              <p class="has-no-margin filler has-padding">.xsmall-12.large-6.columns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="xsmall-12 large-4 columns">
      <div class="row">
        <div class="column has-no-padding">
          <p class="has-no-margin has-padding filler">.xsmall-12.large-4.columns</p>
        </div>
      </div>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-12 large-8 columns">
      <div class="row">
        <div class="xsmall-12 large-6 columns">
          .xsmall-12.large-6.columns
        </div>
        <div class="xsmall-12 large-6 columns">
          .xsmall-12.large-6.columns
        </div>
      </div>
    </div>
    <div class="xsmall-12 large-4 column">
      .xsmall-12.large-4.column
    </div>
  </div>
</div>
```

Here are the default breakpoint values defined in `_config.scss`.

```scss
$breakpoints: (
  xsmall: 0,
  small: 576px,
  medium: 768px,
  large: 992px,
  xlarge: 1200px,
) !default;
```

### Collapse Gutters

Don’t want padding on your grid, rows, and/or columns? You can remove it all with a `.has-no-padding` modifier on a given element. The class won't have an effect on child elements, so you'll need to add a modifier to each `div`. Useful for nested layouts.

<div class="grid filler-bg has-no-padding">
  <div class="row has-no-padding">
    <div class="column filler has-no-padding">
      .column
    </div>
  </div>
</div>

```html
<div class="grid has-no-padding">
  <div class="row has-no-padding">
    <div class="column has-no-padding">
      .column.has-no-padding
    </div>
  </div>
</div>
```

[Learn more about spacing utilities.](/docs/layout/spacing)

### Fullscreen Grid

Create a grid that always takes up the full width and height of your device/browser window.

```html
<div class="fullscreen grid">
  <div class="row">
    <div class="column">
      <p>I’m huge, woohoo!</p>
    </div>
  </div>
</div>
```

You should really only ever need a single row within a full screen grid. From there, you can create as many columns as you need to continue creating more complex layouts.

By default, a row will be vertically centered. To make the row top-aligned, add modifier classes: `is-aligned-flex-start` and `has-content-flex-start` to push content to the top of the container.

```html
<div class="fullscreen grid">
  <div class="row is-aligned-flex-start has-content-flex-start">
    <div class="column">
      <p>I’m at the top.</p>
    </div>
  </div>
</div>
```

... or to the bottom.

```html
<div class="fullscreen grid">
  <div class="row is-aligned-flex-end has-content-flex-end">
    <div class="column">
      <p>I’m at the bottom.</p>
    </div>
  </div>
</div>
```

[Learn more about alignment utilities.](/docs/layout/alignment)

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/grid.md">Edit this page on Github!</a></p>
