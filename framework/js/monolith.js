'use strict'

import Modal from './components/modal'

export default class Monolith {
  constructor() {
    this.load()
  }

  load() {
    if (Modal !== undefined) new Modal()
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new Monolith()
})
