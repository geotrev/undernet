1.  [Class Helpers](#class-helpers)
2.  [Mixins](#mixins)
3.  [Functions](#functions)

### Class Helpers

Along with Undernet’s element library includes several helper classes for handling certain cases of accessibility, typography, and visibility.

#### Typography

* `.has-sans-font`: Sets the container’s font family to `$global-font-sans`.
* `.has-serif-font`: Sets the container’s font family to `$global-font-serif`.
* `.has-center-text`: Sets the container and its children to have `text-align: center`.
* `.has-left-text`: Sets the container and its children to have `text-align: left;`.
* `.has-right-text`: Sets the container and its children to have `text-align: right;`.

#### Display

* `.is-block`: Sets the element to `display: block;`.
* `.is-flex`: Sets the element to `display: flex;`.
* `.is-hidden`: Sets the element to `display: none;`.

#### Display at breakpoint

To override a smaller breakpoint visibility modifier, use one at a larger breakpoint.

`SIZE` = breakpoint name. E.g., `small`, `medium`, etc.

* `.is-block-SIZE`
* `.is-flex-SIZE`
* `.is-hidden-SIZE`

#### A11y (accessibility / screen readers)

* `.is-visually-hidden`: General-use class to completely hide an element, visually, but leave it accessible to assistive technology.
* `.is-visually-hidden-focusable`: Extends `.is-visually-hidden` to allow keyboard focus.

### Mixins

There are a number of mixins used in Undernet to generate the many components. Learn about those mixins here along with how you can use them for your own custom components.

1.  [Flex](#flex)
2.  [Grid](#grid)
3.  [Media Queries](#media-queries)
4.  [Typography](#typography)

#### Flex

`flex` is a flexbox mixin helper. It takes core flex properties, and can be useful for setting those properties on parent and children elements.

```css
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

#### Grid

This is the core of Undernet's grid classes generator. It takes a single argument, `$size`, which is grabbed from one of the keywords in the `$breakpoints` map in `_config.scss`.

```css
@mixin grid-classes($size) { ... }
```

#### Media Queries

Used in many parts of Undernet, these simply generate various breakpoint `@media` queries. There are three options for media queries:

* `breakpoint-up`: Affects styles wider than a given size.
* `breakpoint-down`: Affects styles narrower than a given size.
* `breakpoint-between`: Affects styles between two sizes. e.g., xsmall and large would be between 0 and 992.

```css
@mixin breakpoint-up($size) { ... }
@mixin breakpoint-down($size) { ... }
@mixin breakpoint-between($min, $max) { ... }
```

#### Typography

There's one mixin used here to generate responsive behavior for header tags. This mixin takes one argument, a `$size`, which is grabbed from the `$type-header-sizes` map in `_config.scss`. The mixin then leverages `map-deep-get` to retrieve the various styles defined in that configuration.

```css
@mixin header-sizes($size) { ... }
```

### Functions

Right now there is one helper for navigating color maps.

#### `status()`

Takes a keyword as an argument, like `warning`, to capture that color's hex value from `$status-palette` in `_config.scss`.

```css
@function status($color) {
  @return map-get($status-palette, $color);
}
```

Next: [JavaScript Utilities ►](javascript-utilities)
