Undernet has reductive and additive spacing utility classes. They utilize [logical property syntax](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/) to indicate the direction the modifier will be applied.

In other words, for pages with languages reading right-to-left (e.g., have `dir="rtl"` on the page `html` tag), a modifier like `has-padding-inline-start` will apply `padding-right` to the element. However, in a left-to-right page, the same class name will apply `padding-left` to reflect the opposite page flow.

It's worth [reading about the pattern](https://css-tricks.com/css-logical-properties/) to fully grasp it, and it will help you think in terms of direction-agnostic content, as not all languages are left-to-right!

The CSS properties which make the methodology automatic are [not fully supported](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) in IE11 or Edge, so it's been (more or less) polyfilled in Undernet in preparation for the next generation of CSS. The future is now!

## Additive

Add padding or margin to all sides of an element. Value defaults to `$global-space`.

<div class="filler-bg has-padding">
  .has-padding
  <div class="filler has-margin has-padding can-grow">
    .has-margin
  </div>
</div>

Add padding or margin to one side. E.g. `has-margin-X`, where `X` is a logical direction. Value defaults to `$global-space`.

<div class="filler-bg has-padding-inline-start has-no-padding-block-start has-no-padding-inline-end has-no-padding-block-end">
  .has-padding-inline-start
  <div class="filler has-margin-block-start has-padding can-grow">
    .has-margin-block-start
  </div>
</div>

### Custom Sizes

If the default value of `$global-space` isn't the right size, don't worry, there are more sizes to choose from. E.g. `has-padding-X`, where `X` is the size as defined in `$spacing-increments`.

<div class="filler-bg has-padding-1">
  .has-padding-1
  <div class="filler has-margin-4 has-padding can-grow">
    .has-margin-4
  </div>
</div>

### Custom Sizes With Sides

Define a spacing size with a side. E.g. `has-padding-X-Y`, where `X` is the logical direction and `Y` is the size.

<div class="filler-bg has-padding-inline-start-1 has-no-padding-block-start has-no-padding-inline-end has-no-padding-block-end">
  .has-padding-inline-start-1
  <div class="filler has-margin-block-start-4 has-padding can-grow">
    .has-margin-block-start-4
  </div>
</div>

## Reductive

Remove padding or margin from all sides of an element.

<div class="filler-bg has-no-padding has-direction-column">
  .has-no-padding
  <div class="filler has-no-margin has-padding can-grow">
    .has-no-margin
  </div>
</div>

Further, remove padding or margin from specifically one side using `has-no-padding-X`, where `X` is the logical direction.

<div class="filler-bg has-no-padding-inline-start">
  .has-no-padding-inline-start
  <div class="filler has-margin has-no-margin-block-start has-padding can-grow">
    .has-margin.has-no-margin-block-start
  </div>
</div>

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/spacing.md">Edit this page on Github!</a></p>
