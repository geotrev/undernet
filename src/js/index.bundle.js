import Undernet from "./index"
import { windowExists } from "./utils"

if (windowExists) {
  window.Undernet = Undernet
}

export { default as Undernet, Modals, Accordions, Dropdowns, Tooltips, ContextUtil } from "./index"
