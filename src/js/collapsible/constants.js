export const Selectors = {
  // unique
  DATA_COLLAPSIBLE: "data-collapsible",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_LABELLEDBY: "aria-labelledby",
  TABINDEX: "tabindex",
}

export const CssProperties = {
  HEIGHT: "height",
  TRANSITION_DURATION: "transition-duration",
}

export const Events = {
  CLICK: "click",
}

export const Messages = {
  NO_COLLAPSIBLE_ID_ERROR:
    "Could not initialize collapsible; you must include a value for the 'data-collapsible' attribute.",
  NO_TRIGGER_ERROR: id =>
    `Could not find collapsible trigger with [data-target='${id}']; you can't have a collapsible without a trigger.`,
  NO_TRIGGER_ID_ERROR: id => `Could not find id on collapsible trigger with [data-target='${id}'].`,
  NO_CONTENT_ERROR: id =>
    `Could not find collapsible content with id '${id}'; you can't have a collapsible without content.`,
}
