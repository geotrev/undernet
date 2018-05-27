/*!
  * @license MIT (https://github.com/geotrev/getmonolith.io/blob/master/LICENSE)
  * Monolith v2.0.0 (https://getmonolith.io)
  * Copyright 2017-2018 George Treviranus
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.getmonolith = factory());
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
      key: "findElements",
      value: function findElements(element) {
        return Array.apply(null, document.querySelectorAll(element));
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
        return this.findElements(focusables.join(", "));
      }

      /**
       * Listens to the first and last elements matched from this.getFocusableElements()
       * @param {String} container - The container's class, attribute, etc.
       * @return {null}
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
       * @param {Object} e - Event (keypress)
       * @return {null}
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
    MODAL_CONTAINER: "data-modal",
    MODAL_NAME: "data-modal-name",
    MODAL_VISIBLE: "data-modal-visible",
    MODAL_CLOSE: "data-modal-close",
    MODAL_BUTTON: "data-modal-button",
    NO_SCROLL: "no-scroll"
  };

  var events$1 = {
    KEYDOWN: "keydown",
    CLICK: "click",
    RESIZE: "resize",
    TOUCHSTART: "touchstart"
  };

  var messages = {
    MISSING_MODAL: "Your button is missing its corresponding modal. Check to make sure your modal is in the DOM, and that is has a [data-modal-name=*] attribute matching the button ID."

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

      _this.closeButtonAttr = "[" + selectors$1.MODAL_CLOSE + "]";
      _this.modalContainerAttr = "[" + selectors$1.MODAL_CONTAINER + "]";
      _this.modals = _this.findElements("[" + selectors$1.MODAL_CONTAINER + "]");
      _this.modalButtons = _this.findElements("[" + selectors$1.MODAL_BUTTON + "]");
      _this.closeButtons = _this.findElements(_this.closeButtonAttr);
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
     * @return {null}
     */


    createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        if (this.modals.length > 0) {
          this.modals.forEach(function (modal) {
            modal.setAttribute("aria-modal", "true");
            modal.setAttribute("role", "dialog");
          });
        }

        if (this.modalButtons.length > 0) {
          this.modalButtons.forEach(function (button) {
            button.addEventListener(events$1.CLICK, _this2.getModal);
          });
        }
      }

      /**
       * Stop listening to modal buttons
       * @return {null}
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
       * @return {null}
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
       * @return {null}
       */

    }, {
      key: "renderModal",
      value: function renderModal(event) {
        var _this4 = this;

        // setup core lightbox properties
        this.modalButton = event.target;
        this.modalOverlayAttr = "[" + selectors$1.MODAL_NAME + "='" + this.modalButton.id + "']";
        this.modalOverlay = document.querySelector(this.modalOverlayAttr);

        if (!this.modalOverlay) {
          throw messages.MISSING_MODAL;
          return;
        }

        this.activeModalSelector = this.modalOverlayAttr + " " + this.modalContainerAttr;
        this.activeModal = document.querySelector(this.activeModalSelector);
        this.modalCloseButtons = this.findElements(this.modalOverlayAttr + " " + this.closeButtonAttr);

        this.handleScrollStop();
        this.captureFocus(this.activeModalSelector);
        this.modalOverlay.setAttribute("aria-hidden", "false");
        this.activeModal.setAttribute("tabindex", "-1");
        this.modalOverlay.setAttribute(selectors$1.MODAL_VISIBLE, "");
        this.activeModal.focus();

        // offset slight scroll caused by this.activeModal.focus()
        this.modalOverlay.scrollTop = 0;

        // begin listening to events
        document.addEventListener(events$1.KEYDOWN, this.handleEscapeKeyPress);
        document.addEventListener(events$1.CLICK, this.handleOverlayClick);
        document.addEventListener(events$1.TOUCHSTART, this.handleOverlayClick);
        this.modalCloseButtons.forEach(function (button) {
          button.addEventListener(events$1.CLICK, _this4.handleModalClose);
        });
      }

      /**
       * Turn off event listeners and reset focus to last selected DOM node (button)
       * @param {Object} event - Event (keydown or click)
       * @return {null}
       */

    }, {
      key: "handleModalClose",
      value: function handleModalClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.modalOverlay.removeAttribute(selectors$1.MODAL_VISIBLE);
        this.handleReturnFocus();
        this.handleScrollRestore();
        this.releaseFocus();
        this.modalOverlay.setAttribute("aria-hidden", "true");
        this.activeModal.removeAttribute("tabindex");

        // stop listening to events
        document.removeEventListener(events$1.KEYDOWN, this.handleEscapeKeyPress);
        document.removeEventListener(events$1.CLICK, this.handleOverlayClick);
        document.removeEventListener(events$1.TOUCHSTART, this.handleOverlayClick);
        this.modalCloseButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this5.handleModalClose);
        });
      }

      /**
       * Handles click event on the modal background to close it.
       * @param {Object} event - Event (keydown)
       * @return {null}
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
       * @return {null}
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
       * @return {null}
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
       * @return {null}
       */

    }, {
      key: "handleScrollRestore",
      value: function handleScrollRestore() {
        this.bodyTag.classList.remove(selectors$1.NO_SCROLL);
        this.htmlTag.classList.remove(selectors$1.NO_SCROLL);
      }

      /**
       * Prevents scroll behavior on <html> and <body>
       * @return {null}
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

  var Accordion = function (_Utils) {
    inherits(Accordion, _Utils);

    function Accordion() {
      classCallCheck(this, Accordion);
      return possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));
    }

    createClass(Accordion, [{
      key: "start",
      value: function start() {}
    }, {
      key: "stop",
      value: function stop() {}
    }]);
    return Accordion;
  }(Utils);

  var Monolith = {
    modals: function modals() {
      return new Modal();
    },
    accordions: function accordions() {
      return new Accordion();
    }
  };

  window.Monolith = Monolith || {};

  Monolith.start = function () {
    Monolith.modals().start();
    Monolith.accordions().start();
  };

  Monolith.stop = function () {
    Monolith.modals().stop();
    Monolith.accordions().stop();
  };

  return Monolith;

})));
//# sourceMappingURL=monolith.bundle.js.map
