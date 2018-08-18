Typography elements have many options for individual headers and text tags. Configuration can be found in `_config.scss`.

You’ll be able to use the tags as classless wrappers, or add the class of another tag to customize it like another typography element (useful for headers).

In other words, this is visually identical:

```html
<h3 class=“paragraph”>I’m a header styled as a paragraph!</h3>
```

To this:

```html
<p>I’m an actual paragraph!</p>
```

### Header Responsiveness

Customize your headers by breakpoint. Included are 'font-size' and 'margin', but you can add other properties  in sass' `key: value` format.

```css
$type-header-sizes: (
  xsmall: (
    // h1-h6 at xsmall
  ),
  medium: (
    // medium
  ),
  large: (
    // large
  ),
);
```

Add more breakpoints as defined in `$breakpoints` for more flexibility.

### Header Styling

In addition, you can style each individual header using the `$type-header-styles` map. Like with `$type-header-sizes`, you can add custom css properties here.

```css
$type-header-styles: (
  h1: (
    color: $gray200,
    font-style: normal,
    font-weight: bold,
  ),
  // also includes h2-h6
);
```

Note: if you want to edit the font family of your headers, you can do so with typography [helper classes](style-utilities).

### Inline Text

There are several options for inline text: `small`, `mark`, `pre`, `code`, `em`, and `strong` elements.

### Lists

Style basic list attributes like padding, margin, and list-style-type for both `ol` and `ul` elements.

Next: [Buttons ►](buttons)
