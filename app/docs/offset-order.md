For layouts or content that need to move across the grid, you can look to offset and order utility classes to achieve this effect.

## Flex Order

Switch `$column-order-classes` to `true` in `_config.scss` to use order modifiers.

<div class="grid filler-bg">
  <div class="row">
    <div class="is-xsmall-order-2 is-large-order-1 column has-no-padding-block-end">
      <p class="filler has-padding has-primary-color-bg">
        .is-xsmall-order-2.is-large-order-1
      </p>
    </div>
    <div class="is-xsmall-order-1 is-large-order-2 column has-no-padding-block-end">
      <p class="filler has-padding has-secondary-color-bg">
        .is-xsmall-order-1.is-large-order-2
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="is-xsmall-order-2 is-large-order-1 column">...</div>
    <div class="is-xsmall-order-1 is-large-order-2 column">...</div>
  </div>
</div>
```

## Offset

You can also use traditional offset if you need to break out of the grid. Switch `$column-offset-classes` to `true`.

<div class="grid filler-bg">
  <div class="row">
    <div class="is-xsmall-offset-0 is-large-offset-2 is-xsmall-4 column has-no-padding-block-end">
      <p class="filler has-padding has-primary-color-bg">
        .is-xsmall-offset-0.is-large-offset-2
      </p>
    </div>
    <div class="is-xsmall-offset-0 is-large-offset-6 is-xsmall-6 column has-no-padding-block-end">
      <p class="filler has-padding has-secondary-color-bg">
        .is-xsmall-offset-0.is-large-offset-6
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="is-xsmall-offset-0 is-large-offset-2 is-xsmall-4 column">...</div>
    <div class="is-xsmall-offset-0 is-large-offset-6 is-xsmall-6 column">...</div>
  </div>
</div>
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/offset-order.md">Edit this page on Github!</a></p>
