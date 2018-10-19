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
  // components
  Undernet.Modals.start()
  Undernet.Accordions.start()

  // Utils
  Undernet.Utilities.enableFocusOutline()
}

Undernet.stop = () => {
  Undernet.Modals.stop()
  Undernet.Accordions.stop()
}

window.Undernet = Undernet
export default Undernet
