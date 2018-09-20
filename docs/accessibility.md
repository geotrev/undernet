# Accessibility</h1>

Undernet's interactive components are built with the specific intention of being accessible to assistive technologies. To that end, Undernet tries to handle much of those complexities "under the hood" so developers don't need to worry about adding them manually.

## Screen Readers

To have content available in the DOM that isn't visible to sighted users, add the `.is-visually-hidden` class to the element. This is especially useful for adding context to controls that otherwise depend on visual landmarks, such as truncated descriptions and images.

```html
<button>
  Download
  <span class="is-visually-hidden"> PDF titled 'My Favorite Foods'</span>
</button>
```

To sighted users, the this "Download" label has context to the surrounding page. With this hidden text, there is added context describing what the download is for, specifically.

[Learn more about visibility utilities.](/docs/utilities/visibility)

## Trap Focus

If you have a custom control that requires focus to be kept within it using tab / shift+tab, Undernet's JS utilities have you covered. This is currently used in the [Modal](/docs/components/modals) component.

```js
Undernet.Utils.captureFocus(selector)
```

Simply pass a selector to `captureFocus` property. To release focus from that element, call `releaseFocus`.

```js
Undernet.Utils.releaseFocus()
```

`releaseFocus` doesn't need any arguments, as it assumes you are releasing focus from the most recently captured item.

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/accessibility">Edit this page on Github!</a></p>
