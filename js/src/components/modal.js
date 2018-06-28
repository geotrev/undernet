"use strict"

import Utils from "../utils"

const keyCodes = {
  ESCAPE: 27,
}

const selectors = {
  MODAL_CONTAINER: "data-modal",
  MODAL_ID: "data-modal-id",
  MODAL_VISIBLE: "data-modal-visible",
  MODAL_CLOSE: "data-modal-close",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll",
}

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
  // needed to prevent iOS <body> scrolling when the overlay is pressed
  TOUCHSTART: "touchstart",
}

const messages = {
  MISSING_MODAL:
    "Your button is missing its corresponding modal. Check to make sure your modal is in the DOM, and that is has a [data-modal-id=*] attribute matchin its [data-modal-button=*] attribute. It's possible the modal script ran before the button appeared on the page!",
}

/**
 * Modal component class.
 * @module Modal
 * @requires Utils
 */
export default class Modal extends Utils {
  constructor() {
    super()
    this.closeButtonAttr = `[${selectors.MODAL_CLOSE}]`
    this.modalContainerAttr = `[${selectors.MODAL_CONTAINER}]`
    this.modals = null
    this.modalButtons = null
    this.closeButtons = null
    this.bodyTag = document.body
    this.htmlTag = document.querySelector("html")

    // bind events to class
    this.getModal = this.getModal.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleEscapeKeyPress = this.handleEscapeKeyPress.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
  }

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   */
  start() {
    this.modals = this.getElements(`[${selectors.MODAL_CONTAINER}]`)
    this.modalButtons = this.getElements(`[${selectors.MODAL_BUTTON}]`)
    this.closeButtons = this.getElements(this.closeButtonAttr)

    if (this.modals.length) {
      this.modals.forEach(modal => {
        modal.setAttribute("aria-modal", "true")
        modal.setAttribute("role", "dialog")
      })
    }

    if (this.modalButtons.length) {
      this.modalButtons.forEach(button => {
        button.addEventListener(events.CLICK, this.getModal)
      })
    }
  }

  /**
   * Stop listening to modal buttons
   */
  stop() {
    this.modalButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.getModal)
    })
  }

  /**
   * Locate a button's corresponding modal container.
   * @param {Object} event - The event object
   */
  getModal(event) {
    event.preventDefault()
    this.renderModal(event)
  }

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   */
  renderModal(event) {
    this.modalButton = event.target
    this.activeModalId = this.modalButton.getAttribute(selectors.MODAL_BUTTON)
    this.modalOverlayAttr = `[${selectors.MODAL_ID}='${this.activeModalId}']`
    this.modalOverlay = document.querySelector(this.modalOverlayAttr)

    if (!this.modalOverlay) {
      throw messages.MISSING_MODAL
      return
    }

    this.activeModalSelector = `${this.modalOverlayAttr} ${this.modalContainerAttr}`
    this.activeModal = document.querySelector(this.activeModalSelector)
    this.modalCloseButtons = this.getElements(`${this.modalOverlayAttr} ${this.closeButtonAttr}`)

    this.handleScrollStop()
    this.captureFocus(this.activeModalSelector)
    this.modalOverlay.setAttribute("aria-hidden", "false")
    this.activeModal.setAttribute("tabindex", "-1")
    this.modalOverlay.setAttribute(selectors.MODAL_VISIBLE, "")
    this.activeModal.focus()

    // offset slight scroll caused by this.activeModal.focus()
    this.modalOverlay.scrollTop = 0

    // begin listening to events
    document.addEventListener(events.KEYDOWN, this.handleEscapeKeyPress)
    document.addEventListener(events.CLICK, this.handleOverlayClick)
    document.addEventListener(events.TOUCHSTART, this.handleOverlayClick)
    this.modalCloseButtons.forEach(button => {
      button.addEventListener(events.CLICK, this.handleModalClose)
    })
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - Event (keydown or click)
   */
  handleModalClose(event) {
    event.preventDefault()
    this.modalOverlay.removeAttribute(selectors.MODAL_VISIBLE)
    this.handleReturnFocus()
    this.handleScrollRestore()
    this.releaseFocus()
    this.modalOverlay.setAttribute("aria-hidden", "true")
    this.activeModal.removeAttribute("tabindex")

    // stop listening to events
    document.removeEventListener(events.KEYDOWN, this.handleEscapeKeyPress)
    document.removeEventListener(events.CLICK, this.handleOverlayClick)
    document.removeEventListener(events.TOUCHSTART, this.handleOverlayClick)
    this.modalCloseButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.handleModalClose)
    })
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - Event (keydown)
   */
  handleOverlayClick(event) {
    if (event.target !== this.modalOverlay) return
    this.handleModalClose(event)
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - Event (keydown)
   */
  handleEscapeKeyPress(event) {
    const escapeKey = event.which === keyCodes.ESCAPE
    if (escapeKey) {
      this.handleModalClose(event)
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  handleReturnFocus() {
    this.modalButton.setAttribute("tabindex", "-1")
    this.modalButton.focus()
    this.modalButton.removeAttribute("tabindex")
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  handleScrollRestore() {
    this.bodyTag.classList.remove(selectors.NO_SCROLL)
    this.htmlTag.classList.remove(selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  handleScrollStop() {
    this.bodyTag.classList.add(selectors.NO_SCROLL)
    this.htmlTag.classList.add(selectors.NO_SCROLL)
  }
}
