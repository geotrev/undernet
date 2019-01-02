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

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var KeyCodes = {
  ESCAPE: 27
};
var Selectors = {
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
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _modals, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _modalButtons, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton, {
      writable: true,
      value: {}
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay, {
      writable: true,
      value: {}
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal, {
      writable: true,
      value: {}
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _modalContainerAttr, {
      writable: true,
      value: "[".concat(Selectors.MODAL_CONTAINER, "]")
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _render, {
      writable: true,
      value: function value(event) {
        event.preventDefault();
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton)[_activeModalButton] = event.target;

        if (!_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton)[_activeModalButton].getAttribute(Selectors.DATA_TARGET)) {
          return console.error(Messages.NO_TARGET_ERROR);
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)[_activeModalId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton)[_activeModalButton].getAttribute(Selectors.DATA_TARGET);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr] = "[".concat(Selectors.MODAL_ID, "=\"").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)[_activeModalId], "\"]");

        if (!document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr])) {
          return console.error(Messages.NO_ID_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)[_activeModalId]));
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector] = "".concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr], " ").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _modalContainerAttr)[_modalContainerAttr]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons)[_activeModalCloseButtons] = _this.getElements("".concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr], " [").concat(Selectors.MODAL_CONTAINER, "] [").concat(Selectors.DATA_CLOSE, "]"));

        _this.getFocusableElements(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]).forEach(function (element) {
          element.setAttribute(Selectors.TABINDEX, "0");
        });

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollStop)[_handleScrollStop]();

        _this.captureFocus(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors.ARIA_HIDDEN, "false");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal].setAttribute(Selectors.TABINDEX, "-1");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors.DATA_VISIBLE, "true");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal].focus();

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].scrollTop = 0;
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress)[_handleEscapeKeyPress]);
        document.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick)[_handleOverlayClick]);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons)[_activeModalCloseButtons].forEach(function (button) {
          button.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _setupModal, {
      value: _setupModal2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose, {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors.DATA_VISIBLE, "false");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus)[_handleReturnFocus]();

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollRestore)[_handleScrollRestore]();

        _this.releaseFocus();

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors.ARIA_HIDDEN, "true");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal].removeAttribute(Selectors.TABINDEX);

        _this.getFocusableElements(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]).forEach(function (element) {
          element.setAttribute(Selectors.TABINDEX, "-1");
        });

        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress)[_handleEscapeKeyPress]);
        document.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick)[_handleOverlayClick]);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons)[_activeModalCloseButtons].forEach(function (button) {
          button.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick, {
      writable: true,
      value: function value(event) {
        if (event.target === _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay]) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress, {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes.ESCAPE) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus, {
      value: _handleReturnFocus2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollRestore, {
      value: _handleScrollRestore2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollStop, {
      value: _handleScrollStop2
    });
    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldLooseBase(this, _modals)[_modals] = this.getElements(_classPrivateFieldLooseBase(this, _modalContainerAttr)[_modalContainerAttr]);
      _classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons] = this.getElements("[".concat(Selectors.MODAL_BUTTON, "]"));
      this.getFocusableElements(_classPrivateFieldLooseBase(this, _modalContainerAttr)[_modalContainerAttr]).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      if (_classPrivateFieldLooseBase(this, _modals)[_modals].length) {
        _classPrivateFieldLooseBase(this, _modals)[_modals].forEach(function (modal) {
          _classPrivateFieldLooseBase(_this2, _setupModal)[_setupModal](modal);
        });
      }

      if (_classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons].length) {
        _classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons].forEach(function (button) {
          button.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this2, _render)[_render]);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons].forEach(function (button) {
        button.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this3, _render)[_render]);
      });
    }
  }]);

  return Modal;
}(_utils.default);

exports.default = Modal;

var _modals = _classPrivateFieldLooseKey("modals");

var _modalButtons = _classPrivateFieldLooseKey("modalButtons");

var _activeModalButton = _classPrivateFieldLooseKey("activeModalButton");

var _activeModalOverlay = _classPrivateFieldLooseKey("activeModalOverlay");

var _activeModal = _classPrivateFieldLooseKey("activeModal");

var _activeModalId = _classPrivateFieldLooseKey("activeModalId");

var _activeModalOverlayAttr = _classPrivateFieldLooseKey("activeModalOverlayAttr");

var _activeModalSelector = _classPrivateFieldLooseKey("activeModalSelector");

var _activeModalCloseButtons = _classPrivateFieldLooseKey("activeModalCloseButtons");

var _modalContainerAttr = _classPrivateFieldLooseKey("modalContainerAttr");

var _render = _classPrivateFieldLooseKey("render");

var _setupModal = _classPrivateFieldLooseKey("setupModal");

var _handleClose = _classPrivateFieldLooseKey("handleClose");

var _handleOverlayClick = _classPrivateFieldLooseKey("handleOverlayClick");

var _handleEscapeKeyPress = _classPrivateFieldLooseKey("handleEscapeKeyPress");

var _handleReturnFocus = _classPrivateFieldLooseKey("handleReturnFocus");

var _handleScrollRestore = _classPrivateFieldLooseKey("handleScrollRestore");

var _handleScrollStop = _classPrivateFieldLooseKey("handleScrollStop");

var _setupModal2 = function _setupModal2(modal) {
  var modalId;

  if (!modal.getAttribute(Selectors.DATA_PARENT)) {
    return console.error(Messages.NO_PARENT_ERROR);
  } else {
    modalId = modal.getAttribute(Selectors.DATA_PARENT);
  }

  var modalWrapper;

  if (!document.querySelector("[".concat(Selectors.MODAL_ID, "='").concat(modalId, "']"))) {
    return console.error(Messages.NO_ID_ERROR(modalId));
  } else {
    modalWrapper = document.querySelector("[".concat(Selectors.MODAL_ID, "='").concat(modalId, "']"));
  }

  modalWrapper.setAttribute(Selectors.ARIA_HIDDEN, "true");
  modalWrapper.setAttribute(Selectors.DATA_VISIBLE, "false");
  modal.setAttribute(Selectors.ARIA_MODAL, "true");
  modal.setAttribute(Selectors.ROLE, "dialog");
};

var _handleReturnFocus2 = function _handleReturnFocus2() {
  _classPrivateFieldLooseBase(this, _activeModalButton)[_activeModalButton].setAttribute(Selectors.TABINDEX, "-1");

  _classPrivateFieldLooseBase(this, _activeModalButton)[_activeModalButton].focus();

  _classPrivateFieldLooseBase(this, _activeModalButton)[_activeModalButton].removeAttribute(Selectors.TABINDEX);
};

var _handleScrollRestore2 = function _handleScrollRestore2() {
  document.body.classList.remove(Selectors.NO_SCROLL);
  document.querySelector("html").classList.remove(Selectors.NO_SCROLL);
};

var _handleScrollStop2 = function _handleScrollStop2() {
  document.body.classList.add(Selectors.NO_SCROLL);
  document.querySelector("html").classList.add(Selectors.NO_SCROLL);
};