/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v4.4.1 (https://undernet.io)
  * Copyright 2017-2019 George Treviranus
  */
const KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
};

const Selectors = {
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
  NOT_VISUALLY_HIDDEN_CLASS: ":not(.is-visually-hidden)",
};

const Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
};

/**
 * Simple DOM manipulator methods. NOTE: These aren't chainable.
 */
const dom = {
  attr: (element, attr, newValue) => {
    if (newValue === false) {
      return element.removeAttribute(attr)
    }

    if (typeof newValue === "string" || newValue === null) {
      return element.setAttribute(attr, newValue)
    }

    return element.getAttribute(attr)
  },
  hasAttr: (element, attr) => element.hasAttribute(attr),

  find: (selector, parent = document) => parent.querySelector(selector),
  findAll: (selector, parent = document) => [...parent.querySelectorAll(selector)],

  css: (element, property, value) => {
    if (typeof value === "string" || value === null) {
      return (element.style[property] = value)
    }

    return element.style[property]
  },

  addClass: (element, ...classes) => element.classList.add(...classes),
  removeClass: (element, ...classes) => element.classList.remove(...classes),
  hasClass: (element, ...classes) => {
    if (classes.length) {
      return classes.filter(cls => element.classList.contains(cls)).length
    }

    return element.classList.contains(classes[0])
  },
};

/**
 * Return an array literal of elements matching focusable elements within a given container.
 */
const getFocusableElements = container => {
  const focusables = Selectors.FOCUSABLE_TAGS.map(
    element => `${container} ${element}${Selectors.NOT_VISUALLY_HIDDEN_CLASS}`
  ).join(", ");

  return dom.findAll(focusables)
};

/**
 * Check if the current browser session is within an Apple device.
 */
const iOSMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent);

/**
 * Utility class to help with focus trapping and keyboard outline management.
 * Components extend from this method.
 */
class Utils {
  constructor() {
    // events
    this._listenForKeyboard = this._listenForKeyboard.bind(this);
    this._listenForClick = this._listenForClick.bind(this);
    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);

    // instance data
    this._focusContainerSelector = "";
    this._focusableChildren = [];
    this._focusableFirstChild = {};
    this._focusableLastChild = {};
    this._listeningForKeydown = false;
    this._trapFocusWithArrows = false;
  }

  // public

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

  releaseFocus() {
    if (this._trapFocusWithArrows) {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
      this._trapFocusWithArrows = false;
    } else {
      document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
    }
  }

  enableFocusOutline() {
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
  }

  disableFocusOutline() {
    if (this._listeningForKeydown) {
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
    } else {
      document.removeEventListener(Events.CLICK, this._listenForClick);
    }
  }

  // private

  _listenForKeyboard() {
    document.body.classList.add(Selectors.KEYBOARD_CLASS);
    document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
    document.addEventListener(Events.CLICK, this._listenForClick);
    this._listeningForKeydown = false;
  }

  _listenForClick() {
    document.body.classList.remove(Selectors.KEYBOARD_CLASS);
    document.removeEventListener(Events.CLICK, this._listenForClick);
    document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
    this._listeningForKeydown = true;
  }

  _handleFocusTrapWithTab(event) {
    const containerElement = dom.find(this._focusContainerSelector);
    const containerActive = document.activeElement === containerElement;
    const firstActive = document.activeElement === this._focusableFirstChild;
    const lastActive = document.activeElement === this._focusableLastChild;
    const tabKey = event.which === KeyCodes.TAB;
    const shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
    const hasShift = shiftKey && tabKey;
    const noShift = !shiftKey && tabKey;

    if (hasShift && (firstActive || containerActive)) {
      event.preventDefault();
      this._focusableLastChild.focus();
    } else if (noShift && lastActive) {
      event.preventDefault();
      this._focusableFirstChild.focus();
    }
  }

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

  _focusNextChild() {
    for (let i = 0; i < this._focusableChildren.length; i++) {
      if (this._focusableChildren[i] === document.activeElement) {
        this._focusableChildren[i + 1].focus();
        break
      }
    }
  }

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
    `Could not find accordion row with [data-visible] attribute associated with [data-target='${id}'].`,
  NO_ROW_ERROR: id => `Could not find [data-accordion-row] associated with [data-target='${id}'].`,
  NO_HEADER_ID_ERROR: attr => `Could not find an id on your header associated with ${attr}.`,
  NO_ACCORDION_ID_ERROR: id =>
    `Could not find [data-accordion] attribute associated with [data-target='${id}'].`,
  NO_CONTENT_ERROR: id =>
    `Could not find accordion content block with id '${id}'; should match trigger with [data-target='${id}'].`,
};

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
    this._headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
  }

  // public

  start() {
    const accordionButtonSelector = this._getAccordionButtonSelector(
      `[${Selectors$1.DATA_ACCORDION}]`
    );
    this._accordionButtons = dom.findAll(accordionButtonSelector);

    if (this._accordionButtons.length) {
      this._accordionButtons.forEach(instance => {
        this._setup(instance);
        instance.addEventListener(Events$1.CLICK, this._render);
      });
    }
  }

  stop() {
    this._accordionButtons.forEach(instance => {
      instance.removeEventListener(Events$1.CLICK, this._render);
    });
  }

  // private

  _setup(instance) {
    const buttonTargetId = dom.attr(instance, Selectors$1.DATA_TARGET);
    const accordionId = dom.attr(instance, Selectors$1.DATA_PARENT);
    const buttonContent = dom.find(`#${buttonTargetId}`);

    if (!accordionId) {
      throw new Error(Messages.NO_ACCORDION_ID_ERROR(buttonTargetId))
    }

    if (!buttonContent) {
      throw new Error(Messages.NO_CONTENT_ERROR(buttonTargetId))
    }

    const accordionRowAttr = this._getAccordionRowAttr(buttonTargetId);
    const accordionRow = dom.find(accordionRowAttr);

    if (!accordionRow) {
      throw new Error(Messages.NO_ROW_ERROR(buttonTargetId))
    }

    const buttonId = instance.id;

    if (!buttonId) {
      throw new Error(Messages.NO_HEADER_ID_ERROR(accordionRowAttr))
    }

    const buttonContentChildren = getFocusableElements(`#${buttonContent.id}`);

    dom.attr(instance, Selectors$1.ARIA_CONTROLS, buttonTargetId);
    dom.attr(buttonContent, Selectors$1.ARIA_LABELLEDBY, buttonId);

    const contentShouldExpand = dom.attr(accordionRow, Selectors$1.DATA_VISIBLE);

    if (!contentShouldExpand) {
      throw new Error(Messages.NO_VISIBLE_ERROR(buttonTargetId))
    }

    if (contentShouldExpand === "true") {
      dom.css(buttonContent, "maxHeight", `${buttonContent.scrollHeight}px`);
      dom.attr(instance, Selectors$1.ARIA_EXPANDED, "true");
      dom.attr(buttonContent, Selectors$1.ARIA_HIDDEN, "false");

      buttonContentChildren.forEach(element => {
        dom.attr(element, Selectors$1.TABINDEX, "0");
      });
    } else {
      dom.attr(instance, Selectors$1.ARIA_EXPANDED, "false");
      dom.attr(buttonContent, Selectors$1.ARIA_HIDDEN, "true");

      buttonContentChildren.forEach(element => {
        dom.attr(element, Selectors$1.TABINDEX, "-1");
      });
    }
  }

  _render(event) {
    event.preventDefault();

    this._activeButton = event.target;

    this._setIds();
    this._setActiveRow();
    this._setActiveContainer();
    this._setActiveContent();
    this._setVisibleState();

    const canExpandMultiple = dom.hasAttr(this._activeContainer, Selectors$1.DATA_TOGGLE_MULTIPLE);

    if (!canExpandMultiple) this._closeAllIfToggleable();

    this._toggleSelectedAccordion();

    this._activeRow = null;
    this._activeButton = null;
    this._activeContent = null;
    this._activeContainer = null;
  }

  _setActiveContent() {
    this._activeContent = dom.find(`#${this._activeAccordionRowId}`);
  }

  _setVisibleState() {
    const accordionButtonState = dom.attr(this._activeRow, Selectors$1.DATA_VISIBLE);
    this._nextButtonExpandState = accordionButtonState === "true" ? "false" : "true";
    this._nextContentHiddenState = this._nextButtonExpandState === "false" ? "true" : "false";
  }

  _setIds() {
    this._activeContainerId = dom.attr(this._activeButton, Selectors$1.DATA_PARENT);
    this._activeAccordionRowId = dom.attr(this._activeButton, Selectors$1.DATA_TARGET);
  }

  _setActiveContainer() {
    this._activeContainerAttr = `[${Selectors$1.DATA_ACCORDION}='${this._activeContainerId}']`;
    this._activeContainer = dom.find(this._activeContainerAttr);
  }

  _setActiveRow() {
    this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
    this._activeRow = dom.find(this._activeRowAttr);
  }

  _getAccordionButtonSelector(attr) {
    return this._headers
      .map(header => {
        return `${attr} > [${Selectors$1.DATA_ACCORDION_ROW}] > ${header} [${Selectors$1.DATA_TARGET}]`
      })
      .join(", ")
  }

  _getAccordionRowAttr(id) {
    return `[${Selectors$1.DATA_ACCORDION_ROW}='${id}']`
  }

  _closeAllIfToggleable() {
    const allContentAttr = `${this._activeContainerAttr} > [${Selectors$1.DATA_ACCORDION_ROW}] > [${
      Selectors$1.ARIA_HIDDEN
    }]`;
    const allContent = dom.findAll(allContentAttr);
    const accordionButtonSelector = this._getAccordionButtonSelector(this._activeContainerAttr);
    const allButtons = dom.findAll(accordionButtonSelector);
    const allRows = dom.findAll(`${this._activeContainerAttr} > [${Selectors$1.DATA_ACCORDION_ROW}]`);

    allContent
      .filter(content => content !== this._activeContent)
      .forEach(content => dom.css(content, "maxHeight", null));

    getFocusableElements(allContentAttr).forEach(element => {
      element.setAttribute(Selectors$1.TABINDEX, "-1");
    });

    this._toggleAttributeInCollection(allRows, Selectors$1.DATA_VISIBLE, "false");
    this._toggleAttributeInCollection(allButtons, Selectors$1.ARIA_EXPANDED, "false");
    this._toggleAttributeInCollection(allContent, Selectors$1.ARIA_HIDDEN, "true");
  }

  _toggleSelectedAccordion() {
    dom.attr(this._activeRow, Selectors$1.DATA_VISIBLE, this._nextButtonExpandState);
    dom.attr(this._activeButton, Selectors$1.ARIA_EXPANDED, this._nextButtonExpandState);
    dom.attr(this._activeContent, Selectors$1.ARIA_HIDDEN, this._nextContentHiddenState);

    getFocusableElements(`#${this._activeAccordionRowId}`).forEach(element => {
      const value = this._nextButtonExpandState === "true" ? "0" : "-1";
      dom.attr(element, Selectors$1.TABINDEX, value);
    });

    if (dom.css(this._activeContent, "maxHeight")) {
      dom.css(this._activeContent, "maxHeight", null);
    } else {
      dom.css(this._activeContent, "maxHeight", `${this._activeContent.scrollHeight}px`);
    }
  }

  _toggleAttributeInCollection(elements, attributeName, newValue) {
    elements.forEach(element => dom.attr(element, attributeName, newValue));
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
  NO_DROPDOWN_ID_ERROR:
    "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value.",
  NO_MENU_ERROR: attr => `Could not find menu associated with ${attr}.`,
  NO_DROPDOWN_ITEMS_ERROR: attr => `Could not find any list items associated with ${attr}.`,
  NO_DROPDOWN_BUTTONS_ERROR: attr =>
    `Could not find any button or anchor elements associated with ${attr}.`,
  NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute.",
};

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
    this._activeDropdown = {};
    this._activeDropdownButton = null;
    this._activeDropdownMenu = {};
    this._activeDropdownLinks = [];
    this._allowFocusReturn = true;
    this._activeDropdownId = "";
    this._activeDropdownAttr = "";
    this._activeDropdownMenuId = "";
    this._firstDropdownLink = {};
    this._lastDropdownLink = {};

    // all dropdowns
    this._dropdownButtons = [];
    this._dropdowns = [];

    // dropdown element selectors
    this._dropdownContainerAttr = `[${Selectors$2.DATA_DROPDOWN}]`;
    this._dropdownTargetAttr = `[${Selectors$2.DATA_TARGET}]`;
  }

  // public

  start() {
    this._dropdowns = dom.findAll(`${this._dropdownContainerAttr}`);
    this._dropdownButtons = dom.findAll(
      `${this._dropdownContainerAttr} > ${this._dropdownTargetAttr}`
    );

    if (this._dropdowns.length) {
      this._dropdowns.forEach(instance => this._setup(instance));
    }

    this._dropdownButtons.forEach(button => {
      button.addEventListener(Events$2.CLICK, this._render);
      button.addEventListener(Events$2.KEYDOWN, this._renderWithKeys);
    });
  }

  stop() {
    this._dropdownButtons.forEach(button => {
      button.removeEventListener(Events$2.CLICK, this._render);
      button.removeEventListener(Events$2.KEYDOWN, this._renderWithKeys);
    });
  }

  // private

  _setup(instance) {
    const dropdownId = instance.getAttribute(Selectors$2.DATA_DROPDOWN);

    if (!dropdownId) {
      throw new Error(Messages$1.NO_DROPDOWN_ID_ERROR)
    }

    const dropdownAttr = `[${Selectors$2.DATA_DROPDOWN}="${dropdownId}"]`;
    const dropdownButton = dom.find(`${dropdownAttr} > ${this._dropdownTargetAttr}`);

    if (!dom.attr(dropdownButton, Selectors$2.DATA_PARENT)) {
      throw new Error(Messages$1.NO_PARENT_ERROR)
    }

    const dropdownMenu = dom.find(`${dropdownAttr} > ul`);

    if (!dropdownMenu) {
      throw new Error(Messages$1.NO_MENU_ERROR(dropdownAttr))
    }

    dom.attr(dropdownMenu, Selectors$2.ARIA_LABELLEDBY, dropdownButton.id);

    dom.attr(dropdownButton, Selectors$2.ARIA_CONTROLS, dropdownMenu.id);
    dom.attr(dropdownButton, Selectors$2.ARIA_HASPOPUP, "true");
    dom.attr(dropdownButton, Selectors$2.ARIA_EXPANDED, "false");

    const dropdownMenuItemsAttr = `${dropdownAttr} > ul > li`;
    const dropdownMenuListItems = dom.findAll(dropdownMenuItemsAttr);

    if (!dropdownMenuListItems.length) {
      throw new Error(Messages$1.NO_DROPDOWN_ITEMS_ERROR(dropdownAttr))
    }

    dropdownMenuListItems.forEach(item => dom.attr(item, Selectors$2.ROLE, "none"));

    const dropdownMenuButtons = this._getDropdownLinks(dropdownAttr);

    if (!dropdownMenuButtons.length) {
      throw new Error(Messages$1.NO_DROPDOWN_BUTTONS_ERROR(dropdownAttr))
    }

    dropdownMenuButtons.forEach(link => {
      dom.attr(link, Selectors$2.ROLE, "menuitem");
      dom.attr(link, Selectors$2.TABINDEX, "-1");
    });
  }

  _render(event, key) {
    event.preventDefault();
    event.stopPropagation();
    this._handleOpenDropdown(event);

    this._activeDropdownButton = event.target;

    this._setActiveDropdownId();
    this._setActiveDropdown();
    this._setActiveDropdownMenu();
    this._setVisibleState();
    this._listenToClose();
    this._startEvents();

    if (key && key === KeyCodes$1.ARROW_UP) {
      this._lastDropdownLink.focus();
    } else {
      this._firstDropdownLink.focus();
    }

    if (iOSMobile) dom.css(document.body, "cursor", "pointer");
  }

  _handleClose(event) {
    event.preventDefault();

    if (iOSMobile) dom.css(document.body, "cursor", "auto");

    this.releaseFocus();
    this._handleHideState();
    this._listenToRender();

    this._stopEvents();

    if (this._allowFocusReturn) {
      this._handleReturnFocus();
    }

    this._activeDropdownButton = null;
    this._activeDropdownId = null;
    this._activeDropdown = null;
  }

  _listenToRender() {
    this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._handleClose);
    this._activeDropdownButton.addEventListener(Events$2.CLICK, this._render);
  }

  _handleHideState() {
    dom.attr(this._activeDropdownButton, Selectors$2.ARIA_EXPANDED, "false");
    dom.attr(this._activeDropdown, Selectors$2.DATA_VISIBLE, "false");

    this._activeDropdownLinks.forEach(link => {
      dom.attr(link, Selectors$2.TABINDEX, "-1");
      link.removeEventListener(Events$2.CLICK, this._handleClose);
    });
  }

  _stopEvents() {
    document.removeEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);
    document.removeEventListener(Events$2.CLICK, this._handleOffMenuClick);
  }

  _setActiveDropdownId() {
    this._activeDropdownId = dom.attr(this._activeDropdownButton, Selectors$2.DATA_PARENT);
  }

  _startEvents() {
    document.addEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);
    document.addEventListener(Events$2.CLICK, this._handleOffMenuClick);

    this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);

    this._firstDropdownLink = this._activeDropdownLinks[0];
    this._lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];

    this._firstDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleFirstTabClose);
    this._lastDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleLastTabClose);

    this._activeDropdownLinks.forEach(link => {
      dom.attr(link, Selectors$2.TABINDEX, "0");
      link.addEventListener(Events$2.CLICK, this._handleClose);
    });

    this.captureFocus(`${this._activeDropdownAttr} > ul`, { useArrows: true });
  }

  _listenToClose() {
    this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._render);
    this._activeDropdownButton.addEventListener(Events$2.CLICK, this._handleClose);
  }

  _setVisibleState() {
    dom.attr(this._activeDropdownButton, Selectors$2.ARIA_EXPANDED, "true");
    dom.attr(this._activeDropdown, Selectors$2.DATA_VISIBLE, "true");
  }

  _setActiveDropdownMenu() {
    this._activeDropdownMenuId = dom.attr(this._activeDropdownButton, Selectors$2.DATA_TARGET);
    this._activeDropdownMenu = dom.find(`#${this._activeDropdownMenuId}`);
  }

  _setActiveDropdown() {
    this._activeDropdownAttr = `[${Selectors$2.DATA_DROPDOWN}="${this._activeDropdownId}"]`;
    this._activeDropdown = dom.find(this._activeDropdownAttr);
  }

  _handleOpenDropdown(event) {
    if (!this._activeDropdownButton) return

    this._allowFocusReturn = false;
    this._handleClose(event);
    this._allowFocusReturn = true;
  }

  _handleFirstTabClose(event) {
    const shiftKey = event.which === KeyCodes$1.SHIFT || event.shiftKey;
    const tabKey = event.which === KeyCodes$1.TAB;

    if (shiftKey && tabKey) {
      this._handleClose(event);
    }
  }

  _handleLastTabClose(event) {
    const shiftKey = event.which === KeyCodes$1.SHIFT || event.shiftKey;
    const tabKey = event.which === KeyCodes$1.TAB;

    if (tabKey && !shiftKey) {
      this._handleClose(event);
    }
  }

  _renderWithKeys(event) {
    if (event.which === KeyCodes$1.ARROW_UP || event.which === KeyCodes$1.ARROW_DOWN) {
      this._render(event, event.which);
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$1.ESCAPE) {
      this._handleClose(event);
    }
  }

  _handleOffMenuClick(event) {
    if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
      this._handleClose(event);
    }
  }

  _handleReturnFocus() {
    dom.attr(this._activeDropdownButton, Selectors$2.TAB_INDEX, "-1");
    this._activeDropdownButton.focus();
    dom.attr(this._activeDropdownButton, Selectors$2.TAB_INDEX, false);
  }

  _getDropdownLinks(attr) {
    return dom.findAll(`${attr} > ul > li > a, ${attr} > ul > li > button`)
  }
}

const KeyCodes$2 = {
  ESCAPE: 27,
};

const Selectors$3 = {
  // unique
  DATA_MODAL: "data-modal",
  // common
  DATA_TARGET: "data-target",
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
  NO_BUTTON_ERROR: id => `Could not find modal trigger with id ${id}.`,
  NO_MODAL_ID_ERROR:
    "Could not detect an id on your [data-modal] element. Please add a value matching the modal trigger's [data-parent] attribute.",
  NO_MODAL_ERROR: id =>
    `Could not find a [data-parent='${id}'] attribute within your [data-modal='${id}'] element.`,
};

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
    this._activeModalSelector = "";
    this._activeModalCloseButtons = [];
    this._originalPagePaddingRight = "";
    this._scrollbarOffset = 0;

    // attribute helpers
    this._modalContainerAttr = `[${Selectors$3.DATA_MODAL}]`;
  }

  // public

  start() {
    this._modals = dom.findAll(this._modalContainerAttr);

    getFocusableElements(this._modalContainerAttr).forEach(element => {
      dom.attr(element, Selectors$3.TABINDEX, "-1");
    });

    if (this._modals.length) {
      this._modals.forEach(instance => {
        this._setup(instance);
      });
    }
  }

  stop() {
    this._modals.forEach(instance => {
      const id = dom.attr(instance, Selectors$3.DATA_MODAL);
      const button = dom.find(`[${Selectors$3.DATA_TARGET}='${id}']`);

      if (!button) {
        throw new Error(Messages$2.NO_BUTTON_ERROR(id))
      }

      button.removeEventListener(Events$3.CLICK, this._render);
    });
  }

  // private

  _setup(instance) {
    const modalId = dom.attr(instance, Selectors$3.DATA_MODAL);

    if (!modalId) {
      throw new Error(Messages$2.NO_MODAL_ID_ERROR)
    }

    const modal = dom.find(`[${Selectors$3.DATA_PARENT}='${modalId}']`, instance);

    if (!modal) {
      throw new Error(Messages$2.NO_MODAL_ERROR(modalId))
    }

    const modalWrapper = dom.find(`[${Selectors$3.DATA_MODAL}='${modalId}']`);

    dom.attr(modalWrapper, Selectors$3.ARIA_HIDDEN, "true");
    dom.attr(modalWrapper, Selectors$3.DATA_VISIBLE, "false");
    dom.attr(modal, Selectors$3.ARIA_MODAL, "true");
    dom.attr(modal, Selectors$3.ROLE, "dialog");

    const modalButton = dom.find(`[${Selectors$3.DATA_TARGET}='${modalId}']`);

    if (!modalButton) {
      throw new Error(Messages$2.NO_BUTTON_ERROR(modalId))
    }

    modalButton.addEventListener(Events$3.CLICK, this._render);
  }

  _render(event) {
    event.preventDefault();

    this._activeModalButton = event.target;

    this._setActiveModalId();
    this._setActiveModalOverlay();
    this._setActiveModal();
    this._enableFocusOnChildren();
    this._handleScrollbarOffset();
    this._handleScrollStop();
    this.captureFocus(this._activeModalSelector);
    this._setAttributes();
    this._setCloseButtons();
    this._handleModalFocus();
    this._activeModalOverlay.scrollTop = 0;
    this._startEvents();
  }

  _handleClose(event) {
    event.preventDefault();

    this._stopEvents();
    this._handleReturnFocus();
    this._removeAttributes();
    this.releaseFocus();
    this._handleScrollRestore();
    this._removeScrollbarOffset();
    this._disableFocusOnChildren();

    if (iOSMobile) dom.css(this._activeModalOverlay, "cursor", "auto");

    this._activeModalId = null;
    this._activeModalButton = null;
    this._activeModal = null;
  }

  _setCloseButtons() {
    this._activeModalCloseButtons = dom.findAll(
      `${this._activeModalSelector} [${Selectors$3.DATA_CLOSE}]`
    );
  }

  _setActiveModalId() {
    this._activeModalId = dom.attr(this._activeModalButton, Selectors$3.DATA_TARGET);
  }

  _setActiveModalOverlay() {
    this._activeModalOverlay = dom.find(`[${Selectors$3.DATA_MODAL}='${this._activeModalId}']`);
  }

  _removeAttributes() {
    dom.attr(this._activeModalOverlay, Selectors$3.DATA_VISIBLE, "false");
    dom.attr(this._activeModalOverlay, Selectors$3.ARIA_HIDDEN, "true");
    dom.attr(this._activeModal, Selectors$3.TABINDEX, false);
  }

  _disableFocusOnChildren() {
    getFocusableElements(this._activeModalSelector).forEach(element => {
      dom.attr(element, Selectors$3.TABINDEX, "-1");
    });
  }

  _stopEvents() {
    document.removeEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
    document.removeEventListener(Events$3.CLICK, this._handleOverlayClick);

    this._activeModalCloseButtons.forEach(button => {
      button.removeEventListener(Events$3.CLICK, this._handleClose);
    });
  }

  _setActiveModal() {
    this._activeModalSelector = `[${Selectors$3.DATA_PARENT}='${this._activeModalId}']`;
    this._activeModal = dom.find(this._activeModalSelector, this._activeModalOverlay);
  }

  _setAttributes() {
    dom.attr(this._activeModalOverlay, Selectors$3.ARIA_HIDDEN, "false");
    dom.attr(this._activeModalOverlay, Selectors$3.DATA_VISIBLE, "true");
    if (iOSMobile) dom.css(this._activeModalOverlay, "cursor", "pointer");
  }

  _startEvents() {
    document.addEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
    document.addEventListener(Events$3.CLICK, this._handleOverlayClick);

    this._activeModalCloseButtons.forEach(button => {
      button.addEventListener(Events$3.CLICK, this._handleClose);
    });
  }

  _handleModalFocus() {
    dom.attr(this._activeModal, Selectors$3.TABINDEX, "-1");
    this._activeModal.focus();
  }

  _enableFocusOnChildren() {
    getFocusableElements(this._activeModalSelector).forEach(element => {
      element.setAttribute(Selectors$3.TABINDEX, "0");
    });
  }

  _getScrollbarOffset() {
    return window.innerWidth - document.body.getBoundingClientRect().right
  }

  _handleScrollbarOffset() {
    if (!this._scrollbarIsVisible()) return

    this._scrollbarOffset = this._getScrollbarOffset();
    this._originalPagePaddingRight = dom.css(document.body, "paddingRight");
    dom.css(document.body, "paddingRight", `${this._scrollbarOffset}px`);
  }

  _scrollbarIsVisible() {
    if (typeof window.innerWidth === "number") {
      return window.innerWidth > document.body.getBoundingClientRect().right
    }
  }

  _removeScrollbarOffset() {
    const originalPadding = this._originalPagePaddingRight;

    dom.css(this._activeModalOverlay, "paddingLeft", `${this._scrollbarOffset}px`);
    setTimeout(() => dom.css(this._activeModalOverlay, "paddingLeft", ""), 500);

    if (originalPadding) {
      dom.css(document.body, "paddingRight", `${originalPadding}px`);
    } else {
      dom.css(document.body, "paddingRight", "");
    }
  }

  _handleOverlayClick(event) {
    if (event.target === this._activeModalOverlay) {
      this._handleClose(event);
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$2.ESCAPE) {
      this._handleClose(event);
    }
  }

  _handleReturnFocus() {
    dom.attr(this._activeModalButton, Selectors$3.TABINDEX, "-1");
    this._activeModalButton.focus();
    dom.attr(this._activeModalButton, Selectors$3.TABINDEX, false);
  }

  _handleScrollRestore() {
    dom.removeClass(document.body, Selectors$3.NO_SCROLL);
    dom.removeClass(document.documentElement, Selectors$3.NO_SCROLL);
  }

  _handleScrollStop() {
    dom.addClass(document.body, Selectors$3.NO_SCROLL);
    dom.addClass(document.documentElement, Selectors$3.NO_SCROLL);
  }
}

const KeyCodes$3 = {
  ESCAPE: 27,
};

const Selectors$4 = {
  // unique
  DATA_TOOLTIP: "data-tooltip",
  // common
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  // accessibility
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  // classes
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

  start() {
    this._allTooltips = dom.findAll(`[${Selectors$4.DATA_TOOLTIP}]`);

    this._allTooltips.forEach(instance => {
      this._setup(instance);
    });
  }

  stop() {
    this._allTooltips.forEach(instance => {
      const id = dom.attr(instance, Selectors$4.DATA_TOOLTIP);
      const trigger = dom.find(this._getTrigger(id), instance);

      if (this._activeTooltip || this._activeTrigger) {
        this._handleClose();
      }

      trigger.removeEventListener(Events$4.MOUSEOVER, this._render);
      trigger.removeEventListener(Events$4.FOCUS, this._render);
    });
  }

  // private

  _setup(instance) {
    const tooltipId = dom.attr(instance, Selectors$4.DATA_TOOLTIP);

    if (!tooltipId) {
      throw new Error(Messages$3.NO_ID_ERROR)
    }

    const trigger = dom.find(this._getTrigger(tooltipId), instance);
    const tooltip = dom.find(`#${tooltipId}`, instance);

    if (!trigger) {
      throw new Error(Messages$3.NO_TRIGGER_ERROR(tooltipId))
    }

    if (!tooltip) {
      throw new Error(Messages$3.NO_TOOLTIP_ERROR(tooltipId))
    }

    dom.attr(trigger, Selectors$4.ARIA_DESCRIBEDBY, tooltipId);
    dom.attr(tooltip, Selectors$4.ROLE, "tooltip");
    trigger.addEventListener(Events$4.MOUSEOVER, this._render);
    trigger.addEventListener(Events$4.FOCUS, this._render);
  }

  _render(event) {
    this._activeTrigger = event.target;

    const tooltipId = this._activeTrigger.getAttribute(Selectors$4.DATA_TARGET);
    this._activeTooltip = document.getElementById(tooltipId);

    if (this._isLeftOrRight()) {
      this._alignTooltip("height");
    } else {
      this._alignTooltip("width");
    }

    this._setVisibleState();
    this._startCloseEvents();
  }

  _handleClose() {
    this._setHideState();
    this._startOpenEvents();

    this._activeTrigger = null;
    this._activeTooltip = null;
  }

  _setVisibleState() {
    dom.attr(this._activeTooltip, Selectors$4.DATA_VISIBLE, "true");
  }

  _setHideState() {
    dom.attr(this._activeTooltip, Selectors$4.DATA_VISIBLE, "false");
  }

  _startCloseEvents() {
    this._activeTrigger.removeEventListener(Events$4.MOUSEOVER, this._render);
    this._activeTrigger.removeEventListener(Events$4.FOCUS, this._render);
    this._activeTrigger.addEventListener(Events$4.MOUSEOUT, this._handleClose);
    this._activeTrigger.addEventListener(Events$4.BLUR, this._handleClose);
    document.addEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

    if (iOSMobile) {
      dom.css(document.body, "cursor", "pointer");
    }
  }

  _handleEscapeKeyPress(event) {
    if (event.which === KeyCodes$3.ESCAPE) {
      this._handleClose();
    }
  }

  _startOpenEvents() {
    this._activeTrigger.removeEventListener(Events$4.MOUSEOUT, this._handleClose);
    this._activeTrigger.removeEventListener(Events$4.BLUR, this._handleClose);
    this._activeTrigger.addEventListener(Events$4.MOUSEOVER, this._render);
    this._activeTrigger.addEventListener(Events$4.FOCUS, this._render);
    document.removeEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

    if (iOSMobile) dom.css(document.body, "cursor", "auto");
  }

  _alignTooltip(property) {
    const triggerSize = this._getSize(this._activeTrigger, property);
    const tooltipSize = this._getSize(this._activeTooltip, property);
    const triggerIsBigger = triggerSize > tooltipSize;

    const offset = triggerIsBigger
      ? (triggerSize - tooltipSize) / 2
      : (tooltipSize - triggerSize) / -2;

    if (property === "height") {
      dom.css(this._activeTooltip, "top", `${offset}px`);
    } else {
      dom.css(this._activeTooltip, "left", `${offset}px`);
    }
  }

  _getTrigger(id) {
    return `[${Selectors$4.DATA_TARGET}="${id}"]`
  }

  _getSize(element, property) {
    return Math.floor(element.getBoundingClientRect()[property])
  }

  _isLeftOrRight() {
    return dom.hasClass(this._activeTooltip, Selectors$4.DROP_LEFT_CLASS, Selectors$4.DROP_RIGHT_CLASS)
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
