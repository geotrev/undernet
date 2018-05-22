Monolith’s button are fairly customizable and easy to use. Configuration can be found in `_config.scss`.

### Default Button

You should have nearly full control over your button’s various states. You’ll also be able to see these styles across relevant tags: `a`, `button`, and `input`.

```html
<button>Submit</button>
<a class=“button” href=“#”>Submit</a>
<input type="button" value="Submit" />
```

For `input`, valid `type`s are `button`, `submit`, `reset`, and `file`. If you're using a newer tag that isn't supported by Monolith, just add `.button` to the element and it should work as expected.

### Block button

Using `.wide` as a modifier class, your buttons stretch full-width in their container.

```html
<button class="wide">Submit</button>
<a class=“wide button” href=“#”>Submit</a>
<input type="button" class="wide" value="Submit" />
```

### Button Sizes

Defined in `$button-sizes` is a list of classes mapped to padding and font-sizes to modify your buttons.

```html
<button class=“small”>Submit</button>
<button class=“medium”>Submit</button>
<button class=“large”>Submit</button>
<button class=“huge”>Submit</button>
```

You can remove, edit, or add extra sizes to fit your needs.

### Custom Button Types

In the `$button-types` map, you can find some pre-made button types, like primary, secondary, and tertiary buttons. Like with `$button-sizes`, you can remove, edit, or add new ones if you want.

This should make it easier to quickly make new buttons with explicit `:focus`, `:active`, and `:hover` styling.

```html
<button class=“primary”>Primary Button</button>
<button class=“secondary”>Secondary Button</button>
<button class=“tertiary”>Tertiary Button</button>
<button class=“inverted”>Inverted Button</button>
<button class=“inverted-outline”>Inverted Outline Button</button>
```

#### Status Buttons

Also in the same map, you can find status buttons. By default, there are four: `success`, `notice`, `destroy`, and `warning`. If anything, they’ll give you an idea of how to create more buttons in this pattern.

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
