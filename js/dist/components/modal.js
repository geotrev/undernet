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

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

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

    _modals.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _modalButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _activeModalButton.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeModalOverlay.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeModal.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeModalId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeModalOverlayAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeModalSelector.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeModalCloseButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _modalContainerAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: "[".concat(Selectors.MODAL_CONTAINER, "]")
    });

    _render.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton, event.target);

        if (!_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton).getAttribute(Selectors.DATA_TARGET)) {
          return console.error(Messages.NO_TARGET_ERROR);
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton).getAttribute(Selectors.DATA_TARGET));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr, "[".concat(Selectors.MODAL_ID, "=\"").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId), "\"]"));

        if (!document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr))) {
          return console.error(Messages.NO_ID_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector, "".concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr), " ").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _modalContainerAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons, _this.getElements("".concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr), " [").concat(Selectors.MODAL_CONTAINER, "] [").concat(Selectors.DATA_CLOSE, "]")));

        _this.getFocusableElements(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)).forEach(function (element) {
          element.setAttribute(Selectors.TABINDEX, "0");
        });

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollStop, _handleScrollStop2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _this.captureFocus(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors.ARIA_HIDDEN, "false");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal).setAttribute(Selectors.TABINDEX, "-1");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors.DATA_VISIBLE, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal).focus();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).scrollTop = 0;
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress));
        document.addEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons).forEach(function (button) {
          button.addEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));
        });
      }
    });

    _setupModal.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _handleClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors.DATA_VISIBLE, "false");

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus, _handleReturnFocus2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollRestore, _handleScrollRestore2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _this.releaseFocus();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors.ARIA_HIDDEN, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal).removeAttribute(Selectors.TABINDEX);

        _this.getFocusableElements(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)).forEach(function (element) {
          element.setAttribute(Selectors.TABINDEX, "-1");
        });

        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress));
        document.removeEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons).forEach(function (button) {
          button.removeEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));
        });
      }
    });

    _handleOverlayClick.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.target === _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleEscapeKeyPress.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes.ESCAPE) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleReturnFocus.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _handleScrollRestore.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _handleScrollStop.add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldSet(this, _modals, this.getElements(_classPrivateFieldGet(this, _modalContainerAttr)));

      _classPrivateFieldSet(this, _modalButtons, this.getElements("[".concat(Selectors.MODAL_BUTTON, "]")));

      this.getFocusableElements(_classPrivateFieldGet(this, _modalContainerAttr)).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      if (_classPrivateFieldGet(this, _modals).length) {
        _classPrivateFieldGet(this, _modals).forEach(function (modal) {
          _classPrivateMethodGet(_this2, _setupModal, _setupModal2).call(_this2, modal);
        });
      }

      if (_classPrivateFieldGet(this, _modalButtons).length) {
        _classPrivateFieldGet(this, _modalButtons).forEach(function (button) {
          button.addEventListener(Events.CLICK, _classPrivateFieldGet(_this2, _render));
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldGet(this, _modalButtons).forEach(function (button) {
        button.removeEventListener(Events.CLICK, _classPrivateFieldGet(_this3, _render));
      });
    }
  }]);

  return Modal;
}(_utils.default);

exports.default = Modal;

var _modals = new WeakMap();

var _modalButtons = new WeakMap();

var _activeModalButton = new WeakMap();

var _activeModalOverlay = new WeakMap();

var _activeModal = new WeakMap();

var _activeModalId = new WeakMap();

var _activeModalOverlayAttr = new WeakMap();

var _activeModalSelector = new WeakMap();

var _activeModalCloseButtons = new WeakMap();

var _modalContainerAttr = new WeakMap();

var _render = new WeakMap();

var _setupModal = new WeakSet();

var _handleClose = new WeakMap();

var _handleOverlayClick = new WeakMap();

var _handleEscapeKeyPress = new WeakMap();

var _handleReturnFocus = new WeakSet();

var _handleScrollRestore = new WeakSet();

var _handleScrollStop = new WeakSet();

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
  _classPrivateFieldGet(this, _activeModalButton).setAttribute(Selectors.TABINDEX, "-1");

  _classPrivateFieldGet(this, _activeModalButton).focus();

  _classPrivateFieldGet(this, _activeModalButton).removeAttribute(Selectors.TABINDEX);
};

var _handleScrollRestore2 = function _handleScrollRestore2() {
  document.body.classList.remove(Selectors.NO_SCROLL);
  document.querySelector("html").classList.remove(Selectors.NO_SCROLL);
};

var _handleScrollStop2 = function _handleScrollStop2() {
  document.body.classList.add(Selectors.NO_SCROLL);
  document.querySelector("html").classList.add(Selectors.NO_SCROLL);
};