There are a number of mixins used in Monolith to generate the many components. Learn about those mixins here along with how you can use them for your own custom components.

1. [Button](#button)
2. [Flex](#flex)
3. [Grid](#grid)
4. [Media Queries](#media-queries)
5. [Typography](#typography)

### Button

The button mixing behaves as a template for new buttons. It has 16 arguments, handling all states of `box-shadow`, `color`, `border-color`, and `background`.

The mixin sets all defaults of these arguments to the default values in `_config.scss`. This mixin is then reused to generate button types from `$button-types`, also in `_config.scss`.

Defaults:
```sass
@mixin button-style(
  // default state
  $box-shadow: $button-box-shadow,
  $border-color: $button-border-color,
  $color: $button-color,
  $background: $button-background,
  // :hover
  $box-shadow-hover: $button-box-shadow-hover,
  $border-color-hover: $button-border-color-hover,
  $color-hover: $button-color-hover,
  $background-hover: $button-background-hover,
  // :active
  $box-shadow-active: $button-box-shadow-active,
  $border-color-active: $button-border-color-active,
  $color-active: $button-color-active,
  $background-active: $button-background-active,
  // :focus
  $box-shadow-focus: $button-box-shadow-focus,
  $border-color-focus: $button-border-color-focus,
  $color-focus: $button-color-focus,
  $background-focus: $button-background-focus
) { ... ]
```

### Flex

`flex` is a flexbox mixin helper. It takes core flex properties, and can be useful for setting those properties on parent and children elements.

```sass
@mixin flex(
  $display: null,
  $direction: null,
  $wrap: null,
  $grow: null,
  $shrink: null,
  $basis: null,
  $align: null
) { ... }
```

### Grid

This is the core of Monolith's grid classes generator. It takes a single argument, `$size`, which is grabbed from one of the keywords in the `$breakpoints` map in `_config.scss`.

```sass
@mixin grid-classes($size) { ... }
```

### Media Queries

Used in many parts of Monolith, these simply generate various breakpoint `@media` queries. There are three options for media queries: 

* `breakpoint-up`: Affects styles wider than a given size.
* `breakpoint-down`: Affects styles narrower than a given size. 
* `breakpoint-between`: Affects styles between two sizes.

```sass
@mixin breakpoint-up($size) { ... }
@mixin breakpoint-down($size) { ... }
@mixin breakpoint-between($min, $max) { ... }
```

### Typography

There's one mixin used here to generate responsive behavior for header tags. This mixin takes one argument, a `$size`, which is grabbed from the `$type-header-sizes` map in `_config.scss`. The mixin then leverages `map-deep-get` to retrieve the various styles defined in that configuration.

```sass
@mixin header-sizes($size) { ... }
```

[Next: Helper Functions ⟶](functions)