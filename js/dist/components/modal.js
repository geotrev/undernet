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

var KeyCodes = {
  ESCAPE: 27
};
var Selectors = {
  DATA_MODAL: "data-modal",
  DATA_MODAL_ID: "data-modal-id",
  DATA_MODAL_BUTTON: "data-modal-button",
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex",
  NO_SCROLL: "no-scroll"
};
var Events = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize"
};
var Messages = {
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
    _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._modals = [];
    _this._modalButtons = [];
    _this._activeModalButton = {};
    _this._activeModalOverlay = {};
    _this._activeModal = {};
    _this._activeModalId = "";
    _this._activeModalOverlayAttr = "";
    _this._activeModalSelector = "";
    _this._activeModalCloseButtons = [];
    _this._modalContainerAttr = "[".concat(Selectors.DATA_MODAL, "]");
    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this._modals = this.getElements(this._modalContainerAttr);
      this._modalButtons = this.getElements("[".concat(Selectors.DATA_MODAL_BUTTON, "]"));
      this.getFocusableElements(this._modalContainerAttr).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      if (this._modals.length) {
        this._modals.forEach(function (modal) {
          _this2._setupModal(modal);
        });
      }

      if (this._modalButtons.length) {
        this._modalButtons.forEach(function (button) {
          button.addEventListener(Events.CLICK, _this2._render);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this._modalButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this3._render);
      });
    }
  }, {
    key: "_render",
    value: function _render(event) {
      var _this4 = this;

      event.preventDefault();
      this._activeModalButton = event.target;

      if (!this._activeModalButton.getAttribute(Selectors.DATA_TARGET)) {
        return console.error(Messages.NO_TARGET_ERROR);
      }

      this._activeModalId = this._activeModalButton.getAttribute(Selectors.DATA_TARGET);
      this._activeModalOverlayAttr = "[".concat(Selectors.DATA_MODAL_ID, "=\"").concat(this._activeModalId, "\"]");

      if (!document.querySelector(this._activeModalOverlayAttr)) {
        return console.error(Messages.NO_ID_ERROR(this._activeModalId));
      }

      this._activeModalOverlay = document.querySelector(this._activeModalOverlayAttr);
      this._activeModalSelector = "".concat(this._activeModalOverlayAttr, " ").concat(this._modalContainerAttr);
      this._activeModal = document.querySelector(this._activeModalSelector);
      this._activeModalCloseButtons = this.getElements("".concat(this._activeModalOverlayAttr, " [").concat(Selectors.DATA_CLOSE, "]"));
      this.getFocusableElements(this._activeModalSelector).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "0");
      });

      this._handleScrollStop();

      this.captureFocus(this._activeModalSelector);

      this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "false");

      this._activeModal.setAttribute(Selectors.TABINDEX, "-1");

      this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "true");

      this._activeModal.focus();

      this._activeModalOverlay.scrollTop = 0;
      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.addEventListener(Events.CLICK, this._handleOverlayClick);

      this._activeModalCloseButtons.forEach(function (button) {
        button.addEventListener(Events.CLICK, _this4._handleClose);
      });
    }
  }, {
    key: "_setupModal",
    value: function _setupModal(modal) {
      var modalId;

      if (!modal.getAttribute(Selectors.DATA_PARENT)) {
        return console.error(Messages.NO_PARENT_ERROR);
      } else {
        modalId = modal.getAttribute(Selectors.DATA_PARENT);
      }

      var modalWrapper;

      if (!document.querySelector("[".concat(Selectors.DATA_MODAL_ID, "='").concat(modalId, "']"))) {
        return console.error(Messages.NO_ID_ERROR(modalId));
      } else {
        modalWrapper = document.querySelector("[".concat(Selectors.DATA_MODAL_ID, "='").concat(modalId, "']"));
      }

      modalWrapper.setAttribute(Selectors.ARIA_HIDDEN, "true");
      modalWrapper.setAttribute(Selectors.DATA_VISIBLE, "false");
      modal.setAttribute(Selectors.ARIA_MODAL, "true");
      modal.setAttribute(Selectors.ROLE, "dialog");
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      var _this5 = this;

      event.preventDefault();

      this._activeModalOverlay.setAttribute(Selectors.DATA_VISIBLE, "false");

      this._handleReturnFocus();

      this._handleScrollRestore();

      this.releaseFocus();

      this._activeModalOverlay.setAttribute(Selectors.ARIA_HIDDEN, "true");

      this._activeModal.removeAttribute(Selectors.TABINDEX);

      this.getFocusableElements(this._activeModalSelector).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });
      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.removeEventListener(Events.CLICK, this._handleOverlayClick);

      this._activeModalCloseButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this5._handleClose);
      });
    }
  }, {
    key: "_handleOverlayClick",
    value: function _handleOverlayClick(event) {
      if (event.target === this._activeModalOverlay) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
      if (event.which === KeyCodes.ESCAPE) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleReturnFocus",
    value: function _handleReturnFocus() {
      this._activeModalButton.setAttribute(Selectors.TABINDEX, "-1");

      this._activeModalButton.focus();

      this._activeModalButton.removeAttribute(Selectors.TABINDEX);
    }
  }, {
    key: "_handleScrollRestore",
    value: function _handleScrollRestore() {
      document.body.classList.remove(Selectors.NO_SCROLL);
      document.querySelector("html").classList.remove(Selectors.NO_SCROLL);
    }
  }, {
    key: "_handleScrollStop",
    value: function _handleScrollStop() {
      document.body.classList.add(Selectors.NO_SCROLL);
      document.querySelector("html").classList.add(Selectors.NO_SCROLL);
    }
  }]);

  return Modal;
}(_utils.default);

exports.default = Modal;
//# sourceMappingURL=modal.js.map