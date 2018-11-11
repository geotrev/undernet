import React, { Component } from "react"
import Undernet from "../../src/undernet"

export default class Modal extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    Undernet.Modals.start()
  }

  render() {
    return (
      <div>
        <button href="#" data-modal-button data-target="new-modal">Open modal</button>
        
        <div className="modal-overlay" data-modal-id="new-modal">
          <div className="modal-dialog" data-parent="new-modal" aria-labelledby="header-id" data-modal>
            <header>
              <h2 className="h6 has-no-margin-top" id="header-id">
                Modal Header
              </h2>
              <a data-close href="#">
                <span aria-hidden="true">&times;</span>
              </a>
            </header>
            <section>
              <p>Some modal content here</p>
            </section>
            <footer>
              <a className="button" data-close href="#">
                Cancel
              </a>
              <a className="primary button" href="#">
                OK
              </a>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}