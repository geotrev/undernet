Included in the CSS are a few dozen utility classes for arranging content. They can be used with or without the [flex grid](/docs/layout/grid). As such, these classes are `flex` modifiers and depend on the element also having an attribute of `display: flex;`.

## Rows & Columns

To manually arrange children in a container as in a row or in a column, you can use these helper classes.

<div class="row">
  <div class="small-6 xsmall-12 columns">
    <p><code>.is-flex-row</code></p>
    <div class="is-flex filler-bg is-flex-row">
      <div class="can-grow filler has-padding has-margin-1 can-shrink"></div>
      <div class="can-grow filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="small-6 xsmall-12 columns">
    <p><code>.is-flex-column</code></p>
    <div class="is-flex filler-bg is-flex-column">
      <div class="filler has-margin-1 can-shrink has-padding"></div>
      <div class="filler has-margin-1 can-shrink has-padding"></div>
    </div>
  </div>
</div>

## Justify content

To manually apply a `justify-content` property to an element's horizontal position (or vertical if the container is a flex column), use the helper class `is-justified-X`, where `X` is the position you want.

<div class="row">
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-justified-flex-start</code></p>
    <div class="static-box is-flex filler-bg is-justified-flex-start">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-justified-center</code></p>
    <div class="static-box is-flex filler-bg is-justified-center">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-justified-flex-end</code></p>
    <div class="static-box is-flex filler-bg is-justified-flex-end">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-justified-space-around</code></p>
    <div class="static-box is-flex filler-bg is-justified-space-around">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-justified-space-between</code></p>
    <div class="static-box is-flex filler-bg is-justified-space-between">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
</div>

## Align Items & Align Content

To manually apply `align-items` or `align-content` properties to an element for vertical positioning (or horizontal if the container is a flex column), use the helper class `is-aligned-X` or `has-content-X`, respectively, where `X` is the position you want.

### align-items

<div class="row">
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-aligned-flex-start</code></p>
    <div class="static-height is-flex filler-bg is-aligned-flex-start">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-aligned-center</code></p>
    <div class="static-height is-flex filler-bg is-aligned-center">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-aligned-flex-end</code></p>
    <div class="static-height is-flex filler-bg is-aligned-flex-end">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.is-aligned-stretch</code></p>
    <div class="static-height is-flex filler-bg is-aligned-stretch">
      <div class="filler has-padding has-margin-1 can-shrink"></div>
    </div>
  </div>
</div>

### align-content

<div class="row">
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.has-content-flex-start</code></p>
    <div class="static-height row filler-bg has-content-flex-start">
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.has-content-center</code></p>
    <div class="static-height row filler-bg has-content-center">
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.has-content-flex-end</code></p>
    <div class="static-height row filler-bg has-content-flex-end">
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.has-content-space-around</code></p>
    <div class="static-height row filler-bg has-content-space-around">
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.has-content-space-between</code></p>
    <div class="static-height row filler-bg has-content-space-between">
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
    </div>
  </div>
  <div class="large-3 small-6 xsmall-12 columns">
    <p><code>.has-content-stretch</code></p>
    <div class="static-height row filler-bg has-content-stretch">
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
      <div class="filler xsmall-12 columns has-padding has-margin-1 can-shrink has-no-margin-left has-no-margin-right"></div>
    </div>
  </div>
</div>

## Grow & Shrink

To manually set elements in a container to grow or shrink, add the class `can-X`, where `X` is `grow` or `shrink`. Similarly you can force the elements to not grow or shrink with `wont-X`.

<div class="row">
  <div class="large-6 xsmall-12 columns">
    <div class="is-flex filler-bg is-flex-row">
      <div class="can-grow filler has-padding has-margin-1 can-shrink">.can-grow</div>
      <div class="can-grow filler has-padding has-margin-1 can-shrink">.can-grow</div>
    </div>
  </div>
  <div class="large-6 xsmall-12 columns">
    <div class="is-flex filler-bg is-flex-row">
      <div class="wont-grow filler has-padding has-margin-1 can-shrink">.wont-grow</div>
      <div class="wont-grow filler has-padding has-margin-1 can-shrink">.wont-grow</div>
    </div>
  </div>
</div>

<div class="row">
  <div class="large-6 xsmall-12 columns">
    <div class="is-flex filler-bg is-flex-row">
      <div class="can-shrink wont-grow filler has-padding has-margin-1 can-shrink">.can-shrink.wont-grow</div>
      <div class="can-shrink wont-grow filler has-padding has-margin-1 can-shrink">.can-shrink.wont-grow</div>
    </div>
  </div>
  <div class="large-6 xsmall-12 columns">
    <div class="is-flex filler-bg is-flex-row">
      <div class="wont-shrink can-grow filler has-padding has-margin-1 can-shrink">.wont-shrink.can-grow</div>
      <div class="wont-shrink can-grow filler has-padding has-margin-1 can-shrink">.wont-shrink.can-grow</div>
    </div>
  </div>
</div>

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/alignment.md">Edit this page on Github!</a></p>
