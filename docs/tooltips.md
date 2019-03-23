Use tooltips to convey simple information with a hover or click action. It can be used on any element.

## Basic Tooltip

Check out this example tooltip:

<span class="tooltip">
  <button class="tooltip-trigger" aria-describedby="new-tooltip">Hover me!</button>
  <div class="tooltip-box" role="tooltip" id="new-tooltip">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Disable Tooltip Arrow

If you don't want to include the little arrow pointing toward your tooltip trigger, you can flip it off using the variable `$tooltip-arrows-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `tooltip` element.

<span class="tooltip">
  <button class="tooltip-trigger" aria-describedby="new-tooltip2">Hover me!</button> 
  <div class="tooltip-box has-no-arrow" role="tooltip" id="new-tooltip2">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Use Custom Elements

Tooltips can be used with any element. Even traditionally non-hoverable elements, such as `div`s.

<span class="tooltip">
  <span tabindex="0" class="tooltip-trigger has-gray900-bg has-padding-2" aria-describedby="new-tooltip3">Hover me!</span> 
  <div class="tooltip-box" role="tooltip" id="new-tooltip3">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

*CAUTION: If you go this route, you need to ensure the element behaves functionally the same as a button element, to ensure its focus is handled correctly.*

## Direction

Have the tooltip appear from the left, right, or bottom position by adding `is-drop-left`, `is-drop-right`, or `is-drop-down`, respectively.

<span class="tooltip">
  <button class="tooltip-trigger" aria-describedby="new-tooltip4">Hover me!</button> 
  <div class="tooltip-box is-drop-left" role="tooltip" id="new-tooltip4">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

<span class="tooltip">
  <button class="tooltip-trigger" aria-describedby="new-tooltip5">Hover me!</button> 
  <div class="tooltip-box is-drop-right" role="tooltip" id="new-tooltip5">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

<span class="tooltip">
  <button class="tooltip-trigger" aria-describedby="new-tooltip6">Hover me!</button> 
  <div class="tooltip-box is-drop-down" role="tooltip" id="new-tooltip6">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Trigger Classes

- `tooltip-trigger`: Used to identify the tooltip container. Doesn't apply styling.

#### Accessibility

A few key attributes are needed for tooltips to be accessible. These help assistive technologies know how to treat and navigate through the component.

- `role`: Defines the element. It should equal `tooltip`.
- `aria-describedby`: Describes which element is the tooltip. It should equal the `id` of your tooltip. 

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices/#tooltip) on best-practices for the tooltip widget UI pattern.

#### Styling Classes

- `tooltip`: Wrapper class that adds assists with positioning the tooltip to its trigger.
- `tooltip-box`: Adds tooltip styling.

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
