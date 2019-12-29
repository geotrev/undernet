/* eslint-disable max-classes-per-file */
import { setComponents } from "../utils"

const ERROR_MESSAGE = "No ID found!"

// This fixture is meant to mimic the basic scaffolding of a real Undernet
// component, including the function signature of the `start` method
export class TestComponent {
  constructor() {
    this.filterElements = this.filterElements.bind(this)
    this._scopes = new Map()
    this._components = []
  }

  start(scopeId, useFilterFn = false) {
    setComponents({
      thisArg: this,
      scopeId,
      scopeKey: "_scopes",
      componentAttribute: "data-test-component",
      globalKey: "_components",
      errorMessage: ERROR_MESSAGE,
      filterFn: useFilterFn ? this.filterElements : undefined,
    })
  }

  // public methods for tests

  // custom filter will exclude any element with the "exclude" class
  filterElements(elements) {
    return elements.filter(element => !element.classList.contains("exclude"))
  }

  reset() {
    this._scopes.clear()
    this._components = []
  }

  get scopes() {
    return this._scopes
  }

  get globals() {
    return this._components
  }
}

// This mimics how an Undernet component should extend another component within
// the framework. For example, Accordion extending Collapsible.
export class GoodExtendedComponent extends TestComponent {
  constructor() {
    super()
    this._extendedComponents = []
    this._extendedScopes = new Map()
  }

  start(scopeId, useFilterFn = false) {
    super.start(scopeId)

    setComponents({
      thisArg: this,
      scopeId,
      scopeKey: "_extendedScopes",
      componentAttribute: "data-test-component-extended",
      globalKey: "_extendedComponents",
      errorMessage: ERROR_MESSAGE,
      filterFn: useFilterFn ? this.filterElements : undefined,
    })
  }

  // public methods for tests

  reset() {
    this._scopes.clear()
    this._extendedScopes.clear()
  }

  get scopes() {
    return this._scopes
  }

  get extendedScopes() {
    return this._extendedScopes
  }
}

// This mimics how an Undernet component should _not_ be extended. Note how
// this._scopes is using the same property name as the base TestComponent,
// and "_components" is given to `setComponents` instead of `_extendedComponents`.
export class BadExtendedComponent extends TestComponent {
  constructor() {
    super()
    this._scopes = new Map()
    this._extendedComponents = []
  }

  start(scopeId, useFilterFn = false) {
    super.start(scopeId)

    setComponents({
      thisArg: this,
      scopeId,
      scopeKey: "_scopes",
      componentAttribute: "data-test-component-extended",

      // This will throw an error
      globalKey: "_components",
      errorMessage: ERROR_MESSAGE,
      filterFn: useFilterFn ? this.filterElements : undefined,
    })
  }

  reset() {
    super.reset()
    this._scopes.clear()
  }
}
