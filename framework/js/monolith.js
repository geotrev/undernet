"use strict"

import Modal from "./components/modal"

const Monolith = {
  modals: () => new Modal(),
}

Monolith.start = () => {
  Monolith.modals().start()
}

Monolith.stop = () => {
  Monolith.modals().stop()
}

export default Monolith
