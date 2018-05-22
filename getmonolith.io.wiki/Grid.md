Monolith’s grid is very similar to other CSS grids you’ve probably seen/used. It’s mobile first, so if you set a medium width column, you’ll have that width as long as your window is medium breakpoint or wider. Configure all grid settings, including spacing and class names, within `_config.scss`.

### The Basics

As noted on the configuration article, your grid has some presets for breakpoints, as well as two things called “sections” and “widths”. 

Widths are exactly what they sound like: declaring a grid with a `.narrow` class will give you a grid horizontally narrower than the default. There are three modifiers, plus the default (which is defined further down in grid settings).

```html
<div class=“grid”>
  I’m 992px wide! (default width of a grid)
</div>
<div class=“narrow grid”>
  I’m 768px wide!
</div>
<div class=“wide grid”>
  I’m 1200px wide!
</div>
<div class=“fluid grid”>
  I match the width of my container!
</div>
```


### Grid Sections

Sections do the same, but add top and bottom padding. This can be helpful for creating page chunks with colored backgrounds (i.e., for marketing pages).

```html
<div class=“small grid”>
  I have 48px of top and bottom padding!
</div>
<div class=“medium grid”>
  I have 96px of top and bottom padding!
</div>
<div class=“large grid”>
  I have 144px of top and bottom padding!
</div>
```

### Rows & Columns

Like other CSS grids, your layouts are defined with rows and columns.

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“column”>
      <p>One row + one column</p>
    </div>
  </div>
</div>
```

Rows have no padding or margin, and automatically fill the width of their parent (usually a .grid, but not a requirement). Columns, by default, have left, right, and bottom padding, but you can add a top if desired. Add, edit, or remove pixels as you need them.

### Multiple Columns

If you add columns, they stack next to each other equally spaced apart:

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“column”>
      <p>First column</p>
    </div>
    <div class=“column”>
      <p>Second column</p>
    </div>
  </div>
</div>
```

### Multiple Rows

You can also add more rows within your columns. If you need a `.grid` as your page layout wrapper, then just add more `.row`s and `.columns`:

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“xsmall-12 large-3 columns”>
      <p>First column</p>
    </div>
    <div class=“xsmall-12 large-7 columns”>
      <div class=“row”>
        <div class=“xsmall-12 columns”>
          <h1>Gridception, buddy</h1>
        </div>
        <div class=“xsmall-12 columns”>
          <p>If your layout has partials, keep track of your parents!
        </div>
      </div>
    </div>
    <div class=“xsmall-12 large-2 columns”>
      <p>Third column</p>
    </div>
  </div>
</div>
```

### Breakpoints

Again, Monolith is mobile first; start small and build your way up. :)

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“xsmall-12 large-3 columns”>
      <p>12 columns xsmal, 3 columns large</p>
    </div>
    <div class=“xsmall-12 large-7 columns”>
      <p>12 columns xsmall, 7 columns large</p>
    </div>
    <div class=“xsmall-12 large-2 columns”>
      <p>12 columns xsmall, 2 columns large</p>
    </div>
  </div>
</div>
```

### Collapse Column Gutter

Don’t want padding on your columns? You can remove it with a `.collapsed` modifier:

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“collapsed column”>
      <p>Goodbye forever, padding</p>
    </div>
  </div>
</div>
```

You can add `.collapsed` to a `.row` if you want _all_ columns in the containing `<div>` to have no padding:

```html
<div class=“grid”>
  <div class=“row collapsed”>
    <div class=“column”>
      <p>No padding for me.</p>
    </div>
    <div class=“column”>
      <p>No padding for me either.</p>
    </div>
    <div class=“column”>
      <p>Still no padding.</p>
    </div>
  </div>
</div>
```

### Column Order / Offset

It was common in the past to offset grids with left and right margin. With flex, you no longer really need that. Switch `$column-order-classes` to `true`.

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“xsmall-order-2 large-order-1 columns”>
      <p>I’m last when small, first when large!</p>
    </div>
    <div class=“xsmall-order-1 large-order-2 columns”>
      <p>Ordered first at small breakpoints, last at large and above.</p>
    </div>
  </div>
</div>
```

But you can also use offset if you need to break out of the grid. Switch `$column-offset-classes` to `true`.

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“xsmall-offset-6 large-offset-0 columns”>
      <p>I’m last when small, first when large!</p>
    </div>
    <div class=“xsmall-offset-0 large-offset-6 columns”>
      <p>Ordered first at small breakpoints, last at large and above.</p>
    </div>
  </div>
</div>
```

### Fullscreen Grid

Create a grid that always takes up the full width and height of your device/browser window:

```html
<div class=“grid”>
  <div class=“row”>
    <div class=“columns”>
      <p>I’m huge, woohoo!</p>
    </div>
  </div>
</div>
```

You should really only ever need a single row within a full screen grid. From there, you can create as many columns as you need, and continue creating more complex layouts!

By default, your `.row` will be vertically centered. To change this, add a modifier class: `.align-top` or `.align-bottom` to push content to the top or bottom of the grid:

```html
<div class=“fullscreen grid”>
  <div class=“row align-top”>
    <div class=“columns”>
      <p>I’m on the top.</p>
    </div>
  </div>
</div>
```

```html
<div class=“fullscreen grid”>
  <div class=“row align-bottom”>
    <div class=“columns”>
      <p>I’m on the bottom.</p>
    </div>
  </div>
</div>
```

But of course, layouts are never _that_ simple in execution sometimes, so you can still add more `.row`s if you need them. They’ll be evenly spaced vertically in the grid container:

```html
<div class=“fullscreen grid”>
  <div class=“row”>
    <div class=“columns”>
      <p>I’m on the top.</p>
    </div>
  </div>
  <div class=“row”>
    <div class=“columns”>
      <p>I’m on the bottom.</p>
    </div>
  </div>
</div>
```

Next: [Typography ►](typography)