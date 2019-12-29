export const KeyCodes = {
  ESCAPE: 27,
}

export const Selectors = {
  // unique
  DATA_MODAL: "data-modal",
  // common
  DATA_TARGET: "data-target",
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex",
  // classes
  NO_SCROLL: "no-scroll",
}

export const CssProperties = {
  PADDING_RIGHT: "paddingRight",
  PADDING_LEFT: "paddingLeft",
  CURSOR: "cursor",
}

export const CssValues = {
  AUTO: "auto",
  POINTER: "pointer",
}

export const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
  BLUR: "blur",
}

export const Messages = {
  NO_TRIGGER_ERROR: id => `Could not find modal trigger with id ${id}.`,
  NO_ID_ERROR:
    "Could not detect an id on your [data-modal] element. Please add a value matching the modal trigger's [data-parent] attribute.",
  NO_MODAL_DIALOG_ERROR: id => `Could not find element with attribute [data-parent='${id}'].`,
}
