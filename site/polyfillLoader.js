/* eslint-disable */

function modernBrowser() {
  return window.Promise && window.fetch && window.Symbol
}

function loadPolyfill() {
  const js = document.createElement("script")
  js.type = "text/javascript"
  js.src = "/polyfill.js"
  document.head.appendChild(js)
}

if (!modernBrowser()) {
  loadPolyfill()

  console.log("polyfill loaded?")
}
