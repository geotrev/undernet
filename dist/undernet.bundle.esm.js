/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v3.2.1 (https://undernet.io)
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
    this._focusableChildren = this.getFocusableElements(this._focusContainerSelector);
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

  /**
   * Because IE does not recognize NodeList.forEach(),
   * we use a cross-browser solution for returning an array of DOM nodes every time.
   * @param {String} element - A DOM node's class, attribute, etc., to search the document.
   * @return {Array}
   */
  getElements(element) {
    const nodeList = document.querySelectorAll(element);
    return Array.apply(null, nodeList)
  }

  /**
   * Creates a string of element selector patterns using common elements.
   * @param {String} container - The enclosing container's class, attribute, etc.
   * @return {String}
   */
  getFocusableElements(container) {
    const focusables = Selectors.FOCUSABLE_TAGS.map(element => {
      return `${container} ${element}${Selectors.NOT_VISUALLY_HIDDEN}`
    });

    return this.getElements(focusables.join(", "))
  }

  // private

  /**
   * When a key is pressed, detect if it's tab or shift keys and enable
   * focus outlines on currently focused element(s). Then, remove keydown listener
   * and add click listener on _listenForClick().
   * @param {Object} event - Event (keypress).
   */
  _listenForKeyboard(event) {
    const tabKey = event.which === KeyCodes.TAB;
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
    const arrowUp = event.which === KeyCodes.ARROW_UP;
    const arrowDown = event.which === KeyCodes.ARROW_DOWN;

    if (tabKey || shiftKey || arrowUp || arrowDown) {
      document.body.classList.add(Selectors.KEYBOARD_CLASS);
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
      document.addEventListener(Events.CLICK, this._listenForClick);
      this._listeningForKeydown = false;
    }
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

const KeyCodes$1 = {
  ESCAPE: 27,
};

const Selectors$1 = {
  // unique
  DATA_MODAL: "data-modal",
  DATA_MODAL_ID: "data-modal-id",
  DATA_MODAL_BUTTON: "data-modal-button",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  // accessibility
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex",
  // classes
  NO_SCROLL: "no-scroll",
};

const Events$1 = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
};

const Messages = {
  NO_TARGET_ERROR: `Could not find [data-target] attribute associated with a [data-modal-button] element.`,
  NO_PARENT_ERROR: `Could not find [data-parent] attribute associated with a [data-modal] element.`,
  NO_ID_ERROR: id =>
    `Could not find [data-modal-id='${id}'] associated with a [data-modal] element.`,
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
    this._modalContainerAttr = `[${Selectors$1.DATA_MODAL}]`;
  }

  // public

  /**
   * Add accessible attributes to modal containers
   * Begin listening to elements with [data-modal-button]
   */
  start() {
    this._modals = this.getElements(this._modalContainerAttr);
    this._modalButtons = this.getElements(`[${Selectors$1.DATA_MODAL_BUTTON}]`);

    this.getFocusableElements(this._modalContainerAttr).forEach(element => {
      element.setAttribute(Selectors$1.TABINDEX, "-1");
    });

    if (this._modals.length) {
      this._modals.forEach(modal => {
        this._setupModal(modal);
      });
    }

    if (this._modalButtons.length) {
      this._modalButtons.forEach(button => {
        button.addEventListener(Events$1.CLICK, this._render);
      });
    }
  }

  /**
   * Stop listening to modal buttons
   */
  stop() {
    this._modalButtons.forEach(button => {
      button.removeEventListener(Events$1.CLICK, this._render);
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

    if (!this._activeModalButton.getAttribute(Selectors$1.DATA_TARGET)) {
      return console.error(Messages.NO_TARGET_ERROR)
    }

    this._activeModalId = this._activeModalButton.getAttribute(Selectors$1.DATA_TARGET);
    this._activeModalOverlayAttr = `[${Selectors$1.DATA_MODAL_ID}="${this._activeModalId}"]`;

    if (!document.querySelector(this._activeModalOverlayAttr)) {
      return console.error(Messages.NO_ID_ERROR(this._activeModalId))
    }

    this._activeModalOverlay = document.querySelector(this._activeModalOverlayAttr);

    this._activeModalSelector = `${this._activeModalOverlayAttr} ${this._modalContainerAttr}`;
    this._activeModal = document.querySelector(this._activeModalSelector);
    this._activeModalCloseButtons = this.getElements(
      `${this._activeModalOverlayAttr} [${Selectors$1.DATA_CLOSE}]`,
    );

    this.getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors$1.TABINDEX, "0");
    });

    this._handleScrollStop();
    this.captureFocus(this._activeModalSelector);
    this._activeModalOverlay.setAttribute(Selectors$1.ARIA_HIDDEN, "false");
    this._activeModal.setAttribute(Selectors$1.TABINDEX, "-1");
    this._activeModalOverlay.setAttribute(Selectors$1.DATA_VISIBLE, "true");
    this._activeModal.focus();

    // offset slight scroll caused by this._activeModal.focus()
    this._activeModalOverlay.scrollTop = 0;

    // begin listening to events
    document.addEventListener(Events$1.KEYDOWN, this._handleEscapeKeyPress);
    document.addEventListener(Events$1.CLICK, this._handleOverlayClick);
    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events$1.CLICK, this._handleClose);
    });
  }

  _setupModal(modal) {
    let modalId;
    if (!modal.getAttribute(Selectors$1.DATA_PARENT)) {
      return console.error(Messages.NO_PARENT_ERROR)
    } else {
      modalId = modal.getAttribute(Selectors$1.DATA_PARENT);
    }

    let modalWrapper;
    if (!document.querySelector(`[${Selectors$1.DATA_MODAL_ID}='${modalId}']`)) {
      return console.error(Messages.NO_ID_ERROR(modalId))
    } else {
      modalWrapper = document.querySelector(`[${Selectors$1.DATA_MODAL_ID}='${modalId}']`);
    }

    modalWrapper.setAttribute(Selectors$1.ARIA_HIDDEN, "true");
    modalWrapper.setAttribute(Selectors$1.DATA_VISIBLE, "false");
    modal.setAttribute(Selectors$1.ARIA_MODAL, "true");
    modal.setAttribute(Selectors$1.ROLE, "dialog");
  }

  /**
   * Turn off event listeners and reset focus to last selected DOM node (button)
   * @param {Object} event - Event (keydown or click)
   */
  _handleClose(event) {
    event.preventDefault();
    this._activeModalOverlay.setAttribute(Selectors$1.DATA_VISIBLE, "false");
    this._handleReturnFocus();
    this._handleScrollRestore();
    this.releaseFocus();
    this._activeModalOverlay.setAttribute(Selectors$1.ARIA_HIDDEN, "true");
    this._activeModal.removeAttribute(Selectors$1.TABINDEX);

    this.getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors$1.TABINDEX, "-1");
    });

    // stop listening to events
    document.removeEventListener(Events$1.KEYDOWN, this._handleEscapeKeyPress);
    document.removeEventListener(Events$1.CLICK, this._handleOverlayClick);
    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events$1.CLICK, this._handleClose);
    });
  }

  /**
   * Handles click event on the modal background to close it.
   * @param {Object} event - Event (keydown)
   */
  _handleOverlayClick(event) {
    if (event.target === this._activeModalOverlay) {
      this._handleClose(event);
    }
  }

  /**
   * Handles escape key event to close the current modal
   * @param {Object} event - Event (keydown)
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$1.ESCAPE) {
      this._handleClose(event);
    }
  }

  /**
   * Returns focus to the last focused element before the modal was called.
   * @param {Object} button - The current modal's corresponding button.
   */
  _handleReturnFocus() {
    this._activeModalButton.setAttribute(Selectors$1.TABINDEX, "-1");
    this._activeModalButton.focus();
    this._activeModalButton.removeAttribute(Selectors$1.TABINDEX);
  }

  /**
   * Restores scroll behavior to <html> and <body>
   */
  _handleScrollRestore() {
    document.body.classList.remove(Selectors$1.NO_SCROLL);
    document.querySelector("html").classList.remove(Selectors$1.NO_SCROLL);
  }

  /**
   * Prevents scroll behavior on <html> and <body>
   */
  _handleScrollStop() {
    document.body.classList.add(Selectors$1.NO_SCROLL);
    document.querySelector("html").classList.add(Selectors$1.NO_SCROLL);
  }
}

const Selectors$2 = {
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

const Events$2 = {
  CLICK: "click",
  KEYDOWN: "keydown",
};

const Messages$1 = {
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
   * Sets up accordion components and listens to buttons for events.
   * Begin listening to [data-accordion-button] elements
   */
  start() {
    const accordionButtonSelector = this._getPossibleAccordionButtonAttrs(
      `[${Selectors$2.DATA_ACCORDION}]`,
    );
    this._accordionButtons = this.getElements(accordionButtonSelector);

    if (this._accordionButtons.length) {
      this._accordionButtons.forEach(button => {
        this._setupAccordion(button);
        button.addEventListener(Events$2.CLICK, this._render);
      });
    }
  }

  /**
   * Stop listening to accordion button events.
   */
  stop() {
    this._accordionButtons.forEach(button => {
      button.removeEventListener(Events$2.CLICK, this._render);
    });
  }

  // private

  /**
   * Add initial attributes to accordion elements.
   * @param {Element} button - A button element that triggers an accordion.
   */
  _setupAccordion(button) {
    const buttonId = button.getAttribute(Selectors$2.DATA_TARGET);

    if (!document.getElementById(buttonId)) {
      return console.error(Messages$1.NO_CONTENT_ERROR(buttonId))
    }

    const buttonContent = document.getElementById(buttonId);
    const accordionRowAttr = this._getAccordionRowAttr(buttonId);

    if (!document.querySelector(accordionRowAttr)) {
      return console.error(Messages$1.NO_ROW_ERROR(buttonId))
    }

    const accordionRow = document.querySelector(accordionRowAttr);
    const buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);
    const buttonHeader = this.getElements(buttonHeaderAttr)[0];

    if (!buttonHeader || !buttonHeader.id) {
      console.error(Messages$1.NO_HEADER_ID_ERROR(buttonId));
    }

    const buttonContentChildren = this.getFocusableElements(`#${buttonContent.id}`);

    button.setAttribute(Selectors$2.ARIA_CONTROLS, buttonId);
    buttonContent.setAttribute(Selectors$2.ARIA_LABELLEDBY, buttonHeader.id);

    if (!accordionRow.getAttribute(Selectors$2.DATA_VISIBLE)) {
      return console.error(Messages$1.NO_VISIBLE_ERROR(buttonId))
    }

    const contentShouldExpand = accordionRow.getAttribute(Selectors$2.DATA_VISIBLE);
    if (contentShouldExpand === "true") {
      buttonContent.style.maxHeight = `${buttonContent.scrollHeight}px`;
      button.setAttribute(Selectors$2.ARIA_EXPANDED, "true");
      buttonContent.setAttribute(Selectors$2.ARIA_HIDDEN, "false");
      buttonContentChildren.forEach(element => {
        element.setAttribute(Selectors$2.TABINDEX, "0");
      });
    } else {
      button.setAttribute(Selectors$2.ARIA_EXPANDED, "false");
      buttonContent.setAttribute(Selectors$2.ARIA_HIDDEN, "true");
      buttonContentChildren.forEach(element => {
        element.setAttribute(Selectors$2.TABINDEX, "-1");
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
        num => `${attr} > [${Selectors$2.DATA_ACCORDION_ROW}] > h${num} [${Selectors$2.DATA_TARGET}]`,
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
    return `[${Selectors$2.DATA_ACCORDION_ROW}='${id}']`
  }

  /**
   * Open accordion content associated with an accordion button.
   * @param {Object} event - The event object
   */
  _render(event) {
    event.preventDefault();

    this._activeButton = event.target;
    this._activeAccordionRowId = this._activeButton.getAttribute(Selectors$2.DATA_TARGET);

    this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
    this._activeRow = document.querySelector(this._activeRowAttr);

    if (!this._activeButton.getAttribute(Selectors$2.DATA_PARENT)) {
      return console.error(Messages$1.NO_PARENT_ERROR(this._activeAccordionRowId))
    }

    this._activeContainerId = this._activeButton.getAttribute(Selectors$2.DATA_PARENT);
    this._activeContainerAttr = `[${Selectors$2.DATA_ACCORDION}='${this._activeContainerId}']`;

    if (!document.querySelector(this._activeContainerAttr)) {
      return console.error(Messages$1.NO_ACCORDION_ERROR(this._activeContainerId))
    }

    this._activeContainer = document.querySelector(this._activeContainerAttr);
    this._activeContent = document.getElementById(this._activeAccordionRowId);

    const accordionButtonState = this._activeRow.getAttribute(Selectors$2.DATA_VISIBLE);

    this._activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
    this._activeContentHiddenState = this._activeButtonExpandState === "false" ? "true" : "false";

    this._closeAllIfToggleable();
    this._toggleSelectedAccordion();
  }

  /**
   * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
   * This ensures the selected one can be closed if it's already open.
   */
  _closeAllIfToggleable() {
    if (this._activeContainer.hasAttribute(Selectors$2.DATA_TOGGLE_MULTIPLE)) return

    const allContentAttr = `${this._activeContainerAttr} [${Selectors$2.ARIA_HIDDEN}]`;
    const allRows = this.getElements(`${this._activeContainerAttr} [${Selectors$2.DATA_VISIBLE}]`);
    const allContent = this.getElements(allContentAttr);

    const accordionButtonSelector = this._getPossibleAccordionButtonAttrs(this._activeContainerAttr);
    const allButtons = this.getElements(accordionButtonSelector);

    allContent.forEach(content => {
      if (content !== this._activeContent) content.style.maxHeight = null;
    });

    this.getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors$2.TABINDEX, "-1");
    });

    this._toggleAttributeInCollection(allRows, Selectors$2.DATA_VISIBLE, "true", "false");
    this._toggleAttributeInCollection(allButtons, Selectors$2.ARIA_EXPANDED, "true", "false");
    this._toggleAttributeInCollection(allContent, Selectors$2.ARIA_HIDDEN, "false", "true");
  }

  /**
   * Toggle the currently selected accordion button's content.
   */
  _toggleSelectedAccordion() {
    this._activeRow.setAttribute(Selectors$2.DATA_VISIBLE, this._activeButtonExpandState);
    this._activeButton.setAttribute(Selectors$2.ARIA_EXPANDED, this._activeButtonExpandState);
    this._activeContent.setAttribute(Selectors$2.ARIA_HIDDEN, this._activeContentHiddenState);

    const activeContentBlock = `#${this._activeAccordionRowId}`;
    this.getFocusableElements(activeContentBlock).forEach(element => {
      const value = this._activeButtonExpandState === "true" ? "0" : "-1";
      element.setAttribute(Selectors$2.TABINDEX, value);
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

const KeyCodes$2 = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

const Selectors$3 = {
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

const Events$3 = {
  KEYDOWN: "keydown",
  CLICK: "click",
};

const Messages$2 = {
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
    this._dropdownContainerAttr = `[${Selectors$3.DATA_DROPDOWN}]`;
    this._dropdownTargetAttr = `[${Selectors$3.DATA_TARGET}]`;
  }

  // public

  /**
   * Find and set up dropdown buttons and menus.
   * Begin listening to dropdowns for events.
   */
  start() {
    this._dropdowns = this.getElements(`${this._dropdownContainerAttr}`);
    this._dropdownButtons = this.getElements(
      `${this._dropdownContainerAttr} > ${this._dropdownTargetAttr}`,
    );

    if (this._dropdowns.length) {
      this._dropdowns.forEach(dropdown => this._setupDropdown(dropdown));
    }

    this._dropdownButtons.forEach(button => {
      button.addEventListener(Events$3.CLICK, this._render);
      button.addEventListener(Events$3.KEYDOWN, this._renderWithKeys);
    });
  }

  /**
   * Stop listening for dropdown events.
   */
  stop() {
    this._dropdownButtons.forEach(button => {
      button.removeEventListener(Events$3.CLICK, this._render);
      button.removeEventListener(Events$3.KEYDOWN, this._renderWithKeys);
    });
  }

  // private

  /**
   * Find a button through event.target, then render the corresponding modal attribute via matching target id
   * @param {Object} event - The event object
   * @param {Number} key - The key code that called _render()
   */
  _render(event, key) {
    if (!key) event.preventDefault();
    event.stopPropagation();

    if (this._activeDropdownButton) {
      this._allowFocusReturn = false;
      this._handleClose(event);
      this._allowFocusReturn = true;
    }

    // dropdown button / trigger
    this._activeDropdownButton = event.target;

    if (!this._activeDropdownButton.getAttribute(Selectors$3.DATA_PARENT)) {
      return console.error(Messages$2.NO_PARENT_ERROR)
    }

    this._activeDropdownId = this._activeDropdownButton.getAttribute(Selectors$3.DATA_PARENT);

    // dropdown container
    this._activeDropdownAttr = `[${Selectors$3.DATA_DROPDOWN}="${this._activeDropdownId}"]`;

    if (!document.querySelector(this._activeDropdownAttr)) {
      return console.error(Messages$2.NO_DROPDOWN_ERROR(this._activeDropdownAttr))
    }

    this._activeDropdown = document.querySelector(this._activeDropdownAttr);

    // dropdown menu
    this._activeDropdownMenuId = this._activeDropdownButton.getAttribute(Selectors$3.DATA_TARGET);
    this._activeDropdownMenu = document.getElementById(this._activeDropdownMenuId);

    // dropdown button
    this._activeDropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "true");
    this._activeDropdown.setAttribute(Selectors$3.DATA_VISIBLE, "true");

    // reset button event listener to close the menu, instead of open it
    this._activeDropdownButton.removeEventListener(Events$3.CLICK, this._render);
    this._activeDropdownButton.addEventListener(Events$3.CLICK, this._handleClose);

    document.addEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
    document.addEventListener(Events$3.CLICK, this._handleOffMenuClick);

    this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);

    this.firstDropdownLink = this._activeDropdownLinks[0];
    this.lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];

    this.firstDropdownLink.addEventListener(Events$3.KEYDOWN, this._handleFirstTabClose);
    this.lastDropdownLink.addEventListener(Events$3.KEYDOWN, this._handleLastTabClose);

    if (key && key === KeyCodes$2.ARROW_UP) {
      this.lastDropdownLink.focus();
    } else {
      this.firstDropdownLink.focus();
    }

    this._activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors$3.TABINDEX, "0");
      link.addEventListener(Events$3.CLICK, this._handleClose);
    });

    this.captureFocus(`${this._activeDropdownAttr} > ul`, { useArrows: true });
  }

  /**
   * Closes the dropdown if user uses shift and tab keys on the first dropdown element.
   * @param {Object} event - The event object
   */
  _handleFirstTabClose(event) {
    const shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
    const tabKey = event.which === KeyCodes$2.TAB;

    if (shiftKey && tabKey) {
      this._handleClose(event);
    }
  }

  /**
   * Closes the dropdown if user uses tab key on the last dropdown element.
   * @param {Object} event - The event object
   */
  _handleLastTabClose(event) {
    const shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
    const tabKey = event.which === KeyCodes$2.TAB;

    if (tabKey && !shiftKey) {
      this._handleClose(event);
    }
  }

  /**
   * Renders dropdown if the user uses arrow up or down.
   * @param {Object} event - The event object
   */
  _renderWithKeys(event) {
    if (event.which === KeyCodes$2.ARROW_UP || event.which === KeyCodes$2.ARROW_DOWN) {
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

    this._activeDropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "false");
    this._activeDropdown.setAttribute(Selectors$3.DATA_VISIBLE, "false");

    this._activeDropdownLinks.forEach(link => {
      link.setAttribute(Selectors$3.TABINDEX, "-1");
      link.removeEventListener(Events$3.CLICK, this._handleClose);
    });

    this._activeDropdownButton.removeEventListener(Events$3.CLICK, this._handleClose);
    this._activeDropdownButton.addEventListener(Events$3.CLICK, this._render);

    document.removeEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
    document.removeEventListener(Events$3.CLICK, this._handleOffMenuClick);

    if (this._allowFocusReturn) {
      this._handleReturnFocus();
    }
  }

  /**
   * Use escape key to close dropdown.
   * @param {Object} event - The event object
   */
  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$2.ESCAPE) {
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
    this._activeDropdownButton.setAttribute(Selectors$3.TAB_INDEX, "-1");
    this._activeDropdownButton.focus();
    this._activeDropdownButton.removeAttribute(Selectors$3.TAB_INDEX);
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
    const dropdownId = dropdown.getAttribute(Selectors$3.DATA_DROPDOWN);
    const dropdownIdAttr = `[${Selectors$3.DATA_DROPDOWN}="${dropdownId}"]`;
    const dropdownMenuItemsAttr = `${dropdownIdAttr} > ul > li`;

    if (!document.querySelector(`${dropdownIdAttr} > ul`)) {
      return console.error(Messages$2.NO_MENU_ERROR(dropdownIdAttr))
    }

    const dropdownMenu = document.querySelector(`${dropdownIdAttr} > ul`);
    const dropdownButton = document.querySelector(`${dropdownIdAttr} > ${this._dropdownTargetAttr}`);

    dropdownButton.setAttribute(Selectors$3.ARIA_CONTROLS, dropdownMenu.id);
    dropdownButton.setAttribute(Selectors$3.ARIA_HASPOPUP, "true");
    dropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "false");
    dropdownMenu.setAttribute(Selectors$3.ARIA_LABELLEDBY, dropdownButton.id);

    const dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
    dropdownMenuItems.forEach(item => item.setAttribute(Selectors$3.ROLE, "none"));

    this._getDropdownLinks(dropdownIdAttr).forEach(link => {
      link.setAttribute(Selectors$3.ROLE, "menuitem");
      link.setAttribute(Selectors$3.TABINDEX, "-1");
    });
  }
}

const Modals = new Modal();
const Accordions = new Accordion();
const Dropdowns = new Dropdown();
const Utils$1 = new Utils();

const Undernet = {
  // Components
  Modals,
  Accordions,
  Dropdowns,

  // Utils
  Utils: Utils$1,
};

Undernet.start = () => {
  // Components
  Undernet.Modals.start();
  Undernet.Accordions.start();
  Undernet.Dropdowns.start();

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
export { Modals, Accordions, Dropdowns, Utils$1 as Utils };
