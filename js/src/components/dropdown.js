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
  MISSING_DROPDOWN: "You have a dropdown button missing its corresponding menu.",
}

/**
 * Dropdown component class.
 * @module Dropdown
 * @requires Utils
 */
export default class Dropdown extends Utils {
  constructor() {
    super()
    //  dropdown event methods
    this._render = this._render.bind(this)
    this._renderWithKeys = this._renderWithKeys.bind(this)
    this._handleClose = this._handleClose.bind(this)
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this)
    this._handleOffMenuClick = this._handleOffMenuClick.bind(this)
    this._handleFirstTabClose = this._handleFirstTabClose.bind(this)
    this._handleLastTabClose = this._handleLastTabClose.bind(this)

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
    this.dropdowns = this._getElements(`[${selectors.DATA_DROPDOWN}]`)
    this.dropdownButtons = this._getElements(this.dropdownButtonAttr)

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
  _render(event, key) {
    if (!key) event.preventDefault()
    event.stopPropagation()

    if (this.activeDropdownButton) {
      this.allowFocusReturn = false
      this._handleClose(event)
      this.allowFocusReturn = true
    }

    // dropdown button / trigger
    this.activeDropdownButton = event.target
    this.activeDropdownId = this.activeDropdownButton.getAttribute(selectors.DATA_PARENT)

    if (!this.activeDropdownId) {
      throw messages.MISSING_DROPDOWN
      return
    }

    this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true")

    // dropdown container
    this.activeDropdownAttr = `[${selectors.DATA_DROPDOWN}="${this.activeDropdownId}"]`
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

    this.activeDropdownLinks = this._getElements(`${this.activeDropdownAttr} > ul > li > a`)
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
  _handleFirstTabClose(event) {
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
  _handleLastTabClose(event) {
    const shiftKey = event.which === keyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === keyCodes.TAB

    if (tabKey && !shiftKey) {
      this._handleClose(event)
    }
  }

  _renderWithKeys(event) {
    if (event.which === keyCodes.ARROW_UP || event.which === keyCodes.ARROW_DOWN) {
      this._render(event, event.which)
    }
  }

  _handleClose(event) {
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

  _handleEscapeKeyPress(event) {
    if (event.which === keyCodes.ESCAPE) {
      this._handleClose(event)
    }
  }

  _handleOffMenuClick(event) {
    if (event.target !== this.activeDropdownButton && event.target !== this.activeDropdownMenu) {
      this._handleClose(event)
    }
  }

  _handleReturnFocus() {
    this.activeDropdownButton.setAttribute(selectors.TAB_INDEX, "-1")
    this.activeDropdownButton.focus()
    this.activeDropdownButton.removeAttribute(selectors.TAB_INDEX)
  }

  _setupDropdown(dropdown) {
    const dropdownId = dropdown.getAttribute(selectors.DATA_DROPDOWN)
    const dropdownIdAttr = `[${selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownMenuItemsAttr = `${dropdownIdAttr} > ul > li`

    const dropdownMenu = document.querySelector(`${dropdownIdAttr} > ul`)
    const dropdownButton = document.querySelector(`${dropdownIdAttr} > ${this.dropdownTargetAttr}`)

    dropdownButton.setAttribute(selectors.ARIA_CONTROLS, dropdownMenu.id)
    dropdownButton.setAttribute(selectors.ARIA_HASPOPUP, "true")
    dropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false")
    dropdownMenu.setAttribute(selectors.ARIA_LABELLEDBY, dropdownButton.id)

    const dropdownMenuItems = this._getElements(dropdownMenuItemsAttr)
    dropdownMenuItems.forEach(item => item.setAttribute(selectors.ROLE, "none"))

    const dropdownMenuItemLinks = this._getElements(
      `${dropdownMenuItemsAttr} > a, ${dropdownMenuItemsAttr} > button`,
    )
    dropdownMenuItemLinks.forEach(link => {
      link.setAttribute(selectors.ROLE, "menuitem")
      link.setAttribute(selectors.TABINDEX, "-1")
    })
  }
}