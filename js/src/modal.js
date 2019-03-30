import Utils, { iOSMobile, getFocusableElements, nodeListToArray } from "./utils"

const KeyCodes = {
  ESCAPE: 27,
}

const Selectors = {
  // unique
  DATA_MODAL: "data-modal",
  DATA_MODAL_BUTTON: "data-modal-button",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
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
  NO_BUTTON_ID_ERROR:
    "Could not find an id on your [data-modal-button] element. Modal can't be opened.",
  NO_MODAL_ID_ERROR:
    "Could not detect an id on your [data-modal] element. Please add a value matching a button's [data-modal-button] attribute.",
  NO_MODAL_ERROR: id =>
    `Could not find a [data-parent='${id}'] attribute within your [data-modal='${id}'] element.`,
}

/**
 * Modal component class.
 * @module Modal
 * @requires Utils
 */
export default class Modal extends Utils {
  constructor() {
    super()

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
   * Begin listening to modals.
   */
  start() {
    this._modals = nodeListToArray(this._modalContainerAttr)
    this._modalButtons = nodeListToArray(`[${Selectors.DATA_MODAL_BUTTON}]`)

    getFocusableElements(this._modalContainerAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    if (this._modals.length) {
      this._modals.forEach(instance => {
        this._setupModal(instance)
      })
    }

    if (this._modalButtons.length) {
      this._modalButtons.forEach(button => {
        button.addEventListener(Events.CLICK, this._render)
      })
    }
  }

  /**
   * Stop listening to modals
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
    this._activeModalId = this._activeModalButton.getAttribute(Selectors.DATA_MODAL_BUTTON)

    if (!this._activeModalId) {
      // eslint-disable-next-line no-console
      return console.error(Messages.NO_BUTTON_ID_ERROR)
    }

    this._activeModalOverlay = document.querySelector(
      `[${Selectors.DATA_MODAL}="${this._activeModalId}"]`
    )
    this._activeModalSelector = `[${Selectors.DATA_PARENT}='${this._activeModalId}']`
    this._activeModal = this._activeModalOverlay.querySelector(this._activeModalSelector)
    this._activeModalCloseButtons = nodeListToArray(
      `${this._activeModalSelector} [${Selectors.DATA_CLOSE}]`
    )

    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "0")
    })

    this._handleScrollStop()
    this.captureFocus(this._activeModalSelector)
    this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "false")
    this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "true")

    this._activeModal.setAttribute(Selectors.TABINDEX, "-1")
    this._activeModal.focus()

    this._activeModalOverlay.scrollTop = 0

    if (iOSMobile) {
      this._activeModalOverlay.style.cursor = "pointer"
    }

    // begin listening to events
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)
    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._handleClose)
    })
  }

  /**
   * Setup a modal instance.
   * @param {Object} instance - The modal element
   */
  _setupModal(instance) {
    const modalId = instance.getAttribute(Selectors.DATA_MODAL)

    if (!modalId) {
      // eslint-disable-next-line no-console
      return console.error(Messages.NO_MODAL_ID_ERROR)
    }

    const modal = instance.querySelector(`[${Selectors.DATA_PARENT}='${modalId}']`)

    if (!modal) {
      // eslint-disable-next-line no-console
      return console.error(Messages.NO_MODAL_ERROR(modalId))
    }

    const modalWrapper = document.querySelector(`[${Selectors.DATA_MODAL}='${modalId}']`)

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

    if (iOSMobile) {
      this._activeModalOverlay.style.cursor = "auto"
    }

    // stop listening to events
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOverlayClick)
    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._handleClose)
    })

    this._activeModalId = null
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
    document.documentElement.classList.remove(Selectors.NO_SCROLL)
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  _handleScrollStop() {
    document.body.classList.add(Selectors.NO_SCROLL)
    document.documentElement.classList.add(Selectors.NO_SCROLL)
  }
}
