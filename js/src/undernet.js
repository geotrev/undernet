"use strict"

import _Modals from "./components/modal"
import _Accordion from "./components/accordion"
import _Utilities from "./utils"

const Modals = new _Modals()
const Accordions = new _Accordion()
const Utilities = new _Utilities()

const Undernet = {
  // Components
  Modals,
  Accordions,

  // Utils
  Utilities,
}

Undernet.start = () => {
  // Components
  Undernet.Modals.start()
  Undernet.Accordions.start()

  // Utils
  Undernet.Utilities.enableFocusOutline()
}

Undernet.stop = () => {
  // Components
  Undernet.Modals.stop()
  Undernet.Accordions.stop()

  // Utils
  Undernet.Utilities.disableFocusOutline()
}

window.Undernet = Undernet
export default Undernet
