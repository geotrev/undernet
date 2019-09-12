import "core-js/features/promise"

const polyfills = []
const modernBrowser = "assign" in Object && "from" in Array && "fetch" in window

if (!modernBrowser) {
  polyfills.push(import(/* webpackChunkName: "polyfill" */ "core-js/stable"))
}

// Tell prerender.io we're ready to prerender
const readyToPrerender = () => {
  window.prerenderReady = true
}

const importApp = () => {
  return import(/* webpackChunkName: "app" */ "./app")
    .then(() => readyToPrerender())
    .catch(error => console.error("Polyfills were resolved but the app was not.", error))
}

Promise.all(polyfills)
  .then(importApp)
  .catch(error => console.error("Polyfills could not load.", error))
