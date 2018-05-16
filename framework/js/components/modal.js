'use strict'

import Utils from '../utils'

const keyCodes = {
  ESCAPE: 27,
}

const selectors = {
  MODAL_CONTAINER: 'data-modal',
  MODAL_NAME: 'data-modal-name',
  MODAL_VISIBLE: 'data-modal-visible',
  MODAL_CLOSE: 'data-modal-close',
  MODAL_BUTTON: 'data-modal-button',
  NO_SCROLL: 'no-scroll',
}

const events = {
  KEYDOWN: 'keydown',
  CLICK: 'click',
  RESIZE: 'resize',
}

const timeouts = {
  MODAL_MOVE_DURATION: 200,
}

const messages = {
  MISSING_MODAL: 'Your button is missing its corresponding modal. Check to make sure your modal is in the DOM, and that is has a [data-*] attribute matching the button ID.'
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
    this.modals = this.findElements(`[${selectors.MODAL_CONTAINER}]`)
    this.modalButtons = this.findElements(`[${selectors.MODAL_BUTTON}]`)
    this.closeButtons = this.findElements(this.closeButtonAttr)
    this.bodyTag = document.body
    this.htmlTag = document.querySelector('html')

    // bind events to class
    this.handleModalClose = this.handleModalClose.bind(this)
    this.getOffsetValue = this.getOffsetValue.bind(this)
    this.handleEscapeKeyPress = this.handleEscapeKeyPress.bind(this)
    this.handleOverlayClick = this.handleOverlayClick.bind(this)
    this.findModal = this.findModal.bind(this)

    this.getModals()
  }

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   * @return {null}
   */
  getModals() {
    this.modals.forEach(modal => {
      modal.setAttribute('aria-modal', 'true')
      modal.setAttribute('role', 'dialog')
    })

    this.modalButtons.forEach(button => {
      button.addEventListener(events.CLICK, this.findModal)
    })
  }

  /**
   * Locate a button's corresponding modal container.
   * @param {Object} event - The event object
   * @return {null}
   */
  findModal(event) {
    event.preventDefault()
    this.renderModal(event)
  }

  /**
   * Stop listening to modal buttons
   * @return {null}
   */
  stop() {
    this.modalButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.findModal)
    })
  }

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   * @return {null}
   */
  renderModal(event) {
    // setup core lightbox properties
    this.modalButton = event.target
    this.modalOverlayAttr = `[${selectors.MODAL_NAME}='${event.target.id}']`
    this.modalOverlay = document.querySelector(this.modalOverlayAttr)

    if (!this.modalOverlay) {
      throw messages.MISSING_MODAL
      return
    }

    // move modal to the body tag so it doesn't get
    // trapped by relative positioning
    document.body.appendChild(this.modalOverlay)

    this.activeModalSelector = `${this.modalOverlayAttr} ${this.modalContainerAttr}`
    this.activeModal = document.querySelector(this.activeModalSelector)
    this.modalCloseButtons = this.findElements(`${this.modalOverlayAttr} ${this.closeButtonAttr}`)

    this.handleScrollStop()
    this.getOffsetValue(this.modalOverlay)
    this.captureFocus(this.activeModalSelector)
    this.modalOverlay.setAttribute(selectors.MODAL_VISIBLE, '')
    this.modalOverlay.setAttribute('aria-hidden', 'false')
    this.activeModal.setAttribute('tabindex', '-1')
    this.activeModal.focus()

    // offset slight scroll caused by this.modal.focus()
    this.modalOverlay.scrollTop = 0

    // begin listening to events
    window.addEventListener(events.RESIZE, this.getOffsetValue)
    document.addEventListener(events.KEYDOWN, this.handleEscapeKeyPress)
    document.addEventListener(events.CLICK, this.handleOverlayClick)
    this.modalCloseButtons.forEach(button => {
      button.addEventListener(events.CLICK, this.handleModalClose)
    })
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - Event (keydown or click)
   * @return {null}
   */
  handleModalClose(event) {
    event.preventDefault()
    this.modalOverlay.removeAttribute(selectors.MODAL_VISIBLE)
    this.modalOverlay.setAttribute('aria-hidden', 'true')
    this.activeModal.removeAttribute('tabindex')
    this.releaseFocus()
    this.handleReturnFocus()
    this.handleScrollRestore()

    // stop listening to events
    window.removeEventListener(events.RESIZE, this.getOffsetValue)
    document.removeEventListener(events.KEYDOWN, this.handleEscapeKeyPress)
    document.removeEventListener(events.CLICK, this.handleOverlayClick)
    this.modalCloseButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.handleModalClose)
    })

    // move the modal back to its original location after timeouts.MODAL_MOVE_DURATION
    window.setTimeout(() => {
      this.modalButton.parentNode.appendChild(this.modalOverlay)
    }, timeouts.MODAL_MOVE_DURATION)
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - Event (keydown)
   * @return {null}
   */
  handleOverlayClick(event) {
    if (event.target !== this.modalOverlay) return
    this.handleModalClose(event)
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - Event (keydown)
   * @return {null}
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
   * @return {null}
   */
  handleReturnFocus() {
    this.modalButton.setAttribute('tabindex', '-1')
    this.modalButton.focus()
    this.modalButton.removeAttribute('tabindex')
  }

  /**
   * Finds the pixel value to offset the modal by to keep it in the current scroll area.
   * @param {Object} container - Currently active modal.
   * @return {null}
   */
  getOffsetValue() {
    const scrollPosition = Math.round(document.body.scrollTop || window.pageYOffset)
    this.modalOverlay.style.top = `${scrollPosition}px`
  }

  /**
   * Restores scroll behavior to <html> and <body>
   * @return {null}
   */
  handleScrollRestore() {
    this.bodyTag.classList.remove(selectors.NO_SCROLL)
    this.htmlTag.classList.remove(selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   * @return {null}
   */
  handleScrollStop() {
    this.bodyTag.classList.add(selectors.NO_SCROLL)
    this.htmlTag.classList.add(selectors.NO_SCROLL)
  }
}
