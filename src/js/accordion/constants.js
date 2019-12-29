export const Selectors = {
  // unique
  DATA_ACCORDION: "data-accordion",
  DATA_COLLAPSIBLE: "data-collapsible",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  // common
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_HIDDEN: "aria-hidden",
}

export const Messages = {
  NO_ACCORDION_ID_ERROR:
    "Could not initialize accordion; you must include a value for the 'data-accordion' attribute.",
  NO_ACCORDION_ERROR: id => `Could not find element matching [data-accordion='${id}']`,
  TRIGGERS_TO_COLLAPSIBLES_LENGTH_WARNING: (id, triggersLength, collapsiblesLength) =>
    `Your accordion with id '${id}' has ${triggersLength} triggers and ${collapsiblesLength} collapsibles; make sure there is a trigger for each collapsible!`,
}
