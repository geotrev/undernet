/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v4.0.1 (https://undernet.io)
  * Copyright 2017-2019 George Treviranus
  */
const KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

const Selectors = {
  NOT_VISUALLY_HIDDEN: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
};

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
};

/**
 * Creates a string of element selector patterns using common elements.
 * @param {String} container - The enclosing container's class, attribute, etc.
 * @return {String}
 */
const nodeListToArray = nodeList => {
  return Array.apply(null, document.querySelectorAll(nodeList))
};

/**
 * Creates a string of element selector patterns using common elements.
 * @param {String} container - The enclosing container's class, attribute, etc.
 * @return {Array}
 */
const getFocusableElements = container => {
  const focusables = Selectors.FOCUSABLE_TAGS.map(
    element => `${container} ${element}${Selectors.NOT_VISUALLY_HIDDEN}`
  ).join(", ");

  return nodeListToArray(focusables)
};

/**
 * Detects if the browser being used is on an iphone, ipad, or ipod.
 * @return {Boolean}
 */
const iOSMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent);

/**
 * Utility methods for DOM traversal and focus trapping.
 * @module Utils
 */
class Utils {
  constructor() {
    // events
    this._listenForKeyboard = this._listenForKeyboard.bind(this);
    this._listenForClick = this._listenForClick.bind(this);
    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);

    this._focusContainerSelector = "";
    this._focusableChildren = [];
    this._focusableFirstChild = {};
    this._focusableLastChild = {};
    this._listeningForKeydown = false;
    this._trapFocusWithArrows = false;
  }

  // public

  /**
   * Listens to the first and last elements matched from this.getFocusableElements()
   * @param {String} container - The container's class, attribute, etc.
   * @param {Object} options - Optional has hof options.
   */
  captureFocus(container, options) {
    this._focusContainerSelector = container;
    this._focusableChildren = getFocusableElements(this._focusContainerSelector);
    this._focusableFirstChild = this._focusableChildren[0];
    this._focusableLastChild = this._focusableChildren[this._focusableChildren.length - 1];

    if (options) {
      if (options.useArrows) {
        this._trapFocusWithArrows = options.useArrows || this._trapFocusWithArrows;
        document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
      }
    } else {
      document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
    }
  }

  /**
   * Stop trapping focus set in this.captureFocus()
   */
  releaseFocus() {
    if (this._trapFocusWithArrows) {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
      this._trapFocusWithArrows = false;
    } else {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
    }
  }

  /**
   * Begin listening to _listenForKeyboard()
   */
  enableFocusOutline() {
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
  }

  /**
   * Completely disable focus outline utility.
   */
  disableFocusOutline() {
    if (this._listeningForKeydown) {
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
    } else {
      document.removeEventListener(Events.CLICK, this._listenForClick);
    }
  }

  // private

  /**
   * When a key is pressed, detect if it's tab or shift keys and enable
   * focus outlines on currently focused element(s). Then, remove keydown listener
   * and add click listener on _listenForClick().
   * @param {Object} event - Event (keypress).
   */
  _listenForKeyboard(event) {
    document.body.classList.add(Selectors.KEYBOARD_CLASS);
    document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
    document.addEventListener(Events.CLICK, this._listenForClick);
    this._listeningForKeydown = false;
  }

  /**
   * On click, remove Selectors.KEYBOARD_CLASS and re-add keydown listener.
   * @param {Object} event - Event (keypress).
   */
  _listenForClick(event) {
    document.body.classList.remove(Selectors.KEYBOARD_CLASS);
    document.removeEventListener(Events.CLICK, this._listenForClick);
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
    this._listeningForKeydown = true;
  }

  /**
   * Handles focus on first or last child in a container, using tab and tab+shift keys.
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrapWithTab(event) {
    const containerElement = document.querySelector(this._focusContainerSelector);
    const containerActive = document.activeElement === containerElement;
    const firstActive = document.activeElement === this._focusableFirstChild;
    const lastActive = document.activeElement === this._focusableLastChild;
    const tabKey = event.which === KeyCodes.TAB;
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;

    if (shiftKey && tabKey && (firstActive || containerActive)) {
      event.preventDefault();
      this._focusableLastChild.focus();
    } else if (!shiftKey && tabKey && lastActive) {
      event.preventDefault();
      this._focusableFirstChild.focus();
    }
  }

  /**
   * Handles focus on the first, last, next, or previous child in a container, using up and down arrow keys.
   * @param {Object} event - Event (keypress)
   */
  _handleFocusTrapWithArrows(event) {
    const firstActive = document.activeElement === this._focusableFirstChild;
    const lastActive = document.activeElement === this._focusableLastChild;
    const arrowUp = event.which === KeyCodes.ARROW_UP;
    const arrowDown = event.which === KeyCodes.ARROW_DOWN;

    if (arrowUp || arrowDown) {
      event.preventDefault();

      if (firstActive && arrowUp) {
        this._focusableLastChild.focus();
      } else if (lastActive && arrowDown) {
        this._focusableFirstChild.focus();
      } else if (arrowDown) {
        this._focusNextChild();
      } else if (arrowUp) {
        this._focusLastChild();
      }
    }
  }

  /**
   * Focus the next child in this._focusableChildren.
   */
  _focusNextChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i + 1].focus();
        break
      }
    }
  }

  /**
   * Focus the previous child in this._focusableChildren.
   */
  _focusLastChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i - 1].focus();
        break
      }
    }
  }
}

const Selectors$1 = {
  // unique
  DATA_ACCORDION: "data-accordion",
  DATA_ACCORDION_ROW: "data-accordion-row",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_LABELLEDBY: "aria-labelledby",
  TABINDEX: "tabindex",
};

const Events$1 = {
  CLICK: "click",
  KEYDOWN: "keydown",
};

const Messages = {
  NO_VISIBLE_ERROR: id =>
    `Could not find parent with [data-visible] attribute associated with [data-target='${id}'].`,
  NO_ROW_ERROR: id => `Could not find [data-accordion-row] associated with ${id}.`,
  NO_HEADER_ID_ERROR: id => `Could not find header tag associated with [data-target='${id}'].`,
  NO_PARENT_ERROR: id => `Could not find [data-parent] associated with [data-target='${id}'].`,
  NO_CONTENT_ERROR: id =>
    `Could not find accordion content block with [id] ${id} associated with [data-target='${id}'].`,
};

/**
 * Accordion component class.
 * @module Accordion
 * @requires Utils
 */
class Accordion extends Utils {
  constructor() {
    super();

    // events
    this._render = this._render.bind(this);

    // all accordions
    this._accordionButtons = [];
    this._accordionContentsAttr = "";
    this._accordionContents = [];

    // active accordion
    this._activeContainer = {};
    this._activeButton = {};
    this._activeAccordionRowId = "";
    this._activeRowAttr = "";
    this._activeRow = "";
    this._activeContainerId = "";
    this._activeContainerAttr = "";
    this._activeContent = {};
    this._activeButtonExpandState = "";
    this._activeContentHiddenState = "";

    // other data
    this._headerLevels = [1, 2, 3, 4, 5, 6];
  }

  // public

  /**
   * Begin listening to accordions.
   */
  start() {
    const accordionButtonSelector = this._getPossibleAccordionButtonAttrs(
      `[${Selectors$1.DATA_ACCORDION}]`
    );
    this._accordionButtons = nodeListToArray(accordionButtonSelector);

    if (this._accordionButtons.length) {
      this._accordionButtons.forEach(button => {
        this._setupAccordion(button);
        button.addEventListener(Events$1.CLICK, this._render);
      });
    }
  }

  /**
   * Stop listening to accordions.
   */
  stop() {
    this._accordionButtons.forEach(button => {
      button.removeEventListener(Events$1.CLICK, this._render);
    });
  }

  // private

  /**
   * Open accordion content associated with an accordion button.
   * @param {Object} event - The event object
   */
  _render(event) {
    event.preventDefault();

    this._activeButton = event.target;
    this._activeAccordionRowId = this._activeButton.getAttribute(Selectors$1.DATA_TARGET);

    this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
    this._activeRow = document.querySelector(this._activeRowAttr);
    this._activeContainerId = this._activeButton.getAttribute(Selectors$1.DATA_PARENT);

    if (!this._activeContainerId) {
      return console.error(Messages.NO_PARENT_ERROR(this._activeAccordionRowId))
    }

    this._activeContainerAttr = `[${Selectors$1.DATA_ACCORDION}='${this._activeContainerId}']`;
    this._activeContainer = document.querySelector(this._activeContainerAttr);

    if (!this._activeContainer) {
      return console.error(Messages.NO_ACCORDION_ERROR(this._activeContainerId))
    }

    this._activeContent = document.getElementById(this._activeAccordionRowId);

    const accordionButtonState = this._activeRow.getAttribute(Selectors$1.DATA_VISIBLE);

    this._activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
    this._activeContentHiddenState = this._activeButtonExpandState === "false" ? "true" : "false";

    this._closeAllIfToggleable();
    this._toggleSelectedAccordion();

    this._activeContainerId = null;
    this._activeContainer = null;
  }

  /**
   * Add initial attributes to accordion elements.
   * @param {Element} button - A button element that triggers an accordion.
   */
  _setupAccordion(button) {
    const buttonId = button.getAttribute(Selectors$1.DATA_TARGET);
    const buttonContent = document.getElementById(buttonId);

    if (!buttonContent) {
      return console.error(Messages.NO_CONTENT_ERROR(buttonId))
    }

    const accordionRowAttr = this._getAccordionRowAttr(buttonId);
    const accordionRow = document.querySelector(accordionRowAttr);

    if (!accordionRow) {
      return console.error(Messages.NO_ROW_ERROR(buttonId))
    }

    const buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);
    const buttonHeader = nodeListToArray(buttonHeaderAttr)[0];

    if (!buttonHeader || !buttonHeader.id) {
      console.error(Messages.NO_HEADER_ID_ERROR(buttonId));
    }

    const buttonContentChildren = getFocusableElements(`#${buttonContent.id}`);

    button.setAttribute(Selectors$1.ARIA_CONTROLS, buttonId);
    buttonContent.setAttribute(Selectors$1.ARIA_LABELLEDBY, buttonHeader.id);

    const contentShouldExpand = accordionRow.getAttribute(Selectors$1.DATA_VISIBLE);

    if (!contentShouldExpand) {
      return console.error(Messages.NO_VISIBLE_ERROR(buttonId))
    }

    if (contentShouldExpand === "true") {
      buttonContent.style.maxHeight = `${buttonContent.scrollHeight}px`;
      button.setAttribute(Selectors$1.ARIA_EXPANDED, "true");
      buttonContent.setAttribute(Selectors$1.ARIA_HIDDEN, "false");
      buttonContentChildren.forEach(element => {
        element.setAttribute(Selectors$1.TABINDEX, "0");
      });
    } else {
      button.setAttribute(Selectors$1.ARIA_EXPANDED, "false");
      buttonContent.setAttribute(Selectors$1.ARIA_HIDDEN, "true");
      buttonContentChildren.forEach(element => {
        element.setAttribute(Selectors$1.TABINDEX, "-1");
      });
    }
  }

  /**
   * Build a selector string to match possible accordion buttons
   * @param {String} attr - A unique attribute
   * @return {String} - String of possible button selectors
   */
  _getPossibleAccordionButtonAttrs(attr) {
    return this._headerLevels
      .map(
        num => `${attr} > [${Selectors$1.DATA_ACCORDION_ROW}] > h${num} [${Selectors$1.DATA_TARGET}]`
      )
      .join(", ")
  }

  /**
   * Build a selector string to match possible accordion headers
   * @param {String} attr - A unique attribute
   * @return {String} - String of possible header selectors
   */
  _getPossibleAccordionHeaderAttrs(attr) {
    return this._headerLevels.map(num => `${attr} > h${num}`).join(", ")
  }

  /**
   * Build a unique accordion row attribute selector.
   * @param {String} id - An id value associated with a given Selectors.DATA_TARGET
   * @return {String} - A unique accordion row selector
   */
  _getAccordionRowAttr(id) {
    return `[${Selectors$1.DATA_ACCORDION_ROW}='${id}']`
  }

  /**
   * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
   * This ensures the selected one can be closed if it's already open.
   */
  _closeAllIfToggleable() {
    if (this._activeContainer.hasAttribute(Selectors$1.DATA_TOGGLE_MULTIPLE)) return

    const allContentAttr = `${this._activeContainerAttr} [${Selectors$1.ARIA_HIDDEN}]`;
    const allRows = nodeListToArray(`${this._activeContainerAttr} [${Selectors$1.DATA_VISIBLE}]`);
    const allContent = nodeListToArray(allContentAttr);

    const accordionButtonSelector = this._getPossibleAccordionButtonAttrs(this._activeContainerAttr);
    const allButtons = nodeListToArray(accordionButtonSelector);

    allContent.forEach(content => {
      if (content !== this._activeContent) content.style.maxHeight = null;
    });

    getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors$1.TABINDEX, "-1");
    });

    this._toggleAttributeInCollection(allRows, Selectors$1.DATA_VISIBLE, "true", "false");
    this._toggleAttributeInCollection(allButtons, Selectors$1.ARIA_EXPANDED, "true", "false");
    this._toggleAttributeInCollection(allContent, Selectors$1.ARIA_HIDDEN, "false", "true");
  }

  /**
   * Toggle the currently selected accordion button's content.
   */
  _toggleSelectedAccordion() {
    this._activeRow.setAttribute(Selectors$1.DATA_VISIBLE, this._activeButtonExpandState);
    this._activeButton.setAttribute(Selectors$1.ARIA_EXPANDED, this._activeButtonExpandState);
    this._activeContent.setAttribute(Selectors$1.ARIA_HIDDEN, this._activeContentHiddenState);

    const activeContentBlock = `#${this._activeAccordionRowId}`;
    getFocusableElements(activeContentBlock).forEach(element => {
      const value = this._activeButtonExpandState === "true" ? "0" : "-1";
      element.setAttribute(Selectors$1.TABINDEX, value);
    });

    if (this._activeContent.style.maxHeight) {
      this._activeContent.style.maxHeight = null;
    } else {
      this._activeContent.style.maxHeight = `${this._activeContent.scrollHeight}px`;
    }
  }

  /**
   * Toggles a single attribute of a series of elements.
   * @param {Array} elements - An array of elements to be operated on.
   * @param {String} attributeName - An attribute to be changed.
   * @param {String} currentValue - The current value of attributeName
   * @param {String} newValue - The new value of attributeName
   */
  _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
    elements.forEach(element => {
      if (element.hasAttribute(attributeName, currentValue)) {
        element.setAttribute(attributeName, newValue);
      }
    });
  }
}

const KeyCodes$1 = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

const Selectors$2 = {
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
};

const Events$2 = {
  KEYDOWN: "keydown",
  CLICK: "click",
};

const Messages$1 = {
  NO_PARENT_ERROR: `Could not find dropdown button's [data-parent] attribute.`,
  NO_DROPDOWN_ERROR: attr => `Could not find dropdown container associated with ${attr}.`,
  NO_MENU_ERROR: attr => `Could not find menu associated with ${attr}.`,
};

/**
 * Dropdown component class.
 * @module Dropdown
 * @requires Utils
 */
class Dropdown extends Utils {
  constructor() {
    super();
    // events
    this._render = this._render.bind(this);
    this._handleFirstTabClose = this._handleFirstTabClose.bind(this);
    this._handleLastTabClose = this._handleLastTabClose.bind(this);
    this._renderWithKeys = this._renderWithKeys.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this);
    this._handleOffMenuClick = this._handleOffMenuClick.bind(this);

    // active dropdown
    this._activeDropdownButton = null;
    this._activeDropdown = null;
    this._activeDropdownMenu = null;
    this._activeDropdownLinks = [];
    this._allowFocusReturn = true;
    this._activeDropdownId = "";
    this._activeDropdownAttr = "";
    this._activeDropdownMenuId = "";

    // all dropdowns
    this._dropdownButtons = [];
    this._dropdowns = [];

    // dropdown element selectors
    this._dropdownContainerAttr = `[${Selectors$2.DATA_DROPDOWN}]`;
    this._dropdownTargetAttr = `[${Selectors$2.DATA_TARGET}]`;
  }

  // public

  /**
   * Begin listening to dropdowns.
   */
  start() {
    this._dropdowns = nodeListToArray(`${this._dropdownContainerAttr}`);
    this._dropdownButtons = nodeListToArray(
      `${this._dropdownContainerAttr} > ${this._dropdownTargetAttr}`
    );

    if (this._dropdowns.length) {
      this._dropdowns.forEach(dropdown => this._setupDropdown(dropdown));
    }

    this._dropdownButtons.forEach(button => {
      button.addEventListener(Events$2.CLICK, this._render);
      button.addEventListener(Events$2.KEYDOWN, this._renderWithKeys);
    });
  }

  /**
   * Stop listening to dropdowns.
   */
  stop() {
    this._dropdownButtons.forEach(button => {
      button.removeEventListener(Events$2.CLICK, this._render);
      button.removeEventListener(Events$2.KEYDOWN, this._renderWithKeys);
    });
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   * @param {Number} key - The key code that called _render()
   */
  _render(event, key) {
    event.preventDefault();
    event.stopPropagation();

    if (this._activeDropdownButton) {
      this._allowFocusReturn = false;
      this._handleClose(event);
      this._allowFocusReturn = true;
    }

    // dropdown button / trigger
    this._activeDropdownButton = event.target;
    this._activeDropdownId = this._activeDropdownButton.getAttribute(Selectors$2.DATA_PARENT);

    if (!this._activeDropdownId) {
      return console.error(Messages$1.NO_PARENT_ERROR)
    }

    // dropdown container
    this._activeDropdownAttr = `[${Selectors$2.DATA_DROPDOWN}="${this._activeDropdownId}"]`;
    this._activeDropdown = document.querySelector(this._activeDropdownAttr);

    if (!this._activeDropdown) {
      return console.error(Messages$1.NO_DROPDOWN_ERROR(this._activeDropdownAttr))
    }

    // dropdown menu
    this._activeDropdownMenuId = this._activeDropdownButton.getAttribute(Selectors$2.DATA_TARGET);
    this._activeDropdownMenu = document.getElementById(this._activeDropdownMenuId);

    // toggle attributes on dropdown button, indicating a visible dropdown is present
    this._activeDropdownButton.setAttribute(Selectors$2.ARIA_EXPANDED, "true");
    this._activeDropdown.setAttribute(Selectors$2.DATA_VISIBLE, "true");

    // trade button event listener to close the menu, instead of open it
    this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._render);
    this._activeDropdownButton.addEventListener(Events$2.CLICK, this._handleClose);

    document.addEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);
    document.addEventListener(Events$2.CLICK, this._handleOffMenuClick);

    // make click events work on mobile iOS
    if (iOSMobile) {
      document.body.style.cursor = "pointer";
    }

    this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);

    this.firstDropdownLink = this._activeDropdownLinks[0];
    this.lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];

    this.firstDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleFirstTabClose);
    this.lastDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleLastTabClose);

    if (key && key === KeyCodes$1.ARROW_UP) {
      this.lastDropdownLink.focus();
    } else {
      this.firstDropdownLink.focus();
    }

    this._activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors$2.TABINDEX, "0");
      link.addEventListener(Events$2.CLICK, this._handleClose);
    });

    this.captureFocus(`${this._activeDropdownAttr} > ul`, { useArrows: true });
  }

  /**
   * Closes the dropdown if user uses shift and tab keys on the first dropdown element.
   * @param {Object} event - The event object
   */
  _handleFirstTabClose(event) {
    const shiftKey = event.which === KeyCodes$1.SHIFT || event.shiftKey;
    const tabKey = event.which === KeyCodes$1.TAB;

    if (shiftKey && tabKey) {
      this._handleClose(event);
    }
  }

  /**
   * Closes the dropdown if user uses tab key on the last dropdown element.
   * @param {Object} event - The event object
   */
  _handleLastTabClose(event) {
    const shiftKey = event.which === KeyCodes$1.SHIFT || event.shiftKey;
    const tabKey = event.which === KeyCodes$1.TAB;

    if (tabKey && !shiftKey) {
      this._handleClose(event);
    }
  }

  /**
   * Renders dropdown if the user uses arrow up or down.
   * @param {Object} event - The event object
   */
  _renderWithKeys(event) {
    if (event.which === KeyCodes$1.ARROW_UP || event.which === KeyCodes$1.ARROW_DOWN) {
      this._render(event, event.which);
    }
  }

  /**
   * Closes currently open dropdown.
   * @param {Object} event - The event object
   */
  _handleClose(event) {
    event.preventDefault();

    this.releaseFocus();

    this._activeDropdownButton.setAttribute(Selectors$2.ARIA_EXPANDED, "false");
    this._activeDropdown.setAttribute(Selectors$2.DATA_VISIBLE, "false");

    this._activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors$2.TABINDEX, "-1");
      link.removeEventListener(Events$2.CLICK, this._handleClose);
    });

    this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._handleClose);
    this._activeDropdownButton.addEventListener(Events$2.CLICK, this._render);

    document.removeEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);

    if (iOSMobile) {
      document.body.style.cursor = "auto";
    }

    document.removeEventListener(Events$2.CLICK, this._handleOffMenuClick);

    if (this._allowFocusReturn) {
      this._handleReturnFocus();
    }

    this._activeDropdownButton = null;
    this._activeDropdownId = null;
    this._activeDropdown = null;
  }

  /**
   * Use escape key to close dropdown.
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$1.ESCAPE) {
      this._handleClose(event);
    }
  }

  /**
   * Closes dropdown
   * @param {Object} event - The event object
   */
  _handleOffMenuClick(event) {
    if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
      this._handleClose(event);
    }
  }

  /**
   * Puts focus on a the active dropdown button.
   */
  _handleReturnFocus() {
    this._activeDropdownButton.setAttribute(Selectors$2.TAB_INDEX, "-1");
    this._activeDropdownButton.focus();
    this._activeDropdownButton.removeAttribute(Selectors$2.TAB_INDEX);
  }

  /**
   * Retrieve possible menu links or buttons as an array
   * @param {String} attr - The unique attribute for a dropdown.
   * @return {String} - Selector for possible menu item links.
   */
  _getDropdownLinks(attr) {
    return nodeListToArray(`${attr} > ul > li > a, ${attr} > ul > li > button`)
  }

  /**
   * Add starting attributes to a dropdown.
   * @param {Element} dropdown - A dropdown element.
   */
  _setupDropdown(dropdown) {
    const dropdownId = dropdown.getAttribute(Selectors$2.DATA_DROPDOWN);

    // no id error

    const dropdownAttr = `[${Selectors$2.DATA_DROPDOWN}="${dropdownId}"]`;
    const dropdownMenuItemsAttr = `${dropdownAttr} > ul > li`;
    const dropdownMenu = document.querySelector(`${dropdownAttr} > ul`);

    // no ul error

    if (!dropdownMenu) {
      return console.error(Messages$1.NO_MENU_ERROR(dropdownAttr))
    }

    const dropdownButton = document.querySelector(`${dropdownAttr} > ${this._dropdownTargetAttr}`);

    dropdownButton.setAttribute(Selectors$2.ARIA_CONTROLS, dropdownMenu.id);
    dropdownButton.setAttribute(Selectors$2.ARIA_HASPOPUP, "true");
    dropdownButton.setAttribute(Selectors$2.ARIA_EXPANDED, "false");
    dropdownMenu.setAttribute(Selectors$2.ARIA_LABELLEDBY, dropdownButton.id);

    const dropdownMenuListItems = nodeListToArray(dropdownMenuItemsAttr);

    // no menu items error

    dropdownMenuListItems.forEach(item => item.setAttribute(Selectors$2.ROLE, "none"));

    const dropdownMenuButtons = this._getDropdownLinks(dropdownAttr);

    // no menu buttons error

    dropdownMenuButtons.forEach(link => {
      link.setAttribute(Selectors$2.ROLE, "menuitem");
      link.setAttribute(Selectors$2.TABINDEX, "-1");
    });
  }
}

const KeyCodes$2 = {
  ESCAPE: 27,
};

const Selectors$3 = {
  // unique
  DATA_MODAL: "data-modal",
  DATA_MODAL_BUTTON: "data-modal-button",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex",
  // classes
  NO_SCROLL: "no-scroll",
};

const Events$3 = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
};

const Messages$2 = {
  NO_BUTTON_ID_ERROR:
    "Could not find an id on your [data-modal-button] element. Modal can't be opened.",
  NO_MODAL_ID_ERROR:
    "Could not detect an id on your [data-modal] element. Please add a value matching a button's [data-modal-button] attribute.",
  NO_MODAL_ERROR: id =>
    `Could not find a [data-parent='${id}'] attribute within your [data-modal='${id}'] element.`,
};

/**
 * Modal component class.
 * @module Modal
 * @requires Utils
 */
class Modal extends Utils {
  constructor() {
    super();

    // events
    this._render = this._render.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleOverlayClick = this._handleOverlayClick.bind(this);
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this);

    // all modals
    this._modals = [];
    this._modalButtons = [];

    // active modal
    this._activeModalButton = {};
    this._activeModalOverlay = {};
    this._activeModal = {};
    this._activeModalId = "";
    this._activeModalOverlayAttr = "";
    this._activeModalSelector = "";
    this._activeModalCloseButtons = [];

    // attribute helpers
    this._modalContainerAttr = `[${Selectors$3.DATA_MODAL}]`;
  }

  // public

  /**
   * Begin listening to modals.
   */
  start() {
    this._modals = nodeListToArray(this._modalContainerAttr);
    this._modalButtons = nodeListToArray(`[${Selectors$3.DATA_MODAL_BUTTON}]`);

    getFocusableElements(this._modalContainerAttr).forEach(element => {
      element.setAttribute(Selectors$3.TABINDEX, "-1");
    });

    if (this._modals.length) {
      this._modals.forEach(instance => {
        this._setupModal(instance);
      });
    }

    if (this._modalButtons.length) {
      this._modalButtons.forEach(button => {
        button.addEventListener(Events$3.CLICK, this._render);
      });
    }
  }

  /**
   * Stop listening to modals
   */
  stop() {
    this._modalButtons.forEach(button => {
      button.removeEventListener(Events$3.CLICK, this._render);
    });
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   */
  _render(event) {
    event.preventDefault();
    this._activeModalButton = event.target;
    this._activeModalId = this._activeModalButton.getAttribute(Selectors$3.DATA_MODAL_BUTTON);

    if (!this._activeModalId) {
      return console.error(Messages$2.NO_BUTTON_ID_ERROR)
    }

    this._activeModalOverlay = document.querySelector(
      `[${Selectors$3.DATA_MODAL}="${this._activeModalId}"]`
    );
    this._activeModalSelector = `[${Selectors$3.DATA_PARENT}='${this._activeModalId}']`;
    this._activeModal = this._activeModalOverlay.querySelector(this._activeModalSelector);
    this._activeModalCloseButtons = nodeListToArray(
      `${this._activeModalSelector} [${Selectors$3.DATA_CLOSE}]`
    );

    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors$3.TABINDEX, "0");
    });

    this._handleScrollStop();
    this.captureFocus(this._activeModalSelector);
    this._activeModalOverlay.setAttribute(Selectors$3.ARIA_HIDDEN, "false");
    this._activeModalOverlay.setAttribute(Selectors$3.DATA_VISIBLE, "true");

    this._activeModal.setAttribute(Selectors$3.TABINDEX, "-1");
    this._activeModal.focus();

    this._activeModalOverlay.scrollTop = 0;

    if (iOSMobile) {
      this._activeModalOverlay.style.cursor = "pointer";
    }

    // begin listening to events
    document.addEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
    document.addEventListener(Events$3.CLICK, this._handleOverlayClick);
    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events$3.CLICK, this._handleClose);
    });
  }

  /**
   * Setup a modal instance.
   * @param {Object} instance - The modal element
   */
  _setupModal(instance) {
    const modalId = instance.getAttribute(Selectors$3.DATA_MODAL);

    if (!modalId) {
      return console.error(Messages$2.NO_MODAL_ID_ERROR)
    }

    const modal = instance.querySelector(`[${Selectors$3.DATA_PARENT}='${modalId}']`);

    if (!modal) {
      return console.error(Messages$2.NO_MODAL_ERROR(modalId))
    }

    const modalWrapper = document.querySelector(`[${Selectors$3.DATA_MODAL}='${modalId}']`);

    modalWrapper.setAttribute(Selectors$3.ARIA_HIDDEN, "true");
    modalWrapper.setAttribute(Selectors$3.DATA_VISIBLE, "false");
    modal.setAttribute(Selectors$3.ARIA_MODAL, "true");
    modal.setAttribute(Selectors$3.ROLE, "dialog");
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - The event object
   */
  _handleClose(event) {
    event.preventDefault();
    this._activeModalOverlay.setAttribute(Selectors$3.DATA_VISIBLE, "false");
    this._handleReturnFocus();
    this._handleScrollRestore();
    this.releaseFocus();
    this._activeModalOverlay.setAttribute(Selectors$3.ARIA_HIDDEN, "true");
    this._activeModal.removeAttribute(Selectors$3.TABINDEX);

    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors$3.TABINDEX, "-1");
    });

    if (iOSMobile) {
      this._activeModalOverlay.style.cursor = "auto";
    }

    // stop listening to events
    document.removeEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
    document.removeEventListener(Events$3.CLICK, this._handleOverlayClick);
    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events$3.CLICK, this._handleClose);
    });

    this._activeModalId = null;
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - The event object
   */
  _handleOverlayClick(event) {
    if (event.target === this._activeModalOverlay) {
      this._handleClose(event);
    }
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$2.ESCAPE) {
      this._handleClose(event);
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  _handleReturnFocus() {
    this._activeModalButton.setAttribute(Selectors$3.TABINDEX, "-1");
    this._activeModalButton.focus();
    this._activeModalButton.removeAttribute(Selectors$3.TABINDEX);
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  _handleScrollRestore() {
    document.body.classList.remove(Selectors$3.NO_SCROLL);
    document.documentElement.classList.remove(Selectors$3.NO_SCROLL);
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  _handleScrollStop() {
    document.body.classList.add(Selectors$3.NO_SCROLL);
    document.documentElement.classList.add(Selectors$3.NO_SCROLL);
  }
}

const KeyCodes$3 = {
  ESCAPE: 27,
};

const Selectors$4 = {
  DATA_TOOLTIP: "data-tooltip",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  DROP_LEFT_CLASS: "is-drop-left",
  DROP_RIGHT_CLASS: "is-drop-right",
};

const Events$4 = {
  CLICK: "click",
  MOUSEOVER: "mouseover",
  MOUSEOUT: "mouseout",
  FOCUS: "focus",
  BLUR: "blur",
  KEYDOWN: "keydown",
};

const Messages$3 = {
  NO_ID_ERROR: "Could not find your tooltip's id.",
  NO_TRIGGER_ERROR: id => `Could not find a tooltip trigger with id of ${id}.`,
  NO_TOOLTIP_ERROR: id => `Could not find a tooltip with id of ${id}.`,
};

/**
 * Tooltip component class.
 * @module Tooltip
 */
class Tooltip {
  constructor() {
    // events
    this._render = this._render.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this);

    // active tooltip
    this._activeTrigger = null;
    this._activeTooltip = null;

    // all tooltips
    this._allTooltips = [];
  }

  // public

  /**
   * Begin listening to tooltips.
   */
  start() {
    this._allTooltips = document.querySelectorAll(`[${Selectors$4.DATA_TOOLTIP}]`);

    this._allTooltips.forEach(instance => {
      this._setupTooltip(instance);
    });
  }

  /**
   * Stop listening to tooltips.
   */
  stop() {
    this._allTooltips.forEach(instance => {
      const id = instance.getAttribute(Selectors$4.DATA_TOOLTIP);
      const trigger = instance.querySelector(this._getTrigger(id));

      trigger.removeEventListener(Events$4.MOUSEOVER, this._render);
      trigger.removeEventListener(Events$4.FOCUS, this._render);
    });
  }

  // private

  /**
   * Render a tooltip.
   * @param {Object} event - The event object
   */
  _render(event) {
    this._activeTrigger = event.target;
    const tooltipId = this._activeTrigger.getAttribute(Selectors$4.DATA_TARGET);
    this._activeTooltip = document.getElementById(tooltipId);

    // align tooltip to its trigger
    // -> if the trigger is on the left or right side, use height
    // -> else use width
    if (this._isLeftOrRight()) {
      this._alignTooltip("height");
    } else {
      this._alignTooltip("width");
    }

    this._showTooltip();
    this._listenForClose();
  }

  /**
   * Close a tooltip.
   */
  _handleClose() {
    this._hideTooltip();
    this._listenForOpen();

    this._activeTrigger = null;
    this._activeTooltip = null;
  }

  /**
   * Add data-visible attribute to currently active tooltip.
   */
  _showTooltip() {
    this._activeTooltip.setAttribute(Selectors$4.DATA_VISIBLE, "true");
  }

  /**
   * Remove data-visible attribute from currently active tooltip.
   */
  _hideTooltip() {
    this._activeTooltip.setAttribute(Selectors$4.DATA_VISIBLE, "false");
  }

  /**
   * Stop listening for render events, and start listening to close events.
   */
  _listenForClose() {
    this._activeTrigger.removeEventListener(Events$4.MOUSEOVER, this._render);
    this._activeTrigger.removeEventListener(Events$4.FOCUS, this._render);
    this._activeTrigger.addEventListener(Events$4.MOUSEOUT, this._handleClose);
    this._activeTrigger.addEventListener(Events$4.BLUR, this._handleClose);
    document.addEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

    if (iOSMobile) {
      document.body.style.cursor = "pointer";
    }
  }

  /**
   * Close a tooltip with the escape key.
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$3.ESCAPE) {
      this._handleClose();
    }
  }

  /**
   * Stop listening to close events, start listening for render events.
   */
  _listenForOpen() {
    this._activeTrigger.removeEventListener(Events$4.MOUSEOUT, this._handleClose);
    this._activeTrigger.removeEventListener(Events$4.BLUR, this._handleClose);
    this._activeTrigger.addEventListener(Events$4.MOUSEOVER, this._render);
    this._activeTrigger.addEventListener(Events$4.FOCUS, this._render);
    document.removeEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

    if (iOSMobile) {
      document.body.style.cursor = "auto";
    }
  }

  /**
   * Aligns a tooltip vertically or horizontally.
   * @param {String} property - String specifying "height" or "width"
   */
  _alignTooltip(property) {
    const triggerLength = this._getComputedLength(this._activeTrigger, property);
    const tooltipLength = this._getComputedLength(this._activeTooltip, property);
    const triggerIsLongest = triggerLength > tooltipLength;

    const offset = triggerIsLongest
      ? (triggerLength - tooltipLength) / 2
      : (tooltipLength - triggerLength) / -2;

    if (property === "height") {
      this._activeTooltip.style.top = `${offset}px`;
    } else {
      this._activeTooltip.style.left = `${offset}px`;
    }
  }

  /**
   * Setup a tooltip and trigger with appropriate event listeners and attributes.
   * @param {Object} instance - A tooltip instance
   */
  _setupTooltip(instance) {
    const id = instance.getAttribute(Selectors$4.DATA_TOOLTIP);
    const trigger = instance.querySelector(this._getTrigger(id));
    const tooltip = document.getElementById(id);

    if (!id) {
      return console.error(Messages$3.NO_ID_ERROR)
    }

    if (!trigger) {
      return console.error(Messages$3.NO_TRIGGER_ERROR(id))
    }

    if (!tooltip) {
      return console.error(Messages$3.NO_TOOLTIP_ERROR(id))
    }

    trigger.setAttribute(Selectors$4.ARIA_DESCRIBEDBY, id);
    tooltip.setAttribute(Selectors$4.ROLE, "tooltip");

    trigger.addEventListener(Events$4.MOUSEOVER, this._render);
    trigger.addEventListener(Events$4.FOCUS, this._render);
  }

  /**
   * Get an attribute selector string.
   * @param {String} id - A unique tooltip id
   * @return {String}
   */
  _getTrigger(id) {
    return `[${Selectors$4.DATA_TARGET}="${id}"]`
  }

  /**
   * Render a tooltip.
   * @param {Object} element - A tooltip element
   * @param {String} property - The "height" or "width" property.
   * @return {Number}
   */
  _getComputedLength(element, property) {
    return parseInt(window.getComputedStyle(element)[property].slice(0, -2))
  }

  /**
   * Determine if a tooltip is rendering on the left or right.
   * @return {Boolean}
   */
  _isLeftOrRight() {
    const classes = this._activeTooltip.classList;
    return (
      classes.contains(Selectors$4.DROP_LEFT_CLASS) || classes.contains(Selectors$4.DROP_RIGHT_CLASS)
    )
  }
}

const Accordions = new Accordion();
const Dropdowns = new Dropdown();
const Modals = new Modal();
const Tooltips = new Tooltip();
const Utils$1 = new Utils();

const Undernet = {
  // Components
  Modals,
  Accordions,
  Dropdowns,
  Tooltips,

  // Utils
  Utils: Utils$1,
};

Undernet.start = () => {
  // Components
  Undernet.Modals.start();
  Undernet.Accordions.start();
  Undernet.Dropdowns.start();
  Undernet.Tooltips.start();

  // Utils
  Undernet.Utils.enableFocusOutline();
};

Undernet.stop = () => {
  // Components
  Undernet.Modals.stop();
  Undernet.Accordions.stop();
  Undernet.Dropdowns.stop();

  // Utils
  Undernet.Utils.disableFocusOutline();
};

export default Undernet;
export { Accordions, Dropdowns, Modals, Tooltips, Utils$1 as Utils };
