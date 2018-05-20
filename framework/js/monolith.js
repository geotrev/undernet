"use strict"

import Modal from "./components/modal"

const Monolith = {
  modals: () => new Modal(),
}

window.Monolith = Monolith || {}

Monolith.start = () => {
  Monolith.modals().start()
}

Monolith.stop = () => {
  Monolith.modals().stop()
}

export default Monolith
