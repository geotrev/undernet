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
<span class="tooltip" data-tooltip="tooltip-id">
  <button class="tooltip-trigger" data-target="tooltip-id">Tooltip Button</button>
  <div class="tooltip-box" id="tooltip-id">
    This is a tooltip.
  </div>
</span>
```

## Use HTML

The tooltip itself is just a div, so you can add any HTML you would normally use. Keep in mind tooltips are _not_ designed for interactivity, so any anchors or buttons shouldn't be placed there.

<span class="tooltip" data-tooltip="new-tooltip10">
  <button class="tooltip-trigger" data-target="new-tooltip10">Tooltip With HTML</button>
  <div class="tooltip-box" id="new-tooltip10">
    <em>This</em> <b>is a</b> <u>tooltip</u>.
  </div>
</span> <span class="tooltip" data-tooltip="new-tooltip11">
  <button class="tooltip-trigger" data-target="new-tooltip11">Tooltip With More HTML</button>
  <div class="tooltip-box" id="new-tooltip11">
    This is a tooltip.
    <br /> It has a line-break!
  </div>
</span>

```html
<span class="tooltip" data-tooltip="tooltip-id-1">
  <button class="tooltip-trigger" data-target="tooltip-id-1">Tooltip Button</button>
  <div class="tooltip-box" id="tooltip-id-1">
    <em>This</em> <b>is a</b> <u>tooltip</u>.
  </div>
</span>
<span class="tooltip" data-tooltip="tooltip-id-2">
  <button class="tooltip-trigger" data-target="tooltip-id-2">Tooltip With More HTML</button>
  <div class="tooltip-box" id="tooltip-id-2">
    <em>This</em> <b>is a</b> <u>tooltip</u>.
    <br /> It has a line-rea
  </div>
</span>
```

## Automatic Centering

Tooltips will always automatically center to the middle of whichever element you are calling them on.

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

If you don't want to include the little arrow pointing toward your tooltip trigger, you can change it using the variable `$tooltip-arrow-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `tooltip-box` element.

<span class="tooltip" data-tooltip="new-tooltip2">
  <button class="tooltip-trigger" data-target="new-tooltip2">Tooltip Button</button>
  <div class="tooltip-box has-no-arrow" id="new-tooltip2">
    This is a tooltip.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="tooltip-id">
  <button class="tooltip-trigger" data-target="tooltip-id">Tooltip Button</button>
  <div class="tooltip-box has-no-arrow" id="tooltip-id">
    This is a tooltip.
  </div>
</span>
```

## Use Non-Interactive Elements (not recommended)

Tooltips can be used with any element. Even traditionally non-interactive elements, such as `div`s. You should add `tabindex="0"` to elements that don't naturally receive keyboard focus. This includes anything that isn't a button, input, or the like.

<span class="tooltip" data-tooltip="new-tooltip3">
  <span tabindex="0" class="tooltip-trigger is-d-block has-secondary-bg-color has-white-text-color has-p-sm" data-target="new-tooltip3">Tooltip (not a) Button</span>
  <div class="tooltip-box" id="new-tooltip3">
    This is a tooltip.
  </div>
</span>

```html
<span class="tooltip" data-tooltip="tooltip-id">
  <span tabindex="0" class="tooltip-trigger is-d-block has-secondary-bg-color has-white-text-color has-p-sm" data-target="tooltip-id">Tooltip (not a) Button</span>
  <div class="tooltip-box" id="tooltip-id">
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
  <span tabindex="0" class="tooltip-trigger is-d-block" data-target="new-tooltip9">
    <button disabled>Disabled Tooltip Button</button>
  </span>
  <div class="tooltip-box" id="new-tooltip9">
    Element is disabled!
  </div>
</span>

```html
<span class="tooltip" data-tooltip="tooltip-id">
  <span tabindex="0" class="tooltip-trigger is-d-block" data-target="tooltip-id">
    <button disabled>Tooltip Button</button>
  </span>
  <div class="tooltip-box" id="tooltip-id">
    Element is disabled!
  </div>
</span>
```

## Direction

All tooltips, by default, drop block-start and align center to their trigger element.

Have the tooltip appear from inline-start, inline-end, or block-end position by adding `is-drop-inline-start`, `is-drop-inline-end`, or `is-drop-block-end` classes, respectively.

<span class="tooltip" data-tooltip="new-tooltip5">
  <button class="tooltip-trigger" data-target="new-tooltip5">Drop Inline-End</button>
  <div class="tooltip-box is-drop-inline-end" id="new-tooltip5">
    Inline-end tooltip.
  </div>
</span> <span class="tooltip" data-tooltip="new-tooltip4">
  <button class="tooltip-trigger" data-target="new-tooltip4">Drop Inline-Start</button>
  <div class="tooltip-box is-drop-inline-start" id="new-tooltip4">
    Inline-start tooltip.
  </div>
</span> <span class="tooltip" data-tooltip="new-tooltip6">
  <button class="tooltip-trigger" data-target="new-tooltip6">Drop Block-End</button>
  <div class="tooltip-box is-drop-block-end" id="new-tooltip6">
    Block-end tooltip.
  </div>
</span>

```html
<!-- drop inline-end -->
<span class="tooltip" data-tooltip="tooltip-id-1">
  <button class="tooltip-trigger" data-target="tooltip-id-1">Drop Inline-End</button>
  <div class="tooltip-box is-drop-inline-end" id="tooltip-id-1">...</div>
</span> 
<!-- drop inline-start -->
<span class="tooltip" data-tooltip="tooltip-id-2">
  <button class="tooltip-trigger" data-target="tooltip-id-2">Drop Inline-Start</button>
  <div class="tooltip-box is-drop-inline-start" id="tooltip-id-2">...</div>
</span>
<!-- drop block-end -->
<span class="tooltip" data-tooltip="tooltip-id-3">
  <button class="tooltip-trigger" data-target="tooltip-id-3">Drop Block-End</button>
  <div class="tooltip-box is-drop-block-end" id="tooltip-id-3">...</div>
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

#### Helper Classes

Required:
- `tooltip`: assists with positioning the tooltip to its trigger.
- `tooltip-trigger`: adds hover/focus handling for the tooltip.
- `tooltip-box`: adds tooltip styling. Special responsive styling is added with this too.

Optional:
- `is-drop-inline-start`: positions the tooltip to inline-tart when open.
- `is-drop-inline-end`: positions the tooltip to inline-end when open.
- `is-drop-block-end`: positions the tooltip to block-end when open.

### API

Call one of the following scripts from Undernet's JavaScript (not both!). This should happen _only once_ on page load/component mount/etc.

```js
Undernet.start()
```

```js
Undernet.Tooltips.start()
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/dropdowns.md">Edit this page on Github!</a></p>
