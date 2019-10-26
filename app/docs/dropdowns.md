Use a dropdown to put multiple options or items in a single menu. Although they aren't always the most intuitive design pattern, they can be useful when space is limited.

## Basic Dropdown

Check out this example dropdown:

<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown1" data-target="dropdown-menu-id">Open Dropdown</button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
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

## Disable Dropdown Arrow

If you don't want to include the little arrow pointing toward your dropdown button, you can flip it off using the variable `$dropdown-arrows-enabled`. It is set to `true` by default.

Alternatively, you can force the arrow to hide using the `has-no-arrow` class on the `dropdown-menu` element

<div data-dropdown="dropdown20" class="dropdown">
  <button id="dropdown-button-id20" data-parent="dropdown20" data-target="dropdown-menu-id20">Open Dropdown</button>
  <ul id="dropdown-menu-id20" class="dropdown-menu has-no-arrow">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
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
  <button class="primary" id="dropdown-button-id2" data-parent="dropdown2" data-target="dropdown-menu-id2">Primary Button</button>
  <ul id="dropdown-menu-id2" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown3" class="dropdown">
  <button class="secondary" id="dropdown-button-id3" data-parent="dropdown3" data-target="dropdown-menu-id3">Secondary Button</button>
  <ul id="dropdown-menu-id3" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown4" class="dropdown">
  <button class="tertiary" id="dropdown-button-id4" data-parent="dropdown4" data-target="dropdown-menu-id4">Tertiary Button</button>
  <ul id="dropdown-menu-id4" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

## Alignment

Dropdowns align to the left of their respective button by default, but you can let it align from the right using `is-aligned-end`, or from the bottom using `is-aligned-bottom` on the dropdown menu element. Note that this only works for viewports above a specific width, as defined using the variable `$dropdown-menu-direction-breakpoint` (sorry mobile viewers).

<div data-dropdown="dropdown5" class="dropdown">
  <button id="dropdown-button-id5" data-parent="dropdown5" data-target="dropdown-menu-id5">Open Dropdown</button>
  <ul id="dropdown-menu-id5" class="dropdown-menu is-aligned-end">
    <li><h6 class="dropdown-header">Aligned right!</h6></li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Right-Aligned Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-aligned-end">
    <li><h6 class="dropdown-header">Aligned right!</h6></li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </ul>
</div>
```

## Direction

Using a few custom classes, you can specify where the menu pops open relative to its button. The available classes are `is-drop-up`, `is-drop-start`, and `is-drop-end`. Note that this only works for viewports above a specific width, as defined using the variable `$dropdown-menu-direction-breakpoint` (sorry mobile viewers).

<div data-dropdown="dropdown9" class="dropdown">
  <button id="dropdown-button-id9" data-parent="dropdown9" data-target="dropdown-menu-id9">Open Up</button>
  <ul id="dropdown-menu-id9" class="dropdown-menu is-drop-up">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown=" class="dropdown">
  <button id="dropdown-button-id11" data-parent=" data-target="new">Open Right</button>
  <ul id="new" class="dropdown-menu is-drop-end">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown10" class="dropdown">
  <button id="dropdown-button-id10" data-parent="dropdown10" data-target="dropdown-menu-id10">Open Left</button>
  <ul id="dropdown-menu-id10" class="dropdown-menu is-drop-start">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

```html
<!-- drop up -->
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">Open Up</button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-up">
    ...
  </ul>
</div>
<!-- drop right -->
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Right
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-end">
    ...
  </ul>
</div>
<!-- drop left -->
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Left
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-start">
    ...
  </ul>
</div>
```

You can also combine direction with alignment to get even more customization!

<div data-dropdown="dropdown21" class="dropdown">
  <button id="dropdown-button-id21" data-parent="dropdown21" data-target="dropdown-menu-id21">Open Up, Aligned Right</button>
  <ul id="dropdown-menu-id21" class="dropdown-menu is-drop-up is-aligned-end">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown23" class="dropdown">
  <button id="dropdown-button-id23" data-parent="dropdown23" data-target="dropdown-menu-id23">Open Right, Aligned Bottom</button>
  <ul id="dropdown-menu-id23" class="dropdown-menu is-drop-end is-aligned-bottom">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown22" class="dropdown">
  <button id="dropdown-button-id22" data-parent="dropdown22" data-target="dropdown-menu-id22">Open Left, Aligned Bottom</button>
  <ul id="dropdown-menu-id22" class="dropdown-menu is-drop-start is-aligned-bottom">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

```html
<!-- drop up & aligned bottom -->
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Up, Aligned Right
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-up is-aligned-end">
    ...
  </ul>
</div>
<!-- drop right & aligned bottom -->
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Right, Aligned Bottom
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-end is-aligned-bottom">
    ...
  </ul>
</div>
<!-- drop left & aligned bottom -->
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Left, Aligned Bottom
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu is-drop-start is-aligned-bottom">
    ...
  </ul>
</div>
```

## Dropdown Menu Separator

Add an `<hr/>` to a dropdown list item to create a visual separator between buttons.

<div data-dropdown="dropdown6" class="dropdown">
  <button id="dropdown-button-id6" data-parent="dropdown6" data-target="dropdown-menu-id6">Open Dropdown</button>
  <ul id="dropdown-menu-id6" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a><hr /></li>
    <li><a href="#">Item 3</a></li>
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
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><h5 class="dropdown-header">Menu Header (h5)</h5></li>
    <li><a href="#">Item 3</a></li>
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
    <li class="has-padding-2 has-gray800-text">
      Would you like to receive newsletters from Cool Company, Inc?
    </li>
    <li><a href="#">Sure!</a></li>
    <li><a href="#">Nope</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown-id" class="dropdown">
  <button id="dropdown-button-id" data-parent="dropdown-id" data-target="dropdown-menu-id">
    Open Dropdown
  </button>
  <ul id="dropdown-menu-id" class="dropdown-menu">
    <li class="has-padding-2 has-gray800-text">
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
<div data-dropdown="dropdown1" class="dropdown">...</div>
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
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
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
- `role`: added to the menu list items, `li` tags are given `role="none"` and the buttons (`a` or `button`) themselves are given `role="menuitm"`.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/menu-button/menu-button-links.html) on best-practices for the menu button UI pattern.

#### Styling Classes

A few classes will add the styling necessary of hide/show, and add menu positioning.

- `dropdown`: the container class providing inline and relative positioning of the component.
- `dropdown-menu`: the menu class that provides positioning relative to the button.
- `is-aligned-end`: a helper class that aligns the menu to the right of the dropdown button.
- `is-aligned-bottom`: a helper class that aligns the menu to the bottom of the dropdown button.
- `is-drop-up`: a helper class that positions the menu upward when open.
- `is-drop-start`: a helper class that positions the menu left when open.
- `is-drop-end`: a helper class that positions the menu right when open.

### API

Call one of the following scripts from Undernet's JavaScript (not both!). This should happen _only once_ on page load/component mount/etc.

```js
Undernet.start()
```

```js
Undernet.Dropdowns.start()
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/dropdowns.md">Edit this page on Github!</a></p>
