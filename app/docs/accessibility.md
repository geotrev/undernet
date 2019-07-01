Undernet's interactive components are built with the specific intention of being accessible to assistive technologies. To that end, Undernet tries to handle much of those complexities "under the hood" so developers don't need to worry about adding them manually.

## Screen Readers

To have content available in the DOM that isn't visible to sighted users, add the `.is-visually-hidden` class to the element. This is especially useful for adding context to controls that otherwise depend on visual landmarks, such as truncated descriptions and images.

```html
<button>
  Download
  <span class="is-visually-hidden"> PDF titled 'My Favorite Foods'</span>
</button>
```

To sighted users, the "Download" label has context from the surrounding content.

With hidden text, there is added context describing what the download is for, specifically to non-sighted and/or keyboard users.

[Learn more about visibility utilities.](/docs/utilities/display)

## Trap Focus

If you have a custom control that requires focus to be kept within it using tab / shift+tab, Undernet's JS utilities have you covered. This is currently used in the [Modal](/docs/components/modals) component.

Simply pass a selector to `captureFocus` property. You can enable trapping from `Utils`:

```js
Undernet.Utils.captureFocus(selector)
```

To release focus from that element, call the following:

```js
Undernet.Utils.releaseFocus()
```

`releaseFocus` doesn't need any arguments, as it assumes you are releasing focus from the most recently captured item.

## Focus Outline

For users who have poor eye sight or difficult motor reflexes, it's very hard to use a mouse since the pointer is too small or it requires too much precision. Instead, it's common for these types of users to instead surf the web with their keyboard.

To make identifying the active element on the page easier, an outline is applied to it when focused. To enable the outline, you can access it from `Utils`:

```js
Undernet.Utils.enableFocusOutline()
```

To disable it, use the following:

```js
Undernet.Utils.disableFocusOutline()
```

_NOTE: If you use `Undernet.start()` on any page, this utility is enabled by default._

The way the outline helper works is relatively straightforward. If you start to navigate (using tab or tab+shift keys), a class (`using-keyboard`) is added to the `<body>`. As a result, when focus is on certain elements (anchors, buttons, anything with a valid `tabindex` value, to name a few), they will get a bright outline around them. When you start to use your mouse again (by clicking anywhere on the page), the outline goes away.

All browsers have their own default outline style, but in general contrast of those styles aren't sufficient.

To see it in action, try hitting tab while on this website. Your focus indicator should be a blue outline on elements!

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/accessibility.md">Edit this page on Github!</a></p>
