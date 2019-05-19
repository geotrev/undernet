Undernet has reductive and additive spacing utility classes.

## Additive

Add padding or margin to all sides of an element. Value defaults to `$global-space`.

<div class="filler-bg has-padding">
  .has-padding
  <div class="filler has-margin has-padding can-grow">
    .has-margin
  </div>
</div>

Add padding or margin to one side, e.g. `has-margin-X`, where `X` is the side you want. Value defaults to `$global-space`.

<div class="filler-bg has-padding-left has-no-padding-top has-no-padding-right has-no-padding-bottom">
  .has-padding-left
  <div class="filler has-margin-top has-padding can-grow">
    .has-margin-top
  </div>
</div>

### Custom Sizes

If the default value of `$global-space` isn't the right size, don't worry, there are more sizes to choose from, e.g. `has-padding-X`, where `X` is the size as defined in `$spacing-increments`.

<div class="filler-bg has-padding-1">
  .has-padding-1
  <div class="filler has-margin-4 has-padding can-grow">
    .has-margin-4
  </div>
</div>

### Custom Sizes With Sides

Define a spacing size with a side, e.g. `has-padding-X-Y`, where `X` is the side and `Y` is the size.

<div class="filler-bg has-padding-left-1 has-no-padding-top has-no-padding-right has-no-padding-bottom">
  .has-padding-left-1
  <div class="filler has-margin-top-4 has-padding can-grow">
    .has-margin-top-4
  </div>
</div>

## Reductive

Remove padding or margin from all sides of an element.

<div class="filler-bg has-no-padding is-flex-column">
  .has-no-padding
  <div class="filler has-no-margin has-padding can-grow">
    .has-no-margin
  </div>
</div>

Further, remove padding or margin from specifically one side using `has-no-padding-X`, where `X` is the side you want.

<div class="filler-bg has-no-padding-left">
  .has-no-padding-left
  <div class="filler has-no-margin-top has-padding can-grow">
    .has-no-margin-top
  </div>
</div>

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/spacing.md">Edit this page on Github!</a></p>
