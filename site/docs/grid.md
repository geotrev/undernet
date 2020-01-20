---
title: Grid
description: Use flex grid utility classes for creating responsive, complex layouts with minimal effort.
permalink: /layout/:basename
---

# {{ page.title }}

Undernet uses a flex grid that behaves largely like other CSS grids: using rows with nested columns, and spacing/positioning modifiers to enable more complex layouts. Almost every aspect of the grid can be customized within `_config.scss`, if you're choosing to go with a more custom pipeline as outlined in the [CSS]({{ site.data.routes.css }}) article.

The grid is mobile first, so any [breakpoint classes](#breakpoint-classes) and modifiers take effect from the given breakpoint and wider (ie, `medium` is `768px` and wider).

An important part of Undernet's grid is it allows you to customize the class names to your liking. This change won't have any effect on the rest of the framework, and is useful in preventing namespace collisions. The default values are `grid`, `row`, and `column`.

If you need a more custom, 2-dimensional layout, look into [CSS Grid](https://css-tricks.com/snippets/css/complete-guide-grid/).

Also worth note, but not included in detail in this article, are offset and order utility classes which can be used with grid columns to move content across the grid, or even break it. [Read more about those here.]({{ site.data.routes.offset_order }})

## Grid Container

The basic wrapper of a layout uses the `grid` class. Grids are automatically centered (`margin: 0 auto`) and have a left and right gutter. Note that a grid container is entirely optional if you already have a wrapper with your desired properties.

<div class="grid has-text-center has-p filler">
  .grid
</div>

```html
<div class="grid">
  I’m 992px wide! (default width of a grid)
</div>
```

A grid is a flex container with `column` direction.

### Grid Widths

These are modifiers to the grid container that change its `max-width`.

<div class="grid is-narrow has-text-center has-p filler">
  .grid.is-narrow
</div>
<div class="grid has-text-center has-p filler">
  .grid
</div>
<div class="grid is-wide has-text-center has-p filler">
  .grid.is-wide
</div>
<div class="grid is-fluid has-text-center has-p filler">
  .grid.is-fluid
</div>

```html
<div class="grid is-narrow">
  .grid.is-narrow
</div>
<div class="grid">
  .grid
</div>
<div class="grid is-wide">
  .grid.is-wide
</div>
<div class="grid is-fluid">
  .grid.is-fluid
</div>
```

### Grid Sections

Sections do the same, but add top and bottom padding. This can be helpful for creating content folds with colored backgrounds (i.e., for marketing pages).

<div class="grid is-section-sm has-text-center filler">
  .grid.small-section
</div>
<div class="grid is-section-md has-text-center filler">
  .grid.medium-section
</div>
<div class="grid is-section-lg has-text-center filler">
  .grid.large-section
</div>

```html
<div class="grid is-section-sm">
  .grid.is-section-sm
</div>
<div class="grid is-section-md">
  .grid.is-section-md
</div>
<div class="grid is-section-lg">
  .grid.is-section-lg
</div>
```

## Rows & Columns

Like other grid systems, layouts are defined with rows and columns.

<div class="grid">
  <div class="row filler-bg">
    <div class="column filler has-p">
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

Rows have no padding or margin, and automatically fill the width of their parent (usually a grid, but not a requirement). Columns, by default, have left, right, and bottom padding. Both are flex containers.

### Multiple Columns

If you add a column element inside a row, they stack next to each other with equal width.

<div class="grid filler-bg">
  <div class="row">
    <div class="column has-no-p-block-end has-no-p-inline-start">
      <p class="filler has-p">.column</p>
    </div>
    <div class="column has-no-p-block-end has-no-p-inline-end">
      <p class="filler has-p">.column</p>
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
      <p class="has-black-text-color">.row</p>
      <div class="row">
        <div class="column filler has-p">
          <p class="has-white-text-color">.column</p>
          <div class="row filler-bg">
            <div class="is-xs-12 column has-black-text-color">
              .row
            </div>
            <div class="column">
              <p class="has-no-m filler has-p">.column</p>
            </div>
            <div class="column">
              <p class="has-no-m filler has-p">.column</p>
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

Here are the default breakpoints:

```scss
$grid-breakpoints: (
  xs: 0,
  sm 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
) !default;
```

<div class="grid filler-bg">
  <div class="row">
    <div class="column is-xs-12 is-lg-8">
      <p class="has-black-text-color">.row</p>
      <div class="row">
        <div class="column filler has-p">
          <p class="has-white-text-color">.column.is-xs-12.is-lg-8</p>
          <div class="row filler-bg">
            <div class="column is-xs-12 has-black-text-color">
              .row
            </div>
            <div class="column is-xs-12 is-lg-6">
              <p class="has-no-m filler has-p">.column.is-xs-12.is-lg-6</p>
            </div>
            <div class="column is-xs-12 is-lg-6">
              <p class="has-no-m filler has-p">.column.is-xs-12.is-lg-6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-xs-12 is-lg-4 ">
      <div class="row">
        <div class="column has-no-p">
          <p class="has-no-m has-p filler">.column.is-xs-12.is-lg-4</p>
        </div>
      </div>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="column is-xs-12 is-lg-8">
      <div class="row">
        <div class="column is-xs-12 is-lg-6">
          .column.is-xs-12.is-lg-6
        </div>
        <div class="column is-xs-12 is-lg-6">
          .column.is-xs-12.is-lg-6
        </div>
      </div>
    </div>
    <div class="column is-xs-12 is-lg-4">
      .column.is-xs-12.is-lg-4
    </div>
  </div>
</div>
```

### Collapse Gutters

Don’t want padding on your grid, rows, and/or columns? You can remove it all with a `has-no-p` modifier class on a given element. The class won't have an effect on child elements, so you'll need to add a modifier to each `div`. Useful for nested layouts.

<div class="grid filler-bg has-no-p">
  <div class="row has-no-p">
    <div class="column filler has-no-p">
      .column
    </div>
  </div>
</div>

```html
<div class="grid has-no-p">
  <div class="row has-no-p">
    <div class="column has-no-p">
      .column.has-no-p
    </div>
  </div>
</div>
```

[Learn more about spacing utilities.]({{ site.data.routes.spacing }})

### Fullscreen Grid

Create a grid that always takes up the full width and height of your device/browser window.

```html
<div class="grid is-fullscreen">
  <div class="row">
    <div class="column">
      <p>I’m huge, woohoo!</p>
    </div>
  </div>
</div>
```

You should really only ever need a single row within a full screen grid. From there, you can create as many columns as you need to continue creating more complex layouts.

By default, a row will be vertically centered. To make the row top-aligned, add modifier classes: `has-align-items-flex-start` and `has-align-content-flex-start` to push content to the top of the container.

```html
<div class="grid is-fullscreen">
  <div class="row has-align-items-flex-start has-align-content-flex-start">
    <div class="column">
      <p>I’m at the top.</p>
    </div>
  </div>
</div>
```

... or to the bottom.

```html
<div class="grid is-fullscreen">
  <div class="row has-align-items-flex-end has-align-content-flex-end">
    <div class="column">
      <p>I’m at the bottom.</p>
    </div>
  </div>
</div>
```

[Learn more about alignment utilities.]({{ site.data.routes.alignment }})

{% include partials/edit-on-github.html %}
