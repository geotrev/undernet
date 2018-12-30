"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var keyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var selectors = {
  NOT_VISUALLY_HIDDEN: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard"
};
var events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};

var Utils = function () {
  function Utils() {
    var _this = this;

    _classCallCheck(this, Utils);

    _defineProperty(this, "_listenForKeyboard", function (event) {
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var arrowUp = event.which === keyCodes.ARROW_UP;
      var arrowDown = event.which === keyCodes.ARROW_DOWN;

      if (tabKey || shiftKey || arrowUp || arrowDown) {
        document.body.classList.add(selectors.KEYBOARD_CLASS);
        document.removeEventListener(events.KEYDOWN, _this._listenForKeyboard);
        document.addEventListener(events.CLICK, _this._listenForClick);
        _this.listeningForKeydown = false;
      }
    });

    _defineProperty(this, "_listenForClick", function (event) {
      document.body.classList.remove(selectors.KEYBOARD_CLASS);
      document.removeEventListener(events.CLICK, _this._listenForClick);
      document.addEventListener(events.KEYDOWN, _this._listenForKeyboard);
      _this.listeningForKeydown = true;
    });

    _defineProperty(this, "_handleFocusTrapWithTab", function (event) {
      var containerElement = document.querySelector(_this.focusContainerSelector);
      var containerActive = document.activeElement === containerElement;
      var firstActive = document.activeElement === _this.focusableFirstChild;
      var lastActive = document.activeElement === _this.focusableLastChild;
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var hasShift = shiftKey && tabKey;
      var noShift = !shiftKey && tabKey;

      if (shiftKey && tabKey && (firstActive || containerActive)) {
        event.preventDefault();

        _this.focusableLastChild.focus();
      } else if (!shiftKey && tabKey && lastActive) {
        event.preventDefault();

        _this.focusableFirstChild.focus();
      }
    });

    _defineProperty(this, "_handleFocusTrapWithArrows", function (event) {
      var firstActive = document.activeElement === _this.focusableFirstChild;
      var lastActive = document.activeElement === _this.focusableLastChild;
      var arrowUp = event.which === keyCodes.ARROW_UP;
      var arrowDown = event.which === keyCodes.ARROW_DOWN;

      if (arrowUp || arrowDown) {
        event.preventDefault();

        if (firstActive && arrowUp) {
          _this.focusableLastChild.focus();
        } else if (lastActive && arrowDown) {
          _this.focusableFirstChild.focus();
        } else if (arrowDown) {
          _this._focusNextChild();
        } else if (arrowUp) {
          _this._focusLastChild();
        }
      }
    });

    this.focusContainerSelector = "";
    this.focusableChildren = [];
    this.focusableFirstChild = null;
    this.focusableLastChild = null;
    this.listeningForKeydown = false;
    this.trapFocusWithArrows = false;
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container, options) {
      this.focusContainerSelector = container;
      this.focusableChildren = this.getFocusableElements(this.focusContainerSelector);
      this.focusableFirstChild = this.focusableChildren[0];
      this.focusableLastChild = this.focusableChildren[this.focusableChildren.length - 1];

      if (options) {
        if (options.useArrows) {
          this.trapFocusWithArrows = options.useArrows || this.trapFocusWithArrows;
          document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows);
        }
      } else {
        document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithTab);
      }
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      if (this.trapFocusWithArrows) {
        document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows);
        this.trapFocusWithArrows = false;
      } else {
        document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithTab);
      }
    }
  }, {
    key: "enableFocusOutline",
    value: function enableFocusOutline() {
      document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
    }
  }, {
    key: "disableFocusOutline",
    value: function disableFocusOutline() {
      if (this.listeningForKeydown) {
        document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
      } else {
        document.removeEventListener(events.CLICK, this._listenForClick);
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
      var focusables = selectors.FOCUSABLE_TAGS.map(function (element) {
        return "".concat(container, " ").concat(element).concat(selectors.NOT_VISUALLY_HIDDEN);
      });
      return this.getElements(focusables.join(", "));
    }
  }, {
    key: "_focusNextChild",
    value: function _focusNextChild() {
      for (var i = 0; i < this.focusableChildren.length; i++) {
        if (this.focusableChildren[i] === document.activeElement) {
          this.focusableChildren[i + 1].focus();
          break;
        }
      }
    }
  }, {
    key: "_focusLastChild",
    value: function _focusLastChild() {
      for (var i = 0; i < this.focusableChildren.length; i++) {
        if (this.focusableChildren[i] === document.activeElement) {
          this.focusableChildren[i - 1].focus();
          break;
        }
      }
    }
  }]);

  return Utils;
}();

exports.default = Utils;