"use strict"

import Utils from "../utils"

const keyCodes = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

const selectors = {
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

const events = {
  KEYDOWN: "keydown",
  CLICK: "click",
}

const messages = {
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
    // active dropdown
    this.activeDropdownButton = null
    this.activeDropdown = null
    this.activeDropdownMenu = null
    this.activeDropdownLinks = []
    this.allowFocusReturn = true
    this.activeDropdownId = ""
    this.activeDropdownAttr = ""
    this.activeDropdownMenuId = ""

    // all dropdowns
    this.dropdownButtons = []
    this.dropdowns = []

    // dropdown element selectors
    this.dropdownTargetAttr = `[${selectors.DATA_TARGET}]`
    this.dropdownButtonAttr = `[${selectors.DATA_DROPDOWN}] > ${this.dropdownTargetAttr}`
  }

  // public

  /**
   * Find and set up dropdown buttons and menus.
   * Begin listening to dropdowns for events.
   */
  start() {
    this.dropdowns = this.getElements(`[${selectors.DATA_DROPDOWN}]`)
    this.dropdownButtons = this.getElements(this.dropdownButtonAttr)

    if (this.dropdowns.length) {
      this.dropdowns.forEach(dropdown => this._setupDropdown(dropdown))
    }

    this.dropdownButtons.forEach(button => {
      button.addEventListener(events.CLICK, this._render)
      button.addEventListener(events.KEYDOWN, this._renderWithKeys)
    })
  }

  /**
   * Stop listening for dropdown events.
   */
  stop() {
    this.dropdownButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this._render)
      button.removeEventListener(events.KEYDOWN, this._renderWithKeys)
    })
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   * @param {Number} key - The key code that called _render()
   */
  _render = (event, key) => {
    if (!key) event.preventDefault()
    event.stopPropagation()

    if (this.activeDropdownButton) {
      this.allowFocusReturn = false
      this._handleClose(event)
      this.allowFocusReturn = true
    }

    // dropdown button / trigger
    this.activeDropdownButton = event.target

    if (!this.activeDropdownButton.getAttribute(selectors.DATA_PARENT)) {
      return messages.NO_PARENT_ERROR
    }

    this.activeDropdownId = this.activeDropdownButton.getAttribute(selectors.DATA_PARENT)

    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true")

    // dropdown container
    this.activeDropdownAttr = `[${selectors.DATA_DROPDOWN}="${this.activeDropdownId}"]`

    if (!document.querySelector(this.activeDropdownAttr)) {
      return messages.NO_DROPDOWN_ERROR(this.activeDropdownAttr)
    }

    this.activeDropdown = document.querySelector(this.activeDropdownAttr)

    // dropdown menu
    this.activeDropdownMenuId = this.activeDropdownButton.getAttribute(selectors.DATA_TARGET)
    this.activeDropdownMenu = document.getElementById(this.activeDropdownMenuId)

    // dropdown button
    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true")
    this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "true")

    // reset button event listener to close the menu, instead of open it
    this.activeDropdownButton.removeEventListener(events.CLICK, this._render)
    this.activeDropdownButton.addEventListener(events.CLICK, this._handleClose)

    document.addEventListener(events.KEYDOWN, this._handleEscapeKeyPress)
    document.addEventListener(events.CLICK, this._handleOffMenuClick)

    this.activeDropdownLinks = this._getDropdownButtons(this.activeDropdownAttr)

    this.firstDropdownLink = this.activeDropdownLinks[0]
    this.lastDropdownLink = this.activeDropdownLinks[this.activeDropdownLinks.length - 1]

    this.firstDropdownLink.addEventListener(events.KEYDOWN, this._handleFirstTabClose)
    this.lastDropdownLink.addEventListener(events.KEYDOWN, this._handleLastTabClose)

    if (key && key === keyCodes.ARROW_UP) {
      this.lastDropdownLink.focus()
    } else {
      this.firstDropdownLink.focus()
    }

    this.activeDropdownLinks.forEach(link => {
      link.setAttribute(selectors.TABINDEX, "0")
      link.addEventListener(events.CLICK, this._handleClose)
    })

    this.captureFocus(`${this.activeDropdownAttr} > ul`, { useArrows: true })
  }

  /**
   * Closes the dropdown if user uses shift and tab keys on the first dropdown element.
   * @param {Object} event - The event object
   */
  _handleFirstTabClose = event => {
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === keyCodes.TAB

    if (shiftKey && tabKey) {
      this._handleClose(event)
    }
  }

  /**
   * Closes the dropdown if user uses tab key on the last dropdown element.
   * @param {Object} event - The event object
   */
  _handleLastTabClose = event => {
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === keyCodes.TAB

    if (tabKey && !shiftKey) {
      this._handleClose(event)
    }
  }

  /**
   * Renders dropdown if the user uses arrow up or down.
   * @param {Object} event - The event object
   */
  _renderWithKeys = event => {
    if (event.which === keyCodes.ARROW_UP || event.which === keyCodes.ARROW_DOWN) {
      this._render(event, event.which)
    }
  }

  /**
   * Closes currently open dropdown.
   * @param {Object} event - The event object
   */
  _handleClose = event => {
    event.preventDefault()

    this.releaseFocus()

    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false")
    this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "false")

    this.activeDropdownLinks.forEach(link => {
      link.setAttribute(selectors.TABINDEX, "-1")
      link.removeEventListener(events.CLICK, this._handleClose)
    })

    this.activeDropdownButton.removeEventListener(events.CLICK, this._handleClose)
    this.activeDropdownButton.addEventListener(events.CLICK, this._render)

    document.removeEventListener(events.KEYDOWN, this._handleEscapeKeyPress)
    document.removeEventListener(events.CLICK, this._handleOffMenuClick)

    if (this.allowFocusReturn) {
      this._handleReturnFocus()
    }
  }

  /**
   * Use escape key to close dropdown.
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress = event => {
    if (event.which === keyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  /**
   * Closes dropdown
   * @param {Object} event - The event object
   */
  _handleOffMenuClick = event => {
    if (event.target !== this.activeDropdownButton && event.target !== this.activeDropdownMenu) {
      this._handleClose(event)
    }
  }

  /**
   * Puts focus on a the active dropdown button.
   */
  _handleReturnFocus() {
    this.activeDropdownButton.setAttribute(selectors.TAB_INDEX, "-1")
    this.activeDropdownButton.focus()
    this.activeDropdownButton.removeAttribute(selectors.TAB_INDEX)
  }

  /**
   * Retrieve possible menu links or buttons as an array
   * @param {String} attr - The unique attribute for a dropdown.
   */
  _getDropdownButtons(attr) {
    return this.getElements(`${attr} > ul > li > a, ${attr} > ul > li > button`)
  }

  /**
   * Add starting attributes to a dropdown.
   * @param {Element} dropdown - A dropdown element.
   */
  _setupDropdown(dropdown) {
    const dropdownId = dropdown.getAttribute(selectors.DATA_DROPDOWN)
    const dropdownIdAttr = `[${selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownMenuItemsAttr = `${dropdownIdAttr} > ul > li`

    if (!document.querySelector(`${dropdownIdAttr} > ul`)) {
      return messages.NO_MENU_ERROR(dropdownIdAttr)
    }

    const dropdownMenu = document.querySelector(`${dropdownIdAttr} > ul`)
    const dropdownButton = document.querySelector(`${dropdownIdAttr} > ${this.dropdownTargetAttr}`)

    dropdownButton.setAttribute(selectors.ARIA_CONTROLS, dropdownMenu.id)
    dropdownButton.setAttribute(selectors.ARIA_HASPOPUP, "true")
    dropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false")
    dropdownMenu.setAttribute(selectors.ARIA_LABELLEDBY, dropdownButton.id)

    const dropdownMenuItems = this.getElements(dropdownMenuItemsAttr)
    dropdownMenuItems.forEach(item => item.setAttribute(selectors.ROLE, "none"))

    this._getDropdownButtons(dropdownIdAttr).forEach(link => {
      link.setAttribute(selectors.ROLE, "menuitem")
      link.setAttribute(selectors.TABINDEX, "-1")
    })
  }
}
