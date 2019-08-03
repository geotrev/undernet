import Undernet from "./index"
import { browserEnv } from "./utils"

if (browserEnv) {
  window.Undernet = Undernet
}

export { default as Undernet, Modals, Accordions, Dropdowns, Tooltips, ContextUtil } from "./index"
