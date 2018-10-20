"use strict"

import _Modals from "./components/modal"
import _Accordion from "./components/accordion"
import _Utils from "./utils"

const Modals = new _Modals()
const Accordions = new _Accordion()
const Utils = new _Utils()

const Undernet = {
  // Components
  Modals,
  Accordions,

  // Utils
  Utils,
}

Undernet.start = () => {
  // Components
  Undernet.Modals.start()
  Undernet.Accordions.start()

  // Utils
  Undernet.Utils.enableFocusOutline()
}

Undernet.stop = () => {
  // Components
  Undernet.Modals.stop()
  Undernet.Accordions.stop()

  // Utils
  Undernet.Utils.disableFocusOutline()
}

window.Undernet = Undernet
export default Undernet
