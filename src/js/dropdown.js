import { iOSMobile, dom, isBrowserEnv, createFocusTrap, focusOnce } from "./utils"

const KeyCodes = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

const Selectors = {
  // unique
  DATA_DROPDOWN: "data-dropdown",
  DROPDOWN_MENU_CLASS: "dropdown-menu",
  // common
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  // accessibility
  TABINDEX: "tabindex",
  ARIA_HASPOPUP: "aria-haspopup",
  ARIA_CONTROLS: "aria-controls",
  ARIA_LABELLEDBY: "aria-labelledby",
  ARIA_EXPANDED: "aria-expanded",
  ROLE: "role",
}

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  BLUR: "blur",
}

const CssProperties = {
  CURSOR: "cursor",
}

const CssValues = {
  POINTER: "pointer",
}

const Messages = {
  NO_DROPDOWN_ID_ERROR:
    "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value.",
  NO_MENU_ERROR: attr => `Could not find menu associated with ${attr}.`,
  NO_DROPDOWN_ITEMS_ERROR: attr => `Could not find any list items associated with ${attr}.`,
  NO_DROPDOWN_ACTIONS_ERROR: attr =>
    `Could not find any button or anchor elements associated with ${attr}.`,
  NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute.",
}

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
    this._handleCloseClick = this._handleCloseClick.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleOffMenuClick = this._handleOffMenuClick.bind(this)
    this._setup = this._setup.bind(this)

    // all dropdowns
    this._dropdowns = []
    this._dropdownTriggers = []

    // active dropdown
    this._activeDropdown = null
    this._activeDropdownTrigger = null
    this._activeDropdownMenu = null
    this._activeDropdownActions = []
    this._allowFocusReturn = true
    this._activeDropdownId = ""
    this._activeDropdownAttr = ""
    this._activeDropdownMenuId = ""
    this._firstDropdownAction = null
    this._lastDropdownAction = null
    this._focusTrap = null

    // dropdown element selectors
    this._dropdownContainerAttr = `[${Selectors.DATA_DROPDOWN}]`
    this._dropdownTargetAttr = `[${Selectors.DATA_TARGET}]`
    this._dropdownMenuClassName = `.${Selectors.DROPDOWN_MENU_CLASS}`
  }

  // public

  start() {
    if (!isBrowserEnv) return

    this._dropdowns = dom.findAll(`${this._dropdownContainerAttr}`)
    this._dropdownTriggers = dom.findAll(
      `${this._dropdownContainerAttr} > ${this._dropdownTargetAttr}`
    )

    if (this._dropdowns.length) {
      this._dropdowns.forEach(this._setup)
    }
  }

  stop() {
    if (!isBrowserEnv) return
    if (this._activeDropdown) this._closeActiveDropdownMenu()

    if (this._dropdownTriggers.length) {
      this._dropdownTriggers.forEach(trigger => {
        trigger.removeEventListener(Events.CLICK, this._handleClick)
        trigger.removeEventListener(Events.KEYDOWN, this._handleArrowKeyPress)
      })
    }
  }

  // private

  _setup(instance) {
    const dropdownId = instance.getAttribute(Selectors.DATA_DROPDOWN)

    if (!dropdownId) {
      console.warning(Messages.NO_DROPDOWN_ID_ERROR)
      return
    }

    const dropdownAttr = `[${Selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownTrigger = dom.find(`${dropdownAttr} > ${this._dropdownTargetAttr}`)

    if (!dom.getAttr(dropdownTrigger, Selectors.DATA_PARENT)) {
      console.warning(Messages.NO_PARENT_ERROR)
      return
    }

    const dropdownMenu = dom.find(`${dropdownAttr} > ${this._dropdownMenuClassName}`)

    if (!dropdownMenu) {
      console.warning(Messages.NO_MENU_ERROR(dropdownAttr))
      return
    }

    dom.setAttr(dropdownMenu, Selectors.ARIA_LABELLEDBY, dropdownTrigger.id)

    dom.setAttr(dropdownTrigger, Selectors.ARIA_CONTROLS, dropdownMenu.id)
    dom.setAttr(dropdownTrigger, Selectors.ARIA_HASPOPUP, "true")
    dom.setAttr(dropdownTrigger, Selectors.ARIA_EXPANDED, "false")

    const dropdownMenuItemsAttr = `${dropdownAttr} > ${this._dropdownMenuClassName} > li`
    const dropdownMenuListItems = dom.findAll(dropdownMenuItemsAttr)

    if (!dropdownMenuListItems.length) {
      console.warning(Messages.NO_DROPDOWN_ITEMS_ERROR(dropdownAttr))
      return
    }

    dropdownMenuListItems.forEach(item => dom.setAttr(item, Selectors.ROLE, "none"))

    const dropdownMenuTriggers = this._getDropdownActions(dropdownAttr)

    if (!dropdownMenuTriggers.length) {
      console.warning(Messages.NO_DROPDOWN_ACTIONS_ERROR(dropdownAttr))
      return
    }

    dropdownMenuTriggers.forEach(trigger => {
      dom.setAttr(trigger, Selectors.ROLE, "menuitem")
      dom.setAttr(trigger, Selectors.TABINDEX, "-1")
    })

    dropdownTrigger.addEventListener(Events.CLICK, this._handleClick)
    dropdownTrigger.addEventListener(Events.KEYDOWN, this._handleArrowKeyPress)
  }

  _handleClick(event, key) {
    event.preventDefault()
    event.stopPropagation()
    this._closeOpenDropdowns(event)

    this._activeDropdownTrigger = event.target

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

  _handleCloseClick(event) {
    event.preventDefault()

    this._closeActiveDropdownMenu()
  }

  _closeActiveDropdownMenu() {
    if (this._allowFocusReturn) this._handleReturnFocus()
    this._closeActiveDropdown()
  }

  _closeActiveDropdown() {
    if (iOSMobile) dom.setStyle(document.body, CssProperties.CURSOR, CssValues.POINTER)

    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "false")
    dom.setAttr(this._activeDropdownTrigger, Selectors.ARIA_EXPANDED, "false")

    this._activeDropdownTrigger.removeEventListener(Events.CLICK, this._handleCloseClick)
    this._activeDropdownTrigger.addEventListener(Events.CLICK, this._handleClick)
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOffMenuClick)
    this._firstDropdownAction.removeEventListener(Events.KEYDOWN, this._handleFirstTabClose)
    this._lastDropdownAction.removeEventListener(Events.KEYDOWN, this._handleLastTabClose)

    this._activeDropdownActions.forEach(action => {
      dom.setAttr(action, Selectors.TABINDEX, "-1")
      action.removeEventListener(Events.CLICK, this._handleCloseClick)
    })

    this._focusTrap.stop()
    this._focusTrap = null

    this._resetProperties()
  }

  _resetProperties() {
    this._activeDropdown = null
    this._activeDropdownTrigger = null
    this._activeDropdownMenu = null
    this._activeDropdownActions = []
    this._allowFocusReturn = true
    this._activeDropdownId = ""
    this._activeDropdownAttr = ""
    this._activeDropdownMenuId = ""
    this._firstDropdownAction = null
    this._lastDropdownAction = null
    this._focusTrap = null
  }

  _setActiveDropdownId() {
    this._activeDropdownId = dom.getAttr(this._activeDropdownTrigger, Selectors.DATA_PARENT)
  }

  _startActiveDropdownEvents() {
    this._activeDropdownTrigger.removeEventListener(Events.CLICK, this._handleClick)
    this._activeDropdownTrigger.addEventListener(Events.CLICK, this._handleCloseClick)
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOffMenuClick)

    this._activeDropdownActions = this._getDropdownActions(this._activeDropdownAttr)

    this._firstDropdownAction = this._activeDropdownActions[0]
    this._lastDropdownAction = this._activeDropdownActions[this._activeDropdownActions.length - 1]

    this._firstDropdownAction.addEventListener(Events.KEYDOWN, this._handleFirstTabClose)
    this._lastDropdownAction.addEventListener(Events.KEYDOWN, this._handleLastTabClose)

    this._activeDropdownActions.forEach(action => {
      dom.setAttr(action, Selectors.TABINDEX, "0")
      action.addEventListener(Events.CLICK, this._handleCloseClick)
    })

    const contaienrSelector = `${this._activeDropdownAttr} > ${this._dropdownMenuClassName}`

    if (this._focusTrap) {
      this._focusTrap.stop()
    }

    this._focusTrap = createFocusTrap(contaienrSelector, { useArrows: true })
    this._focusTrap.start()
  }

  _setVisibleState() {
    dom.setAttr(this._activeDropdownTrigger, Selectors.ARIA_EXPANDED, "true")
    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "true")
  }

  _setActiveDropdownMenu() {
    this._activeDropdownMenuId = dom.getAttr(this._activeDropdownTrigger, Selectors.DATA_TARGET)
    this._activeDropdownMenu = dom.find(`#${this._activeDropdownMenuId}`)
  }

  _setActiveDropdown() {
    this._activeDropdownAttr = `[${Selectors.DATA_DROPDOWN}="${this._activeDropdownId}"]`
    this._activeDropdown = dom.find(this._activeDropdownAttr)
  }

  _closeOpenDropdowns(event) {
    if (!this._activeDropdownTrigger) return

    this._allowFocusReturn = false
    this._handleCloseClick(event)
    this._allowFocusReturn = true
  }

  _handleFirstTabClose(event) {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (shiftKey && tabKey) {
      this._handleCloseClick(event)
    }
  }

  _handleLastTabClose(event) {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (tabKey && !shiftKey) {
      this._handleCloseClick(event)
    }
  }

  _handleArrowKeyPress(event) {
    if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
      this._handleClick(event, event.which)
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleCloseClick(event)
    }
  }

  _handleOffMenuClick(event) {
    if (event.target !== this._activeDropdownTrigger && event.target !== this._activeDropdownMenu) {
      this._handleCloseClick(event)
    }
  }

  _handleReturnFocus() {
    if (!this._activeDropdownTrigger) return
    focusOnce(this._activeDropdownTrigger)
  }

  _getDropdownActions(attr) {
    return dom.findAll(
      `${attr} > ${this._dropdownMenuClassName} > li > a, ${attr} > ${this._dropdownMenuClassName} > li > button`
    )
  }
}
