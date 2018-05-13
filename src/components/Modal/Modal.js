import React, { Component } from 'react'
import './Modal.scss'

export default class Modal extends Component {
  render() {
    return (
      <div data-modal-overlay data-modal-name={this.props.modalId}>
        <div aria-labelledby={this.props.modalLabel} data-modal>
          <header>
            <h2 className="h6" id={this.props.modalLabel}>
              {this.props.title}
            </h2>
            <a data-modal-close href='#'>
              <span aria-hidden="true">&times;</span>
            </a>
          </header>
          {this.props.children}
        </div>
      </div>
    )
  }
}
