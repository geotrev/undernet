"use strict"

import _FocusOutline from "./helpers/focus-outline"
import _Modals from "./components/modal"
import _Accordion from "./components/accordion"
import _Utilities from "./utils"

const FocusOutline = new _FocusOutline()
const Modals = new _Modals()
const Accordions = new _Accordion()
const Utilities = new _Utilities()

const Undernet = {
  // Helpers
  FocusOutline,

  // Components
  Modals,
  Accordions,

  // Utils
  Utilities,
}

Undernet.start = () => {
  Undernet.FocusOutline.start()
  Undernet.Modals.start()
  Undernet.Accordions.start()
}

Undernet.stop = () => {
  Undernet.FocusOutline.stop()
  Undernet.Modals.stop()
  Undernet.Accordions.stop()
}

window.Undernet = Undernet
export default Undernet
