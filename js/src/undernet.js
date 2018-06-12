"use strict"

import Modal from "./components/modal"
import Accordion from "./components/accordion"

const Modals = new Modal()
const Accordions = new Accordion()

const Undernet = {
  Modals,
  Accordions,
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
