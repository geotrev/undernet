Typography is a difficult component to get right, but as designers and developers it’s ideal to have options for each heading and text tag that could come in handy.

For that reason Typography is a fairly light component in Monolith. You’ll be able to use the tags as classless wrappers, or add the class of that tag to customize it like another typography element.

In other words, this is visually identical:

```html
<p class=“h3”>I’m a paragraph styled as an h3!</p>
```

To this:

```html
<h3>I’m an h3!</h3>
```

### Headers

In Monolith, your `_config.scss` file will let you style different breakpoints as a part of this map:

```sass
$type-header-sizes: (
  small: (
    // small breakpoint
  ),
  medium: (
    // medium breakpoint
  ),
  large: (
    // large breakpoint
  ),
);
```

You can use any of the default (or custom, if you added any) breakpoints as extra cases for responsive behavior. 

[Next: Buttons ⟶](buttons)