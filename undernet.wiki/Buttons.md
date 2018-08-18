Use buttons for call to actions or other user interactions. Can be used with [modals](modals). Configuration can be found in `_config.scss`.

### Base Button

Style the following tags to look like your default (and custom) button styling: `a`, `button`, and `input`.

```html
<button>Submit</button>
<a class=“button” href=“#”>Submit</a>
<input type="button" value="Submit" />
```

For `input`, valid `type`s are `button`, `submit`, `reset`, and `file`.

### Block button

Using `.wide` as a modifier class, your buttons stretch full-width in their container.

```html
<button class="wide">Submit</button>
<a class=“wide button” href=“#”>Submit</a>
<input type="button" class="wide" value="Submit" />
```

### Default Button States

`$button-default` is a map defining states for the base button. It accepts custom CSS for each state.

### Button Sizes

Defined in `$button-sizes` is a list of classes mapped to padding and font-sizes to modify your buttons. It accepts custom CSS for each size.

```html
<button class=“small”>Submit</button>
<button class=“medium”>Submit</button>
<button class=“large”>Submit</button>
<button class=“huge”>Submit</button>
```

### Custom Button Types

In the `$button-types` map, you can find some pre-made button types, like primary, secondary, and tertiary buttons. Each button type accepts custom CSS for the given states.

```html
<button class=“primary”>Primary Button</button>
<button class=“secondary”>Secondary Button</button>
<button class=“tertiary”>Tertiary Button</button>
<button class=“inverted”>Inverted Button</button>
<button class=“inverted-outline”>Inverted Outline Button</button>
```

#### Status Buttons

Also in `$button-types`, you can find status buttons. By default, there are four: `success`, `notice`, `destroy`, and `warning`. They accept custom CSS for each state.

```html
<button class=“success”>Button</button>
<button class=“notice”>Button</button>
<button class=“destroy”>Button</button>
<button class=“warning”>Button</button>
```

### Links

In addition to having access to button styling, you can do the same for your `<a>` elements. Then write links like you normally would:

```html
<a>Just a link!</a>
```

Next: [Forms ►](forms)
