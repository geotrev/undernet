import "core-js/features/promise"

const polyfills = []
const modernBrowser =
  "assign" in Object && typeof Promise === "function" && typeof Symbol === "function"

if (!modernBrowser) {
  polyfills.push(import(/* webpackChunkName: "polyfill" */ "core-js/stable"))
}

Promise.all(polyfills)
  .then(() => import(/* webpackChunkName: "app" */ "./app"))
  .catch(error => console.error("Uh oh! Polyfills couldn't load!", error))
