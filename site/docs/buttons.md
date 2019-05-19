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

Using `.wide` as a modifier class, your buttons stretch full-width in their container.

<button class="wide">Button Tag</button>
<a class="wide button">Anchor Tag</a>
<input class="wide" type="button" value="Input Tag" />

```html
<button class="wide">Button Tag</button>
<a class="wide button">Anchor Tag</a>
<input class="wide" type="button" value="Input Tag" />
```

## Button Sizes

Defined in `$button-sizes` is a list of keys (classes) mapped to padding and font-sizes to modify your buttons. Remove, edit, or add extra sizes to fit your needs.

<button class="huge">Submit</button>
<button class="large">Submit</button>
<button class="medium">Submit</button>
<button class="small">Submit</button>

```html
<button class="huge">Submit</button>
<button class="large">Submit</button>
<button class="medium">Submit</button>
<button class="small">Submit</button>
```

## Custom Button Types

Create custom buttons easily in the `$button-types` scss map. Like in the `$button-base` map, the states included are `hover`, `active`, and `focus`.

<button class="primary">Primary Button</button>
<button class="secondary">Secondary Button</button>
<button class="tertiary">Tertiary Button</button>

<p>
  <div class="inverted-bg">
    <button class="inverted">Inverted Button</button>
    <button class="inverted-outline">Inverted Outline Button</button>
  </div>
</p>

```html
<button class="primary">Primary Button</button>
<button class="secondary">Secondary Button</button>
<button class="tertiary">Tertiary Button</button>
<button class="inverted">Inverted Button</button>
<button class="inverted-outline">Inverted Outline Button</button>
```

### Status Buttons

Also in the same map as `$button-types`, you can find status buttons. By default, there are four: `success`, `notice`, `destroy`, and `warning`.

<button class="success">Success Button</button>
<button class="notice">Notice Button</button>
<button class="warning">Warning Button</button>
<button class="destroy">Destroy Button</button>

```html
<button class="success">Success Button</button>
<button class="notice">Notice Button</button>
<button class="warning">Warning Button</button>
<button class="destroy">Destroy Button</button>
```

## Links

Also Add styles for your regular anchor links.

<a href="#0">Just a link!</a>

```html
<a href="#">Just a link!</a>
```

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/buttons.md">Edit this page on Github!</a></p>
