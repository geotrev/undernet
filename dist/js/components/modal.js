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
  MODAL_NAME: "data-modal-name",
  MODAL_VISIBLE: "data-modal-visible",
  MODAL_CLOSE: "data-modal-close",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll"
};

var events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize"
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
  _inherits(Modal, _Utils);

  function Modal() {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this));

    _this.closeButtonAttr = "[" + selectors.MODAL_CLOSE + "]";
    _this.modalContainerAttr = "[" + selectors.MODAL_CONTAINER + "]";
    _this.modals = _this.findElements("[" + selectors.MODAL_CONTAINER + "]");
    _this.modalButtons = _this.findElements("[" + selectors.MODAL_BUTTON + "]");
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


  _createClass(Modal, [{
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
          button.addEventListener(events.CLICK, _this2.getModal);
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
        button.removeEventListener(events.CLICK, _this3.getModal);
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
      this.modalOverlayAttr = "[" + selectors.MODAL_NAME + "='" + this.modalButton.id + "']";
      this.modalOverlay = document.querySelector(this.modalOverlayAttr);

      if (!this.modalOverlay) {
        throw messages.MISSING_MODAL;
        return;
      }

      // move modal to the body tag so it doesn't get
      // trapped by relative positioning
      if (this.modalOverlay.parentNode !== this.bodyTag) {
        this.bodyTag.appendChild(this.modalOverlay);
      }

      this.activeModalSelector = this.modalOverlayAttr + " " + this.modalContainerAttr;
      this.activeModal = document.querySelector(this.activeModalSelector);
      this.modalCloseButtons = this.findElements(this.modalOverlayAttr + " " + this.closeButtonAttr);

      this.handleScrollStop();
      this.captureFocus(this.activeModalSelector);
      this.modalOverlay.setAttribute("aria-hidden", "false");
      this.activeModal.setAttribute("tabindex", "-1");
      this.activeModal.focus();

      // offset slight scroll caused by this.activeModal.focus()
      this.modalOverlay.scrollTop = 0;

      // begin listening to events
      document.addEventListener(events.KEYDOWN, this.handleEscapeKeyPress);
      document.addEventListener(events.CLICK, this.handleOverlayClick);
      this.modalCloseButtons.forEach(function (button) {
        button.addEventListener(events.CLICK, _this4.handleModalClose);
      });

      this.modalOverlay.setAttribute(selectors.MODAL_VISIBLE, "");
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
      this.modalOverlay.removeAttribute(selectors.MODAL_VISIBLE);
      this.handleReturnFocus();
      this.handleScrollRestore();
      this.releaseFocus();
      this.modalOverlay.setAttribute("aria-hidden", "true");
      this.activeModal.removeAttribute("tabindex");

      // stop listening to events
      document.removeEventListener(events.KEYDOWN, this.handleEscapeKeyPress);
      document.removeEventListener(events.CLICK, this.handleOverlayClick);
      this.modalCloseButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this5.handleModalClose);
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
      var escapeKey = event.which === keyCodes.ESCAPE;
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
      this.bodyTag.classList.remove(selectors.NO_SCROLL);
      this.htmlTag.classList.remove(selectors.NO_SCROLL);
    }

    /**
     * Prevents scroll behavior on <html> and <body>
     * @return {null}
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