export const KeyCodes = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

export const Selectors = {
  // unique
  DATA_DROPDOWN: "data-dropdown",
  DROPDOWN_MENU_CLASS: "dropdown-menu",
  // common
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  // accessibility
  TABINDEX: "tabindex",
  ARIA_HASPOPUP: "aria-haspopup",
  ARIA_CONTROLS: "aria-controls",
  ARIA_LABELLEDBY: "aria-labelledby",
  ARIA_EXPANDED: "aria-expanded",
  // classes
  OVERLAY_OPEN: "overlay-open",
}

export const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  BLUR: "blur",
}

export const Messages = {
  NO_DROPDOWN_ID_ERROR:
    "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value.",
  NO_MENU_ERROR: attr => `Could not find menu associated with ${attr}.`,
  NO_DROPDOWN_ITEMS_ERROR: attr => `Could not find any list items associated with ${attr}.`,
  NO_DROPDOWN_ACTIONS_ERROR: attr =>
    `Could not find any button or anchor elements associated with ${attr}.`,
  NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute.",
}
