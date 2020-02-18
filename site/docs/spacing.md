---
title: Spacing
description: Use spacing class helpers to add custom padding and margin.
permalink: /layout/:basename
---

# {{ page.title }}

Undernet has reductive and additive spacing utility classes. They utilize [logical property syntax](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/) to indicate the direction the modifier will be applied.

This means for pages with languages reading left-to-right, a modifier like `has-p-inline-start` will apply left padding to its element. However, in a right-to-left page (e.g., `dir="rtl"` is on `html`), the modifier class will apply right padding to reflect the opposite page flow. **This happens automatically.**

It's worth [reading about the pattern](https://css-tricks.com/css-logical-properties/) as it may not appear intuitive at first. However it will help you think in terms of direction-agnostic content as localization will always be a core concern for digital products.

Worth noting is that some CSS properties which make up logical properties are [not fully supported](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties), so some of them use a mixin called `create-flow-property` to make compatible those properties for things like absolute positioning (`left`, `right`, etc.).

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

{% include partials/edit-on-github.html %}
