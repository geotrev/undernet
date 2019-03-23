import _Accordion from "./accordion"
import _Dropdown from "./dropdown"
import _Modals from "./modal"
import _Tooltips from "./tooltip"
import _Utils from "./utils"

export const Accordions = new _Accordion()
export const Dropdowns = new _Dropdown()
export const Modals = new _Modals()
export const Tooltips = new _Tooltips()
export const Utils = new _Utils()

const Undernet = {
  // Components
  Modals,
  Accordions,
  Dropdowns,
  Tooltips,

  // Utils
  Utils,
}

Undernet.start = () => {
  // Components
  Undernet.Modals.start()
  Undernet.Accordions.start()
  Undernet.Dropdowns.start()
  Undernet.Tooltips.start()

  // Utils
  Undernet.Utils.enableFocusOutline()
}

Undernet.stop = () => {
  // Components
  Undernet.Modals.stop()
  Undernet.Accordions.stop()
  Undernet.Dropdowns.stop()

  // Utils
  Undernet.Utils.disableFocusOutline()
}

export default Undernet
