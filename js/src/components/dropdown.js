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
  }

  // active dropdown
  #activeDropdownButton = null
  #activeDropdown = null
  #activeDropdownMenu = null
  #activeDropdownLinks = []
  #allowFocusReturn = true
  #activeDropdownId = ""
  #activeDropdownAttr = ""
  #activeDropdownMenuId = ""

  // all dropdowns
  #dropdownButtons = []
  #dropdowns = []

  // dropdown element selectors
  #dropdownContainerAttr = `[${Selectors.DATA_DROPDOWN}]`
  #dropdownTargetAttr = `[${Selectors.DATA_TARGET}]`

  // public

  /**
   * Find and set up dropdown buttons and menus.
   * Begin listening to dropdowns for events.
   */
  start() {
    this.#dropdowns = this.getElements(`${this.#dropdownContainerAttr}`)
    this.#dropdownButtons = this.getElements(
      `${this.#dropdownContainerAttr} > ${this.#dropdownTargetAttr}`,
    )

    if (this.#dropdowns.length) {
      this.#dropdowns.forEach(dropdown => this.#setupDropdown(dropdown))
    }

    this.#dropdownButtons.forEach(button => {
      button.addEventListener(Events.CLICK, this.#render)
      button.addEventListener(Events.KEYDOWN, this.#renderWithKeys)
    })
  }

  /**
   * Stop listening for dropdown events.
   */
  stop() {
    this.#dropdownButtons.forEach(button => {
      button.removeEventListener(Events.CLICK, this.#render)
      button.removeEventListener(Events.KEYDOWN, this.#renderWithKeys)
    })
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   * @param {Number} key - The key code that called #render()
   */
  #render = (event, key) => {
    if (!key) event.preventDefault()
    event.stopPropagation()

    if (this.#activeDropdownButton) {
      this.#allowFocusReturn = false
      this.#handleClose(event)
      this.#allowFocusReturn = true
    }

    // dropdown button / trigger
    this.#activeDropdownButton = event.target

    if (!this.#activeDropdownButton.getAttribute(Selectors.DATA_PARENT)) {
      return console.error(Messages.NO_PARENT_ERROR)
    }

    this.#activeDropdownId = this.#activeDropdownButton.getAttribute(Selectors.DATA_PARENT)

    // dropdown container
    this.#activeDropdownAttr = `[${Selectors.DATA_DROPDOWN}="${this.#activeDropdownId}"]`

    if (!document.querySelector(this.#activeDropdownAttr)) {
      return console.error(Messages.NO_DROPDOWN_ERROR(this.#activeDropdownAttr))
    }

    this.#activeDropdown = document.querySelector(this.#activeDropdownAttr)

    // dropdown menu
    this.#activeDropdownMenuId = this.#activeDropdownButton.getAttribute(Selectors.DATA_TARGET)
    this.#activeDropdownMenu = document.getElementById(this.#activeDropdownMenuId)

    // dropdown button
    this.#activeDropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "true")
    this.#activeDropdown.setAttribute(Selectors.DATA_VISIBLE, "true")

    // reset button event listener to close the menu, instead of open it
    this.#activeDropdownButton.removeEventListener(Events.CLICK, this.#render)
    this.#activeDropdownButton.addEventListener(Events.CLICK, this.#handleClose)

    document.addEventListener(Events.KEYDOWN, this.#handleEscapeKeyPress)
    document.addEventListener(Events.CLICK, this.#handleOffMenuClick)

    this.#activeDropdownLinks = this.#getDropdownLinks(this.#activeDropdownAttr)

    this.firstDropdownLink = this.#activeDropdownLinks[0]
    this.lastDropdownLink = this.#activeDropdownLinks[this.#activeDropdownLinks.length - 1]

    this.firstDropdownLink.addEventListener(Events.KEYDOWN, this.#handleFirstTabClose)
    this.lastDropdownLink.addEventListener(Events.KEYDOWN, this.#handleLastTabClose)

    if (key && key === KeyCodes.ARROW_UP) {
      this.lastDropdownLink.focus()
    } else {
      this.firstDropdownLink.focus()
    }

    this.#activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors.TABINDEX, "0")
      link.addEventListener(Events.CLICK, this.#handleClose)
    })

    this.captureFocus(`${this.#activeDropdownAttr} > ul`, { useArrows: true })
  }

  /**
   * Closes the dropdown if user uses shift and tab keys on the first dropdown element.
   * @param {Object} event - The event object
   */
  #handleFirstTabClose = event => {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (shiftKey && tabKey) {
      this.#handleClose(event)
    }
  }

  /**
   * Closes the dropdown if user uses tab key on the last dropdown element.
   * @param {Object} event - The event object
   */
  #handleLastTabClose = event => {
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey
    const tabKey = event.which === KeyCodes.TAB

    if (tabKey && !shiftKey) {
      this.#handleClose(event)
    }
  }

  /**
   * Renders dropdown if the user uses arrow up or down.
   * @param {Object} event - The event object
   */
  #renderWithKeys = event => {
    if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
      this.#render(event, event.which)
    }
  }

  /**
   * Closes currently open dropdown.
   * @param {Object} event - The event object
   */
  #handleClose = event => {
    event.preventDefault()

    this.releaseFocus()

    this.#activeDropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false")
    this.#activeDropdown.setAttribute(Selectors.DATA_VISIBLE, "false")

    this.#activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors.TABINDEX, "-1")
      link.removeEventListener(Events.CLICK, this.#handleClose)
    })

    this.#activeDropdownButton.removeEventListener(Events.CLICK, this.#handleClose)
    this.#activeDropdownButton.addEventListener(Events.CLICK, this.#render)

    document.removeEventListener(Events.KEYDOWN, this.#handleEscapeKeyPress)
    document.removeEventListener(Events.CLICK, this.#handleOffMenuClick)

    if (this.#allowFocusReturn) {
      this.#handleReturnFocus()
    }
  }

  /**
   * Use escape key to close dropdown.
   * @param {Object} event - The event object
   */
  #handleEscapeKeyPress = event => {
    if (event.which === KeyCodes.ESCAPE) {
      this.#handleClose(event)
    }
  }

  /**
   * Closes dropdown
   * @param {Object} event - The event object
   */
  #handleOffMenuClick = event => {
    if (event.target !== this.#activeDropdownButton && event.target !== this.#activeDropdownMenu) {
      this.#handleClose(event)
    }
  }

  /**
   * Puts focus on a the active dropdown button.
   */
  #handleReturnFocus() {
    this.#activeDropdownButton.setAttribute(Selectors.TAB_INDEX, "-1")
    this.#activeDropdownButton.focus()
    this.#activeDropdownButton.removeAttribute(Selectors.TAB_INDEX)
  }

  /**
   * Retrieve possible menu links or buttons as an array
   * @param {String} attr - The unique attribute for a dropdown.
   * @return {String} - Selector for possible menu item links.
   */
  #getDropdownLinks(attr) {
    return this.getElements(`${attr} > ul > li > a, ${attr} > ul > li > button`)
  }

  /**
   * Add starting attributes to a dropdown.
   * @param {Element} dropdown - A dropdown element.
   */
  #setupDropdown(dropdown) {
    const dropdownId = dropdown.getAttribute(Selectors.DATA_DROPDOWN)
    const dropdownIdAttr = `[${Selectors.DATA_DROPDOWN}="${dropdownId}"]`
    const dropdownMenuItemsAttr = `${dropdownIdAttr} > ul > li`

    if (!document.querySelector(`${dropdownIdAttr} > ul`)) {
      return console.error(Messages.NO_MENU_ERROR(dropdownIdAttr))
    }

    const dropdownMenu = document.querySelector(`${dropdownIdAttr} > ul`)
    const dropdownButton = document.querySelector(`${dropdownIdAttr} > ${this.#dropdownTargetAttr}`)

    dropdownButton.setAttribute(Selectors.ARIA_CONTROLS, dropdownMenu.id)
    dropdownButton.setAttribute(Selectors.ARIA_HASPOPUP, "true")
    dropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false")
    dropdownMenu.setAttribute(Selectors.ARIA_LABELLEDBY, dropdownButton.id)

    const dropdownMenuItems = this.getElements(dropdownMenuItemsAttr)
    dropdownMenuItems.forEach(item => item.setAttribute(Selectors.ROLE, "none"))

    this.#getDropdownLinks(dropdownIdAttr).forEach(link => {
      link.setAttribute(Selectors.ROLE, "menuitem")
      link.setAttribute(Selectors.TABINDEX, "-1")
    })
  }
}
