# Dropdowns

Use a dropdown to put multiple options or items in a single menu. Although they aren't the most intuitive design pattern, they can be useful when space is limited.

## Default Dropdown

Try using this example dropdown:

<div data-dropdown="dropdown1" class="dropdown">
  <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown</button>
  <ul id="new-dropdown" class="dropdown-menu">
    <li data-close><a href="#">&times;</a></li>
    <li><a href="#">menu item</a></li>
    <li><a href="#">menu item</a></li>
    <li><a href="#">menu item</a></li>
  </ul>
</div>

<!-- <div data-dropdown="dropdown2" class="dropdown">
  <a class="split-left button">Primary Option</button>
  <button id="dropdown-button2" data-parent="dropdown2" data-target="new-dropdown2" class="split-right">&#9650;</button>
  <ul id="new-dropdown2" class="dropdown-menu">
    <li><a href="#">menu item</a></li>
    <li><a href="#">menu item</a></li>
    <li><a href="#">menu item</a></li>
  </ul>
</div> -->

#### Accessibility

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices/#menubutton) on best-practices for the dropdown (called "menu button") UI pattern.
