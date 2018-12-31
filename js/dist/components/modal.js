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

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var keyCodes = {
  ESCAPE: 27
};
var selectors = {
  MODAL_CONTAINER: "data-modal",
  MODAL_ID: "data-modal-id",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll",
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex"
};
var events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize"
};
var messages = {
  NO_TARGET_ERROR: "Could not find [data-target] attribute associated with a [data-modal-button] element.",
  NO_PARENT_ERROR: "Could not find [data-parent] attribute associated with a [data-modal] element.",
  NO_ID_ERROR: function NO_ID_ERROR(id) {
    return "Could not find [data-modal-id='".concat(id, "'] associated with a [data-modal] element.");
  }
};

var Modal = function (_Utils) {
  _inherits(Modal, _Utils);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));

    _this._render = function (event) {
      event.preventDefault();
      _this.activeModalButton = event.target;

      if (!_this.activeModalButton.getAttribute(selectors.DATA_TARGET)) {
        return console.error(messages.NO_TARGET_ERROR);
      }

      _this.activeModalId = _this.activeModalButton.getAttribute(selectors.DATA_TARGET);
      _this.activeModalOverlayAttr = "[".concat(selectors.MODAL_ID, "=\"").concat(_this.activeModalId, "\"]");

      if (!document.querySelector(_this.activeModalOverlayAttr)) {
        return console.error(messages.NO_ID_ERROR(_this.activeModalId));
      }

      _this.activeModalOverlay = document.querySelector(_this.activeModalOverlayAttr);
      _this.activeModalSelector = "".concat(_this.activeModalOverlayAttr, " ").concat(_this.modalContainerAttr);
      _this.activeModal = document.querySelector(_this.activeModalSelector);
      _this.activeModalCloseButtons = _this.getElements("".concat(_this.activeModalOverlayAttr, " [").concat(selectors.MODAL_CONTAINER, "] [").concat(selectors.DATA_CLOSE, "]"));

      _this.getFocusableElements(_this.activeModalSelector).forEach(function (element) {
        element.setAttribute(selectors.TABINDEX, "0");
      });

      _this._handleScrollStop();

      _this.captureFocus(_this.activeModalSelector);

      _this.activeModalOverlay.setAttribute(selectors.ARIA_HIDDEN, "false");

      _this.activeModal.setAttribute(selectors.TABINDEX, "-1");

      _this.activeModalOverlay.setAttribute(selectors.DATA_VISIBLE, "true");

      _this.activeModal.focus();

      _this.activeModalOverlay.scrollTop = 0;
      document.addEventListener(events.KEYDOWN, _this._handleEscapeKeyPress);
      document.addEventListener(events.CLICK, _this._handleOverlayClick);

      _this.activeModalCloseButtons.forEach(function (button) {
        button.addEventListener(events.CLICK, _this._handleClose);
      });
    };

    _this._handleClose = function (event) {
      event.preventDefault();

      _this.activeModalOverlay.setAttribute(selectors.DATA_VISIBLE, "false");

      _this._handleReturnFocus();

      _this._handleScrollRestore();

      _this.releaseFocus();

      _this.activeModalOverlay.setAttribute(selectors.ARIA_HIDDEN, "true");

      _this.activeModal.removeAttribute(selectors.TABINDEX);

      _this.getFocusableElements(_this.activeModalSelector).forEach(function (element) {
        element.setAttribute(selectors.TABINDEX, "-1");
      });

      document.removeEventListener(events.KEYDOWN, _this._handleEscapeKeyPress);
      document.removeEventListener(events.CLICK, _this._handleOverlayClick);

      _this.activeModalCloseButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this._handleClose);
      });
    };

    _this._handleOverlayClick = function (event) {
      if (event.target === _this.activeModalOverlay) {
        _this._handleClose(event);
      }
    };

    _this._handleEscapeKeyPress = function (event) {
      if (event.which === keyCodes.ESCAPE) {
        _this._handleClose(event);
      }
    };

    _this.modals = [];
    _this.modalButtons = [];
    _this.activeModalButton = null;
    _this.activeModalOverlay = null;
    _this.activeModal = null;
    _this.activeModalId = "";
    _this.activeModalOverlayAttr = "";
    _this.activeModalSelector = "";
    _this.activeModalCloseButtons = [];
    _this.modalContainerAttr = "[".concat(selectors.MODAL_CONTAINER, "]");
    _this.closeButtonAttr = "[".concat(selectors.MODAL_CONTAINER, "] [").concat(selectors.DATA_CLOSE, "]");
    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.modals = this.getElements(this.modalContainerAttr);
      this.modalButtons = this.getElements("[".concat(selectors.MODAL_BUTTON, "]"));
      this.getFocusableElements(this.modalContainerAttr).forEach(function (element) {
        element.setAttribute(selectors.TABINDEX, "-1");
      });

      if (this.modals.length) {
        this.modals.forEach(function (modal) {
          _this2._setupModal(modal);
        });
      }

      if (this.modalButtons.length) {
        this.modalButtons.forEach(function (button) {
          button.addEventListener(events.CLICK, _this2._render);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.modalButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3._render);
      });
    }
  }, {
    key: "_setupModal",
    value: function _setupModal(modal) {
      var modalId;

      if (!modal.getAttribute(selectors.DATA_PARENT)) {
        return console.warn(messages.NO_PARENT_ERROR);
      } else {
        modalId = modal.getAttribute(selectors.DATA_PARENT);
      }

      var modalWrapper;

      if (!document.querySelector("[".concat(selectors.MODAL_ID, "='").concat(modalId, "']"))) {
        return console.error(messages.NO_ID_ERROR(modalId));
      } else {
        modalWrapper = document.querySelector("[".concat(selectors.MODAL_ID, "='").concat(modalId, "']"));
      }

      modalWrapper.setAttribute(selectors.ARIA_HIDDEN, "true");
      modalWrapper.setAttribute(selectors.DATA_VISIBLE, "false");
      modal.setAttribute(selectors.ARIA_MODAL, "true");
      modal.setAttribute(selectors.ROLE, "dialog");
    }
  }, {
    key: "_handleReturnFocus",
    value: function _handleReturnFocus() {
      this.activeModalButton.setAttribute(selectors.TABINDEX, "-1");
      this.activeModalButton.focus();
      this.activeModalButton.removeAttribute(selectors.TABINDEX);
    }
  }, {
    key: "_handleScrollRestore",
    value: function _handleScrollRestore() {
      document.body.classList.remove(selectors.NO_SCROLL);
      document.querySelector("html").classList.remove(selectors.NO_SCROLL);
    }
  }, {
    key: "_handleScrollStop",
    value: function _handleScrollStop() {
      document.body.classList.add(selectors.NO_SCROLL);
      document.querySelector("html").classList.add(selectors.NO_SCROLL);
    }
  }]);

  return Modal;
}(_utils.default);

exports.default = Modal;