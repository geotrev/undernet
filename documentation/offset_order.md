# Order / Offset

For layouts or content that need to move across the grid, you can look to offset and order utility classes to achieve this effect.

## Flex Order

Switch `$column-order-classes` to `true` in `_config.scss` to use order modifiers.

<div class="grid filler-bg">
  <div class="row">
    <div class="xsmall-order-2 large-order-1 columns has-no-padding-bottom">
      <p class="filler has-padding has-primary-color-bg">
        Ordered last when small, first when large
      </p>
    </div>
    <div class="xsmall-order-1 large-order-2 columns has-no-padding-bottom">
      <p class="filler has-padding has-secondary-color-bg">
        Ordered first when small, last when large
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-order-2 large-order-1 columns">
      Ordered last when small, first when large
    </div>
    <div class="xsmall-order-1 large-order-2 columns">
      Ordered first when small, last when large
    </div>
  </div>
</div>
```

## Offset

You can also use traditional offset if you need to break out of the grid. Switch `$column-offset-classes` to `true`.

<div class="grid filler-bg">
  <div class="row">
    <div class="xsmall-offset-0 large-offset-3 xsmall-3 columns has-no-padding-bottom">
      <p class="filler has-padding has-primary-color-bg">Quarter-width column has no offset at small widths, 3 columns offset at large.</p>
    </div>
    <div class="xsmall-offset-0 large-offset-6 xsmall-6 columns has-no-padding-bottom">
      <p class="filler has-padding has-secondary-color-bg">Half-width column has no offset at small widths, 6 columns offset at large.</p>
    </div>
  </div>
</div>

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

<p class="has-right-text">Is this article inaccurate? <a href="https://www.github.com/geotrev/undernet/wiki/offset_order">Edit this page on Github!</a></p>
