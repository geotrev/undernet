For layouts or content that need to move across the grid, you can look to offset and order utility classes to achieve this effect.

## Flex Order

Switch `$column-order-classes` to `true` in `_config.scss` to use order modifiers.

<div class="grid filler-bg">
  <div class="row">
    <div class="xsmall-order-2 large-order-1 columns has-no-padding-bottom">
      <p class="filler has-padding has-primary-color-bg">
        .xsmall-order-2.large-order-1
      </p>
    </div>
    <div class="xsmall-order-1 large-order-2 columns has-no-padding-bottom">
      <p class="filler has-padding has-secondary-color-bg">
        .xsmall-order-1.large-order-2
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-order-2 large-order-1 columns">...</div>
    <div class="xsmall-order-1 large-order-2 columns">...</div>
  </div>
</div>
```

## Offset

You can also use traditional offset if you need to break out of the grid. Switch `$column-offset-classes` to `true`.

<div class="grid filler-bg">
  <div class="row">
    <div class="xsmall-offset-0 large-offset-2 xsmall-4 columns has-no-padding-bottom">
      <p class="filler has-padding has-primary-color-bg">
        .xsmall-offset-0.large-offset-2
      </p>
    </div>
    <div class="xsmall-offset-0 large-offset-6 xsmall-6 columns has-no-padding-bottom">
      <p class="filler has-padding has-secondary-color-bg">
        .xsmall-offset-0.large-offset-6
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="xsmall-offset-0 large-offset-2 xsmall-4 columns">...</div>
    <div class="xsmall-offset-0 large-offset-6 xsmall-6 columns">...</div>
  </div>
</div>
```

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/offset-order.md">Edit this page on Github!</a></p>
