export const KeyCodes = {
  ESCAPE: 27,
}

export const Selectors = {
  // unique
  DATA_TOOLTIP: "data-tooltip",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  // accessibility
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  // classes
  DROP_INLINE_START_CLASS: "is-drop-inline-start",
  DROP_INLINE_END_CLASS: "is-drop-inline-end",
  OVERLAY_OPEN: "overlay-open",
}

export const CssProperties = {
  HEIGHT: "height",
  WIDTH: "width",
  TOP: "top",
  LEFT: "left",
}

export const Events = {
  CLICK: "click",
  MOUSEOVER: "mouseover",
  MOUSEOUT: "mouseout",
  FOCUS: "focus",
  BLUR: "blur",
  KEYDOWN: "keydown",
}

export const Messages = {
  NO_ID_ERROR: "Could not find tooltip id.",
  NO_TRIGGER_ERROR: id => `Could not find a tooltip trigger with attribute [data-target='${id}'].`,
  NO_TOOLTIP_ERROR: id => `Could not find a tooltip with id '${id}'.`,
}
