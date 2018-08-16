/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v1.1.0 (https://undernet.io)
  * Copyright 2017-2018 George Treviranus
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.undernet = factory());
}(this, (function () { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var keyCodes = {
    SHIFT: 16,
    TAB: 9
  };

  var selectors = {
    FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
    FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"]
  };

  var events = {
    KEYDOWN: "keydown"

    /**
     * Utility methods for DOM traversal and focus trapping.
     * @module Utils
     */
  };
  var Utils = function () {
    function Utils() {
      classCallCheck(this, Utils);

      // bind events to Utils
      this.handleFocusTrap = this.handleFocusTrap.bind(this);
    }

    /**
     * Because IE does not recognize NodeList.forEach(), we use a cross-browser solution for returning an array of DOM nodes.
     * @param {String} element - A DOM node's class, attribute, etc., to search the document.
     * @return {Array}
     */


    createClass(Utils, [{
      key: "getElements",
      value: function getElements(element) {
        var nodeList = document.querySelectorAll(element);
        return Array.apply(null, nodeList);
      }

      /**
       * Creates a string of element selector patterns using common elements.
       * @param {String} container - The enclosing container's class, attribute, etc.
       * @return {String}
       */

    }, {
      key: "getFocusableElements",
      value: function getFocusableElements(container) {
        var focusables = [];
        selectors.FOCUSABLE_TAGS.map(function (element) {
          return focusables.push(container + " " + element + selectors.FOCUSABLE_SELECTOR);
        });
        return this.getElements(focusables.join(", "));
      }

      /**
       * Listens to the first and last elements matched from this.getFocusableElements()
       * @param {String} container - The container's class, attribute, etc.
       */

    }, {
      key: "captureFocus",
      value: function captureFocus(container) {
        this.focusContainer = container;
        var children = this.getFocusableElements(this.focusContainer);
        this.focusableFirstChild = children[0];
        this.focusableLastChild = children[children.length - 1];

        document.addEventListener(events.KEYDOWN, this.handleFocusTrap);
      }

      /**
       * Handles focus on first or last child in a container.
       * @param {Object} event - Event (keypress)
       */

    }, {
      key: "handleFocusTrap",
      value: function handleFocusTrap(event) {
        var active = document.activeElement;
        var containerElement = document.querySelector(this.focusContainer);
        var containerActive = active === containerElement;
        var firstActive = active === this.focusableFirstChild;
        var lastActive = active === this.focusableLastChild;
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
        var hasShift = shiftKey && tabKey;
        var noShift = !shiftKey && tabKey;

        // Just in case the first or last child have changed -
        // recapture focus and continue trapping.
        this.releaseFocus();
        this.captureFocus(this.focusContainer);

        if (hasShift && (firstActive || containerActive)) {
          event.preventDefault();
          this.focusableLastChild.focus();
        } else if (noShift && lastActive) {
          event.preventDefault();
          this.focusableFirstChild.focus();
        }
      }

      /**
       * Stop trapping focus set in this.captureFocus()
       */

    }, {
      key: "releaseFocus",
      value: function releaseFocus() {
        document.removeEventListener(events.KEYDOWN, this.handleFocusTrap);
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
    // aria
    ARIA_HIDDEN: "aria-hidden",
    ARIA_MODAL: "aria-modal",
    ROLE: "role"
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
  var Modal = function (_Utils) {
    inherits(Modal, _Utils);

    function Modal() {
      classCallCheck(this, Modal);

      var _this = possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

      _this.modalContainerAttr = "[" + selectors$1.MODAL_CONTAINER + "]";
      _this.closeButtonAttr = "[" + selectors$1.MODAL_CONTAINER + "] [" + selectors$1.CLOSE + "]";
      _this.modals = null;
      _this.modalButtons = null;
      _this.closeButtons = null;
      _this.bodyTag = document.body;
      _this.htmlTag = document.querySelector("html");

      // bind events to class
      _this.getModal = _this.getModal.bind(_this);
      _this.handleModalClose = _this.handleModalClose.bind(_this);
      _this.handleEscapeKeyPress = _this.handleEscapeKeyPress.bind(_this);
      _this.handleOverlayClick = _this.handleOverlayClick.bind(_this);
      return _this;
    }

    /**
     * Add accessible attributes to modal containers
     * Begin listening to elements with [data-modal-button]
     */


    createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.modals = this.getElements(this.modalContainerAttr);
        this.modalButtons = this.getElements("[" + selectors$1.MODAL_BUTTON + "]");
        this.closeButtons = this.getElements(this.closeButtonAttr);

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
            button.addEventListener(events$1.CLICK, _this2.getModal);
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
          button.removeEventListener(events$1.CLICK, _this3.getModal);
        });
      }

      /**
       * Locate a button's corresponding modal container.
       * @param {Object} event - The event object
       */

    }, {
      key: "getModal",
      value: function getModal(event) {
        event.preventDefault();
        this.renderModal(event);
      }

      /**
       * Find a button through event.target, then render the corresponding modal attribute via matching target id
       * @param {Object} event - The event object
       */

    }, {
      key: "renderModal",
      value: function renderModal(event) {
        var _this4 = this;

        this.modalButton = event.target;
        this.activeModalId = this.modalButton.getAttribute(selectors$1.TARGET);
        this.modalOverlayAttr = "[" + selectors$1.MODAL_ID + "='" + this.activeModalId + "']";
        this.modalOverlay = document.querySelector(this.modalOverlayAttr);

        if (!this.modalOverlay) {
          throw messages.MISSING_MODAL;
          return;
        }

        this.activeModalSelector = this.modalOverlayAttr + " " + this.modalContainerAttr;
        this.activeModal = document.querySelector(this.activeModalSelector);
        this.modalCloseButtons = this.getElements(this.modalOverlayAttr + " " + this.closeButtonAttr);

        this.handleScrollStop();
        this.captureFocus(this.activeModalSelector);
        this.modalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "false");
        this.activeModal.setAttribute("tabindex", "-1");
        this.modalOverlay.setAttribute(selectors$1.VISIBLE, "true");
        this.activeModal.focus();

        // offset slight scroll caused by this.activeModal.focus()
        this.modalOverlay.scrollTop = 0;

        // begin listening to events
        document.addEventListener(events$1.KEYDOWN, this.handleEscapeKeyPress);
        document.addEventListener(events$1.CLICK, this.handleOverlayClick);
        this.modalCloseButtons.forEach(function (button) {
          button.addEventListener(events$1.CLICK, _this4.handleModalClose);
        });
      }

      /**
       * Turn off event listeners and reset focus to last selected DOM node (button)
       * @param {Object} event - Event (keydown or click)
       */

    }, {
      key: "handleModalClose",
      value: function handleModalClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.modalOverlay.setAttribute(selectors$1.VISIBLE, "false");
        this.handleReturnFocus();
        this.handleScrollRestore();
        this.releaseFocus();
        this.modalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "true");
        this.activeModal.removeAttribute("tabindex");

        // stop listening to events
        document.removeEventListener(events$1.KEYDOWN, this.handleEscapeKeyPress);
        document.removeEventListener(events$1.CLICK, this.handleOverlayClick);
        this.modalCloseButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this5.handleModalClose);
        });
      }

      /**
       * Handles click event on the modal background to close it.
       * @param {Object} event - Event (keydown)
       */

    }, {
      key: "handleOverlayClick",
      value: function handleOverlayClick(event) {
        if (event.target !== this.modalOverlay) return;
        this.handleModalClose(event);
      }

      /**
       * Handles escape key event to close the current modal
       * @param {Object} event - Event (keydown)
       */

    }, {
      key: "handleEscapeKeyPress",
      value: function handleEscapeKeyPress(event) {
        var escapeKey = event.which === keyCodes$1.ESCAPE;
        if (escapeKey) {
          this.handleModalClose(event);
        }
      }

      /**
       * Returns focus to the last focused element before the modal was called.
       * @param {Object} button - The current modal's corresponding button.
       */

    }, {
      key: "handleReturnFocus",
      value: function handleReturnFocus() {
        this.modalButton.setAttribute("tabindex", "-1");
        this.modalButton.focus();
        this.modalButton.removeAttribute("tabindex");
      }

      /**
       * Restores scroll behavior to <html> and <body>
       */

    }, {
      key: "handleScrollRestore",
      value: function handleScrollRestore() {
        this.bodyTag.classList.remove(selectors$1.NO_SCROLL);
        this.htmlTag.classList.remove(selectors$1.NO_SCROLL);
      }

      /**
       * Prevents scroll behavior on <html> and <body>
       */

    }, {
      key: "handleScrollStop",
      value: function handleScrollStop() {
        this.bodyTag.classList.add(selectors$1.NO_SCROLL);
        this.htmlTag.classList.add(selectors$1.NO_SCROLL);
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
    // aria
    ARIA_EXPANDED: "aria-expanded",
    ARIA_CONTROLS: "aria-controls",
    ARIA_HIDDEN: "aria-hidden"
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
  var Accordion = function (_Utils) {
    inherits(Accordion, _Utils);

    function Accordion() {
      classCallCheck(this, Accordion);

      var _this = possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));

      _this.accordionButtons = null;
      _this.accordionContents = null;
      _this.activeContainer = null;

      // bind events to class
      _this.renderAccordionContent = _this.renderAccordionContent.bind(_this);
      _this.handleSpaceKeyPress = _this.handleSpaceKeyPress.bind(_this);
      return _this;
    }

    /**
     * Add accessible attributes [data-accordion-button] and [data-accordion-content] elements
     * Begin listening to [data-accordion-button] elements
     */


    createClass(Accordion, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.accordionButtons = this.getElements("[" + selectors$2.ACCORDION_CONTAINER + "] [" + selectors$2.TARGET + "]");
        this.accordionContents = this.getElements("[" + selectors$2.ACCORDION_CONTAINER + "] [" + selectors$2.CONTENT + "]");

        if (this.accordionButtons.length) {
          this.accordionButtons.forEach(function (button) {
            _this2.setupButton(button);
            button.addEventListener(events$2.CLICK, _this2.renderAccordionContent);
            button.addEventListener(events$2.KEYDOWN, _this2.handleSpaceKeyPress);
          });
        }

        if (this.accordionContents.length) {
          this.accordionContents.forEach(function (content) {
            var contentRowAttr = _this2.getAccordionRowAttr(content.id);
            var contentRow = document.querySelector(contentRowAttr);
            var contentHiddenState = contentRow.getAttribute(selectors$2.EXPANDED);
            var toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true";
            content.setAttribute(selectors$2.ARIA_HIDDEN, toggleContentHiddenState);
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
          button.removeEventListener(events$2.CLICK, _this3.renderAccordionContent);
          button.removeEventListener(events$2.KEYDOWN, _this3.handleSpaceKeyPress);
        });
      }
    }, {
      key: "setupButton",
      value: function setupButton(button) {
        var buttonId = button.getAttribute(selectors$2.TARGET);
        var accordionRowAttr = this.getAccordionRowAttr(buttonId);
        var accordionRow = document.querySelector(accordionRowAttr);
        var shouldContentExpand = accordionRow.getAttribute(selectors$2.EXPANDED);
        var buttonContent = document.getElementById(buttonId);

        button.setAttribute(selectors$2.ARIA_CONTROLS, buttonId);

        if (shouldContentExpand === "true") {
          buttonContent.style.maxHeight = buttonContent.scrollHeight + "px";
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
      key: "getAccordionRowAttr",
      value: function getAccordionRowAttr(id) {
        return "[" + selectors$2.ACCORDION_ROW + "='" + id + "']";
      }

      /**
       * Open accordion content associated with a [data-accordion-button] element.
       * @param {Object} event - The event object.
       */

    }, {
      key: "renderAccordionContent",
      value: function renderAccordionContent(event) {
        event.preventDefault();

        this.activeButton = event.target;
        var activeAccordionRow = this.activeButton.getAttribute(selectors$2.TARGET);

        this.activeRowAttr = this.getAccordionRowAttr(activeAccordionRow);
        this.activeRow = document.querySelector(this.activeRowAttr);
        this.activeContainerId = this.activeButton.getAttribute(selectors$2.PARENT);
        this.activeContainerAttr = "[" + selectors$2.ACCORDION_CONTAINER + "='" + this.activeContainerId + "']";
        this.activeContainer = document.querySelector(this.activeContainerAttr);

        this.activeContent = document.getElementById(activeAccordionRow);

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

        this.closeAllIfToggleable();
        this.toggleSelectedAccordion();
      }

      /**
       * If a keypress is the spacebar on a button, open its correlated content.
       * @param {Object} event - The event object.
       */

    }, {
      key: "handleSpaceKeyPress",
      value: function handleSpaceKeyPress(event) {
        if (event.which === keyCodes$2.SPACE) this.renderAccordionContent(event);
      }

      /**
       * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
       * This ensures the selected one can be closed if it's already open.
       */

    }, {
      key: "closeAllIfToggleable",
      value: function closeAllIfToggleable() {
        var _this4 = this;

        if (this.activeContainer.hasAttribute(selectors$2.TOGGLE_MULTIPLE)) return;
        var allRows = this.getElements(this.activeContainerAttr + " [" + selectors$2.EXPANDED + "]");
        var allContent = this.getElements(this.activeContainerAttr + " [" + selectors$2.CONTENT + "]");
        var allButtons = this.getElements(this.activeContainerAttr + " [" + selectors$2.TARGET + "]");

        allContent.forEach(function (content) {
          if (!(content === _this4.activeContent)) content.style.maxHeight = null;
        });

        this.toggleAttributeInCollection(allRows, selectors$2.EXPANDED, "true", "false");
        this.toggleAttributeInCollection(allButtons, selectors$2.ARIA_EXPANDED, "true", "false");
        this.toggleAttributeInCollection(allContent, selectors$2.ARIA_HIDDEN, "false", "true");
        this.toggleAttributeInCollection(allContent, selectors$2.CONTENT, "visible", "hidden");
      }

      /**
       * Toggle a [data-accordion-button]'s related [data-accordion-content] element.
       */

    }, {
      key: "toggleSelectedAccordion",
      value: function toggleSelectedAccordion() {
        this.activeRow.setAttribute(selectors$2.EXPANDED, this.toggleExpandState);
        this.activeContent.setAttribute(selectors$2.CONTENT, this.toggleContentState);
        this.activeButton.setAttribute(selectors$2.ARIA_EXPANDED, this.toggleExpandState);
        this.activeContent.setAttribute(selectors$2.ARIA_HIDDEN, this.toggleHiddenState);

        if (this.activeContent.style.maxHeight) {
          this.activeContent.style.maxHeight = null;
        } else {
          this.activeContent.style.maxHeight = this.activeContent.scrollHeight + "px";
        }
      }

      /**
       * Toggles a single attribute of a series of elements within a parent.
       */

    }, {
      key: "toggleAttributeInCollection",
      value: function toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
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

  var Undernet = {
    Modals: Modals,
    Accordions: Accordions
  };

  Undernet.start = function () {
    Undernet.Modals.start();
    Undernet.Accordions.start();
  };

  Undernet.stop = function () {
    Undernet.Modals.stop();
    Undernet.Accordions.stop();
  };

  window.Undernet = Undernet;

  return Undernet;

})));
//# sourceMappingURL=undernet.bundle.js.map
