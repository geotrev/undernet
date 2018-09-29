import React from "react"

const Modal = ({ modalClass, id, labelledby, title, children }) => (
  <div className={`modal-overlay ${modalClass ? modalClass : ""}`} data-modal-id={id}>
    <div aria-labelledby={labelledby} data-modal className="modal-dialog">
      <header>
        <h2 id={labelledby}>{title}</h2>
        <a data-close href="#">
          <span aria-hidden="true">&times;</span>
        </a>
      </header>
      {children}
    </div>
  </div>
)

export default Modal
