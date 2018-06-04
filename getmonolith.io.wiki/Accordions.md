Use an accordion to hide and show chunks of content.

First, create an accordion based on the [html structure below](#accordion-example). There are some key parts to note [below](#button).

Then enable the javascript plugin near the end of the `<body>`:

```js
document.addEventListener("DOMContentLoaded", () => {
  Monolith.accordions().start()
})
```

### Attributes & Parts

An accordion requires a few attributes to work, but are pretty self-explanatory:

```html
<div data-accordion="accordion1">
  <div data-accordion-expanded="true">
    <h5 id="button-1">
      <button data-accordion-parent="accordion1" aria-controls="content1" data-accordion-button="content1">
        Accordion Button 1
      </button>
    </h5>
    <div id="content1" aria-labelledby="button-1" data-accordion-content="visible">
      <p class="accordion-content">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  ...
</div>
```

#### What's needed?
* `[data-accordion]`: The container attribute. Must be equal to its children's `[data-accordion-parent]` attribute on each button.
* `[data-accordion-expanded]`: This is used as both a wrapper for each button/content pair. Set to `"true"` if its content is expanded by default, and `"false"` otherwise.
* `[data-accordion-parent]`: Identifier for the container element. Used on each button.
* `[data-accordion-button]`: Identifier pointing a button to its corresponding content block.
* `[data-accordion-content]`: Identifier detecting if a content block is currently visible or not. Set to `"visible"` if it's expanded by default, and `"hidden"` otherwise.
* `[data-accordion-toggle-multiple]` (optional): Add to your `[data-accordion]` element to enable multiple accordion content blocks to be expanded at once, otherwise only one can be visible at a time (you can still have multiple open by default, but unless this attribute is present, they will all close except the one you selected, once you've clicked one).


#### Accessibility
All main aria- attributes are added automatically for you based on the structure above, with the exception of `[aria-controls]` and `[aria-labelledby]`:

* `[aria-controls]`: Each accordion button must have this attribute pointing to its corresponding `[data-accordion-content]` element's `id` attribute. This tells assistive technologies these two elements are related and should be treated as a show/hide widget.
* `[aria-labelledby]`: Each heading element inside the accordion should have an `id` with a value matching the `[data-accordion-content]` element's `[aria-labelleby]` attribute. This helps assistive technologies identify the title/label of the content.

### Accordion Example

All together, here is a two-row accordion:

```html
<div data-accordion="accordion1">
  <div data-accordion-expanded="true">
    <h5 id="button-1">
      <button data-accordion-parent="accordion1" aria-controls="content1" data-accordion-button="content1">
        Accordion Button 1
      </button>
    </h5>
    <div id="content1" aria-labelledby="button-1" data-accordion-content="visible">
      <p class="accordion-content">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div data-accordion-expanded="false">
    <h5 id="button-2">
      <button data-accordion-parent="accordion2" aria-controls="content2" data-accordion-button="content2">
        Accordion Button 2
      </button>
    </h5>
    <div id="content2" aria-labelledby="button-2" data-accordion-content="hidden">
      <p class="accordion-content">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
</div>
```

Next: [Style Utilities ►](style-utilities)
