---
title: CSS
description: Key features and patterns of Undernet's Sass and CSS library.
permalink: /overview/:basename
---

# {{ page.title }}

Undernet's CSS is the backbone of the framework. It's written in a module format with [Sass](https://sass-lang.com/).

The framework adopts a few conventions which help provide a predictable workflow.

## Configuration

You can customize three categories of framework styling:

1. **Globals** - Fonts, sizing, colors, spacing, etc; universal styles inherited by the rest of the framework.
2. **Elements** - Styles on tags such as buttons, inputs, and headers; limited only to single HTML elements.
3. **Components** - Composed HTML for UI patterns, some of which are interactive with JavaScript.

---

## Naming Patterns

Variables, functions, mixins, and classes each follow patterns to provide better understanding of the utility's intention.

### Variables

All Sass variables have names with a pattern of: `grouping-noun-value-state`. `grouping` is the only piece consistent in every variable, with a combination of the rest, and always in the same order.

Here's a few examples:

- `$grid-padding`: Grouping = `grid`; Noun = `padding`
- `$type-p-margin-bottom`: Grouping = `type`; Noun = `p`; Noun = `margin-bottom`
- `$button-base-states`: Grouping = `button`; Noun = `base-states`
- `$link-text-decoration-hover`: Grouping = `link`; Noun = `text-decoration`; State = `hover`
- `$modal-dialog-margin-narrow`: Grouping = `modal-dialog`; Noun = `margin`; State = `narrow`

See the variables available in `_config.scss`, organized from global to component-specific.

### Functions

There are only a handful of functions. Each is written as `noun-value`. Each function name always describes the thing it returns. E.g., `spacing-value` takes a size, such as `xs` or `lg`, and returns the value from the `$global-spacing-increments` map.

See the functions available in `utilities/_functions.scss`.

### Mixins

Mixins use the prefix `create-`. What is described after is a noun, describing the properties or elements returned. E.g., `create-grid-column-classes`, `create-header-sizes` (generates header tag selectors), etc.

See the mixins available in `utilities/_mixins.scss`.

### Classes

Classes are a bit more unique compared to variables or other Sass utilities. Classes take one of two flavors, a **Root** or a **Modifier**. They are named using a pattern similar to that of Sass variables.

- Root classes use nouns.
- Modifier classes have the structure `verb-breakpoint-noun-value-size`. A verb prefix is _always_ present. E.g., `is-*`, or `has-*`.

#### Roots

As explained, a Root class describes an object, e.g. a noun.

Examples include `dropdown-menu`, `button`, or `grid`.

#### Modifiers

Modifier's primary role is to, you guessed it, _modify_ styling in some way.

Here's a few examples:

- `is-lg`: modifies a `button` to make it `lg` in size.
- `is-xl-8`: modifies a `column` to make it 8 columns across at the `xl` breakpoint.
- `has-font-size-sm`: modifies the element to have a `sm` font-size.
- `has-padding-block-start-md`: modifies the element to have `md` spacing from the `block-start` position.
- `is-drop-inline-end`: modifies a `dropdown-menu` to "drop" from the `inline-end` position.

---

## Style Scope

Undernet has a special feature that helps you control where its styles are applied. When enabled, a scope will enforce that an element with a pre-defined class exists around any HTML in the document using framework styling.

As an example, let's say we enable the scope:

```css
/* in _config.scss */
$style-scope: "using-undernet";
```

Next, enable the scope wrapper in `undernet.scss`:

```css
.#{$style-scope} {
  /* Undernet file imports here */
}
```

Now we can distinguish where HTML will use framework styling, and ignore the rest of the page.

```html
<div class="using-undernet">
  <button>I have Undernet styling</button>
</div>
<button>I have native browser button</button>
```

By default, the `$style-scope` variable is set to an empty string, disabling it.

{% include partials/edit-on-github.html %}
