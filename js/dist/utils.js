"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

var KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var Selectors = {
  NOT_VISUALLY_HIDDEN: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard"
};
var Events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};

var Utils = function () {
  function Utils() {
    var _this = this;

    _classCallCheck(this, Utils);

    Object.defineProperty(this, _focusContainerSelector, {
      writable: true,
      value: ""
    });
    Object.defineProperty(this, _focusableChildren, {
      writable: true,
      value: []
    });
    Object.defineProperty(this, _focusableFirstChild, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _focusableLastChild, {
      writable: true,
      value: {}
    });
    Object.defineProperty(this, _listeningForKeydown, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _trapFocusWithArrows, {
      writable: true,
      value: false
    });
    Object.defineProperty(this, _listenForKeyboard, {
      writable: true,
      value: function value(event) {
        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (tabKey || shiftKey || arrowUp || arrowDown) {
          document.body.classList.add(Selectors.KEYBOARD_CLASS);
          document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_this, _listenForKeyboard)[_listenForKeyboard]);
          document.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this, _listenForClick)[_listenForClick]);
          _classPrivateFieldLooseBase(_this, _listeningForKeydown)[_listeningForKeydown] = false;
        }
      }
    });
    Object.defineProperty(this, _listenForClick, {
      writable: true,
      value: function value(event) {
        document.body.classList.remove(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this, _listenForClick)[_listenForClick]);
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_this, _listenForKeyboard)[_listenForKeyboard]);
        _classPrivateFieldLooseBase(_this, _listeningForKeydown)[_listeningForKeydown] = true;
      }
    });
    Object.defineProperty(this, _handleFocusTrapWithTab, {
      writable: true,
      value: function value(event) {
        var containerElement = document.querySelector(_classPrivateFieldLooseBase(_this, _focusContainerSelector)[_focusContainerSelector]);
        var containerActive = document.activeElement === containerElement;

        var firstActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild];

        var lastActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild];

        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var hasShift = shiftKey && tabKey;
        var noShift = !shiftKey && tabKey;

        if (shiftKey && tabKey && (firstActive || containerActive)) {
          event.preventDefault();

          _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild].focus();
        } else if (!shiftKey && tabKey && lastActive) {
          event.preventDefault();

          _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild].focus();
        }
      }
    });
    Object.defineProperty(this, _handleFocusTrapWithArrows, {
      writable: true,
      value: function value(event) {
        var firstActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild];

        var lastActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild];

        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (arrowUp || arrowDown) {
          event.preventDefault();

          if (firstActive && arrowUp) {
            _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild].focus();
          } else if (lastActive && arrowDown) {
            _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild].focus();
          } else if (arrowDown) {
            _classPrivateFieldLooseBase(_this, _focusNextChild)[_focusNextChild]();
          } else if (arrowUp) {
            _classPrivateFieldLooseBase(_this, _focusLastChild)[_focusLastChild]();
          }
        }
      }
    });
    Object.defineProperty(this, _focusNextChild, {
      value: _focusNextChild2
    });
    Object.defineProperty(this, _focusLastChild, {
      value: _focusLastChild2
    });
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container, options) {
      _classPrivateFieldLooseBase(this, _focusContainerSelector)[_focusContainerSelector] = container;
      _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren] = this.getFocusableElements(_classPrivateFieldLooseBase(this, _focusContainerSelector)[_focusContainerSelector]);
      _classPrivateFieldLooseBase(this, _focusableFirstChild)[_focusableFirstChild] = _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][0];
      _classPrivateFieldLooseBase(this, _focusableLastChild)[_focusableLastChild] = _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][_classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren].length - 1];

      if (options) {
        if (options.useArrows) {
          _classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows] = options.useArrows || _classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows];
          document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithArrows)[_handleFocusTrapWithArrows]);
        }
      } else {
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithTab)[_handleFocusTrapWithTab]);
      }
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      if (_classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows]) {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithArrows)[_handleFocusTrapWithArrows]);
        _classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows] = false;
      } else {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithTab)[_handleFocusTrapWithTab]);
      }
    }
  }, {
    key: "enableFocusOutline",
    value: function enableFocusOutline() {
      document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _listenForKeyboard)[_listenForKeyboard]);
    }
  }, {
    key: "disableFocusOutline",
    value: function disableFocusOutline() {
      if (_classPrivateFieldLooseBase(this, _listeningForKeydown)[_listeningForKeydown]) {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _listenForKeyboard)[_listenForKeyboard]);
      } else {
        document.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(this, _listenForClick)[_listenForClick]);
      }
    }
  }, {
    key: "getElements",
    value: function getElements(element) {
      var nodeList = document.querySelectorAll(element);
      return Array.apply(null, nodeList);
    }
  }, {
    key: "getFocusableElements",
    value: function getFocusableElements(container) {
      var focusables = Selectors.FOCUSABLE_TAGS.map(function (element) {
        return "".concat(container, " ").concat(element).concat(Selectors.NOT_VISUALLY_HIDDEN);
      });
      return this.getElements(focusables.join(", "));
    }
  }]);

  return Utils;
}();

exports.default = Utils;

var _focusContainerSelector = _classPrivateFieldLooseKey("focusContainerSelector");

var _focusableChildren = _classPrivateFieldLooseKey("focusableChildren");

var _focusableFirstChild = _classPrivateFieldLooseKey("focusableFirstChild");

var _focusableLastChild = _classPrivateFieldLooseKey("focusableLastChild");

var _listeningForKeydown = _classPrivateFieldLooseKey("listeningForKeydown");

var _trapFocusWithArrows = _classPrivateFieldLooseKey("trapFocusWithArrows");

var _listenForKeyboard = _classPrivateFieldLooseKey("listenForKeyboard");

var _listenForClick = _classPrivateFieldLooseKey("listenForClick");

var _handleFocusTrapWithTab = _classPrivateFieldLooseKey("handleFocusTrapWithTab");

var _handleFocusTrapWithArrows = _classPrivateFieldLooseKey("handleFocusTrapWithArrows");

var _focusNextChild = _classPrivateFieldLooseKey("focusNextChild");

var _focusLastChild = _classPrivateFieldLooseKey("focusLastChild");

var _focusNextChild2 = function _focusNextChild2() {
  for (var i = 0; i < _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren].length; i++) {
    if (_classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i] === document.activeElement) {
      _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i + 1].focus();

      break;
    }
  }
};

var _focusLastChild2 = function _focusLastChild2() {
  for (var i = 0; i < _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren].length; i++) {
    if (_classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i] === document.activeElement) {
      _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i - 1].focus();

      break;
    }
  }
};