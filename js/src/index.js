import _Modals from "./modal"
import _Accordion from "./accordion"
import _Dropdown from "./dropdown"
import _Utils from "./utils"

export const Modals = new _Modals()
export const Accordions = new _Accordion()
export const Dropdowns = new _Dropdown()
export const Utils = new _Utils()

const Undernet = {
  // Components
  Modals,
  Accordions,
  Dropdowns,

  // Utils
  Utils,
}

Undernet.start = () => {
  // Components
  Undernet.Modals.start()
  Undernet.Accordions.start()
  Undernet.Dropdowns.start()

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
