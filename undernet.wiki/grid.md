# Grid

It’s mobile first, so if you set a medium width column, you’ll have your defined column width as long as your window is medium breakpoint or wider. Configure all grid settings within `_config.scss`, as mentioned in the [Branding](/docs/overview/branding) article.

One of the unique aspects of the grid is it allows you to customize the class names to your liking. This change won't have any effect on the rest of the framework. The default values are:

```scss
$grid-classes: (
  grid: "grid",
  row: "row",
  column: "column"
) !default;
```

The names should indicate a familiar pattern in other flex grids, such as Bootstrap or Foundation's deprecated flex grid. If you need something more custom, such as with 2-dimensional layouts, look into [Grid CSS](https://css-tricks.com/snippets/css/complete-guide-grid/).

## The Basics

The grid includes presets for breakpoints, row/column spacing, and two two things called "sections" and "widths".

### Grid Widths

Widths are exactly what they sound like: declaring a grid with a `.narrow` class will give you a grid horizontally narrower than the default. There are three modifiers, plus the default (which is defined further down in grid settings).

```html
<div class="grid">
  I’m 992px wide! (default width of a grid)
</div>
<div class="narrow grid">
  I’m 768px wide!
</div>
<div class="wide grid">
  I’m 1200px wide!
</div>
<div class="fluid grid">
  I match the width of my container!
</div>
```


### Grid Sections

Sections do the same, but add top and bottom padding. This can be helpful for creating page chunks with colored backgrounds (i.e., for marketing pages).

```html
<div class="small grid">
  I have 48px of top and bottom padding!
</div>
<div class="medium grid">
  I have 96px of top and bottom padding!
</div>
<div class="large grid">
  I have 144px of top and bottom padding!
</div>
```

## Rows & Columns

Like other grid systems, layouts are defined with rows and columns.

```html
<div class="grid">
  <div class="row">
    <div class="column">
      <p>One row + one column</p>
    </div>
  </div>
</div>
```

Rows have no padding or margin, and automatically fill the width of their parent (usually a grid, but not a requirement). Columns, by default, have left, right, and bottom padding.

*NOTE: columns must be inside a row, as they are affected by having a flex parent container.*

### Multiple Columns

If you add a column element inside a row, they stack next to each other with equal width.

```html
<div class="grid">
  <div class="row">
    <div class="column">
      <p>First column</p>
    </div>
    <div class="column">
      <p>Second column</p>
    </div>
  </div>
</div>
```

### Multiple Rows

You can also add more rows within your columns for adding flexibility. Just make sure the direct descendants of those inner-rows continue to be columns.

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-12 large-3 columns">
      <p>First column</p>
    </div>
    <div class="xsmall-12 large-7 columns">
      <div class="row">
        <div class="xsmall-12 columns">
          <h1>Gridception, buddy</h1>
        </div>
        <div class="xsmall-12 columns">
          <p>If your layout has partials, keep track of your parents!
        </div>
      </div>
    </div>
    <div class="xsmall-12 large-2 columns">
      <p>Third column</p>
    </div>
  </div>
</div>
```

## Breakpoint Classes

Undernet comes with helpful breakpoint classes to define how columns should behave at and above a certain size. For example, if you set `medium-6` on a column, content will be at half-width in its row as long as the device width is `768px` or wider.

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-12 large-3 columns">
      <p>12 columns xsmal, 3 columns large</p>
    </div>
    <div class="xsmall-12 large-7 columns">
      <p>12 columns xsmall, 7 columns large</p>
    </div>
    <div class="xsmall-12 large-2 columns">
      <p>12 columns xsmall, 2 columns large</p>
    </div>
  </div>
</div>
```

## Collapse Gutters

Don’t want padding on your grid, rows, and/or columns? You can remove it all with a `.has-no-padding` modifier on a given element. The class won't have an effect on child elements, so you'll need to add a modifier to each `div`.

```html
<div class="grid has-no-padding">
  <div class="row has-no-padding">
    <div class="column has-no-padding">
      <p>Goodbye forever, padding</p>
    </div>
  </div>
</div>
```

[Learn more about spacing utilities.](/docs/utilities/spacing)

## Column Order / Offset

It was common in the past to offset grids with left and right margin. With flex, you no longer need that when flex ordering is an option. Switch `$column-order-classes` to `true` in `_config.scss` to use these modifiers.

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-order-2 large-order-1 columns">
      <p>I’m last when small, first when large!</p>
    </div>
    <div class="xsmall-order-1 large-order-2 columns">
      <p>Ordered first at small breakpoints, last at large and above.</p>
    </div>
  </div>
</div>
```

But you can also use offset if you need to break out of the grid. Switch `$column-offset-classes` to `true`.

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-offset-0 large-offset-3 xsmall-3 columns">
      <p>Quarter-width column has no offset at small widths, 3 columns offset at large.</p>
    </div>
    <div class="xsmall-offset-0 large-offset-6 xsmall-6 columns">
      <p>Half-width column has no offset at small widths, 6 columns offset at large.</p>
    </div>
  </div>
</div>
```

[Learn more about order and offset utilities.](/docs/utilities/order-offset)

## Fullscreen Grid

Create a grid that always takes up the full width and height of your device/browser window.

```html
<div class="fullscreen grid">
  <div class="row">
    <div class="columns">
      <p>I’m huge, woohoo!</p>
    </div>
  </div>
</div>
```

You should really only ever need a single row within a full screen grid. From there, you can create as many columns as you need to continue creating more complex layouts.

By default, a row will be vertically centered. To make the row top-aligned, add modifier classes: `is-aligned-top` and `has-content-top` to push content to the top of the container.

```html
<div class="fullscreen grid">
  <div class="row is-aligned-top has-content-top">
    <div class="columns">
      <p>I’m at the top.</p>
    </div>
  </div>
</div>
```

... or align bottom:

```html
<div class="fullscreen grid">
  <div class="row is-aligned-bottom has-content-bottom">
    <div class="columns">
      <p>I’m at the bottom.</p>
    </div>
  </div>
</div>
```

[Learn more about alignment utilities.](/docs/utilities/alignment)

See a mistake? [Edit this page on Github!](https://www.github.com/geotrev/undernet/wiki/grid)
