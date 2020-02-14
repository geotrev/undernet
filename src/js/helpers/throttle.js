/**
 * Simple throttle utility; prevent a function from firing for a period of milliseconds.
 * @param {*} callback - function to throttle
 * @param {number} limit - time to throttle by in milliseconds
 */
export function throttle(callback, limit) {
  let timeout = false

  function clear() {
    timeout = false
  }

  return function() {
    if (timeout) return

    callback.apply(this, arguments)
    timeout = true
    setTimeout(clear, limit)
  }
}
