For layouts or content that need to move across the grid, you can look to offset and order utility classes to achieve this effect.

## Flex Order

Switch `$grid-column-order-classes-enabled` to `true` in `_config.scss` to use order modifiers.

<div class="grid filler-bg">
  <div class="row">
    <div class="is-xs-order-2 is-lg-order-1 column has-no-p-block-end">
      <p class="filler has-p has-primary-bg-color">
        .is-xs-order-2.is-lg-order-1
      </p>
    </div>
    <div class="is-xs-order-1 is-lg-order-2 column has-no-p-block-end">
      <p class="filler has-p has-secondary-bg-color">
        .is-xs-order-1.is-lg-order-2
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="is-xs-order-2 is-lg-order-1 column">...</div>
    <div class="is-xs-order-1 is-lg-order-2 column">...</div>
  </div>
</div>
```

## Offset

You can also use traditional offset if you need to break out of the grid. Switch `$grid-column-offset-classes-enabled` to `true`.

<div class="grid filler-bg">
  <div class="row">
    <div class="is-xs-offset-0 is-lg-offset-2 is-xs-4 column has-no-p-block-end">
      <p class="filler has-p has-primary-bg-color">
        .is-xs-offset-0.is-lg-offset-2
      </p>
    </div>
    <div class="is-xs-offset-0 is-lg-offset-6 is-xs-6 column has-no-p-block-end">
      <p class="filler has-p has-secondary-bg-color">
        .is-xs-offset-0.is-lg-offset-6
      </p>
    </div>
  </div>
</div>

```html
<div class="grid">
  <div class="row">
    <div class="is-xs-offset-0 is-lg-offset-2 is-xs-4 column">...</div>
    <div class="is-xs-offset-0 is-lg-offset-6 is-xs-6 column">...</div>
  </div>
</div>
```

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/offset-order.md">Edit this page on Github!</a></p>
