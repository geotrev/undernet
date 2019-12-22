import { useEffect } from "react"
import { isFunction } from "./is-function"

/**
 * Declare an unmount hook.
 *
 * @return {Function} - function to run when component view is about to unmount.
 */
export function useWillUnmount(fn) {
  useEffect(() => {
    if (!isFunction(fn)) return
    return fn
  }, [])
}
