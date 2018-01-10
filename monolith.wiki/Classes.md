Along with Monolith’s component core includes several helper classes for handling certain cases of accessibility, typography, and visibility.

### Typography

* `.has-sans-font`: Sets the container’s font family to your global sans-serif.
* `.has-serif-font`: Sets the container’s font family to your global serif font.
* `.has-center-text`: Sets the container and its children to have `text-align: center`.
* `.has-left-text`: Sets the container and its children to have `text-align: left;`.
* `.has-right-text`: Sets the container and its children to have `text-align: right;`.

### Display

* `.is-block`: Sets the element to `display: block;`.
* `.is-flex`: Sets the element to `display: flex;`.
* `.is-not-displayed`: Sets the element to `display: none;`.

### A11y (accessibility / screen readers)

* `.is-visually-hidden`: General-use class to complete hide an element, visually, but leave it accessible to screen readers.
* `.is-visually-hidden-focusable`: Extends `.is-visually-hidden` to allow keyboard focus.

[Next: Helper Mixins =>](Mixins)