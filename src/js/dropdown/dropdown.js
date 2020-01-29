import {
  iOSMobile,
  dom,
  createFocusTrap,
  focusOnce,
  log,
  startComponent,
  stopComponent,
} from "../helpers"
import { KeyCodes, Selectors, Events, CssProperties, CssValues, Messages } from "./constants"

/**
 * Class that instantiates or destroys all instances of dropdown components on a page.
 *
 * @module Dropdown
 */
export default class Dropdown {
  constructor() {
    // events
    this._handleClick = this._handleClick.bind(this)
    this._handleFirstTabClose = this._handleFirstTabClose.bind(this)
    this._handleLastTabClose = this._handleLastTabClose.bind(this)
    this._handleArrowKeyPress = this._handleArrowKeyPress.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleOffMenuClick = this._handleOffMenuClick.bind(this)
    this._setup = this._setup.bind(this)
    this._teardown = this._teardown.bind(this)

    // all dropdowns
    this._components = []

    // active dropdown
    this._activeDropdownId = ""
    this._activeDropdownAttr = ""
    this._activeDropdownMenuId = ""
    this._activeDropdown = null
    this._activeTrigger = null
    this._activeDropdownMenu = null
    this._firstDropdownAction = null
    this._lastDropdownAction = null
    this._focusTrap = null
    this._activeDropdownActions = []
    this._allowFocusReturn = true

    // dropdown element selectors
    this._dropdownContainerAttr = `[${Selectors.DATA_DROPDOWN}]`
    this._dropdownTargetAttr = `[${Selectors.DATA_TARGET}]`
    this._dropdownMenuClassName = `.${Selectors.DROPDOWN_MENU_CLASS}`
  }

  // public

  start(id) {
    startComponent({ id, attribute: Selectors.DATA_DROPDOWN, thisArg: this })
  }

  stop(id) {
    stopComponent({
      id,
      attribute: Selectors.DATA_DROPDOWN,
      thisArg: this,
      activeNodeKey: "_activeDropdown",
      cancelActiveFn: "_closeActiveDropdown",
    })
  }

  // private

  _setup(instance) {
    const dropdownId = instance.getAttribute(Selectors.DATA_DROPDOWN)

    if (!dropdownId) {
      log(Messages.NO_DROPDOWN_ID_ERROR)
      return false
    }

    const dropdownAttr = `[${Selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownTrigger = dom.find(`${dropdownAttr} > [${Selectors.DATA_TARGET}]`)

    if (!dom.getAttr(dropdownTrigger, Selectors.DATA_PARENT)) {
      log(Messages.NO_PARENT_ERROR)
      return false
    }

    const dropdownMenu = dom.find(`${dropdownAttr} > ${this._dropdownMenuClassName}`)

    if (!dropdownMenu) {
      log(Messages.NO_MENU_ERROR(dropdownAttr))
      return false
    }

    dom.setAttr(dropdownMenu, Selectors.ARIA_LABELLEDBY, dropdownTrigger.id)

    dom.setAttr(dropdownTrigger, Selectors.ARIA_CONTROLS, dropdownMenu.id)
    dom.setAttr(dropdownTrigger, Selectors.ARIA_HASPOPUP, "true")
    dom.setAttr(dropdownTrigger, Selectors.ARIA_EXPANDED, "false")

    const dropdownMenuItemsAttr = `${dropdownAttr} > ${this._dropdownMenuClassName} > li`
    const dropdownMenuListItems = dom.findAll(dropdownMenuItemsAttr)

    if (!dropdownMenuListItems.length) {
      log(Messages.NO_DROPDOWN_ITEMS_ERROR(dropdownAttr))
      return false
    }

    const dropdownMenuTriggers = this._getDropdownActions(dropdownAttr)

    if (!dropdownMenuTriggers.length) {
      log(Messages.NO_DROPDOWN_ACTIONS_ERROR(dropdownAttr))
      return false
    }

    dropdownMenuTriggers.forEach(trigger => {
      dom.setAttr(trigger, Selectors.TABINDEX, "-1")
    })

    dropdownTrigger.addEventListener(Events.CLICK, this._handleClick)
    dropdownTrigger.addEventListener(Events.KEYDOWN, this._handleArrowKeyPress)

    return true
  }

  _teardown(instance) {
    const id = dom.getAttr(instance, Selectors.DATA_DROPDOWN)
    const trigger = dom.find(`[${Selectors.DATA_PARENT}='${id}']`, instance)

    trigger.removeEventListener(Events.CLICK, this._handleClick)
    trigger.removeEventListener(Events.KEYDOWN, this._handleArrowKeyPress)
  }

  _handleClick(event, key) {
    event.preventDefault()
    event.stopPropagation()
    this._closeOpenDropdowns(event)

    this._activeTrigger = event.target

    this._setActiveDropdownId()
    this._setActiveDropdown()
    this._setActiveDropdownMenu()
    this._setVisibleState()
    this._startActiveDropdownEvents()

    if (key && key === KeyCodes.ARROW_UP) {
      this._lastDropdownAction.focus()
    } else {
      this._firstDropdownAction.focus()
    }

    if (iOSMobile) dom.setStyle(document.body, CssProperties.CURSOR, CssValues.POINTER)
  }

  _handleClose() {
    if (this._allowFocusReturn) this._handleReturnFocus()
    this._closeActiveDropdown()
  }

  _closeActiveDropdown() {
    if (iOSMobile) dom.setStyle(document.body, CssProperties.CURSOR, CssValues.POINTER)

    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "false")
    dom.setAttr(this._activeTrigger, Selectors.ARIA_EXPANDED, "false")

    this._activeTrigger.removeEventListener(Events.CLICK, this._handleClose)
    this._activeTrigger.addEventListener(Events.CLICK, this._handleClick)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOffMenuClick)
    this._firstDropdownAction.removeEventListener(Events.KEYDOWN, this._handleFirstTabClose)
    this._lastDropdownAction.removeEventListener(Events.KEYDOWN, this._handleLastTabClose)

    this._activeDropdownActions.forEach(action => {
      dom.setAttr(action, Selectors.TABINDEX, "-1")
      action.removeEventListener(Events.CLICK, this._handleClose)
    })

    this._focusTrap.stop()
    this._focusTrap = null

    this._resetProperties()
  }

  _resetProperties() {
    this._activeDropdownId = ""
    this._activeDropdownAttr = ""
    this._activeDropdownMenuId = ""
    this._activeDropdown = null
    this._activeTrigger = null
    this._activeDropdownMenu = null
    this._firstDropdownAction = null
    this._lastDropdownAction = null
    this._focusTrap = null
    this._activeDropdownActions = []
    this._allowFocusReturn = true
  }

  _setActiveDropdownId() {
    this._activeDropdownId = dom.getAttr(this._activeTrigger, Selectors.DATA_PARENT)
  }

  _startActiveDropdownEvents() {
    this._activeTrigger.removeEventListener(Events.CLICK, this._handleClick)
    this._activeTrigger.addEventListener(Events.CLICK, this._handleClose)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOffMenuClick)

    this._activeDropdownActions = this._getDropdownActions(this._activeDropdownAttr)

    this._firstDropdownAction = this._activeDropdownActions[0]
    this._lastDropdownAction = this._activeDropdownActions[this._activeDropdownActions.length - 1]

    this._firstDropdownAction.addEventListener(Events.KEYDOWN, this._handleFirstTabClose)
    this._lastDropdownAction.addEventListener(Events.KEYDOWN, this._handleLastTabClose)

    this._activeDropdownActions.forEach(action => {
      dom.setAttr(action, Selectors.TABINDEX, "0")
      action.addEventListener(Events.CLICK, this._handleClose)
    })

    const containerSelector = `${this._activeDropdownAttr} > ${this._dropdownMenuClassName}`

    if (this._focusTrap) {
      this._focusTrap.stop()
    }

    this._focusTrap = createFocusTrap(containerSelector, { useArrows: true })
    this._focusTrap.start()
  }

  _setVisibleState() {
    dom.setAttr(this._activeTrigger, Selectors.ARIA_EXPANDED, "true")
    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "true")
  }

  _setActiveDropdownMenu() {
    this._activeDropdownMenuId = dom.getAttr(this._activeTrigger, Selectors.DATA_TARGET)
    this._activeDropdownMenu = dom.find(`#${this._activeDropdownMenuId}`)
  }

  _setActiveDropdown() {
    this._activeDropdownAttr = `[${Selectors.DATA_DROPDOWN}="${this._activeDropdownId}"]`
    this._activeDropdown = dom.find(this._activeDropdownAttr)
  }

  _closeOpenDropdowns(event) {
    if (!this._activeTrigger) return

    this._allowFocusReturn = false
    this._handleClose(event)
    this._allowFocusReturn = true
  }

  _handleFirstTabClose(event) {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (shiftKey && tabKey) {
      this._handleClose(event)
    }
  }

  _handleLastTabClose(event) {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (tabKey && !shiftKey) {
      this._handleClose(event)
    }
  }

  _handleArrowKeyPress(event) {
    if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
      this._handleClick(event, event.which)
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  _handleOffMenuClick(event) {
    if (event.target !== this._activeTrigger && event.target !== this._activeDropdownMenu) {
      this._handleClose(event)
    }
  }

  _handleReturnFocus() {
    if (!this._activeTrigger) return
    focusOnce(this._activeTrigger)
  }

  _getDropdownActions(attr) {
    return dom.findAll(
      `${attr} > ${this._dropdownMenuClassName} > li > a, ${attr} > ${this._dropdownMenuClassName} > li > button`
    )
  }
}
