import { isBrowserEnv } from "./is-browser-env"

/**
 * Check if the current browser session is within an Apple device.
 *
 * ```js
 * if (isiOSMobile) {
 *   console.log("This is on iOS!")
 * }
 * ```
 *
 * @returns {Boolean}
 */
export const isiOSMobile = isBrowserEnv ? /(iphone|ipod|ipad)/i.test(navigator.userAgent) : false
