# Accessibility</h1>

Undernet's interactive components are built with the specific intention of being accessible to assistive technologies. To that end, Undernet tries to handle much of those complexities "under the hood" so developers don't need to worry about adding them manually.

## Screen Readers

To have content available in the DOM that isn't visible to sighted users, add the `.is-visually-hidden` class to the element. This is especially useful for adding context to controls that otherwise depend on visual landmarks, such as descriptions and images.

```html
<button>
  Download
  <span class="is-visually-hidden"> PDF titled 'My Favorite Foods'</span>
</button>
```

[Learn more about visibility utilities.](/docs/utilities/visibility)

## Trap Focus

If you have a custom control that requires focus to be kept within it using tab / shift+tab, Undernet's JS utilities have you covered. This is currently used in the [Modal](/docs/components/modals) component.

```js
Undernet.Utils.captureFocus(element)
```

Simply pass a class, id, or attribute to the `captureFocus` method. To release focus from that element:

```js
Undernet.Utils.releaseFocus()
```

The `releaseFocus` method doesn't need any arguments, as it assumes you want to release focus from the most recent instance of `captureFocus`.

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/accessibility">Edit this page on Github!</a></p>
