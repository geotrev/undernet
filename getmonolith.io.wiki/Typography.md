Typography is a fairly light component in Monolith, but has many options for individual headers and text tags. Configuration can be found in `_config.scss`.

You’ll be able to use the tags as classless wrappers, or add the class of another tag to customize it like another typography element.

In other words, this is visually identical:

```html
<h3 class=“paragraph”>I’m a header styled as an paragraph!</h3>
```

To this:

```html
<p>I’m an actual paragraph!</p>
```

### Header Responsiveness

In Monolith, your `_config.scss` file will let you style different breakpoints (mapped to `$breakpoints` in your grid component) as a part of this map:

```sass
$type-header-sizes: (
  small: (
    // small breakpoint h1-h6
  ),
  medium: (
    // medium
  ),
  large: (
    // large
  ),
);
```

You can use any of the default (or custom, if you added any) breakpoints as extra keys for responsive behavior. 

### Header Styling

In addition, you can style each individual header using the `$type-header-styles` map. 

```sass
$type-header-styles: (
  h1: (
    color: $gray200,
    font-style: normal,
    font-weight: bold,
  ),
  // also includes h2-h6
);
```

Note: if you want to edit the font family of your headers, you can do so with typography [helper classes](classes).

### Inline Text

There are several options for inline text: `small`, `mark`, `pre`, `code`, `em`, and `strong`.

### Lists

Style basic list attributes like padding, margin, and list-style-type for both `ol` and `ul`.

Next: [Buttons ►](buttons)