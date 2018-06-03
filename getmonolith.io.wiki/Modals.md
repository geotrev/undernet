Monolith's modal component is relatively straightforward. To kick it off, you'll need a button with an id, and a container (the actual modal) with a `[data-modal-name]` attribute matching the button's id.

### Button

```html
<a href="#" id="new-modal">Open modal</a>
```

You'll also need the correct wrapper structure: an overlay (background) and modal container. Having the below markup structure with a `header`, `section`, and `footer` is not required, but it is styled by default for your convenience. You can use whatever content style you choose.

#### Close

Simply including `[data-modal-close]` on link elements that should dismiss the modal (including your custom primary action, if that's desired).

### Modal Example

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
