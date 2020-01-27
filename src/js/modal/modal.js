import {
  iOSMobile,
  getFocusableElements,
  dom,
  isBrowserEnv,
  createFocusTrap,
  focusOnce,
  log,
  isString,
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
    this._handleCloseClick = this._handleCloseClick.bind(this)
    this._handleOverlayClick = this._handleOverlayClick.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._setup = this._setup.bind(this)
    this._teardown = this._teardown.bind(this)

    // all modals
    this._modals = []

    // active modal
    this._activeModalTrigger = null
    this._activeModalOverlayAttr = ""
    this._activeModalOverlay = null
    this._activeModal = null
    this._activeModalId = ""
    this._activeModalSelector = ""
    this._activeModalCloseTriggers = []
    this._originalPagePadding = ""
    this._scrollbarOffset = null
    this._focusTrap = null
  }

  // public

  start(id) {
    if (!isBrowserEnv) return

    if (id && isString(id)) {
      const instance = dom.find(`[${Selectors.DATA_MODAL}='${id}']`)
      if (!instance) return

      const validComponent = [instance].filter(this._setup)[0]
      if (!validComponent) return

      this._modals.push(validComponent)
    } else if (!id && !this._modals.length) {
      const instances = dom.findAll(`[${Selectors.DATA_MODAL}]`)
      if (!instances.length) return

      const validComponents = instances.filter(this._setup)
      this._modals = this._modals.concat(validComponents)
    } else {
      // attempted to .start() when .stop() wasn't run,
      // OR tried to instantiate a component that's already active.
    }
  }

  stop(id) {
    if (!isBrowserEnv) return

    if (id && isString(id)) {
      let targetIndex
      const instance = this._modals.filter((activeInstance, index) => {
        if (dom.getAttr(activeInstance, Selectors.DATA_MODAL) !== id) return false
        targetIndex = index
        return true
      })[0]

      if (!instance) return
      if (this._activeModalOverlay && instance === this._activeModalOverlay)
        this._closeActiveModal()

      this._teardown(instance)
      this._modals.splice(targetIndex, 1)
    } else if (!id && this._modals.length) {
      if (this._activeModalOverlay) this._closeActiveModal()

      this._modals.forEach(this._teardown)
      this._modals = []
    }
  }

  // private

  _setup(instance) {
    const modalId = dom.getAttr(instance, Selectors.DATA_MODAL)

    if (!modalId) {
      log(Messages.NO_ID_ERROR)
      return false
    }

    const modalWrapperAttr = `[${Selectors.DATA_MODAL}='${modalId}']`
    const modalWrapper = dom.find(modalWrapperAttr)

    getFocusableElements(modalWrapperAttr).forEach(element =>
      dom.setAttr(element, Selectors.TABINDEX, "-1")
    )

    const modal = dom.find(`[${Selectors.DATA_PARENT}='${modalId}']`, instance)

    if (!modal) {
      log(Messages.NO_MODAL_DIALOG_ERROR(modalId))
      return false
    }

    dom.setAttr(modalWrapper, Selectors.ARIA_HIDDEN, "true")
    dom.setAttr(modalWrapper, Selectors.DATA_VISIBLE, "false")
    dom.setAttr(modal, Selectors.ARIA_MODAL, "true")
    dom.setAttr(modal, Selectors.ROLE, COMPONENT_ROLE)

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

    this._setActiveModalId()
    this._setActiveModalOverlay()
    this._setActiveModal()
    this._setScrollbarOffset()
    this._setScrollStop()

    this._focusTrap = createFocusTrap(this._activeModalSelector)
    this._focusTrap.start()

    this._changeDialogVisibility(true)
    this._changeTabindexOnChildren("0")
    this._setCloseTriggers()
    this._focusModalDialog()

    // Focusing the modal dialog causes a focus change if the container is larger than the window height
    this._activeModalOverlay.scrollTop = 0

    this._startEvents()
  }

  _handleCloseClick(event) {
    event.preventDefault()
    this._closeActiveModal()
  }

  _closeActiveModal() {
    this._changeDialogVisibility(false)
    this._focusModalTrigger()
    this._unsetScrollStop()
    this._unsetScrollbarOffset()

    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOverlayClick)
    this._changeTabindexOnChildren("-1")

    this._activeModalCloseTriggers.forEach(trigger => {
      trigger.removeEventListener(Events.CLICK, this._handleCloseClick)
      dom.setAttr(trigger, Selectors.TABINDEX, "-1")
    })

    this._focusTrap.stop()
    this._resetProperties()
  }

  _resetProperties() {
    // Overlay and overlay attribute properties are reset in setPaddingOffsetTimeout

    this._activeModalOverlay = null
    this._activeModalTrigger = null
    this._activeModal = null
    this._activeModalId = ""
    this._activeModalSelector = ""
    this._activeModalCloseTriggers = []
    this._originalPagePadding = ""
    this._scrollbarOffset = null
    this._focusTrap = null
  }

  _changeTabindexOnChildren(value) {
    const elements = getFocusableElements(this._activeModalOverlayAttr)
    if (!elements.length) return

    elements.forEach(element => dom.setAttr(element, Selectors.TABINDEX, value))
  }

  _setCloseTriggers() {
    this._activeModalCloseTriggers = dom.findAll(
      `${this._activeModalSelector} [${Selectors.DATA_CLOSE}]`
    )
  }

  _setActiveModalId() {
    this._activeModalId = dom.getAttr(this._activeModalTrigger, Selectors.DATA_TARGET)
  }

  _setActiveModalOverlay() {
    this._activeModalOverlayAttr = `[${Selectors.DATA_MODAL}='${this._activeModalId}']`
    this._activeModalOverlay = dom.find(`[${Selectors.DATA_MODAL}='${this._activeModalId}']`)
  }

  _setActiveModal() {
    this._activeModalSelector = `[${Selectors.DATA_PARENT}='${this._activeModalId}']`
    this._activeModal = dom.find(this._activeModalSelector, this._activeModalOverlay)
  }

  _changeDialogVisibility(isVisible) {
    dom.setAttr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, isVisible ? "false" : "true")
    dom.setAttr(this._activeModalOverlay, Selectors.DATA_VISIBLE, isVisible ? "true" : "false")

    if (iOSMobile) {
      dom.setStyle(
        this._activeModalOverlay,
        CssProperties.CURSOR,
        isVisible ? CssValues.POINTER : CssValues.AUTO
      )
    }
  }

  _startEvents() {
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOverlayClick)

    this._activeModalCloseTriggers.forEach(trigger => {
      trigger.addEventListener(Events.CLICK, this._handleCloseClick)
    })
  }

  _focusModalDialog() {
    focusOnce(this._activeModal)
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
    if (!this._activeModalOverlay) return
    const originalPaddingRight = this._originalPagePadding

    this._setPaddingOffsetTimeout()
    dom.setStyle(document.body, CssProperties.PADDING_RIGHT, originalPaddingRight)
  }

  _setPaddingOffsetTimeout() {
    const DISMISS_SCROLLBAR_PADDING_DELAY = 500

    // This is cached because _activeModalOverlay will
    // be purged before the timeout is elapsed
    const overlay = this._activeModalOverlay

    dom.setStyle(this._activeModalOverlay, CssProperties.PADDING_LEFT, `${this._scrollbarOffset}px`)
    setTimeout(() => {
      dom.setStyle(overlay, CssProperties.PADDING_LEFT, "")
    }, DISMISS_SCROLLBAR_PADDING_DELAY)
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

  _focusModalTrigger() {
    focusOnce(this._activeModalTrigger)
  }

  _unsetScrollStop() {
    dom.removeClass(document.body, Selectors.NO_SCROLL)
    dom.removeClass(document.documentElement, Selectors.NO_SCROLL)
  }

  _setScrollStop() {
    dom.addClass(document.body, Selectors.NO_SCROLL)
    dom.addClass(document.documentElement, Selectors.NO_SCROLL)
  }
}
