Undernet has reductive and additive spacing utility classes. They utilize [logical property syntax](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/) to indicate the direction the modifier will be applied.

In other words, for pages with languages reading right-to-left (e.g., have `dir="rtl"` on the page `html` tag), a modifier like `has-p-inline-start` will apply `padding-right` to the element. However, in a left-to-right page, the same class name will apply `padding-left` to reflect the opposite page flow.

It's worth [reading about the pattern](https://css-tricks.com/css-logical-properties/) to fully grasp it, and it will help you think in terms of direction-agnostic content, as not all languages are left-to-right!

The CSS properties which make the methodology automatic are [not fully supported](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) in IE11 or Edge, so it's been (more or less) polyfilled in Undernet in preparation for the next generation of CSS. The future is now!

Note: All spacing modifiers use an abbreviated syntax of `p` (for 'padding') and `m` (for 'margin').

## Additive

Add padding or margin to all sides of an element. Value defaults to `$global-space`.

<div class="filler-bg has-p">
  .has-p
  <div class="filler has-m has-p can-grow">
    .has-m
  </div>
</div>

Add padding or margin to one side. E.g. `has-m-X`, where `X` is a logical direction. Value defaults to `$global-space`.

<div class="filler-bg has-p-inline-start has-no-p-block-start has-no-p-inline-end has-no-p-block-end">
  .has-p-inline-start
  <div class="filler has-m-block-start has-p can-grow">
    .has-m-block-start
  </div>
</div>

### Custom Sizes

If the default value of `$global-space` isn't the right size, don't worry, there are more sizes to choose from. E.g. `has-p-X`, where `X` is the size as defined in `$global-spacing-increments`.

<div class="filler-bg has-p-xs">
  .has-p-xs
  <div class="filler has-m-xl has-p can-grow">
    .has-m-xl
  </div>
</div>

### Custom Sizes With Sides

Define a spacing size with a side. E.g. `has-p-X--Y`, where `X` is the logical direction and `Y` is the size.

<div class="filler-bg has-p-inline-start-xs has-no-p-block-start has-no-p-inline-end has-no-p-block-end">
  .has-p-inline-start-xs
  <div class="filler has-m-block-start-xl has-p can-grow">
    .has-m-block-start-xl
  </div>
</div>

## Reductive

Remove padding or margin from all sides of an element.

<div class="filler-bg has-no-p has-direction-column">
  .has-no-p
  <div class="filler has-no-m has-p can-grow">
    .has-no-m
  </div>
</div>

Further, remove padding or margin from specifically one side using `has-no-p-X`, where `X` is the logical direction.

<div class="filler-bg has-no-p-inline-start">
  .has-no-p-inline-start
  <div class="filler has-m has-no-m-block-start has-p can-grow">
    .has-m.has-no-m-block-start
  </div>
</div>

---
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/spacing.md">Edit this page on Github!</a></p>
