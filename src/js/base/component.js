import { internal, isBrowserEnv, queryAll } from "../helpers"

const isString = value => typeof value === "string"

/**
 * This exists primarily as a base for which all mixins can merge into.
 */
export class Component {
  constructor() {
    this[internal.components.property] = []
    this[internal.activeComponent.property] = null
  }

  /**
   * Set the component's validator function. It should be bound.
   * @param {Function} fn
   */
  set [internal.validate.method](fn) {
    this[internal.validate.property] = fn
  }

  /**
   * Get the component's validator function.
   * @returns {Function}
   */
  get [internal.validate.method]() {
    return this[internal.validate.property]
  }

  /**
   * Set the component's teardown function. It should be bound.
   * @param {Function} fn
   */
  set [internal.teardown.method](fn) {
    this[internal.teardown.property] = fn
  }

  /**
   * Get the component's teardown function.
   * @returns {Function}
   */
  get [internal.teardown.method]() {
    return this[internal.teardown.property]
  }

  /**
   * Set the component's cancelActiveComponent function. It should be bound.
   * @param {Function} fn
   */
  set [internal.cancelActiveComponent.method](fn) {
    this[internal.cancelActiveComponent.property] = fn
  }

  /**
   * Get the component's cancelActiveComponent function.
   * @returns {Function}
   */
  get [internal.cancelActiveComponent.method]() {
    return this[internal.cancelActiveComponent.property]
  }

  /**
   * Set the active component instance to be operated against.
   * @param {HTMLElement} element
   */
  set [internal.activeComponent.method](element) {
    this[internal.activeComponent.property] = element
  }

  /**
   * Get the active component instance.
   * @returns {HTMLElement}
   */
  get [internal.activeComponent.method]() {
    return this[internal.activeComponent.property]
  }

  /**
   * Perform one of three possible operations against
   * the component store object.
   * @param {([]|HTMLElement[]|HTMLElement} entry
   */
  set [internal.components.method](entry) {
    if (Array.isArray(entry)) {
      // Entry is an array of elements to be appended
      // to the existing store. It is concatenated
      // because a consumer may have instantiated
      // a single component instance in the dom already.
      this[internal.components.property] = this[internal.components.property].concat(entry)
    } else if (entry) {
      // Entry is a single element. Push it to the store directly.
      this[internal.components.property].push(entry)
    } else if (Array.isArray(entry) && !entry.length) {
      // Reset the component store to an empty
      // array as part of the teardown process.
      this[internal.components.property] = []
    }
  }

  /**
   * Get the current store of components.
   * @returns {HTMLElement[]}
   */
  get [internal.components.method]() {
    return this[internal.components.property]
  }

  /**
   * Initialize all components or a single component by its id.
   * @param {Object} metadata
   * @property {string} id
   * @property {string} attribute
   */
  [internal.start]({ id, attribute }) {
    if (!isBrowserEnv) return

    if (id && isString(id)) {
      // select the component from the dom.
      // if it doesn't exist, noop.
      const component = document.querySelector(`[${attribute}='${id}']`)
      if (!component) return

      // run the component through its validator.
      const validComponent = [component].filter(this[internal.validate.method])[0]
      if (!validComponent) return

      // add it to the store.
      this[internal.components.method] = validComponent
    } else if (!id && !this[internal.components.method].length) {
      // query the entire dom for all matching components.
      // if none are found, noop.
      const components = queryAll(`[${attribute}]`)
      if (!components.length) return

      // run the components through their validator.
      const validComponents = components.filter(this[internal.validate.method])

      // if there are valid components, add them to the store, otherwise noop
      if (!validComponents.length) return
      this[internal.components.method] = validComponents
    }
  }

  /**
   * Teardown all components or a single component by its id.
   * @param {Object} metadata
   * @property {string} id
   * @property {string} attribute
   */
  [internal.stop]({ id, attribute }) {
    if (!isBrowserEnv) return

    if (id && isString(id)) {
      // loop through the current store of components and
      // if its data-* attribute id matches options.id,
      // return it along with its index within the store.
      let targetIndex, activeComponent
      for (let i = 0; i < this[internal.components.method].length; i++) {
        const component = this[internal.components.method][i]

        // continue searching components so long as the id doesn't match.
        if (component.getAttribute(attribute) !== id) continue

        // if we make it here, the component exists; assign it and break the loop.
        activeComponent = component
        targetIndex = i
        break
      }

      // if the component isn't stored, noop.
      if (!activeComponent) return

      // if there is an active component and it matches
      // the instance from above, cancel it
      if (
        this[internal.activeComponent.method] &&
        activeComponent === this[internal.activeComponent.method]
      )
        this[internal.cancelActiveComponent.method]()

      // teardown the component's events and remove it from the store.
      this[internal.teardown.method](activeComponent)
      this[internal.components.method].splice(targetIndex, 1)
    } else if (!id && this[internal.components.method].length) {
      // if there is an active component, cancel it
      if (this[internal.activeComponent.method]) this[internal.cancelActiveComponent.method]()

      // teardown each component's events and clear the store.

      this[internal.components.method].forEach(this[internal.teardown.method])
      this[internal.components.method] = []
    }
  }
}
