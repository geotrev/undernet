"use strict"

import Utils from "../utils"

const KeyCodes = {
  ESCAPE: 27,
}

const Selectors = {
  // unique
  DATA_MODAL: "data-modal",
  DATA_MODAL_ID: "data-modal-id",
  DATA_MODAL_BUTTON: "data-modal-button",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex",
  // classes
  NO_SCROLL: "no-scroll",
}

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
}

const Messages = {
  NO_TARGET_ERROR: `Could not find [data-target] attribute associated with a [data-modal-button] element.`,
  NO_PARENT_ERROR: `Could not find [data-parent] attribute associated with a [data-modal] element.`,
  NO_ID_ERROR: id =>
    `Could not find [data-modal-id='${id}'] associated with a [data-modal] element.`,
}

/**
 * Modal component class.
 * @module Modal
 * @requires Utils
 */
export default class Modal extends Utils {
  constructor() {
    super()
  }

  // all modals
  #modals = []
  #modalButtons = []

  // active modal
  #activeModalButton = {}
  #activeModalOverlay = {}
  #activeModal = {}
  #activeModalId = ""
  #activeModalOverlayAttr = ""
  #activeModalSelector = ""
  #activeModalCloseButtons = []

  // attribute helpers
  #modalContainerAttr = `[${Selectors.DATA_MODAL}]`

  // public

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   */
  start() {
    this.#modals = this.getElements(this.#modalContainerAttr)
    this.#modalButtons = this.getElements(`[${Selectors.DATA_MODAL_BUTTON}]`)

    this.getFocusableElements(this.#modalContainerAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    if (this.#modals.length) {
      this.#modals.forEach(modal => {
        this.#setupModal(modal)
      })
    }

    if (this.#modalButtons.length) {
      this.#modalButtons.forEach(button => {
        button.addEventListener(Events.CLICK, this.#render)
      })
    }
  }

  /**
   * Stop listening to modal buttons
   */
  stop() {
    this.#modalButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this.#render)
    })
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   */
  #render = event => {
    event.preventDefault()
    this.#activeModalButton = event.target

    if (!this.#activeModalButton.getAttribute(Selectors.DATA_TARGET)) {
      return console.error(Messages.NO_TARGET_ERROR)
    }

    this.#activeModalId = this.#activeModalButton.getAttribute(Selectors.DATA_TARGET)
    this.#activeModalOverlayAttr = `[${Selectors.DATA_MODAL_ID}="${this.#activeModalId}"]`

    if (!document.querySelector(this.#activeModalOverlayAttr)) {
      return console.error(Messages.NO_ID_ERROR(this.#activeModalId))
    }

    this.#activeModalOverlay = document.querySelector(this.#activeModalOverlayAttr)

    this.#activeModalSelector = `${this.#activeModalOverlayAttr} ${this.#modalContainerAttr}`
    this.#activeModal = document.querySelector(this.#activeModalSelector)
    this.#activeModalCloseButtons = this.getElements(
      `${this.#activeModalOverlayAttr} [${Selectors.DATA_CLOSE}]`,
    )

    this.getFocusableElements(this.#activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "0")
    })

    this.#handleScrollStop()
    this.captureFocus(this.#activeModalSelector)
    this.#activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "false")
    this.#activeModal.setAttribute(Selectors.TABINDEX, "-1")
    this.#activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "true")
    this.#activeModal.focus()

    // offset slight scroll caused by this.#activeModal.focus()
    this.#activeModalOverlay.scrollTop = 0

    // begin listening to events
    document.addEventListener(Events.KEYDOWN, this.#handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this.#handleOverlayClick)
    this.#activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this.#handleClose)
    })
  }

  #setupModal(modal) {
    let modalId
    if (!modal.getAttribute(Selectors.DATA_PARENT)) {
      return console.error(Messages.NO_PARENT_ERROR)
    } else {
      modalId = modal.getAttribute(Selectors.DATA_PARENT)
    }

    let modalWrapper
    if (!document.querySelector(`[${Selectors.DATA_MODAL_ID}='${modalId}']`)) {
      return console.error(Messages.NO_ID_ERROR(modalId))
    } else {
      modalWrapper = document.querySelector(`[${Selectors.DATA_MODAL_ID}='${modalId}']`)
    }

    modalWrapper.setAttribute(Selectors.ARIA_HIDDEN, "true")
    modalWrapper.setAttribute(Selectors.DATA_VISIBLE, "false")
    modal.setAttribute(Selectors.ARIA_MODAL, "true")
    modal.setAttribute(Selectors.ROLE, "dialog")
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - Event (keydown or click)
   */
  #handleClose = event => {
    event.preventDefault()
    this.#activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "false")
    this.#handleReturnFocus()
    this.#handleScrollRestore()
    this.releaseFocus()
    this.#activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "true")
    this.#activeModal.removeAttribute(Selectors.TABINDEX)

    this.getFocusableElements(this.#activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    // stop listening to events
    document.removeEventListener(Events.KEYDOWN, this.#handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this.#handleOverlayClick)
    this.#activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this.#handleClose)
    })
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - Event (keydown)
   */
  #handleOverlayClick = event => {
    if (event.target === this.#activeModalOverlay) {
      this.#handleClose(event)
    }
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - Event (keydown)
   */
  #handleEscapeKeyPress = event => {
    if (event.which === KeyCodes.ESCAPE) {
      this.#handleClose(event)
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  #handleReturnFocus() {
    this.#activeModalButton.setAttribute(Selectors.TABINDEX, "-1")
    this.#activeModalButton.focus()
    this.#activeModalButton.removeAttribute(Selectors.TABINDEX)
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  #handleScrollRestore() {
    document.body.classList.remove(Selectors.NO_SCROLL)
    document.querySelector("html").classList.remove(Selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  #handleScrollStop() {
    document.body.classList.add(Selectors.NO_SCROLL)
    document.querySelector("html").classList.add(Selectors.NO_SCROLL)
  }
}
