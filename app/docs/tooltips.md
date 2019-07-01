Use tooltips to convey simple information with a hover, focus, or sometimes click (if on iOS) action. It can be used on any element with the right attributes.

## Basic Tooltip

Check out this example tooltip:

<span class="tooltip" data-tooltip="new-tooltip">
  <button class="tooltip-trigger" data-target="new-tooltip">Tooltip Button</button>
  <div class="tooltip-box" id="new-tooltip">
    This is a tooltip.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="new-tooltip">
  <button class="tooltip-trigger" data-target="new-tooltip">Tooltip Button</button>
  <div class="tooltip-box" id="new-tooltip">
    This is a tooltip.
  </div>
</span>
```

## Use HTML

The tooltip itself is just a div, so you can add any HTML you would normally use. Keep in mind tooltips are _not_ designed for interactivity, so any anchors or buttons shouldn't be placed there.

<span class="tooltip" data-tooltip="new-tooltip10">
  <button class="tooltip-trigger" data-target="new-tooltip10">Tooltip Button</button>
  <div class="tooltip-box" id="new-tooltip10">
    <em>This</em> <b>is a</b> <u>tooltip</u>.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="new-tooltip10">
  <button class="tooltip-trigger" data-target="new-tooltip10">Tooltip Button</button>
  <div class="tooltip-box" id="new-tooltip10">
    <em>This</em> <b>is a</b> <u>tooltip</u>.
  </div>
</span>
```

## Automatic Alignment

Tooltips will always automatically align to the middle of whichever element you are calling them on.

<span class="tooltip" data-tooltip="new-tooltip7">
  <button class="tooltip-trigger" data-target="new-tooltip7">Short</button>
  <div class="tooltip-box" id="new-tooltip7">
    This is a tooltip.
  </div>
</span>

<span class="tooltip" data-tooltip="new-tooltip8">
  <button class="tooltip-trigger" data-target="new-tooltip8">Reaaaaallllllly Long button</button>
  <div class="tooltip-box" id="new-tooltip8">
    This is a tooltip.
  </div>
</span>

## Disable Tooltip Arrow

If you don't want to include the little arrow pointing toward your tooltip trigger, you can flip it off using the variable `$tooltip-arrows-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `tooltip` element.

<span class="tooltip" data-tooltip="new-tooltip2">
  <button class="tooltip-trigger" data-target="new-tooltip2">Tooltip Button</button>
  <div class="tooltip-box has-no-arrow" id="new-tooltip2">
    This is a tooltip.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="new-tooltip2">
  <button class="tooltip-trigger" data-target="new-tooltip2">Tooltip Button</button>
  <div class="tooltip-box has-no-arrow" id="new-tooltip2">
    This is a tooltip.
  </div>
</span>
```

## Use Custom Elements

Tooltips can be used with any element. Even traditionally non-interactive elements, such as `div`s. You should add `tabindex="0"` to elements that don't naturally receive keyboard focus. This includes anything that isn't a button, input, or the like.

<span class="tooltip" data-tooltip="new-tooltip3">
  <span tabindex="0" class="tooltip-trigger has-gray900-bg has-padding-2" data-target="new-tooltip3">Tooltip (not a) Button</span>
  <div class="tooltip-box" id="new-tooltip3">
    This is a tooltip.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="new-tooltip3">
  <span tabindex="0" class="tooltip-trigger has-gray900-bg has-padding-2" data-target="new-tooltip3">Tooltip (not a) Button</span>
  <div class="tooltip-box" id="new-tooltip3">
    This is a tooltip.
  </div>
</span>
```
<br />
<br />

_CAUTION: If you go this route, you need to ensure the element behaves functionally the same as a button element, to ensure its focus is handled correctly._

## Disabled Buttons

Because `disabled` elements aren't focusable, you will need to instead place any appropriate tooltip attributes onto a `span` or `div` wrapping the disabled element.

<span class="tooltip" data-tooltip="new-tooltip9">
  <span tabindex="0" class="tooltip-trigger" data-target="new-tooltip9">
    <button disabled>Tooltip Button</button>
  </span>
  <div class="tooltip-box" id="new-tooltip9">
    Element is disabled!
  </div>
</span>

```html
<span class="tooltip" data-tooltip="new-tooltip9">
  <span tabindex="0" class="tooltip-trigger" data-target="new-tooltip9">
    <button disabled>Tooltip Button</button>
  </span>
  <div class="tooltip-box" id="new-tooltip9">
    Element is disabled!
  </div>
</span>
```

## Direction

Have the tooltip appear from the left, right, or bottom position by adding `is-drop-left`, `is-drop-right`, or `is-drop-down`, respectively.

<span class="tooltip" data-tooltip="new-tooltip5">
  <button class="tooltip-trigger" data-target="new-tooltip5">Drop Right</button>
  <div class="tooltip-box is-drop-right" id="new-tooltip5">
    Right tooltip.
  </div>
</span> <span class="tooltip" data-tooltip="new-tooltip4">
  <button class="tooltip-trigger" data-target="new-tooltip4">Drop Left</button>
  <div class="tooltip-box is-drop-left" id="new-tooltip4">
    Left tooltip.
  </div>
</span> <span class="tooltip" data-tooltip="new-tooltip6">
  <button class="tooltip-trigger" data-target="new-tooltip6">Drop Down</button>
  <div class="tooltip-box is-drop-down" id="new-tooltip6">
    Bottom tooltip.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="new-tooltip5">
  <button class="tooltip-trigger" data-target="new-tooltip5">Drop Right</button>
  <div class="tooltip-box is-drop-right" id="new-tooltip5">...</div>
</span> 
<span class="tooltip" data-tooltip="new-tooltip4">
  <button class="tooltip-trigger" data-target="new-tooltip4">Drop Left</button>
  <div class="tooltip-box is-drop-left" id="new-tooltip4">...</div>
</span> 
<span class="tooltip" data-tooltip="new-tooltip6">
  <button class="tooltip-trigger" data-target="new-tooltip6">Drop Down</button>
  <div class="tooltip-box is-drop-down" id="new-tooltip6">...</div>
</span>
```

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Container Attributes

- `data-tooltip`: A unique id to represent your new tooltip. It should match your trigger's `data-target` and tooltip's `id` attributes.

#### Trigger Attributes

- `data-target`: A unique id to represent the trigger for your tooltip. It should match the container's `data-tooltip` and tooltip's `id` attributes.

#### Tooltip Attributes

- `id`: A unique id to represent the tooltip itself. Your tooltip `id` value should match the container's `data-tooltip` and trigger's `data-target` attributes.

#### Accessibility

A few key attributes are added for you when the tooltip is instantiated. These help assistive technologies know how to treat and navigate through the component.

- `role`: Defines the element. It always equals `tooltip`.
- `aria-describedby`: Describes which element is the tooltip. It should equal the `id` of your tooltip.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices/#tooltip) on best-practices for the tooltip widget UI pattern.

#### Styling Classes

- `tooltip`: Wrapper class that adds assists with positioning the tooltip to its trigger.
- `tooltip-trigger`: Adds hover/focus handling for the tooltip.
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
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/dropdowns.md">Edit this page on Github!</a></p>
