/**
 * Log a console message.
 * @param {String} message
 * @param {String} type
 */
export const log = (message, type = "error") => console[type](message)
