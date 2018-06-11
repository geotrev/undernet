"use strict"

import Modal from "./components/modal"
import Accordion from "./components/accordion"

const modals = new Modal()
const accordions = new Accordion()

const Undernet = {
  modals,
  accordions,
}

Undernet.start = () => {
  Undernet.modals.start()
  Undernet.accordions.start()
}

Undernet.stop = () => {
  Undernet.modals.stop()
  Undernet.accordions.stop()
}

window.Undernet = Undernet
export default Undernet
