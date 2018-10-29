"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var keyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var selectors = {
  FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard"
};
var events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);

    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);
    this._listenForKeyboard = this._listenForKeyboard.bind(this);
    this._listenForClick = this._listenForClick.bind(this);
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container, options) {
      this.focusContainerSelector = container;
      this.focusableChildren = this._getFocusableElements(this.focusContainerSelector);
      this.focusableFirstChild = this.focusableChildren[0];
      this.focusableLastChild = this.focusableChildren[this.focusableChildren.length - 1];

      if (options.useArrows) {
        document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows);
      } else {
        document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithTab);
      }
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithTab);
      document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows);
    }
  }, {
    key: "enableFocusOutline",
    value: function enableFocusOutline() {
      document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
    }
  }, {
    key: "disableFocusOutline",
    value: function disableFocusOutline() {
      document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
      document.removeEventListener(events.CLICK, this.__listenForClick);
    }
  }, {
    key: "_listenForKeyboard",
    value: function _listenForKeyboard(event) {
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;

      if (tabKey || shiftKey) {
        document.body.classList.add(selectors.KEYBOARD_CLASS);
        document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
        document.addEventListener(events.CLICK, this._listenForClick);
      }
    }
  }, {
    key: "_listenForClick",
    value: function _listenForClick(event) {
      document.body.classList.remove(selectors.KEYBOARD_CLASS);
      document.removeEventListener(events.CLICK, this._listenForClick);
      document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
    }
  }, {
    key: "_getElements",
    value: function _getElements(element) {
      var nodeList = document.querySelectorAll(element);
      return Array.apply(null, nodeList);
    }
  }, {
    key: "_getFocusableElements",
    value: function _getFocusableElements(container) {
      var focusables = [];
      selectors.FOCUSABLE_TAGS.map(function (element) {
        return focusables.push("".concat(container, " ").concat(element).concat(selectors.FOCUSABLE_SELECTOR));
      });
      return this._getElements(focusables.join(", "));
    }
  }, {
    key: "_handleFocusTrapWithArrows",
    value: function _handleFocusTrapWithArrows(event) {
      var activeElement = document.activeElement;
      var containerElement = document.querySelector(this.focusContainerSelector);
      var containerActive = activeElement === containerElement;
      var firstActive = activeElement === this.focusableFirstChild;
      var lastActive = activeElement === this.focusableLastChild;
      var arrowUp = event.which === keyCodes.ARROW_UP;
      var arrowDown = event.which === keyCodes.ARROW_DOWN;
      this.releaseFocus();
      this.captureFocus(this.focusContainerSelector, {
        useArrows: true
      });

      if (arrowUp || arrowDown) {
        event.preventDefault();

        if (firstActive && arrowUp) {
          this.focusableLastChild.focus();
        } else if (lastActive && arrowDown) {
          this.focusableFirstChild.focus();
        } else if (arrowDown) {
          this._focusNextChild();
        } else if (arrowUp) {
          this._focusLastChild();
        }
      }
    }
  }, {
    key: "_focusNextChild",
    value: function _focusNextChild() {
      var _this = this;

      var nextChild = null;
      this.focusableChildren.forEach(function (child, i) {
        if (child === document.activeElement) {
          nextChild = _this.focusableChildren[i + 1];
        }
      });
      nextChild.focus();
    }
  }, {
    key: "_focusLastChild",
    value: function _focusLastChild() {
      var _this2 = this;

      var prevChild = null;
      this.focusableChildren.forEach(function (child, i) {
        if (child === document.activeElement) {
          prevChild = _this2.focusableChildren[i - 1];
        }
      });
      prevChild.focus();
    }
  }, {
    key: "_handleFocusTrapWithTab",
    value: function _handleFocusTrapWithTab(event) {
      var activeElement = document.activeElement;
      var containerElement = document.querySelector(this.focusContainerSelector);
      var containerActive = activeElement === containerElement;
      var firstActive = activeElement === this.focusableFirstChild;
      var lastActive = activeElement === this.focusableLastChild;
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var hasShift = shiftKey && tabKey;
      var noShift = !shiftKey && tabKey;
      this.releaseFocus();
      this.captureFocus(this.focusContainerSelector);

      if (hasShift && (firstActive || containerActive)) {
        event.preventDefault();
        this.focusableLastChild.focus();
      } else if (noShift && lastActive) {
        event.preventDefault();
        this.focusableFirstChild.focus();
      }
    }
  }]);

  return Utils;
}();

exports.default = Utils;