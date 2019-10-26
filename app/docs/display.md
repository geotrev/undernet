Change an element's `display` property on the fly with these utility classes.

```html
<div class="has-display-flex">...</div>
<div class="has-display-block">...</div>
<div class="has-display-none">...</div>
```

## Change Display By Breakpoint

A useful utility to have in responsive design is one that modifies with your grid. These display helpers are meant just for that. Set an element with one of the above classes with the modifer `-xsmall`, `-large`, etc., to indicate the element gets the override only at the specified breakpoint per your `$breakpoints` sass map.

```html
<p class="has-display-none-xsmall has-display-flex-medium has-display-block-xlarge">
  I'm not displayed at xsmall, use flex at medium, and become block-level at xlarge!
</p>
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/display.md">Edit this page on Github!</a></p>
