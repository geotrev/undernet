import {
  isiOSMobile,
  getFocusableElements,
  createFocusTrap,
  focusOnce,
  log,
  queryAll,
  ComponentEngine,
} from "../helpers"
import { KeyCodes, Selectors, CssProperties, Events, Messages } from "./constants"

const COMPONENT_ROLE = "dialog"

/**
 * Class that instantiates or destroys all instances of modal components on a page.
 *
 * @module Modal
 */
export default class Modal {
  constructor() {
    this._handleClick = this._handleClick.bind(this)
    this._handleOpenTransition = this._handleOpenTransition.bind(this)
    this._handleCloseTransition = this._handleCloseTransition.bind(this)
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
    ComponentEngine.start({ id, attribute: Selectors.DATA_MODAL, thisArg: this })
  }

  stop(id) {
    ComponentEngine.stop({
      id,
      attribute: Selectors.DATA_MODAL,
      thisArg: this,
      activeNodeKey: "_activeModal",
      cancelActiveFn: "_closeActiveModal",
    })
  }

  // private

  _validate(instance) {
    const id = instance.getAttribute(Selectors.DATA_MODAL)

    if (!id) {
      log(Messages.NO_ID_ERROR)
      return false
    }

    const modal = document.querySelector(`[${Selectors.DATA_MODAL}='${id}']`)
    const modalContent = instance.querySelector(`[${Selectors.DATA_PARENT}='${id}']`)

    if (!modalContent) {
      log(Messages.NO_MODAL_DIALOG_ERROR(id))
      return false
    }

    modal.setAttribute(Selectors.ARIA_HIDDEN, "true")
    modal.setAttribute(Selectors.DATA_VISIBLE, "false")
    modalContent.setAttribute(Selectors.ARIA_MODAL, "true")
    modalContent.setAttribute(Selectors.ROLE, COMPONENT_ROLE)

    const trigger = document.querySelector(`[${Selectors.DATA_TARGET}='${id}']`)

    if (!trigger) {
      log(Messages.NO_TRIGGER_ERROR(id))
      return false
    }

    trigger.addEventListener(Events.CLICK, this._handleClick)
    return true
  }

  _teardown(instance) {
    const id = instance.getAttribute(Selectors.DATA_MODAL)
    const trigger = document.querySelector(`[${Selectors.DATA_TARGET}='${id}']`)

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

    elements.forEach(element => element.setAttribute(Selectors.TABINDEX, "0"))
  }

  _setCloseTriggers() {
    this._activeModalCloseTriggers = queryAll(
      `${this._activeModalContentSelector} [${Selectors.DATA_CLOSE}]`
    )
  }

  _setActiveId() {
    this._activeModalId = this._activeModalTrigger.getAttribute(Selectors.DATA_TARGET)
  }

  _setActiveModal() {
    this._activeModalAttr = `[${Selectors.DATA_MODAL}='${this._activeModalId}']`
    this._activeModal = document.querySelector(`[${Selectors.DATA_MODAL}='${this._activeModalId}']`)
  }

  _setActiveModalContent() {
    this._activeModalContentSelector = `[${Selectors.DATA_PARENT}='${this._activeModalId}']`
    this._activeModalContent = this._activeModal.querySelector(this._activeModalContentSelector)
  }

  _handleOpenTransition() {
    this._activeModal.removeEventListener(Events.TRANSITIONEND, this._handleOpenTransition)
    this._focusContent()

    // Setting `scrollTop` to `0` unshifts the
    // scroll caused by focusing the dialog element
    this._activeModal.scrollTop = 0
  }

  _handleCloseTransition() {
    this._modalCache.style[CssProperties.PADDING_LEFT] = ""
    this._modalCache.removeEventListener(Events.TRANSITIONEND, this._handleCloseTransition)
    this._modalCache = null
  }

  _toggleVisibility(isVisible) {
    this._activeModal.setAttribute(Selectors.ARIA_HIDDEN, isVisible ? "false" : "true")
    this._activeModal.setAttribute(Selectors.DATA_VISIBLE, isVisible ? "true" : "false")

    if (isVisible) {
      this._activeModal.classList.add(Selectors.IS_VISIBLE_CLASS)
      this._activeModal.addEventListener(Events.TRANSITIONEND, this._handleOpenTransition)
    } else {
      this._modalCache = this._activeModal
      this._activeModal.classList.remove(Selectors.IS_VISIBLE_CLASS)
      this._activeModal.addEventListener(Events.TRANSITIONEND, this._handleCloseTransition)
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
    this._originalPagePadding = document.body.style[CssProperties.PADDING_RIGHT]
    document.body.style[CssProperties.PADDING_RIGHT] = `${this._scrollbarOffset}px`
  }

  _scrollbarIsVisible() {
    if (typeof window.innerWidth === "number") {
      return window.innerWidth > document.body.getBoundingClientRect().right
    }
  }

  _unsetScrollbarOffset() {
    if (!this._activeModal) return
    const originalPaddingRight = this._originalPagePadding

    this._activeModal.style[CssProperties.PADDING_LEFT] = `${this._scrollbarOffset}px`
    document.body.style[CssProperties.PADDING_RIGHT] = originalPaddingRight
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
    if (isiOSMobile) document.body.classList.remove(Selectors.OVERLAY_OPEN)
    document.body.classList.remove(Selectors.NO_SCROLL_CLASS)
    document.documentElement.classList.remove(Selectors.NO_SCROLL_CLASS)
  }

  _setScrollStop() {
    if (isiOSMobile) document.body.classList.add(Selectors.OVERLAY_OPEN)
    document.body.classList.add(Selectors.NO_SCROLL_CLASS)
    document.documentElement.classList.add(Selectors.NO_SCROLL_CLASS)
  }
}
