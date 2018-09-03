"use strict"

import Modal from "./components/modal"
import Accordion from "./components/accordion"
import Utils from "./utils"

const Modals = new Modal()
const Accordions = new Accordion()
const Utilities = new Utils()

const Undernet = {
  Modals,
  Accordions,
  Utilities,
}

Undernet.start = () => {
  Undernet.Modals.start()
  Undernet.Accordions.start()
}

Undernet.stop = () => {
  Undernet.Modals.stop()
  Undernet.Accordions.stop()
}

window.Undernet = Undernet
export default Undernet
