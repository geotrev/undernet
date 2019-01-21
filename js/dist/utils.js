"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
    _classCallCheck(this, Utils);

    this._listenForKeyboard = this._listenForKeyboard.bind(this);
    this._listenForClick = this._listenForClick.bind(this);
    this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
    this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);
    this._focusContainerSelector = "";
    this._focusableChildren = [];
    this._focusableFirstChild = {};
    this._focusableLastChild = {};
    this._listeningForKeydown = false;
    this._trapFocusWithArrows = false;
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container, options) {
      this._focusContainerSelector = container;
      this._focusableChildren = this.getFocusableElements(this._focusContainerSelector);
      this._focusableFirstChild = this._focusableChildren[0];
      this._focusableLastChild = this._focusableChildren[this._focusableChildren.length - 1];

      if (options) {
        if (options.useArrows) {
          this._trapFocusWithArrows = options.useArrows || this._trapFocusWithArrows;
          document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
        }
      } else {
        document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
      }
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      if (this._trapFocusWithArrows) {
        document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
        this._trapFocusWithArrows = false;
      } else {
        document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
      }
    }
  }, {
    key: "enableFocusOutline",
    value: function enableFocusOutline() {
      document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
    }
  }, {
    key: "disableFocusOutline",
    value: function disableFocusOutline() {
      if (this._listeningForKeydown) {
        document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
      } else {
        document.removeEventListener(Events.CLICK, this._listenForClick);
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
  }, {
    key: "_listenForKeyboard",
    value: function _listenForKeyboard(event) {
      var tabKey = event.which === KeyCodes.TAB;
      var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
      var arrowUp = event.which === KeyCodes.ARROW_UP;
      var arrowDown = event.which === KeyCodes.ARROW_DOWN;

      if (tabKey || shiftKey || arrowUp || arrowDown) {
        document.body.classList.add(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
        document.addEventListener(Events.CLICK, this._listenForClick);
        this._listeningForKeydown = false;
      }
    }
  }, {
    key: "_listenForClick",
    value: function _listenForClick(event) {
      document.body.classList.remove(Selectors.KEYBOARD_CLASS);
      document.removeEventListener(Events.CLICK, this._listenForClick);
      document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
      this._listeningForKeydown = true;
    }
  }, {
    key: "_handleFocusTrapWithTab",
    value: function _handleFocusTrapWithTab(event) {
      var containerElement = document.querySelector(this._focusContainerSelector);
      var containerActive = document.activeElement === containerElement;
      var firstActive = document.activeElement === this._focusableFirstChild;
      var lastActive = document.activeElement === this._focusableLastChild;
      var tabKey = event.which === KeyCodes.TAB;
      var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
      var hasShift = shiftKey && tabKey;
      var noShift = !shiftKey && tabKey;

      if (shiftKey && tabKey && (firstActive || containerActive)) {
        event.preventDefault();

        this._focusableLastChild.focus();
      } else if (!shiftKey && tabKey && lastActive) {
        event.preventDefault();

        this._focusableFirstChild.focus();
      }
    }
  }, {
    key: "_handleFocusTrapWithArrows",
    value: function _handleFocusTrapWithArrows(event) {
      var firstActive = document.activeElement === this._focusableFirstChild;
      var lastActive = document.activeElement === this._focusableLastChild;
      var arrowUp = event.which === KeyCodes.ARROW_UP;
      var arrowDown = event.which === KeyCodes.ARROW_DOWN;

      if (arrowUp || arrowDown) {
        event.preventDefault();

        if (firstActive && arrowUp) {
          this._focusableLastChild.focus();
        } else if (lastActive && arrowDown) {
          this._focusableFirstChild.focus();
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
      for (var i = 0; i < this._focusableChildren.length; i++) {
        if (this._focusableChildren[i] === document.activeElement) {
          this._focusableChildren[i + 1].focus();

          break;
        }
      }
    }
  }, {
    key: "_focusLastChild",
    value: function _focusLastChild() {
      for (var i = 0; i < this._focusableChildren.length; i++) {
        if (this._focusableChildren[i] === document.activeElement) {
          this._focusableChildren[i - 1].focus();

          break;
        }
      }
    }
  }]);

  return Utils;
}();

exports.default = Utils;
//# sourceMappingURL=utils.js.map