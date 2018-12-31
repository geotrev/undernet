"use strict"

import Utils from "../utils"

const keyCodes = {
  ESCAPE: 27,
}

const selectors = {
  // unique
  MODAL_CONTAINER: "data-modal",
  MODAL_ID: "data-modal-id",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll",
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
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
}

const messages = {
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
  #modalContainerAttr = `[${selectors.MODAL_CONTAINER}]`

  // public

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   */
  start() {
    this.#modals = this.getElements(this.#modalContainerAttr)
    this.#modalButtons = this.getElements(`[${selectors.MODAL_BUTTON}]`)

    this.getFocusableElements(this.#modalContainerAttr).forEach(element => {
      element.setAttribute(selectors.TABINDEX, "-1")
    })

    if (this.#modals.length) {
      this.#modals.forEach(modal => {
        this.#setupModal(modal)
      })
    }

    if (this.#modalButtons.length) {
      this.#modalButtons.forEach(button => {
        button.addEventListener(events.CLICK, this.#render)
      })
    }
  }

  /**
   * Stop listening to modal buttons
   */
  stop() {
    this.#modalButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.#render)
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

    if (!this.#activeModalButton.getAttribute(selectors.DATA_TARGET)) {
      return console.error(messages.NO_TARGET_ERROR)
    }

    this.#activeModalId = this.#activeModalButton.getAttribute(selectors.DATA_TARGET)
    this.#activeModalOverlayAttr = `[${selectors.MODAL_ID}="${this.#activeModalId}"]`

    if (!document.querySelector(this.#activeModalOverlayAttr)) {
      return console.error(messages.NO_ID_ERROR(this.#activeModalId))
    }

    this.#activeModalOverlay = document.querySelector(this.#activeModalOverlayAttr)

    this.#activeModalSelector = `${this.#activeModalOverlayAttr} ${this.#modalContainerAttr}`
    this.#activeModal = document.querySelector(this.#activeModalSelector)
    this.#activeModalCloseButtons = this.getElements(
      `${this.#activeModalOverlayAttr} [${selectors.MODAL_CONTAINER}] [${selectors.DATA_CLOSE}]`,
    )

    this.getFocusableElements(this.#activeModalSelector).forEach(element => {
      element.setAttribute(selectors.TABINDEX, "0")
    })

    this.#handleScrollStop()
    this.captureFocus(this.#activeModalSelector)
    this.#activeModalOverlay.setAttribute(selectors.ARIA_HIDDEN, "false")
    this.#activeModal.setAttribute(selectors.TABINDEX, "-1")
    this.#activeModalOverlay.setAttribute(selectors.DATA_VISIBLE, "true")
    this.#activeModal.focus()

    // offset slight scroll caused by this.#activeModal.focus()
    this.#activeModalOverlay.scrollTop = 0

    // begin listening to events
    document.addEventListener(events.KEYDOWN, this.#handleEscapeKeyPress)
    document.addEventListener(events.CLICK, this.#handleOverlayClick)
    this.#activeModalCloseButtons.forEach(button => {
      button.addEventListener(events.CLICK, this.#handleClose)
    })
  }

  #setupModal(modal) {
    let modalId
    if (!modal.getAttribute(selectors.DATA_PARENT)) {
      return console.error(messages.NO_PARENT_ERROR)
    } else {
      modalId = modal.getAttribute(selectors.DATA_PARENT)
    }

    let modalWrapper
    if (!document.querySelector(`[${selectors.MODAL_ID}='${modalId}']`)) {
      return console.error(messages.NO_ID_ERROR(modalId))
    } else {
      modalWrapper = document.querySelector(`[${selectors.MODAL_ID}='${modalId}']`)
    }

    modalWrapper.setAttribute(selectors.ARIA_HIDDEN, "true")
    modalWrapper.setAttribute(selectors.DATA_VISIBLE, "false")
    modal.setAttribute(selectors.ARIA_MODAL, "true")
    modal.setAttribute(selectors.ROLE, "dialog")
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - Event (keydown or click)
   */
  #handleClose = event => {
    event.preventDefault()
    this.#activeModalOverlay.setAttribute(selectors.DATA_VISIBLE, "false")
    this.#handleReturnFocus()
    this.#handleScrollRestore()
    this.releaseFocus()
    this.#activeModalOverlay.setAttribute(selectors.ARIA_HIDDEN, "true")
    this.#activeModal.removeAttribute(selectors.TABINDEX)

    this.getFocusableElements(this.#activeModalSelector).forEach(element => {
      element.setAttribute(selectors.TABINDEX, "-1")
    })

    // stop listening to events
    document.removeEventListener(events.KEYDOWN, this.#handleEscapeKeyPress)
    document.removeEventListener(events.CLICK, this.#handleOverlayClick)
    this.#activeModalCloseButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.#handleClose)
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
    if (event.which === keyCodes.ESCAPE) {
      this.#handleClose(event)
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  #handleReturnFocus() {
    this.#activeModalButton.setAttribute(selectors.TABINDEX, "-1")
    this.#activeModalButton.focus()
    this.#activeModalButton.removeAttribute(selectors.TABINDEX)
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  #handleScrollRestore() {
    document.body.classList.remove(selectors.NO_SCROLL)
    document.querySelector("html").classList.remove(selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  #handleScrollStop() {
    document.body.classList.add(selectors.NO_SCROLL)
    document.querySelector("html").classList.add(selectors.NO_SCROLL)
  }
}
