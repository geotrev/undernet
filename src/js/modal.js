import { iOSMobile, getFocusableElements, dom, isBrowserEnv, createFocusTrap } from "./utils"

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

const CssProperties = {
  PADDING_RIGHT: "paddingRight",
  PADDING_LEFT: "paddingLeft",
  CURSOR: "cursor",
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

const COMPONENT_ROLE = "dialog"

/**
 * Class that instantiates or destroys all instances of modal components on a page.
 *
 * @module Modal
 */
export default class Modal {
  constructor() {
    this._handleClick = this._handleClick.bind(this)
    this._handleCloseClick = this._handleCloseClick.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._setup = this._setup.bind(this)

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
    this._originalPagePadding = ""
    this._scrollbarOffset = 0
    this._focusTrap = () => {}

    // attribute helpers
    this._modalContainerAttr = `[${Selectors.DATA_MODAL}]`
  }

  // public

  start() {
    if (!isBrowserEnv) return

    this._modals = dom.findAll(this._modalContainerAttr)

    if (this._modals.length) {
      this._modals.forEach(this._setup)
    }
  }

  stop() {
    if (!isBrowserEnv) return

    this._modals.forEach(instance => {
      const id = dom.getAttr(instance, Selectors.DATA_MODAL)
      const button = dom.find(`[${Selectors.DATA_TARGET}='${id}']`)

      button.removeEventListener(Events.CLICK, this._handleClick)
    })
  }

  // private

  _setup(instance) {
    const modalId = dom.getAttr(instance, Selectors.DATA_MODAL)

    if (!modalId) {
      console.warning(Messages.NO_MODAL_ID_ERROR)
      return
    }

    const modalWrapperAttr = `[${Selectors.DATA_MODAL}='${modalId}']`
    const modalWrapper = dom.find(modalWrapperAttr)

    getFocusableElements(modalWrapperAttr).forEach(element =>
      dom.setAttr(element, Selectors.TABINDEX, "-1")
    )

    const modal = dom.find(`[${Selectors.DATA_PARENT}='${modalId}']`, instance)

    if (!modal) {
      console.warning(Messages.NO_MODAL_ERROR(modalId))
      return
    }

    dom.setAttr(modalWrapper, Selectors.ARIA_HIDDEN, "true")
    dom.setAttr(modalWrapper, Selectors.DATA_VISIBLE, "false")
    dom.setAttr(modal, Selectors.ARIA_MODAL, "true")
    dom.setAttr(modal, Selectors.ROLE, COMPONENT_ROLE)

    const modalButton = dom.find(`[${Selectors.DATA_TARGET}='${modalId}']`)

    if (!modalButton) {
      console.warning(Messages.NO_BUTTON_ERROR(modalId))
      return
    }

    modalButton.addEventListener(Events.CLICK, this._handleClick)
  }

  _handleClick(event) {
    event.preventDefault()

    this._activeModalButton = event.target

    this._setActiveModalId()
    this._setActiveModalOverlay()
    this._setActiveModal()
    this._enableFocusOnChildren()
    this._handleScrollbarOffset()
    this._handleScrollStop()

    this._focusTrap = createFocusTrap(this._activeModalSelector)
    this._focusTrap.start()

    this._setAttributes()
    this._setCloseButtons()
    this._handleModalFocus()
    this._activeModalOverlay.scrollTop = 0
    this._startEvents()
  }

  _handleCloseClick(event) {
    event.preventDefault()

    this._stopEvents()
    this._handleReturnFocus()
    this._removeAttributes()

    this._focusTrap.stop()

    this._handleScrollRestore()
    this._removeScrollbarOffset()
    this._disableFocusOnChildren()

    if (iOSMobile) dom.setStyle(this._activeModalOverlay, "cursor", "auto")

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
    this._activeModalId = dom.getAttr(this._activeModalButton, Selectors.DATA_TARGET)
  }

  _setActiveModalOverlay() {
    this._activeModalOverlay = dom.find(`[${Selectors.DATA_MODAL}='${this._activeModalId}']`)
  }

  _removeAttributes() {
    dom.setAttr(this._activeModalOverlay, Selectors.DATA_VISIBLE, "false")
    dom.setAttr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, "true")
    dom.removeAttr(this._activeModal, Selectors.TABINDEX)
  }

  _disableFocusOnChildren() {
    getFocusableElements(this._activeModalSelector).forEach(element => {
      dom.setAttr(element, Selectors.TABINDEX, "-1")
    })
  }

  _stopEvents() {
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._handleCloseClick)
    })
  }

  _setActiveModal() {
    this._activeModalSelector = `[${Selectors.DATA_PARENT}='${this._activeModalId}']`
    this._activeModal = dom.find(this._activeModalSelector, this._activeModalOverlay)
  }

  _setAttributes() {
    dom.setAttr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, "false")
    dom.setAttr(this._activeModalOverlay, Selectors.DATA_VISIBLE, "true")
    if (iOSMobile) dom.setStyle(this._activeModalOverlay, CssProperties.CURSOR, "pointer")
  }

  _startEvents() {
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._handleCloseClick)
    })
  }

  _handleModalFocus() {
    dom.setAttr(this._activeModal, Selectors.TABINDEX, "-1")
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
    this._originalPagePadding = dom.getStyle(document.body, CssProperties.PADDING_RIGHT)
    dom.setStyle(document.body, CssProperties.PADDING_RIGHT, `${this._scrollbarOffset}px`)
  }

  _scrollbarIsVisible() {
    if (typeof window.innerWidth === "number") {
      return window.innerWidth > document.body.getBoundingClientRect().right
    }
  }

  _removeScrollbarOffset() {
    const originalPadding = this._originalPagePadding
    const DISMISS_SCROLLBAR_PADDING_DELAY = 500

    dom.setStyle(this._activeModalOverlay, CssProperties.PADDING_LEFT, `${this._scrollbarOffset}px`)
    setTimeout(
      () => dom.setStyle(this._activeModalOverlay, CssProperties.PADDING_LEFT, ""),
      DISMISS_SCROLLBAR_PADDING_DELAY
    )

    if (originalPadding) {
      dom.setStyle(document.body, CssProperties.PADDING_RIGHT, `${originalPadding}px`)
    } else {
      dom.setStyle(document.body, CssProperties.PADDING_RIGHT, "")
    }
  }

  _handleOverlayClick(event) {
    if (event.target === this._activeModalOverlay) {
      this._handleCloseClick(event)
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleCloseClick(event)
    }
  }

  _handleReturnFocus() {
    dom.setAttr(this._activeModalButton, Selectors.TABINDEX, "-1")
    this._activeModalButton.focus()
    dom.removeAttr(this._activeModalButton, Selectors.TABINDEX)
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
