import React from "react"

export default function Modal({ modalClass, id, labelledby, title, children }) {
  return (
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
}
