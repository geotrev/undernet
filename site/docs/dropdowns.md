---
title: Dropdowns
description: A component for nesting menu buttons within a menu button user interface.
permalink: /components/:basename
---

# {{ page.title }}

Use a dropdown to put multiple options or items in a single menu. Although they aren't always the most intuitive design pattern, they can be useful when space is limited.

## Basic Dropdown

Check out this example dropdown:

<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown1" data-target="dropdown-menu-id">Open Dropdown</button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

## Using Button Tags

You can also use `<button>` tags if you don't wish to use `<a>` tags in the menu itself.

<div data-dropdown="dropdown24" class="dropdown">
  <button id="dropdown-button-id24" data-parent="dropdown24" data-target="dropdown-menu-id24">Open Dropdown</button>
  <ul id="dropdown-menu-id24" class="dropdown-menu">
    <li><button>Button tag is used</button></li>
    <li><button>It looks identical!</button></li>
    <li><button>Semantics matter, choose wisely</button></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><button>Button tag is used</button></li>
    <li><button>It looks identical!</button></li>
    <li><button>Semantics matter, choose wisely</button></li>
  </ul>
</div>
```

## Disable Dropdown Menu Arrow

If you don't want to include the little arrow pointing toward your dropdown button, you can flip it off using the variable `$dropdown-arrow-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `dropdown-menu` element

<div data-dropdown="dropdown20" class="dropdown">
  <button id="dropdown-button-id20" data-parent="dropdown20" data-target="dropdown-menu-id20">Open Dropdown</button>
  <ul id="dropdown-menu-id20" class="dropdown-menu has-no-arrow">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu has-no-arrow">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

## Using Custom Buttons

You can use any button style with a dropdown. Just add the appropriate class to the dropdown button.

<div data-dropdown="dropdown2" class="dropdown">
  <button class="is-primary" id="dropdown-button-id2" data-parent="dropdown2" data-target="dropdown-menu-id2">Primary Button</button>
  <ul id="dropdown-menu-id2" class="dropdown-menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown3" class="dropdown">
  <button class="is-secondary" id="dropdown-button-id3" data-parent="dropdown3" data-target="dropdown-menu-id3">Secondary Button</button>
  <ul id="dropdown-menu-id3" class="dropdown-menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown4" class="dropdown">
  <button class="is-tertiary" id="dropdown-button-id4" data-parent="dropdown4" data-target="dropdown-menu-id4">Tertiary Button</button>
  <ul id="dropdown-menu-id4" class="dropdown-menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div>

## Alignment

All dropdowns, by default, are aligned inline-start, as shown in previous examples.

You can let it align inline-end using `is-aligned-inline-end`, or from block-end using `is-aligned-block-end` on the `dropdown-menu` element. Note that this only works for viewports above a specific width, as defined using the variable `$dropdown-direction-breakpoint` (sorry mobile viewers). Set this var to `'xsmall'` to remove the breakpoint.

<div data-dropdown="dropdown5" class="dropdown">
  <button id="dropdown-button-id5" data-parent="dropdown5" data-target="dropdown-menu-id5">Open Dropdown</button>
  <ul id="dropdown-menu-id5" class="dropdown-menu is-aligned-inline-end">
    <li><h6 class="dropdown-header">Aligned Block-End</h6></li>
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Right-Aligned Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-aligned-inline-end">
    <li><h6 class="dropdown-header">Aligned Block-End</h6></li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </ul>
</div>
```

## Direction

All dropdowns, by default, drop block-end, as shown in previous examples.

You can let it drop block-start, inline-start, and inline-end using `is-drop-block-start`, `is-drop-inline-start`, and `is-drop-inline-end`, respectively. Note that this only works for viewports above a specific width, as defined using the variable `$dropdown-direction-breakpoint` (sorry mobile viewers). Again, set this var to `'xsmall'` to remove the breakpoint.

<div data-dropdown="dropdown9" class="dropdown">
  <button id="dropdown-button-id9" data-parent="dropdown9" data-target="dropdown-menu-id9">Drop Block-Start</button>
  <ul id="dropdown-menu-id9" class="dropdown-menu is-drop-block-start">
    <li><a>Item 1</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown-id11" class="dropdown">
  <button id="dropdown-button-id11" data-parent="dropdown-id11" data-target="dropdown-menu-id30">Drop Inline-End</button>
  <ul id="dropdown-menu-id30" class="dropdown-menu is-drop-inline-end">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div> <div data-dropdown="dropdown10" class="dropdown">
  <button id="dropdown-button-id10" data-parent="dropdown10" data-target="dropdown-menu-id10">Drop Inline-Start</button>
  <ul id="dropdown-menu-id10" class="dropdown-menu is-drop-inline-start">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
  </ul>
</div>

```html
<!-- drop block-start -->
<div data-dropdown="dropdown-id1" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id1" data-target="dropdown-menu-id">
    Drop Block-Start
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-block-start">
    ...
  </ul>
</div>
<!-- drop inline-end -->
<div data-dropdown="dropdown-id2" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id2" data-target="dropdown-menu-id">
    Drop Inline-End
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-inline-end">
    ...
  </ul>
</div>
<!-- drop inline-start -->
<div data-dropdown="dropdown-id3" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id3" data-target="dropdown-menu-id">
    Drop Inline-Start
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-inline-start">
    ...
  </ul>
</div>
```

You can also combine direction with alignment to get even more customization!

<div data-dropdown="dropdown21" class="dropdown">
  <button id="dropdown-button-id21" data-parent="dropdown21" data-target="dropdown-menu-id21">Drop Block-Start, Aligned Inline-End</button>
  <ul id="dropdown-menu-id21" class="dropdown-menu is-drop-block-start is-aligned-inline-end">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown23" class="dropdown">
  <button id="dropdown-button-id23" data-parent="dropdown23" data-target="dropdown-menu-id23">Drop Inline-End, Aligned Block-End</button>
  <ul id="dropdown-menu-id23" class="dropdown-menu is-drop-inline-end is-aligned-block-end">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown22" class="dropdown">
  <button id="dropdown-button-id22" data-parent="dropdown22" data-target="dropdown-menu-id22">Drop Inline-Start, Aligned Block-End</button>
  <ul id="dropdown-menu-id22" class="dropdown-menu is-drop-inline-start is-aligned-block-end">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div>

```html
<!-- drop block-start & aligned inline-3nd -->
<div data-dropdown="dropdown-id1" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id1" data-target="dropdown-menu-id">
    Drop Block-Start, Aligned Inline-End
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-block-start is-aligned-inline-end">
    ...
  </ul>
</div>
<!-- drop inline-end & aligned block-end -->
<div data-dropdown="dropdown-id2" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id2" data-target="dropdown-menu-id">
    Drop Inline-End, Aligned Block-End
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-inline-end is-aligned-block-end">
    ...
  </ul>
</div>
<!-- drop inline-start & aligned block-end -->
<div data-dropdown="dropdown-id3" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id3" data-target="dropdown-menu-id">
    Drop Inline-Start, Aligned Block-End
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-inline-start is-aligned-block-end">
    ...
  </ul>
</div>
```

## Dropdown Menu Separator

Add an `<hr/>` to a dropdown list item to create a visual separator between buttons.

<div data-dropdown="dropdown6" class="dropdown">
  <button id="dropdown-button-id6" data-parent="dropdown6" data-target="dropdown-menu-id6">Open Dropdown</button>
  <ul id="dropdown-menu-id6" class="dropdown-menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a><hr /></li>
    <li><a>Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li>
      <a href="#">Item 2</a>
      <hr />
    </li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

## Dropdown Menu Text

Add headers and paragraph text to your dropdown for added context.

### Headers

You can add any level of header to a dropdown menu.

<div data-dropdown="dropdown7" class="dropdown">
  <button id="dropdown-button-id7" data-parent="dropdown7" data-target="dropdown-menu-id7">Open Dropdown</button>
  <ul id="dropdown-menu-id7" class="dropdown-menu">
    <li><h3 class="dropdown-header">Menu Header (h3)</h3></li>
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><h5 class="dropdown-header">Menu Header (h5)</h5></li>
    <li><a>Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><h3 class="dropdown-header">Menu Header (h3)</h3></li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><h5 class="dropdown-header">Menu Header (h5)</h5></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

### Paragraph Text

Paragraph text will wrap like it does everywhere else. Use spacing utilities to help it look organized.

<div data-dropdown="dropdown8" class="dropdown">
  <button id="dropdown-button-id8" data-parent="dropdown8" data-target="dropdown-menu-id8">Open Dropdown</button>
  <ul id="dropdown-menu-id8" class="dropdown-menu">
    <li class="has-p-sm has-gray800-text-color">
      Would you like to receive newsletters from Cool Company, Inc?
    </li>
    <li><a>Sure!</a></li>
    <li><a>Nope</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li class="has-p-sm has-gray800-text-color">
      Would you like to receive newsletters from Cool Company, Inc?
    </li>
    <li><a href="#">Sure!</a></li>
    <li><a href="#">Nope</a></li>
  </ul>
</div>
```

Learn more about [Spacing](/docs/layout/spacing) and [Color](/docs/utilities/color) helpers.

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Container Attributes

The dropdown container has both the button and the menu.

```html
<div data-dropdown="dropdown-id" class="dropdown">...</div>
```

- `data-dropdown`: an attribute containing a unique id for the dropdown container.

#### Trigger Attributes

The button needs a few key attributes as well.

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  ...
</div>
```

- `id`: a unique id describing the button.
- `data-parent`: an attribute containing the value of the container element's `data-dropdown` attribute.
- `data-target`: an attribute containing the value of the dropdown menu's `id` attribute.

#### Menu Attributes

The menu itself only needs one attribute.

```html
<div data-dropdown="dropdown1" class="dropdown">
  ...
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><a>Item 1</a></li>
    <li><a>Item 2</a></li>
    <li><a>Item 3</a></li>
  </ul>
</div>
```

- `id`: a unique id containing the value of the dropdown button's `data-target` attribute.

#### Accessibility

A few key attributes are added for you when the dropdown is instantiated. These help assistive technologies know how to treat and navigate through the component.

- `aria-expanded`: added to the button element, describing if the dropdown menu is visible or not.
- `aria-haspopup`: added to the button element, an attribute equal to `true`, it will tell assistive technologies this button has a menu associated with it.
- `aria-controls`: added to the button element, an attribute given to the dropdown button with matching value to the dropdown menu's `id`.
- `aria-labelledby`: added to the menu, an attribute that is assigned a value equal to the id from the dropdown button, telling assistive technologies the element that triggered the menu.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html) on best-practices for the menu button UI pattern.

#### Helper Classes

Required:

- `dropdown`: the container class providing inline and relative positioning of the component.
- `dropdown-menu`: the menu class that provides positioning relative to the button.

Optional:

- `is-aligned-inline-end`: aligns the menu to inline-end of the dropdown button.
- `is-aligned-block-end`: aligns the menu to block-end of the dropdown button.
- `is-drop-inline-start`: positions the menu to inline-start when open.
- `is-drop-inline-end`: positions the menu to inline-end when open.
- `is-drop-block-start`: positions the menu to block-start when open.

{% include partials/edit-on-github.html component="Dropdowns" %}
