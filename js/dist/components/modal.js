"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var keyCodes = {
  ESCAPE: 27
};
var selectors = {
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
  ROLE: "role"
};
var events = {
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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));
    _this.modalContainerAttr = "[".concat(selectors.MODAL_CONTAINER, "]");
    _this.closeButtonAttr = "[".concat(selectors.MODAL_CONTAINER, "] [").concat(selectors.CLOSE, "]");
    _this.modals = null;
    _this.modalButtons = null;
    _this.closeButtons = null;
    _this.bodyTag = document.body;
    _this.htmlTag = document.querySelector("html"); // bind events to class

    _this.getModal = _this.getModal.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleModalClose = _this.handleModalClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleEscapeKeyPress = _this.handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleOverlayClick = _this.handleOverlayClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

      this.modals = this.getElements(this.modalContainerAttr);
      this.modalButtons = this.getElements("[".concat(selectors.MODAL_BUTTON, "]"));
      this.closeButtons = this.getElements(this.closeButtonAttr);

      if (this.modals.length) {
        this.modals.forEach(function (modal) {
          modal.setAttribute(selectors.ARIA_MODAL, "true");
          modal.parentNode.setAttribute(selectors.ARIA_HIDDEN, "true");
          modal.parentNode.setAttribute(selectors.VISIBLE, "false");
          modal.setAttribute(selectors.ROLE, "dialog");
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
      this.activeModalId = this.modalButton.getAttribute(selectors.TARGET);
      this.modalOverlayAttr = "[".concat(selectors.MODAL_ID, "='").concat(this.activeModalId, "']");
      this.modalOverlay = document.querySelector(this.modalOverlayAttr);

      if (!this.modalOverlay) {
        throw messages.MISSING_MODAL;
        return;
      }

      this.activeModalSelector = "".concat(this.modalOverlayAttr, " ").concat(this.modalContainerAttr);
      this.activeModal = document.querySelector(this.activeModalSelector);
      this.modalCloseButtons = this.getElements("".concat(this.modalOverlayAttr, " ").concat(this.closeButtonAttr));
      this.handleScrollStop();
      this.captureFocus(this.activeModalSelector);
      this.modalOverlay.setAttribute(selectors.ARIA_HIDDEN, "false");
      this.activeModal.setAttribute("tabindex", "-1");
      this.modalOverlay.setAttribute(selectors.VISIBLE, "true");
      this.activeModal.focus(); // offset slight scroll caused by this.activeModal.focus()

      this.modalOverlay.scrollTop = 0; // begin listening to events

      document.addEventListener(events.KEYDOWN, this.handleEscapeKeyPress);
      document.addEventListener(events.CLICK, this.handleOverlayClick);
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
      this.modalOverlay.setAttribute(selectors.VISIBLE, "false");
      this.handleReturnFocus();
      this.handleScrollRestore();
      this.releaseFocus();
      this.modalOverlay.setAttribute(selectors.ARIA_HIDDEN, "true");
      this.activeModal.removeAttribute("tabindex"); // stop listening to events

      document.removeEventListener(events.KEYDOWN, this.handleEscapeKeyPress);
      document.removeEventListener(events.CLICK, this.handleOverlayClick);
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
}(_utils.default);

exports.default = Modal;