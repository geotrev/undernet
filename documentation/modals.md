# Modals

Use modals to focus the user experience on a critical task or set of information. Modals have simple base styling, with the contents using a subjective markup structure.

## Basic Modal

Check out this example modal:

<button href="#" data-modal-button data-target="new-modal">Open modal</button>

<div class="modal-overlay" data-modal-id="new-modal">
  <div class="modal-dialog" aria-labelledby="header-id" data-modal>
    <header>
      <h2 class="h6 has-no-margin-top" id="header-id">
        Modal Header
      </h2>
      <a data-close href="#">
        <span aria-hidden="true">&times;</span>
        <span class"is-visually-hidden">close modal</span>
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer>
      <a class="button" data-close href="#">
        Cancel
      </a>
      <a class="primary button" href="#">
        OK
      </a>
    </footer>
  </div>
</div>

```html
<button href="#" data-modal-button data-target="new-modal">Open modal</button>
```
```html
<div class="modal-overlay" data-modal-id="new-modal">
  <div aria-labelledby="header-id" data-modal>
    <header>
      <h2 class="h6" id="header-id">
        Modal Header
      </h2>
      <a data-close href="#">
        <span aria-hidden="true">&times;</span>
        <span class"is-visually-hidden">close modal</span>
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer>
      <a class="button" data-close href="#">
        Cancel
      </a>
      <a class="primary button" href="#">
        OK
      </a>
    </footer>
  </div>
</div>
```

You can have custom contents as well (hence subjective markup). Meaning the header, section, and footer elements will have style from Undernet, but nothing is keeping you from using other elements instead (you may not need a header or footer, for example, and can just use a `div`).

## Centered Modal

Adding the `is-centered` class onto the modal overlay will vertically center the modal dialog on the screen.

<button href="#" data-modal-button data-target="new-modal-2">Open centered modal</button>

<div class="modal-overlay is-centered" data-modal-id="new-modal-2">
  <div class="modal-dialog" aria-labelledby="header-id-2" data-modal>
    <header>
      <h2 class="h6 has-no-margin-top" id="header-id-2">
        Modal Header
      </h2>
      <a data-close href="#">
        <span aria-hidden="true">&times;</span>
        <span class="is-visually-hidden">close modal</span>
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer>
      <a class="button" data-close href="#">
        Cancel
      </a>
      <a class="primary button" href="#">
        OK
      </a>
    </footer>
  </div>
</div>

```html
<button href="#" data-modal-button data-target="new-modal-2">Open centered modal</button>
```
```html
<div class="modal-overlay" data-modal-id="new-modal-2">
  <div class="modal-dialog is-centered" aria-labelledby="header-id-2" data-modal>
    <header>
      <h2 class="h6" id="header-id-2">
        Modal Header
      </h2>
      <a data-close href="#">
        <span aria-hidden="true">&times;</span>
        <span class"is-visually-hidden">close modal</span>
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer>
      <a class="button" data-close href="#">
        Cancel
      </a>
      <a class="primary button" href="#">
        OK
      </a>
    </footer>
  </div>
</div>
```

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

For the modal button, it should have two main properties:

```html
<button data-modal-button data-target="new-modal">Press me</button>
```

**Attributes**:
- `data-modal-button`: an attribute indicating this button opens a modal dialog.
- `data-target`: an attribute containing a unique id pointing to the modal overlay's `data-modal-id` attribute.

For the modal itself, you need a few more things.

```html
<div class="modal-overlay" data-modal-id="new-modal-2">
  <div class="modal-dialog is-centered" aria-labelledby="header-id-2" data-modal>
    <header>
      <h2 class="h6" id="header-id-2">...</h2>
      <a data-close href="#">
        <span aria-hidden="true">&times;</span>
        <span class"is-visually-hidden">close modal</span>
      </a>
    </header>
    <section>
      ...
    </section>
    <footer>
      <a class="button" data-close href="#">...</a>
    </footer>
  </div>
</div>
```

**Attributes**:
- `data-modal-id`: an attribute matching your corresponding button's `data-target`. Add it to the modal overlay element.
- `data-modal`: an attribute indicating the element is a modal dialog. It should be the immediate child of the modal overlay.
- `data-close`: an attribute indicating a button or link will close the modal dialog.

**Accessibility**:
- `aria-hidden`: an attribute that should be attached to any icons (close or otherwise) in the modal. Screen readers are inconsistent with icons, so they should be hidden instead. When using an icon, make sure you have `is-visually-hidden` text describing the action.
- `aria-labelledby`: an attribute to be attached to the modal dialog element. It should have a matching value to the header element's `id`.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) on best-practices for the dialog modal UI pattern.

**Styling:**
- `modal-overlay`: gives overlay styling for the modal background.
- `modal-dialog`: container for the dialog's contents.
- `is-centered`: a helper class that centers the modal vertically within the modal overlay.

Edit much of the styling within `_config.scss`.

#### Optional Elements

Each of these elements has corresponding options under `_config.scss`.

- `header`: Use a header tag to get a prestyled header wrapper meant for a title and close icon.
- `section` Use a section tag for inner-content of the modal.
- `footer`: Use a footer tag for a prestyled footer wrapper meant for call-to-actions.

### API

Call one of the following scripts from Undernet's JavaScript (not both!). This should happen _only once_ on page load/component mount/etc.

```js
Undernet.start()
```
```js
Undernet.Modals.start()
```

<p class="has-right-text">Is this article inaccurate? <a href="https://www.github.com/geotrev/undernet/wiki/modals">Edit this page on Github!</a></p>
