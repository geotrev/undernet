import "core-js/features/promise"

const polyfills = []
const modernBrowser = "fetch" in window && "assign" in Object && "forEach" in NodeList.prototype

if (!modernBrowser) {
  polyfills.push(import(/* webpackChunkName: "polyfill" */ "core-js/stable"))
}

Promise.all(polyfills)
  .then(() => import(/* webpackChunkName: "app" */ "./app"))
  .catch(error => console.error("Uh oh! Polyfills couldn't load!", error))
