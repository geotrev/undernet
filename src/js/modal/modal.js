import {
  iOSMobile,
  getFocusableElements,
  dom,
  createFocusTrap,
  focusOnce,
  log,
  startComponent,
  stopComponent,
} from "../helpers"
import { KeyCodes, Selectors, CssProperties, CssValues, Events, Messages } from "./constants"

const COMPONENT_ROLE = "dialog"

/**
 * Class that instantiates or destroys all instances of modal components on a page.
 *
 * @module Modal
 */
export default class Modal {
  constructor() {
    this._handleClick = this._handleClick.bind(this)
    this._handleTransitionEnd = this._handleTransitionEnd.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._validate = this._validate.bind(this)
    this._teardown = this._teardown.bind(this)

    // all modals
    this._components = []

    // active modal
    this._activeModalTrigger = null
    this._activeModalAttr = ""
    this._activeModal = null
    this._activeModalContent = null
    this._activeModalId = ""
    this._activeModalContentSelector = ""
    this._activeModalCloseTriggers = []
    this._originalPagePadding = ""
    this._scrollbarOffset = null
    this._focusTrap = null
  }

  // public

  start(id) {
    startComponent({ id, attribute: Selectors.DATA_MODAL, thisArg: this })
  }

  stop(id) {
    stopComponent({
      id,
      attribute: Selectors.DATA_MODAL,
      thisArg: this,
      activeNodeKey: "_activeModal",
      cancelActiveFn: "_closeActiveModal",
    })
  }

  // private

  _validate(instance) {
    const modalId = dom.getAttr(instance, Selectors.DATA_MODAL)

    if (!modalId) {
      log(Messages.NO_ID_ERROR)
      return false
    }

    const modalAttr = `[${Selectors.DATA_MODAL}='${modalId}']`
    const modal = dom.find(modalAttr)

    const modalContent = dom.find(`[${Selectors.DATA_PARENT}='${modalId}']`, instance)

    if (!modalContent) {
      log(Messages.NO_MODAL_DIALOG_ERROR(modalId))
      return false
    }

    dom.setAttr(modal, Selectors.ARIA_HIDDEN, "true")
    dom.setAttr(modal, Selectors.DATA_VISIBLE, "false")
    dom.setAttr(modalContent, Selectors.ARIA_MODAL, "true")
    dom.setAttr(modalContent, Selectors.ROLE, COMPONENT_ROLE)

    const trigger = dom.find(`[${Selectors.DATA_TARGET}='${modalId}']`)

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(modalId))
      return false
    }

    trigger.addEventListener(Events.CLICK, this._handleClick)
    return true
  }

  _teardown(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_MODAL)
    const trigger = dom.find(`[${Selectors.DATA_TARGET}='${id}']`)

    trigger.removeEventListener(Events.CLICK, this._handleClick)
  }

  _handleClick(event) {
    event.preventDefault()

    this._activeModalTrigger = event.target

    this._setActiveId()
    this._setActiveModal()
    this._setActiveModalContent()
    this._setScrollbarOffset()
    this._setScrollStop()

    this._focusTrap = createFocusTrap(this._activeModalContentSelector)
    this._focusTrap.start()

    this._toggleVisibility(true)
    this._setFocusableChildren()
    this._setCloseTriggers()

    this._startEvents()
  }

  _handleClose(event) {
    event.preventDefault()
    this._closeActiveModal()
  }

  _closeActiveModal() {
    this._toggleVisibility(false)
    this._focusTrigger()
    this._unsetScrollStop()
    this._unsetScrollbarOffset()

    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseTriggers.forEach(trigger => {
      trigger.removeEventListener(Events.CLICK, this._handleClose)
    })

    this._focusTrap.stop()
    this._resetProperties()
  }

  _resetProperties() {
    this._activeModal = null
    this._activeModalTrigger = null
    this._activeModalContent = null
    this._activeModalId = ""
    this._activeModalContentSelector = ""
    this._activeModalCloseTriggers = []
    this._originalPagePadding = ""
    this._scrollbarOffset = null
    this._focusTrap = null
  }

  _setFocusableChildren() {
    const elements = getFocusableElements(this._activeModalContentSelector)
    if (!elements.length) return

    elements.forEach(element => dom.setAttr(element, Selectors.TABINDEX, "0"))
  }

  _setCloseTriggers() {
    this._activeModalCloseTriggers = dom.findAll(
      `${this._activeModalContentSelector} [${Selectors.DATA_CLOSE}]`
    )
  }

  _setActiveId() {
    this._activeModalId = dom.getAttr(this._activeModalTrigger, Selectors.DATA_TARGET)
  }

  _setActiveModal() {
    this._activeModalAttr = `[${Selectors.DATA_MODAL}='${this._activeModalId}']`
    this._activeModal = dom.find(`[${Selectors.DATA_MODAL}='${this._activeModalId}']`)
  }

  _setActiveModalContent() {
    this._activeModalContentSelector = `[${Selectors.DATA_PARENT}='${this._activeModalId}']`
    this._activeModalContent = dom.find(this._activeModalContentSelector, this._activeModal)
  }

  _handleTransitionEnd() {
    this._activeModal.removeEventListener(Events.TRANSITIONEND, this._handleTransitionEnd)
    this._focusContent()

    // Setting `scrollTop` to `0` unshifts the
    // scroll caused by focusing the dialog element
    this._activeModal.scrollTop = 0
  }

  _toggleVisibility(isVisible) {
    dom.setAttr(this._activeModal, Selectors.ARIA_HIDDEN, isVisible ? "false" : "true")
    dom.setAttr(this._activeModal, Selectors.DATA_VISIBLE, isVisible ? "true" : "false")

    if (isVisible) {
      dom.addClass(this._activeModal, Selectors.IS_VISIBLE_CLASS)
      this._activeModal.addEventListener(Events.TRANSITIONEND, this._handleTransitionEnd)
    } else {
      dom.removeClass(this._activeModal, Selectors.IS_VISIBLE_CLASS)
    }

    if (iOSMobile) {
      dom.setStyle(
        this._activeModal,
        CssProperties.CURSOR,
        isVisible ? CssValues.POINTER : CssValues.AUTO
      )
    }
  }

  _startEvents() {
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseTriggers.forEach(trigger => {
      trigger.addEventListener(Events.CLICK, this._handleClose)
    })
  }

  _getScrollbarOffset() {
    return window.innerWidth - document.body.getBoundingClientRect().right
  }

  _setScrollbarOffset() {
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

  _unsetScrollbarOffset() {
    if (!this._activeModal) return
    const originalPaddingRight = this._originalPagePadding

    this._setPaddingOffsetTimeout()
    dom.setStyle(document.body, CssProperties.PADDING_RIGHT, originalPaddingRight)
  }

  _setPaddingOffsetTimeout() {
    const DISMISS_SCROLLBAR_PADDING_DELAY = 500

    // This is cached because _activeModal will
    // be purged before the timeout is elapsed
    const modal = this._activeModal

    dom.setStyle(this._activeModal, CssProperties.PADDING_LEFT, `${this._scrollbarOffset}px`)
    setTimeout(() => {
      dom.setStyle(modal, CssProperties.PADDING_LEFT, "")
    }, DISMISS_SCROLLBAR_PADDING_DELAY)
  }

  _handleOverlayClick(event) {
    if (event.target === this._activeModal) {
      this._handleClose(event)
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  _focusContent() {
    focusOnce(this._activeModalContent)
  }

  _focusTrigger() {
    focusOnce(this._activeModalTrigger)
  }

  _unsetScrollStop() {
    dom.removeClass(document.body, Selectors.NO_SCROLL_CLASS)
    dom.removeClass(document.documentElement, Selectors.NO_SCROLL_CLASS)
  }

  _setScrollStop() {
    dom.addClass(document.body, Selectors.NO_SCROLL_CLASS)
    dom.addClass(document.documentElement, Selectors.NO_SCROLL_CLASS)
  }
}
