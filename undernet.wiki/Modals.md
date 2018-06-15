Add a modal to add focus to your web experience. They are simple to set up and can be easily customized with CSS.

To use it, you must enable the javascript plugin near the end of the `<body>`:

```js
document.addEventListener("DOMContentLoaded", () => {
  Undernet.Modals.start()
})
```

### Attributes & Parts

Modals depend on a few base attributes, and the rest (including aria) is derived from there.

```html
<a href="#" id="new-modal">Open modal</a>
<div data-modal-overlay data-modal-id="new-modal">
  <div aria-labelledby="header-id" data-modal>
    <header>
      <h2 class="h6" id="header-id">
        Modal Header
      </h2>
      <a data-modal-close href="#">
        <span aria-hidden="true">&times;</span>
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer>
      <a class="button" data-modal-close href="#">
        Cancel
      </a>
      <a class="primary button" href="#">
        OK
      </a>
    </footer>
  </div>
</div>
```

#### What's needed?
* `[data-modal-overlay]`: Adds styling and animations to the overlay.
* `[data-modal-id]`: The unique id for the container; it should match your button's `id` attribute.
* `[data-modal-close]`: Adding this to a link or button automatically allows your modal to be closed on click.

#### Accessibility
All main aria- attributes are added automatically, as mentioned, with the exception of `[aria-labelledby]`:

* `[aria-labelledby]`: The inner modal container should have this attribute pointing to the header element's `id` attribute. This helps assistive technologies identify the title/label of the content.

Next: [Accordions ►](accordions)
