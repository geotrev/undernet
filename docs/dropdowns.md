# Dropdowns

Use a dropdown to put multiple options or items in a single menu. Although they aren't always the most intuitive design pattern, they can be useful when space is limited.

## Basic Dropdown

Check out this example dropdown:

<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown</button>
  <ul id="new-dropdown" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown</button>
  <ul id="new-dropdown" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

## Using Custom Buttons

You can use any button style with a dropdown. Just add the appropriate class to the dropdown button.

<div data-dropdown="dropdown2" class="dropdown">
  <button class="primary" id="dropdown-button2" data-parent="dropdown2" data-target="new-dropdown2">Primary Button</button>
  <ul id="new-dropdown2" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown3" class="dropdown">
  <button class="secondary" id="dropdown-button3" data-parent="dropdown3" data-target="new-dropdown3">Secondary Button</button>
  <ul id="new-dropdown3" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown4" class="dropdown">
  <button class="tertiary" id="dropdown-button4" data-parent="dropdown4" data-target="new-dropdown4">Tertiary Button</button>
  <ul id="new-dropdown4" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

## Alignment

Dropdowns align to the left of their respective button by default, but you can let it align from the right using `is-aligned-right` on the dropdown menu.

<div data-dropdown="dropdown5" class="dropdown">
  <button id="dropdown-button5" data-parent="dropdown5" data-target="new-dropdown5">Open Dropdown</button>
  <ul id="new-dropdown5" class="dropdown-menu is-aligned-right">
    <li class="dropdown-header">
      <h6>Aligned right!</h6>
    </li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown5" class="dropdown">
  <button id="dropdown-button5" data-parent="dropdown5" data-target="new-dropdown5">Open Right-Aligned Dropdown</button>
  <ul id="new-dropdown5" class="dropdown-menu is-aligned-right">
    <li class="dropdown-header">
      <h6>Aligned right!</h6>
    </li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
  </ul>
</div>
```

## Direction

Using a few custom classes, you can specify where the menu pops open relative to its button. The available classes are `is-drop-up`, `is-drop-left`, and `is-drop-right`. Note that this only works for viewports above a specific width, as defined using the variable `$dropdown-menu-direction-breakpoint` (sorry mobile viewers).

<div data-dropdown="dropdown9" class="dropdown">
  <button id="dropdown-button9" data-parent="dropdown9" data-target="new-dropdown9">Open Up</button>
  <ul id="new-dropdown9" class="dropdown-menu is-drop-up">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown10" class="dropdown">
  <button id="dropdown-button10" data-parent="dropdown10" data-target="new-dropdown10">Open Left</button>
  <ul id="new-dropdown10" class="dropdown-menu is-drop-left">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div> <div data-dropdown="dropdown11" class="dropdown">
  <button id="dropdown-button11" data-parent="dropdown11" data-target="new-dropdown11">Open Right</button>
  <ul id="new-dropdown11" class="dropdown-menu is-drop-right">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

```html
<!-- menu drops up -->
<div data-dropdown="dropdown9" class="dropdown">
  <button id="dropdown-button9" data-parent="dropdown9" data-target="new-dropdown9">Open Dropdown</button>
  <ul id="new-dropdown9" class="dropdown-menu is-drop-up">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

## Dropdown Menu Separator

Add an `<hr/>` to a dropdown list item to create a visual separator between buttons.

<div data-dropdown="dropdown6" class="dropdown">
  <button id="dropdown-button6" data-parent="dropdown6" data-target="new-dropdown6">Open Dropdown</button>
  <ul id="new-dropdown6" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a><hr /></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown6" class="dropdown">
  <button id="dropdown-button6" data-parent="dropdown6" data-target="new-dropdown6">Open Dropdown</button>
  <ul id="new-dropdown6" class="dropdown-menu">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a><hr /></li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

## Dropdown Menu Text

Add headers and paragraph text to your dropdown for added context.

### Headers

You can add any level of header to a dropdown menu.

<div data-dropdown="dropdown7" class="dropdown">
  <button id="dropdown-button7" data-parent="dropdown7" data-target="new-dropdown7">Open Dropdown</button>
  <ul id="new-dropdown7" class="dropdown-menu">
    <li class="dropdown-header">
      <h3>Menu Header (h3)</h3>
    </li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li class="dropdown-header">
      <h5>Menu Header (h5)</h5>
    </li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown7" class="dropdown">
  <button id="dropdown-button7" data-parent="dropdown7" data-target="new-dropdown7">Open Dropdown</button>
  <ul id="new-dropdown7" class="dropdown-menu">
    <li class="dropdown-header">
      <h3>Menu Header (h3)</h3>
    </li>
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a></li>
    <li class="dropdown-header">
      <h5>Menu Header (h5)</h5>
    </li>
    <li><a href="#">Item 3</a></li>
  </ul>
</div>
```

### Paragraph Text

Paragraph text will wrap like it does everywhere else. Use spacing utilities to help it look organized.

<div data-dropdown="dropdown8" class="dropdown">
  <button id="dropdown-button8" data-parent="dropdown8" data-target="new-dropdown8">Open Dropdown</button>
  <ul id="new-dropdown8" class="dropdown-menu">
    <li class="has-padding-2 has-gray800-text">
      Would you like to receive newsletters from Cool Company, Inc?
    </li>
    <li><a href="#">Sure!</a></li>
    <li><a href="#">Nope</a></li>
  </ul>
</div>

```html
<div data-dropdown="dropdown8" class="dropdown">
  <button id="dropdown-button8" data-parent="dropdown8" data-target="new-dropdown8">Open Dropdown</button>
  <ul id="new-dropdown8" class="dropdown-menu">
    <li class="has-padding-2 has-gray800-text">
      Would you like to receive newsletters from Cool Company, Inc?
    </li>
    <li><a href="#">Sure!</a></li>
    <li><a href="#">Nope</a></li>
  </ul>
</div>
```

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Container Attributes

The dropdown container has both the button and the menu.

```html
<div data-dropdown="dropdown1" class="dropdown"> ... </div>
```

- `data-dropdown`: an attribute containing a unique id for the dropdown container.

#### Trigger Attributes

The button needs a few key attributes as well.

```html
<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown</button>
  ...
</div>
```

- `id`: a unique id describing the button.
- `data-parent`: an attribute containing the value of the container element's `data-dropdown` attribute.
- `data-target`: an attribute containing the value of the dropdown menu list's `id` attribute.

#### Menu Attributes

The menu itself only needs one attribute.

```html
<div data-dropdown="dropdown1" class="dropdown">
  ...
  <ul id="new-dropdown" class="dropdown-menu">
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
- `is-aligned-right`: a helper class that aligns the dropdown to the right (default is left).
- `is-drop-up`: a helper class that positions the dropdown upward when open
- `is-drop-left`: a helper class that positions the dropdown left when open
- `is-drop-right`: a helper class that positions the dropdown right when open

### API

Call one of the following scripts from Undernet's JavaScript (not both!). This should happen _only once_ on page load/component mount/etc.

```js
Undernet.start()
```
```js
Undernet.Dropdowns.start()
```

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/dropdowns.md">Edit this page on Github!</a></p>
