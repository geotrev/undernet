"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

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

    _focusContainerSelector.set(this, {
      writable: true,
      value: ""
    });

    _focusableChildren.set(this, {
      writable: true,
      value: []
    });

    _focusableFirstChild.set(this, {
      writable: true,
      value: {}
    });

    _focusableLastChild.set(this, {
      writable: true,
      value: {}
    });

    _listeningForKeydown.set(this, {
      writable: true,
      value: false
    });

    _trapFocusWithArrows.set(this, {
      writable: true,
      value: false
    });

    _listenForKeyboard.set(this, {
      writable: true,
      value: function value(event) {
        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (tabKey || shiftKey || arrowUp || arrowDown) {
          document.body.classList.add(Selectors.KEYBOARD_CLASS);
          document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(_this, _listenForKeyboard));
          document.addEventListener(Events.CLICK, _classPrivateFieldGet(_this, _listenForClick));

          _classPrivateFieldSet(_this, _listeningForKeydown, false);
        }
      }
    });

    _listenForClick.set(this, {
      writable: true,
      value: function value(event) {
        document.body.classList.remove(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.CLICK, _classPrivateFieldGet(_this, _listenForClick));
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_this, _listenForKeyboard));

        _classPrivateFieldSet(_this, _listeningForKeydown, true);
      }
    });

    _handleFocusTrapWithTab.set(this, {
      writable: true,
      value: function value(event) {
        var containerElement = document.querySelector(_classPrivateFieldGet(_this, _focusContainerSelector));
        var containerActive = document.activeElement === containerElement;

        var firstActive = document.activeElement === _classPrivateFieldGet(_this, _focusableFirstChild);

        var lastActive = document.activeElement === _classPrivateFieldGet(_this, _focusableLastChild);

        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var hasShift = shiftKey && tabKey;
        var noShift = !shiftKey && tabKey;

        if (shiftKey && tabKey && (firstActive || containerActive)) {
          event.preventDefault();

          _classPrivateFieldGet(_this, _focusableLastChild).focus();
        } else if (!shiftKey && tabKey && lastActive) {
          event.preventDefault();

          _classPrivateFieldGet(_this, _focusableFirstChild).focus();
        }
      }
    });

    _handleFocusTrapWithArrows.set(this, {
      writable: true,
      value: function value(event) {
        var firstActive = document.activeElement === _classPrivateFieldGet(_this, _focusableFirstChild);

        var lastActive = document.activeElement === _classPrivateFieldGet(_this, _focusableLastChild);

        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (arrowUp || arrowDown) {
          event.preventDefault();

          if (firstActive && arrowUp) {
            _classPrivateFieldGet(_this, _focusableLastChild).focus();
          } else if (lastActive && arrowDown) {
            _classPrivateFieldGet(_this, _focusableFirstChild).focus();
          } else if (arrowDown) {
            _classPrivateMethodGet(_this, _focusNextChild, _focusNextChild2).call(_this);
          } else if (arrowUp) {
            _classPrivateMethodGet(_this, _focusLastChild, _focusLastChild2).call(_this);
          }
        }
      }
    });

    _focusNextChild.add(this);

    _focusLastChild.add(this);
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container, options) {
      _classPrivateFieldSet(this, _focusContainerSelector, container);

      _classPrivateFieldSet(this, _focusableChildren, this.getFocusableElements(_classPrivateFieldGet(this, _focusContainerSelector)));

      _classPrivateFieldSet(this, _focusableFirstChild, _classPrivateFieldGet(this, _focusableChildren)[0]);

      _classPrivateFieldSet(this, _focusableLastChild, _classPrivateFieldGet(this, _focusableChildren)[_classPrivateFieldGet(this, _focusableChildren).length - 1]);

      if (options) {
        if (options.useArrows) {
          _classPrivateFieldSet(this, _trapFocusWithArrows, options.useArrows || _classPrivateFieldGet(this, _trapFocusWithArrows));

          document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithArrows));
        }
      } else {
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithTab));
      }
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      if (_classPrivateFieldGet(this, _trapFocusWithArrows)) {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithArrows));

        _classPrivateFieldSet(this, _trapFocusWithArrows, false);
      } else {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithTab));
      }
    }
  }, {
    key: "enableFocusOutline",
    value: function enableFocusOutline() {
      document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _listenForKeyboard));
    }
  }, {
    key: "disableFocusOutline",
    value: function disableFocusOutline() {
      if (_classPrivateFieldGet(this, _listeningForKeydown)) {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _listenForKeyboard));
      } else {
        document.removeEventListener(Events.CLICK, _classPrivateFieldGet(this, _listenForClick));
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

var _focusContainerSelector = new WeakMap();

var _focusableChildren = new WeakMap();

var _focusableFirstChild = new WeakMap();

var _focusableLastChild = new WeakMap();

var _listeningForKeydown = new WeakMap();

var _trapFocusWithArrows = new WeakMap();

var _listenForKeyboard = new WeakMap();

var _listenForClick = new WeakMap();

var _handleFocusTrapWithTab = new WeakMap();

var _handleFocusTrapWithArrows = new WeakMap();

var _focusNextChild = new WeakSet();

var _focusLastChild = new WeakSet();

var _focusNextChild2 = function _focusNextChild2() {
  for (var i = 0; i < _classPrivateFieldGet(this, _focusableChildren).length; i++) {
    if (_classPrivateFieldGet(this, _focusableChildren)[i] === document.activeElement) {
      _classPrivateFieldGet(this, _focusableChildren)[i + 1].focus();

      break;
    }
  }
};

var _focusLastChild2 = function _focusLastChild2() {
  for (var i = 0; i < _classPrivateFieldGet(this, _focusableChildren).length; i++) {
    if (_classPrivateFieldGet(this, _focusableChildren)[i] === document.activeElement) {
      _classPrivateFieldGet(this, _focusableChildren)[i - 1].focus();

      break;
    }
  }
};