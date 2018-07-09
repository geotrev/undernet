Use an accordion to hide and show chunks of content.

First, create an accordion based on the [html structure below](#accordion-example). There are some key parts to note [below](#button).

Then enable the javascript plugin near the end of the `<body>`:

```js
document.addEventListener("DOMContentLoaded", () => {
  Undernet.Accordions.start()
})
```

### Attributes & Parts

An accordion requires a few attributes to work, but are pretty self-explanatory:

```html
<div data-accordion="accordion1">
  <div data-expanded="true" data-accordion-row="content1">
    <h5 id="button1">
      <button data-parent="accordion1" data-target="content1">
        Accordion Button 1
      </button>
    </h5>
    <div id="content1" aria-labelledby="button1" data-content="visible">
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

- `[data-accordion]`: The container attribute. Must be equal to its children button's `[data-parent]` attribute on each button.
- `[data-accordion-row]`: Contains a given button and content block for an accordion row. Must be equal to `[data-target]` on the button, and the `[data-content]` element's `id`.
- `[data-expanded]`: This is used as both a wrapper for each button/content pair. Set to `"true"` if its content is expanded by default, and `"false"` otherwise.
- `[data-parent]`: Identifier for the container element. Used on each button.
- `[data-target]`: Identifier pointing a button to its content block's `id`.
- `[data-content]`: Identifier detecting if a content block is currently visible or not. Set to `"visible"` if it's expanded by default, and `"hidden"` otherwise.
- `[data-toggle-multiple]` (optional): Add to your `[data-accordion]` element to enable multiple accordion content blocks to be expanded at once, otherwise only one can be visible at a time (you can still have multiple open by default, but unless this attribute is present, they will all close except the one you selected, once you've clicked one).

#### Accessibility

All main aria- attributes are added automatically for you based on the structure above, with the exception of `[aria-labelledby]`:

- `[aria-labelledby]`: Each heading element inside the accordion should have an `id` with a value matching the `[data-content]` element's `[aria-labelledby]` attribute. This helps assistive technologies identify the title/label of the content.

### Accordion Example

All together, here is a two-row accordion:

```html
<div data-accordion="accordion1">
  <div data-expanded="true" data-accordion-row="content1">
    <h5 id="button1">
      <button data-parent="accordion1" data-target="content1">
        Accordion Button 1
      </button>
    </h5>
    <div id="content1" aria-labelledby="button1" data-content="visible">
      <p className="accordion-content">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div data-expanded="false" data-accordion-row="content2">
    <h5 id="button2">
      <button data-parent="accordion1" data-target="content2">
        Accordion Button 2
      </button>
    </h5>
    <div id="content2" aria-labelledby="button2" data-content="hidden">
      <p className="accordion-content">
        Nostrud enim qui ex sint incididunt aliquip ex laborum. Dolore velit Lorem
        consectetur magna non eu incididunt ex irure cillum consequat nisi. Fugiat nisi
        sunt amet adipisicing non sit ipsum ad pariatur do elit est officia magna. Enim
        deserunt duis irure do cupidatat laboris nostrud sint nulla nulla.
      </p>
    </div>
  </div>
</div>
```

Next: [Style Utilities ►](style-utilities)
