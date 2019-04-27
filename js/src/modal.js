import Utils, { iOSMobile, getFocusableElements, dom } from "./utils"

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
    this._modals = dom.findAll(this._modalContainerAttr)

    getFocusableElements(this._modalContainerAttr).forEach(element => {
      dom.attr(element, Selectors.TABINDEX, "-1")
    })

    if (this._modals.length) {
      this._modals.forEach(instance => {
        this._setup(instance)
      })
    }
  }

  stop() {
    this._modals.forEach(instance => {
      const id = dom.attr(instance, Selectors.DATA_MODAL)
      const button = dom.find(`[${Selectors.DATA_TARGET}='${id}']`)

      if (!button) {
        throw new Error(Messages.NO_BUTTON_ERROR(id))
      }

      button.removeEventListener(Events.CLICK, this._render)
    })
  }

  // private

  _setup(instance) {
    const modalId = dom.attr(instance, Selectors.DATA_MODAL)

    if (!modalId) {
      throw new Error(Messages.NO_MODAL_ID_ERROR)
    }

    const modal = dom.find(`[${Selectors.DATA_PARENT}='${modalId}']`, instance)

    if (!modal) {
      throw new Error(Messages.NO_MODAL_ERROR(modalId))
    }

    const modalWrapper = dom.find(`[${Selectors.DATA_MODAL}='${modalId}']`)

    dom.attr(modalWrapper, Selectors.ARIA_HIDDEN, "true")
    dom.attr(modalWrapper, Selectors.DATA_VISIBLE, "false")
    dom.attr(modal, Selectors.ARIA_MODAL, "true")
    dom.attr(modal, Selectors.ROLE, "dialog")

    const modalButton = dom.find(`[${Selectors.DATA_TARGET}='${modalId}']`)

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
    this._setCloseButtons()
    this._handleModalFocus()
    this._activeModalOverlay.scrollTop = 0
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

    if (iOSMobile) dom.css(this._activeModalOverlay, "cursor", "auto")

    this._activeModalId = null
    this._activeModalButton = null
    this._activeModal = null
  }

  _setCloseButtons() {
    this._activeModalCloseButtons = dom.findAll(
      `${this._activeModalSelector} [${Selectors.DATA_CLOSE}]`
    )
  }

  _setActiveModalId() {
    this._activeModalId = dom.attr(this._activeModalButton, Selectors.DATA_TARGET)
  }

  _setActiveModalOverlay() {
    this._activeModalOverlay = dom.find(`[${Selectors.DATA_MODAL}='${this._activeModalId}']`)
  }

  _removeAttributes() {
    dom.attr(this._activeModalOverlay, Selectors.DATA_VISIBLE, "false")
    dom.attr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, "true")
    dom.attr(this._activeModal, Selectors.TABINDEX, false)
  }

  _disableFocusOnChildren() {
    getFocusableElements(this._activeModalSelector).forEach(element => {
      dom.attr(element, Selectors.TABINDEX, "-1")
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
    this._activeModal = dom.find(this._activeModalSelector, this._activeModalOverlay)
  }

  _setAttributes() {
    dom.attr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, "false")
    dom.attr(this._activeModalOverlay, Selectors.DATA_VISIBLE, "true")
    if (iOSMobile) dom.css(this._activeModalOverlay, "cursor", "pointer")
  }

  _startEvents() {
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._handleClose)
    })
  }

  _handleModalFocus() {
    dom.attr(this._activeModal, Selectors.TABINDEX, "-1")
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
    this._originalPagePaddingRight = dom.css(document.body, "paddingRight")
    dom.css(document.body, "paddingRight", `${this._scrollbarOffset}px`)
  }

  _scrollbarIsVisible() {
    if (typeof window.innerWidth === "number") {
      return window.innerWidth > document.body.getBoundingClientRect().right
    }
  }

  _removeScrollbarOffset() {
    const originalPadding = this._originalPagePaddingRight

    dom.css(this._activeModalOverlay, "paddingLeft", `${this._scrollbarOffset}px`)
    setTimeout(() => dom.css(this._activeModalOverlay, "paddingLeft", ""), 500)

    if (originalPadding) {
      dom.css(document.body, "paddingRight", `${originalPadding}px`)
    } else {
      dom.css(document.body, "paddingRight", "")
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
    dom.attr(this._activeModalButton, Selectors.TABINDEX, "-1")
    this._activeModalButton.focus()
    dom.attr(this._activeModalButton, Selectors.TABINDEX, false)
  }

  _handleScrollRestore() {
    dom.removeClass(document.body, Selectors.NO_SCROLL)
    dom.removeClass(document.documentElement, Selectors.NO_SCROLL)
  }

  _handleScrollStop() {
    dom.addClass(document.body, Selectors.NO_SCROLL)
    dom.addClass(document.documentElement, Selectors.NO_SCROLL)
  }
}
