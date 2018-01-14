Monolith’s button are fairly customizable and easy to use.

### Default Button

You should have nearly full control over your button’s various states within `_config.scss`. You’ll also be able to see these styles across relevant tags.

In this usage, you can use these tags with or without the `.button` class, which is especially helpful for anchor tags.

```html
<button>Go!</button>
<a class=“button” href=“#”>Go!</a>
```

For inputs, you can use `submit`, `button`, `file`, and `reset`:

```html
<input type=“submit” value=“Go!”>
```

### Block button

Using `.wide` as a modifier class, your buttons stretch full-wide in their container.

```html
<a class=“wide button” href=“#”>Go!</a>
```

### Button Sizes

By default, there are five button sizes, including the default (no size modifier class):

```html
<button class=“small”>Button</button>
<button class=“medium”>Button</button>
<button class=“large”>Button</button>
<button class=“huge”>Button</button>
```

You can remove, edit, or add extra sizes to fit your needs, as well.

### Custom Button Types

In `$button-types`, you can find some pre-made button types, like primary, secondary, and tertiary buttons. You can remove, edit, or add new ones if you want.

This should make it easier to quickly make new buttons without completely writing new state cases in long-form CSS.

```html
<button class=“primary”>Primary Button</button>
<button class=“secondary”>Secondary Button</button>
<button class=“tertiary”>Tertiary Button</button>
<button class=“inverted”>Inverted Button</button>
<button class=“inverted-outline”>Inverted Outline Button</button>
```

### Status Buttons

Also in `$button-types`, you can find status buttons. By default, there are four: `success`, `notice`, ‘destroy`, and `warning`. If anything, they’ll give you an idea of how to create more buttons in this pattern.

```html
<button class=“success”>Button</button>
<button class=“notice”>Button</button>
<button class=“destroy”>Button</button>
<button class=“warning”>Button</button>
```

### Links

In addition to having access to button styling, you can do the same for your links. They also have a `.link` class should you want that option as well.

```html

<a>Just a link!</a>
```
