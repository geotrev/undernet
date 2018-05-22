Monolith's modal component is easy to use if you're familiar with other frameworks.

To kick it off, you'll need a button with an id value matching your modal's `data-modal-name` attribute.

```html
<a href="#" id="new-modal">Open modal</a>
```

You'll also need the correct markup structure: an overlay (background) and modal container. The overlay should have your `data-modal-name` attribute.

```html
<div data-modal-overlay data-modal-name="new-modal">
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

Next: [Classes ►](classes)
