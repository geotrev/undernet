/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v2.4.1 (https://undernet.io)
  * Copyright 2017-2018 George Treviranus
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.undernet = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  var keyCodes = {
    SHIFT: 16,
    TAB: 9
  };
  var selectors = {
    FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
    FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
    KEYBOARD_CLASS: "using-keyboard"
  };
  var events = {
    KEYDOWN: "keydown",
    CLICK: "click"
    /**
     * Utility methods for DOM traversal and focus trapping.
     * @module Utils
     */

  };

  var Utils =
  /*#__PURE__*/
  function () {
    function Utils() {
      _classCallCheck(this, Utils);

      this._handleFocusTrap = this._handleFocusTrap.bind(this);
      this._listenForKeyboard = this._listenForKeyboard.bind(this);
      this._listenForClick = this._listenForClick.bind(this);
    } // public

    /**
     * Listens to the first and last elements matched from this._getFocusableElements()
     * @param {String} container - The container's class, attribute, etc.
     */


    _createClass(Utils, [{
      key: "captureFocus",
      value: function captureFocus(container) {
        this.focusContainerSelector = container;

        var children = this._getFocusableElements(this.focusContainerSelector);

        this.focusableFirstChild = children[0];
        this.focusableLastChild = children[children.length - 1];
        document.addEventListener(events.KEYDOWN, this._handleFocusTrap);
      }
      /**
       * Stop trapping focus set in this.captureFocus()
       */

    }, {
      key: "releaseFocus",
      value: function releaseFocus() {
        document.removeEventListener(events.KEYDOWN, this._handleFocusTrap);
      }
      /**
       * Begin listening to _listenForKeyboard()
       */

    }, {
      key: "enableFocusOutline",
      value: function enableFocusOutline() {
        document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
      }
      /**
       * Completely disable focus outline utility.
       */

    }, {
      key: "disableFocusOutline",
      value: function disableFocusOutline() {
        document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
        document.removeEventListener(events.CLICK, this.__listenForClick);
      } // private

      /**
       * When a key is pressed, detect if it's tab or shift keys and enable
       * focus outlines on currently focused element(s). Then, remove keydown listener
       * and add click listener on _listenForClick().
       * @param {Object} event - Event (keypress).
       */

    }, {
      key: "_listenForKeyboard",
      value: function _listenForKeyboard(event) {
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;

        if (tabKey || shiftKey) {
          document.body.classList.add(selectors.KEYBOARD_CLASS);
          document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
          document.addEventListener(events.CLICK, this._listenForClick);
        }
      }
      /**
       * On click, remove selectors.KEYBOARD_CLASS and re-add keydown listener.
       * @param {Object} event - Event (keypress).
       */

    }, {
      key: "_listenForClick",
      value: function _listenForClick(event) {
        document.body.classList.remove(selectors.KEYBOARD_CLASS);
        document.removeEventListener(events.CLICK, this._listenForClick);
        document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
      }
      /**
       * Because IE does not recognize NodeList.forEach(),
       * we use a cross-browser solution for returning an array of DOM nodes every time.
       * @param {String} element - A DOM node's class, attribute, etc., to search the document.
       * @return {Array}
       */

    }, {
      key: "_getElements",
      value: function _getElements(element) {
        var nodeList = document.querySelectorAll(element);
        return Array.apply(null, nodeList);
      }
      /**
       * Creates a string of element selector patterns using common elements.
       * @param {String} container - The enclosing container's class, attribute, etc.
       * @return {String}
       */

    }, {
      key: "_getFocusableElements",
      value: function _getFocusableElements(container) {
        var focusables = [];
        selectors.FOCUSABLE_TAGS.map(function (element) {
          return focusables.push("".concat(container, " ").concat(element).concat(selectors.FOCUSABLE_SELECTOR));
        });
        return this._getElements(focusables.join(", "));
      }
      /**
       * Handles focus on first or last child in a container.
       * @param {Object} event - Event (keypress)
       */

    }, {
      key: "_handleFocusTrap",
      value: function _handleFocusTrap(event) {
        var activeElement = document.activeElement;
        var containerElement = document.querySelector(this.focusContainerSelector);
        var containerActive = activeElement === containerElement;
        var firstActive = activeElement === this.focusableFirstChild;
        var lastActive = activeElement === this.focusableLastChild;
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
        var hasShift = shiftKey && tabKey;
        var noShift = !shiftKey && tabKey; // Just in case the first or last child have changed -
        // recapture focus and continue trapping.

        this.releaseFocus();
        this.captureFocus(this.focusContainerSelector);

        if (hasShift && (firstActive || containerActive)) {
          event.preventDefault();
          this.focusableLastChild.focus();
        } else if (noShift && lastActive) {
          event.preventDefault();
          this.focusableFirstChild.focus();
        }
      }
    }]);

    return Utils;
  }();

  var keyCodes$1 = {
    ESCAPE: 27
  };
  var selectors$1 = {
    // unique
    MODAL_CONTAINER: "data-modal",
    MODAL_ID: "data-modal-id",
    MODAL_BUTTON: "data-modal-button",
    NO_SCROLL: "no-scroll",
    // common
    VISIBLE: "data-visible",
    CLOSE: "data-close",
    TARGET: "data-target",
    // accessibility
    ARIA_HIDDEN: "aria-hidden",
    ARIA_MODAL: "aria-modal",
    ROLE: "role",
    TAB_INDEX: "tabindex"
  };
  var events$1 = {
    KEYDOWN: "keydown",
    CLICK: "click",
    RESIZE: "resize"
  };
  var messages = {
    MISSING_MODAL: "Your button is missing its corresponding modal. Check to make sure your modal is in the DOM, and that it has a [data-modal-id=*] attribute matchin its [data-modal-button] and [data-target] attributes. It's possible the modal script ran before the button appeared on the page!"
    /**
     * Modal component class.
     * @module Modal
     * @requires Utils
     */

  };

  var Modal =
  /*#__PURE__*/
  function (_Utils) {
    _inherits(Modal, _Utils);

    function Modal() {
      var _this;

      _classCallCheck(this, Modal);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this)); // modal event methods

      _this._getModal = _this._getModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleModalClose = _this._handleModalClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_assertThisInitialized(_this))); // all modals

      _this.modalContainerAttr = "[".concat(selectors$1.MODAL_CONTAINER, "]");
      _this.closeButtonAttr = "[".concat(selectors$1.MODAL_CONTAINER, "] [").concat(selectors$1.CLOSE, "]");
      _this.modals = null;
      _this.modalButtons = null;
      _this.closeButtons = null; // active modal

      _this.activeModalButton = {};
      _this.activeModalId = "";
      _this.activeModalOverlayAttr = "";
      _this.activeModalOverlay = {};
      _this.activeModalSelector = "";
      _this.activeModal = null;
      _this.activeModalCloseButtons = [];
      return _this;
    } // public

    /**
     * Add accessible attributes to modal containers
     * Begin listening to elements with [data-modal-button]
     */


    _createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.modals = this._getElements(this.modalContainerAttr);
        this.modalButtons = this._getElements("[".concat(selectors$1.MODAL_BUTTON, "]"));
        this.closeButtons = this._getElements(this.closeButtonAttr);

        this._getFocusableElements(this.modalContainerAttr).forEach(function (element) {
          element.setAttribute(selectors$1.TAB_INDEX, "-1");
        });

        if (this.modals.length) {
          this.modals.forEach(function (modal) {
            modal.setAttribute(selectors$1.ARIA_MODAL, "true");
            modal.parentNode.setAttribute(selectors$1.ARIA_HIDDEN, "true");
            modal.parentNode.setAttribute(selectors$1.VISIBLE, "false");
            modal.setAttribute(selectors$1.ROLE, "dialog");
          });
        }

        if (this.modalButtons.length) {
          this.modalButtons.forEach(function (button) {
            button.addEventListener(events$1.CLICK, _this2._getModal);
          });
        }
      }
      /**
       * Stop listening to modal buttons
       */

    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this.modalButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this3._getModal);
        });
      } // private

      /**
       * Locate a button's corresponding modal container.
       * @param {Object} event - The event object
       */

    }, {
      key: "_getModal",
      value: function _getModal(event) {
        event.preventDefault();

        this._renderModal(event);
      }
      /**
       * Find a button through event.target, then render the corresponding modal attribute via matching target id
       * @param {Object} event - The event object
       */

    }, {
      key: "_renderModal",
      value: function _renderModal(event) {
        var _this4 = this;

        this.activeModalButton = event.target;
        this.activeModalId = this.activeModalButton.getAttribute(selectors$1.TARGET);
        this.activeModalOverlayAttr = "[".concat(selectors$1.MODAL_ID, "='").concat(this.activeModalId, "']");
        this.activeModalOverlay = document.querySelector(this.activeModalOverlayAttr);

        if (!this.activeModalOverlay) {
          throw messages.MISSING_MODAL;
          return;
        }

        this.activeModalSelector = "".concat(this.activeModalOverlayAttr, " ").concat(this.modalContainerAttr);
        this.activeModal = document.querySelector(this.activeModalSelector);
        this.activeModalCloseButtons = this._getElements("".concat(this.activeModalOverlayAttr, " ").concat(this.closeButtonAttr));

        this._getFocusableElements(this.activeModalSelector).forEach(function (element) {
          element.setAttribute(selectors$1.TAB_INDEX, "0");
        });

        this._handleScrollStop();

        this.captureFocus(this.activeModalSelector);
        this.activeModalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "false");
        this.activeModal.setAttribute("tabindex", "-1");
        this.activeModalOverlay.setAttribute(selectors$1.VISIBLE, "true");
        this.activeModal.focus(); // offset slight scroll caused by this.activeModal.focus()

        this.activeModalOverlay.scrollTop = 0; // begin listening to events

        document.addEventListener(events$1.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(events$1.CLICK, this._handleOverlayClick);
        this.activeModalCloseButtons.forEach(function (button) {
          button.addEventListener(events$1.CLICK, _this4._handleModalClose);
        });
      }
      /**
       * Turn off event listeners and reset focus to last selected DOM node (button)
       * @param {Object} event - Event (keydown or click)
       */

    }, {
      key: "_handleModalClose",
      value: function _handleModalClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.activeModalOverlay.setAttribute(selectors$1.VISIBLE, "false");

        this._handleReturnFocus();

        this._handleScrollRestore();

        this.releaseFocus();
        this.activeModalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "true");
        this.activeModal.removeAttribute("tabindex");

        this._getFocusableElements(this.activeModalSelector).forEach(function (element) {
          element.setAttribute(selectors$1.TAB_INDEX, "-1");
        }); // stop listening to events


        document.removeEventListener(events$1.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(events$1.CLICK, this._handleOverlayClick);
        this.activeModalCloseButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this5._handleModalClose);
        });
      }
      /**
       * Handles click event on the modal background to close it.
       * @param {Object} event - Event (keydown)
       */

    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick(event) {
        if (event.target === this.activeModalOverlay) {
          this._handleModalClose(event);
        }
      }
      /**
       * Handles escape key event to close the current modal
       * @param {Object} event - Event (keydown)
       */

    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === keyCodes$1.ESCAPE) {
          this._handleModalClose(event);
        }
      }
      /**
       * Returns focus to the last focused element before the modal was called.
       * @param {Object} button - The current modal's corresponding button.
       */

    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this.activeModalButton.setAttribute("tabindex", "-1");
        this.activeModalButton.focus();
        this.activeModalButton.removeAttribute("tabindex");
      }
      /**
       * Restores scroll behavior to <html> and <body>
       */

    }, {
      key: "_handleScrollRestore",
      value: function _handleScrollRestore() {
        document.body.classList.remove(selectors$1.NO_SCROLL);
        document.querySelector("html").classList.remove(selectors$1.NO_SCROLL);
      }
      /**
       * Prevents scroll behavior on <html> and <body>
       */

    }, {
      key: "_handleScrollStop",
      value: function _handleScrollStop() {
        document.body.classList.add(selectors$1.NO_SCROLL);
        document.querySelector("html").classList.add(selectors$1.NO_SCROLL);
      }
    }]);

    return Modal;
  }(Utils);

  var keyCodes$2 = {
    SPACE: 32
  };
  var selectors$2 = {
    // unique
    ACCORDION_CONTAINER: "data-accordion",
    ACCORDION_ROW: "data-accordion-row",
    // common
    EXPANDED: "data-expanded",
    TARGET: "data-target",
    CONTENT: "data-content",
    TOGGLE_MULTIPLE: "data-toggle-multiple",
    PARENT: "data-parent",
    // accessibility
    ARIA_EXPANDED: "aria-expanded",
    ARIA_CONTROLS: "aria-controls",
    ARIA_HIDDEN: "aria-hidden",
    TAB_INDEX: "tabindex"
  };
  var events$2 = {
    CLICK: "click",
    KEYDOWN: "keydown"
  };
  var messages$1 = {
    MISSING_CONTENT: "You have an accordion button that is missing its [data-content] attribute, and has a matching id to the button's [data-target] attribute's value."
    /**
     * Accordion component class.
     * @module Accordion
     * @requires Utils
     */

  };

  var Accordion =
  /*#__PURE__*/
  function (_Utils) {
    _inherits(Accordion, _Utils);

    function Accordion() {
      var _this;

      _classCallCheck(this, Accordion);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this)); // accordion event methods

      _this._renderAccordionContent = _this._renderAccordionContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleSpaceKeyPress = _this._handleSpaceKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this))); // all accordions

      _this.accordionButtons = null;
      _this.accordionContentsAttr = "";
      _this.accordionContents = []; // active accordion

      _this.activeContainer = {};
      _this.activeButton = {};
      _this.activeAccordionRowId = "";
      _this.activeRowAttr = "";
      _this.activeRow = "";
      _this.activeContainerId = "";
      _this.activeContainerAttr = "";
      _this.activeContainer = {};
      _this.activeContent = {};
      _this.toggleExpandState = null;
      _this.toggleContentState = null;
      _this.toggleHiddenState = null;
      _this.allContentAttr = "";
      return _this;
    } // public

    /**
     * Add accessible attributes [data-accordion-button] and [data-accordion-content] elements
     * Begin listening to [data-accordion-button] elements
     */


    _createClass(Accordion, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.accordionButtons = this._getElements("[".concat(selectors$2.ACCORDION_CONTAINER, "] [").concat(selectors$2.TARGET, "]"));
        this.accordionContentsAttr = "[".concat(selectors$2.ACCORDION_CONTAINER, "] [").concat(selectors$2.CONTENT, "]");
        this.accordionContents = this._getElements(this.accordionContentsAttr);

        this._getFocusableElements(this.accordionContentsAttr).forEach(function (element) {
          element.setAttribute(selectors$2.TAB_INDEX, "-1");
        });

        if (this.accordionButtons.length) {
          this.accordionButtons.forEach(function (button) {
            _this2._setupButton(button);

            button.addEventListener(events$2.CLICK, _this2._renderAccordionContent);
            button.addEventListener(events$2.KEYDOWN, _this2._handleSpaceKeyPress);
          });
        }

        if (this.accordionContents.length) {
          this.accordionContents.forEach(function (content) {
            var contentRowAttr = _this2._getAccordionRowAttr(content.id);

            var contentRow = document.querySelector(contentRowAttr);
            var contentHiddenState = contentRow.getAttribute(selectors$2.EXPANDED);
            var toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true";
            content.setAttribute(selectors$2.ARIA_HIDDEN, toggleContentHiddenState);

            if (toggleContentHiddenState === "false") {
              _this2._getFocusableElements("#".concat(content.id)).forEach(function (element) {
                element.setAttribute(selectors$2.TAB_INDEX, "0");
              });
            }
          });
        }
      }
      /**
       * Stop listening to accordion buttons.
       */

    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this.accordionButtons.forEach(function (button) {
          button.removeEventListener(events$2.CLICK, _this3._renderAccordionContent);
          button.removeEventListener(events$2.KEYDOWN, _this3._handleSpaceKeyPress);
        });
      } // private

    }, {
      key: "_setupButton",
      value: function _setupButton(button) {
        var buttonId = button.getAttribute(selectors$2.TARGET);

        var accordionRowAttr = this._getAccordionRowAttr(buttonId);

        var accordionRow = document.querySelector(accordionRowAttr);
        var shouldContentExpand = accordionRow.getAttribute(selectors$2.EXPANDED);
        var buttonContent = document.getElementById(buttonId);
        button.setAttribute(selectors$2.ARIA_CONTROLS, buttonId);

        if (shouldContentExpand === "true") {
          buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
          button.setAttribute(selectors$2.ARIA_EXPANDED, "true");
        } else {
          button.setAttribute(selectors$2.ARIA_EXPANDED, "false");
        }
      }
      /**
       * Return a selector that targets `selectors.ACCORDION_ROW` with value of the id.
       * @param {String} id - An id value associated with a given selectors.TARGET
       * @return {String}
       */

    }, {
      key: "_getAccordionRowAttr",
      value: function _getAccordionRowAttr(id) {
        return "[".concat(selectors$2.ACCORDION_ROW, "='").concat(id, "']");
      }
      /**
       * Open accordion content associated with a [data-accordion-button] element.
       * @param {Object} event - The event object.
       */

    }, {
      key: "_renderAccordionContent",
      value: function _renderAccordionContent(event) {
        event.preventDefault();
        this.activeButton = event.target;
        this.activeAccordionRowId = this.activeButton.getAttribute(selectors$2.TARGET);
        this.activeRowAttr = this._getAccordionRowAttr(this.activeAccordionRowId);
        this.activeRow = document.querySelector(this.activeRowAttr);
        this.activeContainerId = this.activeButton.getAttribute(selectors$2.PARENT);
        this.activeContainerAttr = "[".concat(selectors$2.ACCORDION_CONTAINER, "='").concat(this.activeContainerId, "']");
        this.activeContainer = document.querySelector(this.activeContainerAttr);
        this.activeContent = document.getElementById(this.activeAccordionRowId);
        var accordionContentHasAttr = this.activeContent.hasAttribute(selectors$2.CONTENT);

        if (!accordionContentHasAttr) {
          throw messages$1.MISSING_CONTENT;
          return;
        }

        var accordionButtonState = this.activeRow.getAttribute(selectors$2.EXPANDED);
        var accordionContentState = this.activeContent.getAttribute(selectors$2.CONTENT);
        this.toggleExpandState = accordionButtonState === "true" ? "false" : "true";
        this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible";
        this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false";

        this._closeAllIfToggleable();

        this._toggleSelectedAccordion();
      }
      /**
       * If a keypress is the spacebar on a button, open its correlated content.
       * @param {Object} event - The event object.
       */

    }, {
      key: "_handleSpaceKeyPress",
      value: function _handleSpaceKeyPress(event) {
        if (event.which === keyCodes$2.SPACE) this._renderAccordionContent(event);
      }
      /**
       * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
       * This ensures the selected one can be closed if it's already open.
       */

    }, {
      key: "_closeAllIfToggleable",
      value: function _closeAllIfToggleable() {
        var _this4 = this;

        if (this.activeContainer.hasAttribute(selectors$2.TOGGLE_MULTIPLE)) return;
        this.allContentAttr = "".concat(this.activeContainerAttr, " [").concat(selectors$2.CONTENT, "]");

        var allRows = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors$2.EXPANDED, "]"));

        var allContent = this._getElements(this.allContentAttr);

        var allButtons = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors$2.TARGET, "]"));

        allContent.forEach(function (content) {
          if (!(content === _this4.activeContent)) content.style.maxHeight = null;
        });

        this._getFocusableElements(this.allContentAttr).forEach(function (element) {
          element.setAttribute(selectors$2.TAB_INDEX, "-1");
        });

        this._toggleAttributeInCollection(allRows, selectors$2.EXPANDED, "true", "false");

        this._toggleAttributeInCollection(allButtons, selectors$2.ARIA_EXPANDED, "true", "false");

        this._toggleAttributeInCollection(allContent, selectors$2.ARIA_HIDDEN, "false", "true");

        this._toggleAttributeInCollection(allContent, selectors$2.CONTENT, "visible", "hidden");
      }
      /**
       * Toggle a [data-accordion-button]'s corresponding [data-accordion-content] element.
       */

    }, {
      key: "_toggleSelectedAccordion",
      value: function _toggleSelectedAccordion() {
        var _this5 = this;

        this.activeRow.setAttribute(selectors$2.EXPANDED, this.toggleExpandState);
        this.activeContent.setAttribute(selectors$2.CONTENT, this.toggleContentState);
        this.activeButton.setAttribute(selectors$2.ARIA_EXPANDED, this.toggleExpandState);
        this.activeContent.setAttribute(selectors$2.ARIA_HIDDEN, this.toggleHiddenState);
        var activeContentBlock = "#".concat(this.activeAccordionRowId);

        this._getFocusableElements(activeContentBlock).forEach(function (element) {
          var value = _this5.toggleExpandState === "true" ? "0" : "-1";
          element.setAttribute(selectors$2.TAB_INDEX, value);
        });

        if (this.activeContent.style.maxHeight) {
          this.activeContent.style.maxHeight = null;
        } else {
          this.activeContent.style.maxHeight = "".concat(this.activeContent.scrollHeight, "px");
        }
      }
      /**
       * Toggles a single attribute of a series of elements within a parent.
       */

    }, {
      key: "_toggleAttributeInCollection",
      value: function _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
        elements.forEach(function (element) {
          if (element.hasAttribute(attributeName, currentValue)) {
            element.setAttribute(attributeName, newValue);
          }
        });
      }
    }]);

    return Accordion;
  }(Utils);

  var Modals = new Modal();
  var Accordions = new Accordion();
  var Utils$1 = new Utils();
  var Undernet = {
    // Components
    Modals: Modals,
    Accordions: Accordions,
    // Utils
    Utils: Utils$1
  };

  Undernet.start = function () {
    // Components
    Undernet.Modals.start();
    Undernet.Accordions.start(); // Utils

    Undernet.Utils.enableFocusOutline();
  };

  Undernet.stop = function () {
    // Components
    Undernet.Modals.stop();
    Undernet.Accordions.stop(); // Utils

    Undernet.Utils.disableFocusOutline();
  };

  window.Undernet = Undernet;

  return Undernet;

})));
//# sourceMappingURL=undernet.bundle.js.map
