import { iOSMobile, dom, isBrowserEnv, createFocusTrap } from "./utils"

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
}

const Messages = {
  NO_DROPDOWN_ID_ERROR:
    "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value.",
  NO_MENU_ERROR: attr => `Could not find menu associated with ${attr}.`,
  NO_DROPDOWN_ITEMS_ERROR: attr => `Could not find any list items associated with ${attr}.`,
  NO_DROPDOWN_BUTTONS_ERROR: attr =>
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
    this._dropdownTriggers = []
    this._dropdowns = []

    // active dropdown
    this._activeDropdown = {}
    this._activeDropdownButton = null
    this._activeDropdownMenu = {}
    this._activeDropdownLinks = []
    this._allowFocusReturn = true
    this._activeDropdownId = ""
    this._activeDropdownAttr = ""
    this._activeDropdownMenuId = ""
    this._firstDropdownLink = {}
    this._lastDropdownLink = {}
    this._focusTrap = {}

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

    this._dropdownTriggers.forEach(button => {
      button.removeEventListener(Events.CLICK, this._handleClick)
      button.removeEventListener(Events.KEYDOWN, this._handleArrowKeyPress)
    })
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

    const dropdownMenuButtons = this._getDropdownLinks(dropdownAttr)

    if (!dropdownMenuButtons.length) {
      console.warning(Messages.NO_DROPDOWN_BUTTONS_ERROR(dropdownAttr))
      return
    }

    dropdownMenuButtons.forEach(link => {
      dom.setAttr(link, Selectors.ROLE, "menuitem")
      dom.setAttr(link, Selectors.TABINDEX, "-1")
    })

    dropdownTrigger.addEventListener(Events.CLICK, this._handleClick)
    dropdownTrigger.addEventListener(Events.KEYDOWN, this._handleArrowKeyPress)
  }

  _handleClick(event, key) {
    event.preventDefault()
    event.stopPropagation()
    this._handleOpenDropdown(event)

    this._activeDropdownButton = event.target

    this._setActiveDropdownId()
    this._setActiveDropdown()
    this._setActiveDropdownMenu()
    this._setVisibleState()
    this._listenToClose()
    this._startEvents()

    if (key && key === KeyCodes.ARROW_UP) {
      this._lastDropdownLink.focus()
    } else {
      this._firstDropdownLink.focus()
    }

    if (iOSMobile) dom.setStyle(document.body, "cursor", "pointer")
  }

  _handleCloseClick(event) {
    event.preventDefault()

    if (iOSMobile) dom.setStyle(document.body, "cursor", "auto")

    this._focusTrap.stop()
    this._handleHideState()
    this._listenToRender()

    this._stopEvents()

    if (this._allowFocusReturn) {
      this._handleReturnFocus()
    }

    this._activeDropdownButton = null
    this._activeDropdownId = null
    this._activeDropdown = null
  }

  _listenToRender() {
    this._activeDropdownButton.removeEventListener(Events.CLICK, this._handleCloseClick)
    this._activeDropdownButton.addEventListener(Events.CLICK, this._handleClick)
  }

  _handleHideState() {
    dom.setAttr(this._activeDropdownButton, Selectors.ARIA_EXPANDED, "false")
    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "false")

    this._activeDropdownLinks.forEach(link => {
      dom.setAttr(link, Selectors.TABINDEX, "-1")
      link.removeEventListener(Events.CLICK, this._handleCloseClick)
    })
  }

  _stopEvents() {
    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOffMenuClick)
  }

  _setActiveDropdownId() {
    this._activeDropdownId = dom.getAttr(this._activeDropdownButton, Selectors.DATA_PARENT)
  }

  _startEvents() {
    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOffMenuClick)

    this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr)

    this._firstDropdownLink = this._activeDropdownLinks[0]
    this._lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1]

    this._firstDropdownLink.addEventListener(Events.KEYDOWN, this._handleFirstTabClose)
    this._lastDropdownLink.addEventListener(Events.KEYDOWN, this._handleLastTabClose)

    this._activeDropdownLinks.forEach(link => {
      dom.setAttr(link, Selectors.TABINDEX, "0")
      link.addEventListener(Events.CLICK, this._handleCloseClick)
    })

    const contaienrSelector = `${this._activeDropdownAttr} > ${this._dropdownMenuClassName}`

    this._focusTrap = createFocusTrap(contaienrSelector, { useArrows: true })
    this._focusTrap.start()
  }

  _listenToClose() {
    this._activeDropdownButton.removeEventListener(Events.CLICK, this._handleClick)
    this._activeDropdownButton.addEventListener(Events.CLICK, this._handleCloseClick)
  }

  _setVisibleState() {
    dom.setAttr(this._activeDropdownButton, Selectors.ARIA_EXPANDED, "true")
    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "true")
  }

  _setActiveDropdownMenu() {
    this._activeDropdownMenuId = dom.getAttr(this._activeDropdownButton, Selectors.DATA_TARGET)
    this._activeDropdownMenu = dom.find(`#${this._activeDropdownMenuId}`)
  }

  _setActiveDropdown() {
    this._activeDropdownAttr = `[${Selectors.DATA_DROPDOWN}="${this._activeDropdownId}"]`
    this._activeDropdown = dom.find(this._activeDropdownAttr)
  }

  _handleOpenDropdown(event) {
    if (!this._activeDropdownButton) return

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
    if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
      this._handleCloseClick(event)
    }
  }

  _handleReturnFocus() {
    dom.setAttr(this._activeDropdownButton, Selectors.TAB_INDEX, "-1")
    this._activeDropdownButton.focus()
    dom.removeAttr(this._activeDropdownButton, Selectors.TAB_INDEX)
  }

  _getDropdownLinks(attr) {
    return dom.findAll(
      `${attr} > ${this._dropdownMenuClassName} > li > a, ${attr} > ${this._dropdownMenuClassName} > li > button`
    )
  }
}
