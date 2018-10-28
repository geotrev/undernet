# Dropdowns

Use a dropdown to put multiple options or items in a single menu. Although they aren't the most intuitive design pattern, they can be useful when space is limited.

## Default Dropdown

Try using this example dropdown:

<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown &#9660;</button>
  <ul id="new-dropdown" class="dropdown-menu">
    <li><a href="#">menu item 1</a></li>
    <li><a href="#">menu item 2</a></li>
    <li><a href="#">menu item 3</a></li>
  </ul>
</div><div data-dropdown="dropdown2" class="dropdown">
  <button id="dropdown-button2" data-parent="dropdown2" data-target="new-dropdown2">Open Dropdown &#9660;</button>
  <ul id="new-dropdown2" class="dropdown-menu">
    <li><a href="#">menu item 1</a></li>
    <li><a href="#">menu item 2</a></li>
    <li><a href="#">menu item 3</a></li>
  </ul>
</div>

## Requirements
### HTML
#### Attributes <!-- button -->
#### Attributes <!-- rendered component -->
#### Accessibility
#### Styling Classes
### API

#### Accessibility

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices/#menubutton) on best-practices for the dropdown (called "menu button") UI pattern.
