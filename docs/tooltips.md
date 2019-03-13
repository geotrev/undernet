Use tooltips to convey simple information with a hover or click action. It can be used on any element.

## Basic Tooltip

Check out this example tooltip:

<span data-tooltip="new-tooltip" data-visible="false">
  <a href="#" data-target="new-tooltip" class="tooltip-button">Hover me!</a>
  <div id="new-tooltip" class="tooltip-box">
    <div>This is a tooltip. It can hold text-based content.</div>
  </div>
</span>

## Disable Tooltip Arrow

If you don't want to include the little arrow pointing toward your tooltip trigger, you can flip it off using the variable `$tooltip-arrows-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `tooltip` element.

## Use Custom Elements

Tooltips can be used with any element. Even traditionally non-hoverable elements.

## Direction

Have the tooltip appear from the left, right, or bottom position by adding `is-drop-left`, `is-drop-right`, or `is-drop-down`, respectively.

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Container Attributes

#### Trigger Attributes

#### Tooltip Attributes

#### Accessibility

A few key attributes are added for you when the dropdown is instantiated. These help assistive technologies know how to treat and navigate through the component.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html) on best-practices for the menu button UI pattern.

#### Styling Classes

A few classes will add the styling necessary of hide/show, and add menu positioning.

### API

Call one of the following scripts from Undernet's JavaScript (not both!). This should happen _only once_ on page load/component mount/etc.

```js
Undernet.start()
```

```js
Undernet.Tooltips.start()
```

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/dropdowns.md">Edit this page on Github!</a></p>
