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
    _classCallCheck(this, Utils);

    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);
    this._listenForKeyboard = this._listenForKeyboard.bind(this);
    this._listenForClick = this._listenForClick.bind(this);
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
      this.focusableChildren = this._getFocusableElements(this.focusContainerSelector);
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
    key: "_listenForKeyboard",
    value: function _listenForKeyboard(event) {
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var arrowUp = event.which === keyCodes.ARROW_UP;
      var arrowDown = event.which === keyCodes.ARROW_DOWN;

      if (tabKey || shiftKey || arrowUp || arrowDown) {
        document.body.classList.add(selectors.KEYBOARD_CLASS);
        document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
        document.addEventListener(events.CLICK, this._listenForClick);
        this.listeningForKeydown = false;
      }
    }
  }, {
    key: "_listenForClick",
    value: function _listenForClick(event) {
      document.body.classList.remove(selectors.KEYBOARD_CLASS);
      document.removeEventListener(events.CLICK, this._listenForClick);
      document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
      this.listeningForKeydown = true;
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
      var focusables = selectors.FOCUSABLE_TAGS.map(function (element) {
        return "".concat(container, " ").concat(element).concat(selectors.NOT_VISUALLY_HIDDEN);
      });
      return this._getElements(focusables.join(", "));
    }
  }, {
    key: "_handleFocusTrapWithTab",
    value: function _handleFocusTrapWithTab(event) {
      var containerElement = document.querySelector(this.focusContainerSelector);
      var containerActive = document.activeElement === containerElement;
      var firstActive = document.activeElement === this.focusableFirstChild;
      var lastActive = document.activeElement === this.focusableLastChild;
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var hasShift = shiftKey && tabKey;
      var noShift = !shiftKey && tabKey;

      if (shiftKey && tabKey && (firstActive || containerActive)) {
        event.preventDefault();
        this.focusableLastChild.focus();
      } else if (!shiftKey && tabKey && lastActive) {
        event.preventDefault();
        this.focusableFirstChild.focus();
      }
    }
  }, {
    key: "_handleFocusTrapWithArrows",
    value: function _handleFocusTrapWithArrows(event) {
      var firstActive = document.activeElement === this.focusableFirstChild;
      var lastActive = document.activeElement === this.focusableLastChild;
      var arrowUp = event.which === keyCodes.ARROW_UP;
      var arrowDown = event.which === keyCodes.ARROW_DOWN;

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