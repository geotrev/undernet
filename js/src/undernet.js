"use strict"

import _Modals from "./components/modal"
import _Accordion from "./components/accordion"
import _Dropdown from "./components/dropdown"
import _Utils from "./utils"

const Modals = new _Modals()
const Accordions = new _Accordion()
const Dropdowns = new _Dropdown()
const Utils = new _Utils()

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

window.Undernet = Undernet
export default Undernet
