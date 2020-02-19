/**
 * Private method and property symbols used in the base class, mixins, and components.
 * These are used to prevent external scripts from accessing the internals of Undernet's
 * core logic.
 */
export const internal = {
  // Component
  start: Symbol("start"),
  stop: Symbol("stop"),
  validate: {
    method: Symbol("validate"),
    property: Symbol("_validate"),
  },
  teardown: {
    method: Symbol("teardown"),
    property: Symbol("_teardown"),
  },
  components: {
    method: Symbol("components"),
    property: Symbol("_components"),
  },
  activeComponent: {
    method: Symbol("activeComponent"),
    property: Symbol("_activeComponent"),
  },
  cancelActiveComponent: {
    method: Symbol("cancelActiveComponent"),
    property: Symbol("_cancelActiveComponent"),
  },
  // Mixins
  isVisible: {
    method: Symbol("isVisible"),
    property: Symbol("_isVisible"),
  },
}
