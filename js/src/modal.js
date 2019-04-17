import Utils, { iOSMobile, getFocusableElements, nodeListToArray } from "./utils"

const KeyCodes = {
  ESCAPE: 27,
}

const Selectors = {
  // unique
  DATA_MODAL: "data-modal",
  // common
  DATA_TARGET: "data-target",
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
    this._originalPagePaddingRight = ""
    this._scrollbarOffset = 0

    // attribute helpers
    this._modalContainerAttr = `[${Selectors.DATA_MODAL}]`
  }

  // public

  start() {
    this._modals = nodeListToArray(this._modalContainerAttr)

    getFocusableElements(this._modalContainerAttr).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })

    if (this._modals.length) {
      this._modals.forEach(instance => {
        this._setupModal(instance)
        const id = instance.getAttribute(Selectors.DATA_MODAL)
        const button = document.querySelector(`[${Selectors.DATA_TARGET}='${id}']`)
        button.addEventListener(Events.CLICK, this._render)
      })
    }
  }

  stop() {
    this._modals.forEach(instance => {
      const id = instance.getAttribute(Selectors.DATA_MODAL)
      const button = document.querySelector(`[${Selectors.DATA_TARGET}='${id}']`)
      button.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  _render(event) {
    event.preventDefault()
    this._activeModalButton = event.target
    this._activeModalId = this._activeModalButton.getAttribute(Selectors.DATA_TARGET)

    if (!this._activeModalId) {
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

    this._handleScrollbarOffset()
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

  _getScrollbarOffset() {
    return window.innerWidth - document.body.getBoundingClientRect().right
  }

  _handleScrollbarOffset() {
    if (!this._scrollbarIsVisible()) return

    this._scrollbarOffset = this._getScrollbarOffset()
    this._originalPagePaddingRight = document.body.style.paddingRight
    document.body.style.paddingRight = `${this._scrollbarOffset}px`
  }

  _setupModal(instance) {
    const modalId = instance.getAttribute(Selectors.DATA_MODAL)

    if (!modalId) {
      return console.error(Messages.NO_MODAL_ID_ERROR)
    }

    const modal = instance.querySelector(`[${Selectors.DATA_PARENT}='${modalId}']`)

    if (!modal) {
      return console.error(Messages.NO_MODAL_ERROR(modalId))
    }

    const modalWrapper = document.querySelector(`[${Selectors.DATA_MODAL}='${modalId}']`)

    modalWrapper.setAttribute(Selectors.ARIA_HIDDEN, "true")
    modalWrapper.setAttribute(Selectors.DATA_VISIBLE, "false")
    modal.setAttribute(Selectors.ARIA_MODAL, "true")
    modal.setAttribute(Selectors.ROLE, "dialog")
  }

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

    this._removeScrollbarOffset()

    this._activeModalId = null
  }

  _scrollbarIsVisible() {
    if (typeof window.innerWidth === "number") {
      return window.innerWidth > document.body.getBoundingClientRect().right
    }
  }

  _removeScrollbarOffset() {
    const originalPadding = this._originalPagePaddingRight

    this._activeModalOverlay.style.paddingLeft = `${this._scrollbarOffset}px`
    setTimeout(() => (this._activeModalOverlay.style.paddingLeft = ""), 500)

    if (originalPadding) {
      document.body.style.paddingRight = `${originalPadding}px`
    } else {
      document.body.style.paddingRight = ""
    }
  }

  _handleOverlayClick(event) {
    if (event.target === this._activeModalOverlay) {
      this._handleClose(event)
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  _handleReturnFocus() {
    this._activeModalButton.setAttribute(Selectors.TABINDEX, "-1")
    this._activeModalButton.focus()
    this._activeModalButton.removeAttribute(Selectors.TABINDEX)
  }

  _handleScrollRestore() {
    document.body.classList.remove(Selectors.NO_SCROLL)
    document.documentElement.classList.remove(Selectors.NO_SCROLL)
  }

  _handleScrollStop() {
    document.body.classList.add(Selectors.NO_SCROLL)
    document.documentElement.classList.add(Selectors.NO_SCROLL)
  }
}
