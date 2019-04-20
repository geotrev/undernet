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
  NO_BUTTON_ERROR: id => `Could not find modal trigger with id ${id}.`,
  NO_MODAL_ID_ERROR:
    "Could not detect an id on your [data-modal] element. Please add a value matching the modal trigger's [data-parent] attribute.",
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
      })
    }
  }

  stop() {
    this._modals.forEach(instance => {
      const id = instance.getAttribute(Selectors.DATA_MODAL)
      const button = document.querySelector(`[${Selectors.DATA_TARGET}='${id}']`)

      if (!button) {
        throw new Error(Messages.NO_BUTTON_ERROR(id))
      }

      button.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  _setupModal(instance) {
    const modalId = instance.getAttribute(Selectors.DATA_MODAL)

    if (!modalId) {
      throw new Error(Messages.NO_MODAL_ID_ERROR)
    }

    const modal = instance.querySelector(`[${Selectors.DATA_PARENT}='${modalId}']`)

    if (!modal) {
      throw new Error(Messages.NO_MODAL_ERROR(modalId))
    }

    const modalWrapper = document.querySelector(`[${Selectors.DATA_MODAL}='${modalId}']`)

    modalWrapper.setAttribute(Selectors.ARIA_HIDDEN, "true")
    modalWrapper.setAttribute(Selectors.DATA_VISIBLE, "false")
    modal.setAttribute(Selectors.ARIA_MODAL, "true")
    modal.setAttribute(Selectors.ROLE, "dialog")

    const modalButton = document.querySelector(`[${Selectors.DATA_TARGET}='${modalId}']`)

    if (!modalButton) {
      throw new Error(Messages.NO_BUTTON_ERROR(modalId))
    }

    modalButton.addEventListener(Events.CLICK, this._render)
  }

  _render(event) {
    event.preventDefault()

    this._activeModalButton = event.target

    this._setActiveModalId()
    this._setActiveModalOverlay()
    this._setActiveModal()
    this._enableFocusOnChildren()
    this._handleScrollbarOffset()
    this._handleScrollStop()
    this.captureFocus(this._activeModalSelector)
    this._setAttributes()
    this._handleModalFocus()
    this._activeModalOverlay.scrollTop = 0

    this._activeModalCloseButtons = nodeListToArray(
      `${this._activeModalSelector} [${Selectors.DATA_CLOSE}]`
    )

    this._startEvents()
  }

  _handleClose(event) {
    event.preventDefault()

    this._stopEvents()
    this._handleReturnFocus()
    this._removeAttributes()
    this.releaseFocus()
    this._handleScrollRestore()
    this._removeScrollbarOffset()
    this._disableFocusOnChildren()

    if (iOSMobile) this._activeModalOverlay.style.cursor = "auto"

    this._activeModalId = null
    this._activeModalButton = null
    this._activeModal = null
  }

  _setActiveModalId() {
    this._activeModalId = this._activeModalButton.getAttribute(Selectors.DATA_TARGET)
  }

  _setActiveModalOverlay() {
    const activeModalOverlayAttr = `[${Selectors.DATA_MODAL}='${this._activeModalId}']`
    this._activeModalOverlay = document.querySelector(activeModalOverlayAttr)
  }

  _removeAttributes() {
    this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "false")
    this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "true")
    this._activeModal.removeAttribute(Selectors.TABINDEX)
  }

  _disableFocusOnChildren() {
    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "-1")
    })
  }

  _stopEvents() {
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOverlayClick)
    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._handleClose)
    })
  }

  _setActiveModal() {
    this._activeModalSelector = `[${Selectors.DATA_PARENT}='${this._activeModalId}']`
    this._activeModal = this._activeModalOverlay.querySelector(this._activeModalSelector)
  }

  _setAttributes() {
    this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "false")
    this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "true")
    if (iOSMobile) this._activeModalOverlay.style.cursor = "pointer"
  }

  _startEvents() {
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._handleClose)
    })
  }

  _handleModalFocus() {
    this._activeModal.setAttribute(Selectors.TABINDEX, "-1")
    this._activeModal.focus()
  }

  _enableFocusOnChildren() {
    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors.TABINDEX, "0")
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
