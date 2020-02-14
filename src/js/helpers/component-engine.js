import { queryAll } from "./dom"
import { isBrowserEnv } from "./is-browser-env"

const isString = value => typeof value === "string"
const isFunction = value => typeof value === "function"

export const ComponentEngine = {
  /**
   * Initialize an Undernet component globally or by id.
   * @param {Object} metadata
   * @property {string} id
   * @property {string} attribute
   * @property {Object} thisArg
   */
  start: (metadata = {}) => {
    if (!isBrowserEnv) return

    const { id, attribute, thisArg } = metadata

    if (id && isString(id)) {
      const instance = document.querySelector(`[${attribute}='${id}']`)
      if (!instance) return

      const validComponent = [instance].filter(thisArg._validate)[0]
      if (!validComponent) return

      thisArg._components.push(validComponent)
    } else if (!id && !thisArg._components.length) {
      const instances = queryAll(`[${attribute}]`)
      if (!instances.length) return

      const validComponents = instances.filter(thisArg._validate)
      thisArg._components = thisArg._components.concat(validComponents)
    } else {
      // attempted to .start() when .stop() wasn't run,
      // OR tried to instantiate a component that's already active.
    }
  },
  /**
   * Teardown an Undernet component globally or by id.
   * @param {Object} metadata
   * @property {string} id
   * @property {string} attribute
   * @property {Object} thisArg
   * @property {string} activeNodeKey
   * @property {*=} cancelActiveFn
   */
  stop: (metadata = {}) => {
    if (!isBrowserEnv) return

    const { id, attribute, thisArg, activeNodeKey, cancelActiveFn } = metadata

    if (id && isString(id)) {
      let targetIndex
      const instance = thisArg._components.filter((activeInstance, index) => {
        if (activeInstance.getAttribute(attribute) !== id) return false
        targetIndex = index
        return true
      })[0]

      if (!instance) return

      if (
        thisArg[activeNodeKey] &&
        instance === thisArg[activeNodeKey] &&
        isFunction(cancelActiveFn)
      )
        thisArg[cancelActiveFn]()

      thisArg._teardown(instance)
      thisArg._components.splice(targetIndex, 1)
    } else if (!id && thisArg._components.length) {
      if (thisArg[activeNodeKey] && isFunction(cancelActiveFn)) thisArg[cancelActiveFn]()

      thisArg._components.forEach(thisArg._teardown)
      thisArg._components = []
    }
  },
}
