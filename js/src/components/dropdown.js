"use strict"

import Utils from "../utils"

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
  NO_PARENT_ERROR: `Could not find dropdown button's [data-parent] attribute.`,
  NO_DROPDOWN_ERROR: attr => `Could not find dropdown container associated with ${attr}.`,
  NO_MENU_ERROR: attr => `Could not find menu associated with ${attr}.`,
}

/**
 * Dropdown component class.
 * @module Dropdown
 * @requires Utils
 */
export default class Dropdown extends Utils {
  constructor() {
    super()

    // events
    this._render = this._render.bind(this)
    this._handleFirstTabClose = this._handleFirstTabClose.bind(this)
    this._handleLastTabClose = this._handleLastTabClose.bind(this)
    this._renderWithKeys = this._renderWithKeys.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleOffMenuClick = this._handleOffMenuClick.bind(this)

    // active dropdown
    this._activeDropdownButton = null
    this._activeDropdown = null
    this._activeDropdownMenu = null
    this._activeDropdownLinks = []
    this._allowFocusReturn = true
    this._activeDropdownId = ""
    this._activeDropdownAttr = ""
    this._activeDropdownMenuId = ""

    // all dropdowns
    this._dropdownButtons = []
    this._dropdowns = []

    // dropdown element selectors
    this._dropdownContainerAttr = `[${Selectors.DATA_DROPDOWN}]`
    this._dropdownTargetAttr = `[${Selectors.DATA_TARGET}]`
  }

  // public

  /**
   * Find and set up dropdown buttons and menus.
   * Begin listening to dropdowns for events.
   */
  start() {
    this._dropdowns = this.getElements(`${this._dropdownContainerAttr}`)
    this._dropdownButtons = this.getElements(
      `${this._dropdownContainerAttr} > ${this._dropdownTargetAttr}`,
    )

    if (this._dropdowns.length) {
      this._dropdowns.forEach(dropdown => this._setupDropdown(dropdown))
    }

    this._dropdownButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this._render)
      button.addEventListener(Events.KEYDOWN, this._renderWithKeys)
    })
  }

  /**
   * Stop listening for dropdown events.
   */
  stop() {
    this._dropdownButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this._render)
      button.removeEventListener(Events.KEYDOWN, this._renderWithKeys)
    })
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   * @param {Number} key - The key code that called _render()
   */
  _render(event, key) {
    if (!key) event.preventDefault()
    event.stopPropagation()

    if (this._activeDropdownButton) {
      this._allowFocusReturn = false
      this._handleClose(event)
      this._allowFocusReturn = true
    }

    // dropdown button / trigger
    this._activeDropdownButton = event.target

    if (!this._activeDropdownButton.getAttribute(Selectors.DATA_PARENT)) {
      return console.error(Messages.NO_PARENT_ERROR)
    }

    this._activeDropdownId = this._activeDropdownButton.getAttribute(Selectors.DATA_PARENT)

    // dropdown container
    this._activeDropdownAttr = `[${Selectors.DATA_DROPDOWN}="${this._activeDropdownId}"]`

    if (!document.querySelector(this._activeDropdownAttr)) {
      return console.error(Messages.NO_DROPDOWN_ERROR(this._activeDropdownAttr))
    }

    this._activeDropdown = document.querySelector(this._activeDropdownAttr)

    // dropdown menu
    this._activeDropdownMenuId = this._activeDropdownButton.getAttribute(Selectors.DATA_TARGET)
    this._activeDropdownMenu = document.getElementById(this._activeDropdownMenuId)

    // dropdown button
    this._activeDropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "true")
    this._activeDropdown.setAttribute(Selectors.DATA_VISIBLE, "true")

    // reset button event listener to close the menu, instead of open it
    this._activeDropdownButton.removeEventListener(Events.CLICK, this._render)
    this._activeDropdownButton.addEventListener(Events.CLICK, this._handleClose)

    document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this._handleOffMenuClick)

    this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr)

    this.firstDropdownLink = this._activeDropdownLinks[0]
    this.lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1]

    this.firstDropdownLink.addEventListener(Events.KEYDOWN, this._handleFirstTabClose)
    this.lastDropdownLink.addEventListener(Events.KEYDOWN, this._handleLastTabClose)

    if (key && key === KeyCodes.ARROW_UP) {
      this.lastDropdownLink.focus()
    } else {
      this.firstDropdownLink.focus()
    }

    this._activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors.TABINDEX, "0")
      link.addEventListener(Events.CLICK, this._handleClose)
    })

    this.captureFocus(`${this._activeDropdownAttr} > ul`, { useArrows: true })
  }

  /**
   * Closes the dropdown if user uses shift and tab keys on the first dropdown element.
   * @param {Object} event - The event object
   */
  _handleFirstTabClose(event) {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (shiftKey && tabKey) {
      this._handleClose(event)
    }
  }

  /**
   * Closes the dropdown if user uses tab key on the last dropdown element.
   * @param {Object} event - The event object
   */
  _handleLastTabClose(event) {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (tabKey && !shiftKey) {
      this._handleClose(event)
    }
  }

  /**
   * Renders dropdown if the user uses arrow up or down.
   * @param {Object} event - The event object
   */
  _renderWithKeys(event) {
    if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
      this._render(event, event.which)
    }
  }

  /**
   * Closes currently open dropdown.
   * @param {Object} event - The event object
   */
  _handleClose(event) {
    event.preventDefault()

    this.releaseFocus()

    this._activeDropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false")
    this._activeDropdown.setAttribute(Selectors.DATA_VISIBLE, "false")

    this._activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors.TABINDEX, "-1")
      link.removeEventListener(Events.CLICK, this._handleClose)
    })

    this._activeDropdownButton.removeEventListener(Events.CLICK, this._handleClose)
    this._activeDropdownButton.addEventListener(Events.CLICK, this._render)

    document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this._handleOffMenuClick)

    if (this._allowFocusReturn) {
      this._handleReturnFocus()
    }
  }

  /**
   * Use escape key to close dropdown.
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  /**
   * Closes dropdown
   * @param {Object} event - The event object
   */
  _handleOffMenuClick(event) {
    if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
      this._handleClose(event)
    }
  }

  /**
   * Puts focus on a the active dropdown button.
   */
  _handleReturnFocus() {
    this._activeDropdownButton.setAttribute(Selectors.TAB_INDEX, "-1")
    this._activeDropdownButton.focus()
    this._activeDropdownButton.removeAttribute(Selectors.TAB_INDEX)
  }

  /**
   * Retrieve possible menu links or buttons as an array
   * @param {String} attr - The unique attribute for a dropdown.
   * @return {String} - Selector for possible menu item links.
   */
  _getDropdownLinks(attr) {
    return this.getElements(`${attr} > ul > li > a, ${attr} > ul > li > button`)
  }

  /**
   * Add starting attributes to a dropdown.
   * @param {Element} dropdown - A dropdown element.
   */
  _setupDropdown(dropdown) {
    const dropdownId = dropdown.getAttribute(Selectors.DATA_DROPDOWN)
    const dropdownIdAttr = `[${Selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownMenuItemsAttr = `${dropdownIdAttr} > ul > li`

    if (!document.querySelector(`${dropdownIdAttr} > ul`)) {
      return console.error(Messages.NO_MENU_ERROR(dropdownIdAttr))
    }

    const dropdownMenu = document.querySelector(`${dropdownIdAttr} > ul`)
    const dropdownButton = document.querySelector(`${dropdownIdAttr} > ${this._dropdownTargetAttr}`)

    dropdownButton.setAttribute(Selectors.ARIA_CONTROLS, dropdownMenu.id)
    dropdownButton.setAttribute(Selectors.ARIA_HASPOPUP, "true")
    dropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false")
    dropdownMenu.setAttribute(Selectors.ARIA_LABELLEDBY, dropdownButton.id)

    const dropdownMenuItems = this.getElements(dropdownMenuItemsAttr)
    dropdownMenuItems.forEach(item => item.setAttribute(Selectors.ROLE, "none"))

    this._getDropdownLinks(dropdownIdAttr).forEach(link => {
      link.setAttribute(Selectors.ROLE, "menuitem")
      link.setAttribute(Selectors.TABINDEX, "-1")
    })
  }
}
