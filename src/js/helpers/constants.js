export const KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

export const Selectors = {
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
  NOT_VISUALLY_HIDDEN_CLASS: ":not(.is-visually-hidden)",
  TABINDEX: "tabindex",
}

export const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  BLUR: "blur",
}

export const Messages = {
  NO_SELECTOR_STRING_OR_CHILDREN_ERROR:
    "createFocusTrap must be given one or both of: first parameter (as selector string)" +
    " and/or options.children (array of elements).",
  OPTION_MATCHERS_DATA_TYPE_ERROR:
    "Invalid data type given to options.matchers for createFocusTrap. Expected: Array.",
  INCORRECT_MATCHER_TYPE_ERROR: type =>
    `Invalid matcher given to options.matchers for createFocusTrap. Expected: String. Recieved: ${type}.`,
  NO_MATCHER_LENGTH_ERROR:
    "Invalid value given to options.matchers for createFocusTrap; value must be an array with at least one selector string",
}
