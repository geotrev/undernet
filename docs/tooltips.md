Use tooltips to convey simple information with a hover or click action. It can be used on any element.

## Basic Tooltip

Check out this example tooltip:

<span role="tooltip">
  <button aria-describedby="new-tooltip" class="tooltip-button">Hover me!</button>
  <div id="new-tooltip" class="tooltip-box">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Disable Tooltip Arrow

If you don't want to include the little arrow pointing toward your tooltip trigger, you can flip it off using the variable `$tooltip-arrows-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `tooltip` element.

<span role="tooltip">
  <button aria-describedby="new-tooltip" class="tooltip-button">Hover me!</button>
  <div id="new-tooltip" class="tooltip-box has-no-arrow">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Use Custom Elements

Tooltips can be used with any element. Even traditionally non-hoverable elements.

<span role="tooltip">
  <span aria-describedby="new-tooltip" class="tooltip-button has-padding-2 has-gray900-bg"d>Hover me! (this is a normal div)</span>
  <div id="new-tooltip" class="tooltip-box">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Direction

Have the tooltip appear from the left, right, or bottom position by adding `is-drop-left`, `is-drop-right`, or `is-drop-down`, respectively.

<span role="tooltip">
  <button aria-describedby="new-tooltip" class="tooltip-button">Hover me!</button>
  <div id="new-tooltip" class="tooltip-box is-drop-left">
    This is a tooltip. It can hold text-based content.
  </div>
</span><span role="tooltip">
  <button aria-describedby="new-tooltip" class="tooltip-button">Hover me!</button>
  <div id="new-tooltip" class="tooltip-box is-drop-right">
    This is a tooltip. It can hold text-based content.
  </div>
</span><span role="tooltip">
  <button aria-describedby="new-tooltip" class="tooltip-button">Hover me!</button>
  <div id="new-tooltip" class="tooltip-box is-drop-down">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Requirements

Tooltips don't require JavaScript. All you need is the correct HTML structure.

### HTML

#### Trigger Classes

- `tooltip-button`: Used to identify the tooltip container. Doesn't apply styling.

#### Accessibility

A few key attributes are added for you when the dropdown is instantiated. These help assistive technologies know how to treat and navigate through the component.

- `role`: Defines the element. It should equal `tooltip`.
- `aria-describedby`: Describes which element is the tooltip. It should equal the `id` of your tooltip. 

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html) on best-practices for the menu button UI pattern.

#### Styling Classes

- `tooltip-box`: Adds tooltip styling.

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/dropdowns.md">Edit this page on Github!</a></p>
