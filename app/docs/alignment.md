Included in the CSS are a few dozen utility classes for arranging content. They can be used with or without the [flex grid](/docs/layout/grid). 

These classes are flex box modifiers and depend on the element also having an attribute of `display: flex;`. When in doubt, use `is-d-flex` in addition to the class you need!

## Rows & Columns

To manually arrange children in a container as in a row or in a column, you can use these helper classes.

<div class="row">
  <div class="is-sm-6 is-xs-12 column">
    <p><code>.has-direction-row</code></p>
    <div class="is-d-flex filler-bg has-direction-row">
      <div class="has-grow-1 filler has-p has-m--xs has-shrink-1"></div>
      <div class="has-grow-1 filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-sm-6 is-xs-12 column">
    <p><code>.has-direction-column</code></p>
    <div class="is-d-flex filler-bg has-direction-column">
      <div class="filler has-m--xs has-shrink-1 has-p"></div>
      <div class="filler has-m--xs has-shrink-1 has-p"></div>
    </div>
  </div>
</div>

## Justify content

To manually apply a `justify-content` property to an element's horizontal position (or vertical if the container is a flex column), use the helper class `has-justify-content-X`, where `X` is the position you want.

<div class="row">
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-justify-content-flex-start</code></p>
    <div class="static-box is-d-flex filler-bg has-justify-content-flex-start">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-justify-content-center</code></p>
    <div class="static-box is-d-flex filler-bg has-justify-content-center">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-justify-content-flex-end</code></p>
    <div class="static-box is-d-flex filler-bg has-justify-content-flex-end">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-justify-content-space-around</code></p>
    <div class="static-box is-d-flex filler-bg has-justify-content-space-around">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-justify-content-space-between</code></p>
    <div class="static-box is-d-flex filler-bg has-justify-content-space-between">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
</div>

## Align Items & Align Content

To manually apply `align-items` or `align-content` properties to an element for vertical positioning (or horizontal if the container is a flex column), use the helper class `has-align-items-X` or `has-align-content-X`, respectively, where `X` is the position you want.

### align-items

<div class="row">
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-items-flex-start</code></p>
    <div class="static-height is-d-flex filler-bg has-align-items-flex-start">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-items-center</code></p>
    <div class="static-height is-d-flex filler-bg has-align-items-center">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-items-flex-end</code></p>
    <div class="static-height is-d-flex filler-bg has-align-items-flex-end">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-items-stretch</code></p>
    <div class="static-height is-d-flex filler-bg has-align-items-stretch">
      <div class="filler has-p has-m--xs has-shrink-1"></div>
    </div>
  </div>
</div>

### align-content

<div class="row">
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-content-flex-start</code></p>
    <div class="static-height row filler-bg has-align-content-flex-start">
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-content-center</code></p>
    <div class="static-height row filler-bg has-align-content-center">
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-content-flex-end</code></p>
    <div class="static-height row filler-bg has-align-content-flex-end">
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-content-space-around</code></p>
    <div class="static-height row filler-bg has-align-content-space-around">
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-content-space-between</code></p>
    <div class="static-height row filler-bg has-align-content-space-between">
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
    </div>
  </div>
  <div class="is-lg-3 is-sm-6 is-xs-12 column">
    <p><code>.has-align-content-stretch</code></p>
    <div class="static-height row filler-bg has-align-content-stretch">
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
      <div class="filler is-xs-12 column has-p has-m--xs has-shrink-1 has-no-m-inline-start has-no-m-inline-end"></div>
    </div>
  </div>
</div>

## Grow & Shrink

To manually set elements in a container to grow or shrink, add the class `has-X-#`, where `X` is `grow` or `shrink`, and `#` is `0` or `1`. `0` means disabled, `1` means enabled. 

<div class="row">
  <div class="is-lg-6 is-xs-12 column">
    <div class="is-d-flex filler-bg has-direction-row">
      <div class="has-grow-1 filler has-p has-m--xs has-shrink-1">.has-grow-1</div>
      <div class="has-grow-1 filler has-p has-m--xs has-shrink-1">.has-grow-1</div>
    </div>
  </div>
  <div class="is-lg-6 is-xs-12 column">
    <div class="is-d-flex filler-bg has-direction-row">
      <div class="has-grow-0 filler has-p has-m--xs has-shrink-1">.has-grow-0</div>
      <div class="has-grow-0 filler has-p has-m--xs has-shrink-1">.has-grow-0</div>
    </div>
  </div>
</div>

<div class="row">
  <div class="is-lg-6 is-xs-12 column">
    <div class="is-d-flex filler-bg has-direction-row">
      <div class="has-shrink-1 has-grow-0 filler has-p has-m--xs has-shrink-1">.has-shrink-1.has-grow-0</div>
      <div class="has-shrink-1 has-grow-0 filler has-p has-m--xs has-shrink-1">.has-shrink-1.has-grow-0</div>
    </div>
  </div>
  <div class="is-lg-6 is-xs-12 column">
    <div class="is-d-flex filler-bg has-direction-row">
      <div class="has-shrink-0 has-grow-1 filler has-p has-m--xs has-shrink-1">.has-shrink-0.has-grow-1</div>
      <div class="has-shrink-0 has-grow-1 filler has-p has-m--xs has-shrink-1">.has-shrink-0.has-grow-1</div>
    </div>
  </div>
</div>

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/alignment.md">Edit this page on Github!</a></p>
