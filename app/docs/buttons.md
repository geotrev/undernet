The button element in Undernet is unique in similar fashion to the typography. All states are controllable via the scss maps, [`$button-base`](/docs/elements/buttons#base-button) and [`$button-types`](/docs/elements/buttons#custom-button-types). You can also customize button sizes via [`$button-sizes`](/docs/elements/buttons#button-sizes).

These maps output their keys and values as css properties. This means you can add any `property: value` normally found in CSS into these maps.

## Base Button

Customize the base, `hover`, `active`, and `focus` states of the base button.

Button styling can be added to inputs, anchors and buttons with or without the `button` class.

<button>Button Tag</button>
<a class="button">Anchor Tag</a>
<input type="button" value="Input Tag" />

```html
<button>Button Tag</button>
<a class="button">Anchor Tag</a>
<input type="button" value="Input Tag" />
```

All button input "types" will receive styling, even without the `button` class.

## Block button

Using `is-wide` as a modifier class, your buttons stretch full-width in their container.

<button class="is-wide">Button Tag</button>
<a class="button is-wide">Anchor Tag</a>
<input class="is-wide" type="button" value="Input Tag" />

```html
<button class="is-wide">Button Tag</button>
<a class="button is-wide">Anchor Tag</a>
<input class="is-wide" type="button" value="Input Tag" />
```

## Button Sizes

Defined in `$button-sizes` is a list of keys (classes) mapped to padding and font-sizes to modify your buttons. Remove, edit, or add extra sizes to fit your needs.

<button class="is-huge">Huge</button>
<button class="is-large">Large</button>
<button class="is-medium">Medium</button>
<button class="is-small">Small</button>

```html
<button class="is-huge">Huge</button>
<button class="is-large">Large</button>
<button class="is-medium">Medium</button>
<button class="is-small">Small</button>
```

## Custom Button Types

Create custom buttons easily in the `$button-types` scss map. Like in the `$button-base` map, the states included are `hover`, `active`, and `focus`.

<button class="is-primary">Primary</button>
<button class="is-secondary">Secondary</button>
<button class="is-tertiary">Tertiary</button>

<p>
  <div class="inverted-bg">
    <button class="is-inverted">Inverted</button>
    <button class="is-inverted-outline">Inverted Outline</button>
  </div>
</p>

```html
<button class="is-primary">Primary</button>
<button class="is-secondary">Secondary</button>
<button class="is-tertiary">Tertiary</button>
<button class="is-inverted">Inverted</button>
<button class="is-inverted-outline">Inverted Outline</button>
```

### Status Buttons

Also in the same map as `$button-types`, you can find status buttons. By default, there are four: `success`, `notice`, `destroy`, and `warning`.

<button class="is-success">Success</button>
<button class="is-notice">Notice</button>
<button class="is-warning">Warning</button>
<button class="is-destroy">Destroy</button>

```html
<button class="is-success">Success</button>
<button class="is-notice">Notice</button>
<button class="is-warning">Warning</button>
<button class="is-destroy">Destroy</button>
```

## Disabled Buttons

Show a button is disabled using the `disabled` attribute or `is-disabled` class. Also works on `input`s, as well as `a` tags using the `button` class.

<button disabled>Disabled Attribute</button>
<button class="is-disabled">Disabled Class</button>

```html
<button disabled>Disabled Attribute</button>
<button class="is-disabled">Disabled Class</button>
```

## Links

Control the look and feel of your links as well. They don't require any modifier classes.

<a href="#0">Just a link!</a>

```html
<a href="#">Just a link!</a>
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/buttons.md">Edit this page on Github!</a></p>
