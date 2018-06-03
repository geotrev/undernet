"use strict"

import Modal from "./components/modal"
import Accordion from "./components/accordion"

const Monolith = {
  modals: () => new Modal(),
  accordions: () => new Accordion(),
}

window.Monolith = Monolith || {}

Monolith.start = () => {
  Monolith.modals().start()
  Monolith.accordions().start()
}

Monolith.stop = () => {
  Monolith.modals().stop()
  Monolith.accordions().stop()
}

export default Monolith
