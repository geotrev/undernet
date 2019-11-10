import _ContextUtil, { iOSMobile, dom, browserEnv } from "./utils"

const ContextUtil = new _ContextUtil()

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

export default class Dropdown {
  constructor() {
    // events
    this._render = this._render.bind(this)
    this._handleFirstTabClose = this._handleFirstTabClose.bind(this)
    this._handleLastTabClose = this._handleLastTabClose.bind(this)
    this._renderWithKeys = this._renderWithKeys.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleOffMenuClick = this._handleOffMenuClick.bind(this)

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

    // all dropdowns
    this._dropdownButtons = []
    this._dropdowns = []

    // dropdown element selectors
    this._dropdownContainerAttr = `[${Selectors.DATA_DROPDOWN}]`
    this._dropdownTargetAttr = `[${Selectors.DATA_TARGET}]`
    this._dropdownMenuClassName = `.${Selectors.DROPDOWN_MENU_CLASS}`
  }

  // public

  start() {
    if (!browserEnv) return

    this._dropdowns = dom.findAll(`${this._dropdownContainerAttr}`)
    this._dropdownButtons = dom.findAll(
      `${this._dropdownContainerAttr} > ${this._dropdownTargetAttr}`
    )

    if (this._dropdowns.length) {
      this._dropdowns.forEach(instance => this._setup(instance))
    }

    this._dropdownButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._render)
      button.addEventListener(Events.KEYDOWN, this._renderWithKeys)
    })
  }

  stop() {
    if (!browserEnv) return

    this._dropdownButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._render)
      button.removeEventListener(Events.KEYDOWN, this._renderWithKeys)
    })
  }

  // private

  _setup(instance) {
    const dropdownId = instance.getAttribute(Selectors.DATA_DROPDOWN)

    if (!dropdownId) {
      throw new Error(Messages.NO_DROPDOWN_ID_ERROR)
    }

    const dropdownAttr = `[${Selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownButton = dom.find(`${dropdownAttr} > ${this._dropdownTargetAttr}`)

    if (!dom.getAttr(dropdownButton, Selectors.DATA_PARENT)) {
      throw new Error(Messages.NO_PARENT_ERROR)
    }

    const dropdownMenu = dom.find(`${dropdownAttr} > ${this._dropdownMenuClassName}`)

    if (!dropdownMenu) {
      throw new Error(Messages.NO_MENU_ERROR(dropdownAttr))
    }

    dom.setAttr(dropdownMenu, Selectors.ARIA_LABELLEDBY, dropdownButton.id)

    dom.setAttr(dropdownButton, Selectors.ARIA_CONTROLS, dropdownMenu.id)
    dom.setAttr(dropdownButton, Selectors.ARIA_HASPOPUP, "true")
    dom.setAttr(dropdownButton, Selectors.ARIA_EXPANDED, "false")

    const dropdownMenuItemsAttr = `${dropdownAttr} > ${this._dropdownMenuClassName} > li`
    const dropdownMenuListItems = dom.findAll(dropdownMenuItemsAttr)

    if (!dropdownMenuListItems.length) {
      throw new Error(Messages.NO_DROPDOWN_ITEMS_ERROR(dropdownAttr))
    }

    dropdownMenuListItems.forEach(item => dom.setAttr(item, Selectors.ROLE, "none"))

    const dropdownMenuButtons = this._getDropdownLinks(dropdownAttr)

    if (!dropdownMenuButtons.length) {
      throw new Error(Messages.NO_DROPDOWN_BUTTONS_ERROR(dropdownAttr))
    }

    dropdownMenuButtons.forEach(link => {
      dom.setAttr(link, Selectors.ROLE, "menuitem")
      dom.setAttr(link, Selectors.TABINDEX, "-1")
    })
  }

  _render(event, key) {
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

    if (iOSMobile) dom.css(document.body, "cursor", "pointer")
  }

  _handleClose(event) {
    event.preventDefault()

    if (iOSMobile) dom.css(document.body, "cursor", "auto")

    ContextUtil.unsetFocusTrap()
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
    this._activeDropdownButton.removeEventListener(Events.CLICK, this._handleClose)
    this._activeDropdownButton.addEventListener(Events.CLICK, this._render)
  }

  _handleHideState() {
    dom.setAttr(this._activeDropdownButton, Selectors.ARIA_EXPANDED, "false")
    dom.setAttr(this._activeDropdown, Selectors.DATA_VISIBLE, "false")

    this._activeDropdownLinks.forEach(link => {
      dom.setAttr(link, Selectors.TABINDEX, "-1")
      link.removeEventListener(Events.CLICK, this._handleClose)
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
      link.addEventListener(Events.CLICK, this._handleClose)
    })

    ContextUtil.setFocusTrap(`${this._activeDropdownAttr} > ${this._dropdownMenuClassName}`, {
      useArrows: true,
    })
  }

  _listenToClose() {
    this._activeDropdownButton.removeEventListener(Events.CLICK, this._render)
    this._activeDropdownButton.addEventListener(Events.CLICK, this._handleClose)
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

  _renderWithKeys(event) {
    if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
      this._render(event, event.which)
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  _handleOffMenuClick(event) {
    if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
      this._handleClose(event)
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
