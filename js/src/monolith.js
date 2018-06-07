"use strict"

import Modal from "./components/modal"
import Accordion from "./components/accordion"

const modals = new Modal()
const accordions = new Accordion()

const Monolith = {
  modals,
  accordions,
}

Monolith.start = () => {
  Monolith.modals.start()
  Monolith.accordions.start()
}

Monolith.stop = () => {
  Monolith.modals.stop()
  Monolith.accordions.stop()
}

window.Monolith = Monolith
export default Monolith
