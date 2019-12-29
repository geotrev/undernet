import { useEffect } from "react"
import { isFunction } from "./is-function"

/**
 * Declare an unmount hook.
 *
 * @return {Function} - function to run when component view is mounted.
 */
export function useDidMount(fn) {
  useEffect(() => {
    if (isFunction(fn)) fn()
  }, [])
}
