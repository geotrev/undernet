# Accordions

Use an accordion to hide and show content in a collapsable fashion.

## Basic Accordion

Check out this example accordion:

<div data-accordion="accordion-1" class="accordion">
  <div class="accordion-row" data-visible="true" data-accordion-row="content-1">
    <h5 id="button-1">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-1">
        Accordion Button 1
      </button>
    </h5>
    <div class="accordion-content" id="content-1">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="accordion-row" data-visible="false" data-accordion-row="content-2">
    <h5 id="button-2">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-2">
        Accordion Button 2
      </button>
    </h5>
    <div class="accordion-content" id="content-2">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="accordion-row" data-visible="false" data-accordion-row="content-3">
    <h5 id="button-3">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-3">
        Accordion Button 3
      </button>
    </h5>
    <div class="accordion-content" id="content-3">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
</div>
<br/>

```html
<div data-accordion="accordion-1" class="accordion">
  <div class="accordion-row" data-visible="true" data-accordion-row="content-1">
    <h5 id="button-1">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-1">
        Accordion Button 1
      </button>
    </h5>
    <div class="accordion-content" id="content-1">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="accordion-row" data-visible="false" data-accordion-row="content-2">
    <h5 id="button-2">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-2">
        Accordion Button 2
      </button>
    </h5>
    <div class="accordion-content" id="content-2">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="accordion-row" data-visible="false" data-accordion-row="content-3">
    <h5 id="button-3">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-3">
        Accordion Button 3
      </button>
    </h5>
    <div class="accordion-content" id="content-3">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
</div>
```

Accordions are opinionated only to ensure content, transitions, and buttons are correctly reacting to events. You can put nearly anything inside an accordion's inner content!

## Toggle Multiple

Add `data-toggle-multiple` on the accordion container to let each accordion row expand independently, and not close others that were already open.

<div data-accordion="accordion-2" class="accordion" data-toggle-multiple>
  <div class="accordion-row" data-visible="true" data-accordion-row="content-4">
    <h5 id="button-4">
      <button data-parent="accordion-2" class="accordion-button" data-target="content-4">
        Accordion Button 4
      </button>
    </h5>
    <div class="accordion-content" id="content-4">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="accordion-row" data-visible="false" data-accordion-row="content-5">
    <h5 id="button-5">
      <button data-parent="accordion-2" class="accordion-button" data-target="content-5">
        Accordion Button 5
      </button>
    </h5>
    <div class="accordion-content" id="content-5">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="accordion-row" data-visible="false" data-accordion-row="content-6">
    <h5 id="button-6">
      <button data-parent="accordion-2" class="accordion-button" data-target="content-6">
        Accordion Button 6
      </button>
    </h5>
    <div class="accordion-content" id="content-6">
      <p class="has-margin">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
</div>
<br/>

```html
<div data-accordion="new-accordion" class="accordion" data-toggle-multiple>
  ...
</div>
```

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

When making an accordion, there are two major considerations in its structure: the "wrapper" to encapsulate each accordion "row" (can be multiple), and each "row" which hold a button + corresponding content block.

```html
<div data-accordion="accordion-1" class="accordion">
  ...
  <div class="accordion-row" data-visible="true" data-accordion-row="content-1">
    <h5 id="button-1">
      <button data-parent="accordion-1" class="accordion-button" data-target="content-1">...</button>
    </h5>
    <div class="accordion-content" id="content-1">
      <p class="has-margin">...</p>
    </div>
  </div>
  ...
</div>
```

#### Primary Attributes

- `data-accordion`: an attribute for the accordion wrapper. It should have a unique value.
- `data-accordion-row`: an attribute for a row within a `data-accordion` wrapper. It should have a unique value matching to button's `data-target` attribute.
- `data-parent`: an attribute on an accordion row's button. It should have a value equal to its row's `data-accordion-row` attribute.
- `data-target`: an attribute on an accordion row's button. It should have a value equal to its content block's `id` attribute.
- `data-visible`: an attribute denoting if an accordion row's content is visible. Set it to `true` if you want a given row to be expanded by default.

#### Accessibility

A few key attributes are added for you when the accordion is instantiated. These help assistive technologies know how to treat and navigate through the component.

- `aria-labelledby`: an attribute on an accordion row's content block. It should have the same value as the `id` attribute on the accordion header tag.
- `aria-controls`: An attribute added to an accordion row's button, telling assistive technologies which exist element is controlled by the button.
- `aria-expanded`: An attribute added to an accordion row's button, telling assistive technologies if the row's content is visible.
- `aria-hidden`: An attribute added to the accordion row's content block, telling assistive technologies that the element can be ignored if it's set to `true` (content block is hidden).

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html) on best-practices for the accordion UI pattern.

#### Styling Classes

- `accordion`: gives wrapper styling to the accordion.
- `accordion-row`: wrapper class for an accordion row's button and content block.
- `accordion-button`: gives a row's button specific styling for the component.
- `accordion-content`: gives separator styling for a row.

Edit much of the styling within `_config.scss`.

### API

Call one of the following scripts from Undernet's JavaScript (not both!). This should happen _only once_ on page load/component mount/etc.

```js
Undernet.start()
```

```js
Undernet.Accordions.start()
```

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/accordions.md">Edit this page on Github!</a></p>
