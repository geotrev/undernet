"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var KeyCodes = {
  ESCAPE: 27
};
var Selectors = {
  DATA_MODAL: "data-modal",
  DATA_TARGET: "data-target",
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
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
  NO_BUTTON_ERROR: function NO_BUTTON_ERROR(id) {
    return "Could not find modal trigger with id ".concat(id, ".");
  },
  NO_MODAL_ID_ERROR: "Could not detect an id on your [data-modal] element. Please add a value matching the modal trigger's [data-parent] attribute.",
  NO_MODAL_ERROR: function NO_MODAL_ERROR(id) {
    return "Could not find a [data-parent='".concat(id, "'] attribute within your [data-modal='").concat(id, "'] element.");
  }
};

var Modal = function (_Utils) {
  _inherits(Modal, _Utils);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));
    _this._render = _this._render.bind(_assertThisInitialized(_this));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_this));
    _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_this));
    _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_this));
    _this._modals = [];
    _this._modalButtons = [];
    _this._activeModalButton = {};
    _this._activeModalOverlay = {};
    _this._activeModal = {};
    _this._activeModalId = "";
    _this._activeModalSelector = "";
    _this._activeModalCloseButtons = [];
    _this._originalPagePaddingRight = "";
    _this._scrollbarOffset = 0;
    _this._modalContainerAttr = "[".concat(Selectors.DATA_MODAL, "]");
    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this._modals = _utils.dom.findAll(this._modalContainerAttr);
      (0, _utils.getFocusableElements)(this._modalContainerAttr).forEach(function (element) {
        _utils.dom.attr(element, Selectors.TABINDEX, "-1");
      });

      if (this._modals.length) {
        this._modals.forEach(function (instance) {
          _this2._setup(instance);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this._modals.forEach(function (instance) {
        var id = _utils.dom.attr(instance, Selectors.DATA_MODAL);

        var button = _utils.dom.find("[".concat(Selectors.DATA_TARGET, "='").concat(id, "']"));

        if (!button) {
          throw new Error(Messages.NO_BUTTON_ERROR(id));
        }

        button.removeEventListener(Events.CLICK, _this3._render);
      });
    }
  }, {
    key: "_setup",
    value: function _setup(instance) {
      var modalId = _utils.dom.attr(instance, Selectors.DATA_MODAL);

      if (!modalId) {
        throw new Error(Messages.NO_MODAL_ID_ERROR);
      }

      var modal = _utils.dom.find("[".concat(Selectors.DATA_PARENT, "='").concat(modalId, "']"), instance);

      if (!modal) {
        throw new Error(Messages.NO_MODAL_ERROR(modalId));
      }

      var modalWrapper = _utils.dom.find("[".concat(Selectors.DATA_MODAL, "='").concat(modalId, "']"));

      _utils.dom.attr(modalWrapper, Selectors.ARIA_HIDDEN, "true");

      _utils.dom.attr(modalWrapper, Selectors.DATA_VISIBLE, "false");

      _utils.dom.attr(modal, Selectors.ARIA_MODAL, "true");

      _utils.dom.attr(modal, Selectors.ROLE, "dialog");

      var modalButton = _utils.dom.find("[".concat(Selectors.DATA_TARGET, "='").concat(modalId, "']"));

      if (!modalButton) {
        throw new Error(Messages.NO_BUTTON_ERROR(modalId));
      }

      modalButton.addEventListener(Events.CLICK, this._render);
    }
  }, {
    key: "_render",
    value: function _render(event) {
      event.preventDefault();
      this._activeModalButton = event.target;

      this._setActiveModalId();

      this._setActiveModalOverlay();

      this._setActiveModal();

      this._enableFocusOnChildren();

      this._handleScrollbarOffset();

      this._handleScrollStop();

      this.captureFocus(this._activeModalSelector);

      this._setAttributes();

      this._setCloseButtons();

      this._handleModalFocus();

      this._activeModalOverlay.scrollTop = 0;

      this._startEvents();
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      event.preventDefault();

      this._stopEvents();

      this._handleReturnFocus();

      this._removeAttributes();

      this.releaseFocus();

      this._handleScrollRestore();

      this._removeScrollbarOffset();

      this._disableFocusOnChildren();

      if (_utils.iOSMobile) _utils.dom.css(this._activeModalOverlay, "cursor", "auto");
      this._activeModalId = null;
      this._activeModalButton = null;
      this._activeModal = null;
    }
  }, {
    key: "_setCloseButtons",
    value: function _setCloseButtons() {
      this._activeModalCloseButtons = _utils.dom.findAll("".concat(this._activeModalSelector, " [").concat(Selectors.DATA_CLOSE, "]"));
    }
  }, {
    key: "_setActiveModalId",
    value: function _setActiveModalId() {
      this._activeModalId = _utils.dom.attr(this._activeModalButton, Selectors.DATA_TARGET);
    }
  }, {
    key: "_setActiveModalOverlay",
    value: function _setActiveModalOverlay() {
      this._activeModalOverlay = _utils.dom.find("[".concat(Selectors.DATA_MODAL, "='").concat(this._activeModalId, "']"));
    }
  }, {
    key: "_removeAttributes",
    value: function _removeAttributes() {
      _utils.dom.attr(this._activeModalOverlay, Selectors.DATA_VISIBLE, "false");

      _utils.dom.attr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, "true");

      _utils.dom.attr(this._activeModal, Selectors.TABINDEX, false);
    }
  }, {
    key: "_disableFocusOnChildren",
    value: function _disableFocusOnChildren() {
      (0, _utils.getFocusableElements)(this._activeModalSelector).forEach(function (element) {
        _utils.dom.attr(element, Selectors.TABINDEX, "-1");
      });
    }
  }, {
    key: "_stopEvents",
    value: function _stopEvents() {
      var _this4 = this;

      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.removeEventListener(Events.CLICK, this._handleOverlayClick);

      this._activeModalCloseButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this4._handleClose);
      });
    }
  }, {
    key: "_setActiveModal",
    value: function _setActiveModal() {
      this._activeModalSelector = "[".concat(Selectors.DATA_PARENT, "='").concat(this._activeModalId, "']");
      this._activeModal = _utils.dom.find(this._activeModalSelector, this._activeModalOverlay);
    }
  }, {
    key: "_setAttributes",
    value: function _setAttributes() {
      _utils.dom.attr(this._activeModalOverlay, Selectors.ARIA_HIDDEN, "false");

      _utils.dom.attr(this._activeModalOverlay, Selectors.DATA_VISIBLE, "true");

      if (_utils.iOSMobile) _utils.dom.css(this._activeModalOverlay, "cursor", "pointer");
    }
  }, {
    key: "_startEvents",
    value: function _startEvents() {
      var _this5 = this;

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.addEventListener(Events.CLICK, this._handleOverlayClick);

      this._activeModalCloseButtons.forEach(function (button) {
        button.addEventListener(Events.CLICK, _this5._handleClose);
      });
    }
  }, {
    key: "_handleModalFocus",
    value: function _handleModalFocus() {
      _utils.dom.attr(this._activeModal, Selectors.TABINDEX, "-1");

      this._activeModal.focus();
    }
  }, {
    key: "_enableFocusOnChildren",
    value: function _enableFocusOnChildren() {
      (0, _utils.getFocusableElements)(this._activeModalSelector).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "0");
      });
    }
  }, {
    key: "_getScrollbarOffset",
    value: function _getScrollbarOffset() {
      return window.innerWidth - document.body.getBoundingClientRect().right;
    }
  }, {
    key: "_handleScrollbarOffset",
    value: function _handleScrollbarOffset() {
      if (!this._scrollbarIsVisible()) return;
      this._scrollbarOffset = this._getScrollbarOffset();
      this._originalPagePaddingRight = _utils.dom.css(document.body, "paddingRight");

      _utils.dom.css(document.body, "paddingRight", "".concat(this._scrollbarOffset, "px"));
    }
  }, {
    key: "_scrollbarIsVisible",
    value: function _scrollbarIsVisible() {
      if (typeof window.innerWidth === "number") {
        return window.innerWidth > document.body.getBoundingClientRect().right;
      }
    }
  }, {
    key: "_removeScrollbarOffset",
    value: function _removeScrollbarOffset() {
      var _this6 = this;

      var originalPadding = this._originalPagePaddingRight;

      _utils.dom.css(this._activeModalOverlay, "paddingLeft", "".concat(this._scrollbarOffset, "px"));

      setTimeout(function () {
        return _utils.dom.css(_this6._activeModalOverlay, "paddingLeft", "");
      }, 500);

      if (originalPadding) {
        _utils.dom.css(document.body, "paddingRight", "".concat(originalPadding, "px"));
      } else {
        _utils.dom.css(document.body, "paddingRight", "");
      }
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
      _utils.dom.attr(this._activeModalButton, Selectors.TABINDEX, "-1");

      this._activeModalButton.focus();

      _utils.dom.attr(this._activeModalButton, Selectors.TABINDEX, false);
    }
  }, {
    key: "_handleScrollRestore",
    value: function _handleScrollRestore() {
      _utils.dom.removeClass(document.body, Selectors.NO_SCROLL);

      _utils.dom.removeClass(document.documentElement, Selectors.NO_SCROLL);
    }
  }, {
    key: "_handleScrollStop",
    value: function _handleScrollStop() {
      _utils.dom.addClass(document.body, Selectors.NO_SCROLL);

      _utils.dom.addClass(document.documentElement, Selectors.NO_SCROLL);
    }
  }]);

  return Modal;
}(_utils.default);

exports.default = Modal;
//# sourceMappingURL=modal.js.map