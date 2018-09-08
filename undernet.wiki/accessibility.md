# Accessibility

- WAI-ARIA compliant
- CSS classes for screen readers (.is-visually-hidden)
- JS focus trap

Undernet's interactive components are built with the specific intention of being accessible to assistive technologies. To that end, Undernet tries to handle much of those complexities "under the hood" so developers don't need to worry about adding them manually.

## Visually Hidden (screen readers)

To have content available in the DOM that isn't visible to sighted users, add the `.is-visually-hidden` class to the element. This is especially useful for adding context to controls that otherwise have minimal context.

```html
<button>
  Download
  <span class="is-visually-hidden"> PDF titled 'My Favorite Foods'</span>
</button>
```

## Trap Focus

If you have a custom control that requires focus to be kept within it using tab / shift+tab, Undernet's JS utilities have you covered.

```js
Undernet.Utils.captureFocus(element)
```

Simply pass a class, id, or attribute to the `captureFocus` method. To release focus from that element:

```js
Undernet.Utils.releaseFocus()
```

The `releaseFocus` method doesn't need any arguments, as it assumes you want to release focus from the most instance of `captureFocus` being called.

See a mistake? [Edit this page on Github!](https://www.github.com/geotrev/undernet/wiki/accessibility)
