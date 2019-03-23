Use tooltips to convey simple information with a hover or click action. It can be used on any element.

## Basic Tooltip

Check out this example tooltip:

<span class="tooltip" data-tooltip="new-tooltip">
  <button class="tooltip-trigger" data-parent="new-tooltip">Hover me!</button>
  <div class="tooltip-box" id="new-tooltip">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Automatic Alignment

Tooltips will always automatically align to the middle of whichever element you are calling them on.

<span class="tooltip" data-tooltip="new-tooltip7">
  <button class="tooltip-trigger" data-parent="new-tooltip7">Short Button</button>
  <div class="tooltip-box" id="new-tooltip7">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

<span class="tooltip" data-tooltip="new-tooltip8">
  <button class="tooltip-trigger" data-parent="new-tooltip8">Reaaaaallllllly long button</button>
  <div class="tooltip-box" id="new-tooltip8">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Disable Tooltip Arrow

If you don't want to include the little arrow pointing toward your tooltip trigger, you can flip it off using the variable `$tooltip-arrows-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `tooltip` element.

<span class="tooltip" data-tooltip="new-tooltip2">
  <button class="tooltip-trigger" data-parent="new-tooltip2">Hover me!</button>
  <div class="tooltip-box has-no-arrow" id="new-tooltip2">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## Use Custom Elements

Tooltips can be used with any element. Even traditionally non-hoverable elements, such as `div`s.

<span class="tooltip" data-tooltip="new-tooltip3">
  <span tabindex="0" class="tooltip-trigger has-gray900-bg has-padding-2" data-parent="new-tooltip3">Hover me!</span>
  <div class="tooltip-box" id="new-tooltip3">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

*CAUTION: If you go this route, you need to ensure the element behaves functionally the same as a button element, to ensure its focus is handled correctly.*

## Direction

Have the tooltip appear from the left, right, or bottom position by adding `is-drop-left`, `is-drop-right`, or `is-drop-down`, respectively.

<span class="tooltip" data-tooltip="new-tooltip4">
  <button class="tooltip-trigger" data-parent="new-tooltip4">Hover me!</button>
  <div class="tooltip-box is-drop-left" id="new-tooltip4">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

<span class="tooltip" data-tooltip="new-tooltip5">
  <button class="tooltip-trigger" data-parent="new-tooltip5">Hover me!</button>
  <div class="tooltip-box is-drop-right" id="new-tooltip5">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

<span class="tooltip" data-tooltip="new-tooltip6">
  <button class="tooltip-trigger" data-parent="new-tooltip6">Hover me!</button>
  <div class="tooltip-box is-drop-down" id="new-tooltip6">
    This is a tooltip. It can hold text-based content.
  </div>
</span>

## On Touch Devices

Since there's no "hover" on touch devices, how does the tooltip show? The JavaScript plugin is used to change the event to work with a click.

Try out any of these tooltips on your phone or tablet (or if you're already on one, you may have noticed it working).

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Container Attributes

- `data-tooltip`: A unique id to represent your new tooltip. It should match your trigger's `data-parent` and tooltip's `id` attributes.

#### Trigger Attributes

- `data-parent`: A unique id to represent the trigger for your tooltip. It should match the container's `data-tooltip` and tooltip's `id` attributes.

#### Tooltip Attributes

- `id`: A unique id to represent the tooltip itself. Your tooltip `id` value should match the container's `data-tooltip` and trigger's `data-parent` attributes.

#### Trigger Classes

- `tooltip-trigger`: Used to identify the tooltip container. Doesn't apply styling.

#### Accessibility

A few key attributes are added for you when the tooltip is instantiated. These help assistive technologies know how to treat and navigate through the component.

- `role`: Defines the element. It equals `tooltip`.
- `aria-describedby`: Describes which element is the tooltip. It should equal the `id` of your tooltip. 

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices/#tooltip) on best-practices for the tooltip widget UI pattern.

#### Styling Classes

- `tooltip`: Wrapper class that adds assists with positioning the tooltip to its trigger.
- `tooltip-box`: Adds tooltip styling. Special responsive styling is added with this too.

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
