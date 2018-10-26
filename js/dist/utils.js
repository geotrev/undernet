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
  TAB: 9
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

    this._handleFocusTrap = this._handleFocusTrap.bind(this);
    this._listenForKeyboard = this._listenForKeyboard.bind(this);
    this._listenForClick = this._listenForClick.bind(this);
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container) {
      this.focusContainerSelector = container;

      var children = this._getFocusableElements(this.focusContainerSelector);

      this.focusableFirstChild = children[0];
      this.focusableLastChild = children[children.length - 1];
      document.addEventListener(events.KEYDOWN, this._handleFocusTrap);
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      document.removeEventListener(events.KEYDOWN, this._handleFocusTrap);
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
    key: "_handleFocusTrap",
    value: function _handleFocusTrap(event) {
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