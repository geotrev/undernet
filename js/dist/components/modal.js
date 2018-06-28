"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyCodes = {
  ESCAPE: 27
};

var selectors = {
  MODAL_CONTAINER: "data-modal",
  MODAL_ID: "data-modal-id",
  MODAL_VISIBLE: "data-modal-visible",
  MODAL_CLOSE: "data-modal-close",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll"
};

var events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize",
  // needed to prevent iOS <body> scrolling when the overlay is pressed
  TOUCHSTART: "touchstart"
};

var messages = {
  MISSING_MODAL: "Your button is missing its corresponding modal. Check to make sure your modal is in the DOM, and that is has a [data-modal-id=*] attribute matching the button ID."

  /**
   * Modal component class.
   * @module Modal
   * @requires Utils
   */
};
var Modal = function (_Utils) {
  _inherits(Modal, _Utils);

  function Modal() {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

    _this.closeButtonAttr = "[" + selectors.MODAL_CLOSE + "]";
    _this.modalContainerAttr = "[" + selectors.MODAL_CONTAINER + "]";
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


  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.modals = this.getElements("[" + selectors.MODAL_CONTAINER + "]");
      this.modalButtons = this.getElements("[" + selectors.MODAL_BUTTON + "]");
      this.closeButtons = this.getElements(this.closeButtonAttr);

      if (this.modals.length) {
        this.modals.forEach(function (modal) {
          modal.setAttribute("aria-modal", "true");
          modal.setAttribute("role", "dialog");
        });
      }

      if (this.modalButtons.length) {
        this.modalButtons.forEach(function (button) {
          button.addEventListener(events.CLICK, _this2.getModal);
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
        button.removeEventListener(events.CLICK, _this3.getModal);
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
      this.activeModalId = this.modalButton.getAttribute(selectors.MODAL_BUTTON);
      this.modalOverlayAttr = "[" + selectors.MODAL_ID + "='" + this.activeModalId + "']";
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
      this.modalOverlay.setAttribute("aria-hidden", "false");
      this.activeModal.setAttribute("tabindex", "-1");
      this.modalOverlay.setAttribute(selectors.MODAL_VISIBLE, "");
      this.activeModal.focus();

      // offset slight scroll caused by this.activeModal.focus()
      this.modalOverlay.scrollTop = 0;

      // begin listening to events
      document.addEventListener(events.KEYDOWN, this.handleEscapeKeyPress);
      document.addEventListener(events.CLICK, this.handleOverlayClick);
      document.addEventListener(events.TOUCHSTART, this.handleOverlayClick);
      this.modalCloseButtons.forEach(function (button) {
        button.addEventListener(events.CLICK, _this4.handleModalClose);
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
      this.modalOverlay.removeAttribute(selectors.MODAL_VISIBLE);
      this.handleReturnFocus();
      this.handleScrollRestore();
      this.releaseFocus();
      this.modalOverlay.setAttribute("aria-hidden", "true");
      this.activeModal.removeAttribute("tabindex");

      // stop listening to events
      document.removeEventListener(events.KEYDOWN, this.handleEscapeKeyPress);
      document.removeEventListener(events.CLICK, this.handleOverlayClick);
      document.removeEventListener(events.TOUCHSTART, this.handleOverlayClick);
      this.modalCloseButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this5.handleModalClose);
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
      var escapeKey = event.which === keyCodes.ESCAPE;
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
      this.bodyTag.classList.remove(selectors.NO_SCROLL);
      this.htmlTag.classList.remove(selectors.NO_SCROLL);
    }

    /**
     * Prevents scroll behavior on <html> and <body>
     */

  }, {
    key: "handleScrollStop",
    value: function handleScrollStop() {
      this.bodyTag.classList.add(selectors.NO_SCROLL);
      this.htmlTag.classList.add(selectors.NO_SCROLL);
    }
  }]);

  return Modal;
}(_utils2.default);

exports.default = Modal;