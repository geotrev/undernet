import Utils, { getFocusableElements } from "../utils"

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

    this._iosMobile = /(iphone|ipod)/i.test(navigator.userAgent)

    // events
    this._render = this._render.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)

    // all modals
    this._modals = []
    this._modalButtons = []

    // active modal
    this._activeModalButton = {}
    this._activeModalOverlay = {}
    this._activeModal = {}
    this._activeModalId = ""
    this._activeModalOverlayAttr = ""
    this._activeModalSelector = ""
    this._activeModalCloseButtons = []

    // attribute helpers
    this._modalContainerAttr = `[${Selectors.DATA_MODAL}]`
  }

  // public

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   */
  start() {
    this._modals = document.querySelectorAll(this._modalContainerAttr)
    this._modalButtons = document.querySelectorAll(`[${Selectors.DATA_MODAL_BUTTON}]`)

    getFocusableElements(this._modalContainerAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    if (this._modals.length) {
      this._modals.forEach(modal => {
        this._setupModal(modal)
      })
    }

    if (this._modalButtons.length) {
      this._modalButtons.forEach(button => {
        button.addEventListener(Events.CLICK, this._render)
      })
    }
  }

  /**
   * Stop listening to modal buttons
   */
  stop() {
    this._modalButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   */
  _render(event) {
    event.preventDefault()
    this._activeModalButton = event.target

    if (!this._activeModalButton.getAttribute(Selectors.DATA_TARGET)) {
      return console.error(Messages.NO_TARGET_ERROR)
    }

    this._activeModalId = this._activeModalButton.getAttribute(Selectors.DATA_TARGET)
    this._activeModalOverlayAttr = `[${Selectors.DATA_MODAL_ID}="${this._activeModalId}"]`

    if (!document.querySelector(this._activeModalOverlayAttr)) {
      return console.error(Messages.NO_ID_ERROR(this._activeModalId))
    }

    this._activeModalOverlay = document.querySelector(this._activeModalOverlayAttr)

    this._activeModalSelector = `${this._activeModalOverlayAttr} ${this._modalContainerAttr}`
    this._activeModal = document.querySelector(this._activeModalSelector)
    this._activeModalCloseButtons = document.querySelectorAll(
      `${this._activeModalOverlayAttr} [${Selectors.DATA_CLOSE}]`
    )

    // allow focusable elements to be focused
    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "0")
    })

    // capture focus, stop scrolling, and toggle attributes for visibility
    this._handleScrollStop()
    this.captureFocus(this._activeModalSelector)
    this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "false")
    this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "true")

    // focus the modal
    this._activeModal.setAttribute(Selectors.TABINDEX, "-1")
    this._activeModal.focus()

    // offset slight scroll caused by this._activeModal.focus()
    this._activeModalOverlay.scrollTop = 0

    // on ios devices, let the modal close on overlay click
    if (this._iosMobile) {
      this._activeModalOverlay.style.cursor = "pointer"
    }

    // begin listening to events
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)
    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._handleClose)
    })
  }

  _setupModal(modal) {
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
   * @param {Object} event - The event object
   */
  _handleClose(event) {
    event.preventDefault()
    this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "false")
    this._handleReturnFocus()
    this._handleScrollRestore()
    this.releaseFocus()
    this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "true")
    this._activeModal.removeAttribute(Selectors.TABINDEX)

    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    if (this._iosMobile) {
      this._activeModalOverlay.style.cursor = "auto"
    }

    // stop listening to events
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOverlayClick)
    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._handleClose)
    })
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - The event object
   */
  _handleOverlayClick(event) {
    if (event.target === this._activeModalOverlay) {
      this._handleClose(event)
    }
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  _handleReturnFocus() {
    this._activeModalButton.setAttribute(Selectors.TABINDEX, "-1")
    this._activeModalButton.focus()
    this._activeModalButton.removeAttribute(Selectors.TABINDEX)
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  _handleScrollRestore() {
    document.body.classList.remove(Selectors.NO_SCROLL)
    document.querySelector("html").classList.remove(Selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  _handleScrollStop() {
    document.body.classList.add(Selectors.NO_SCROLL)
    document.querySelector("html").classList.add(Selectors.NO_SCROLL)
  }
}
