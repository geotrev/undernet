"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.iOSMobile = exports.getFocusableElements = exports.dom = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var Selectors = {
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard",
  NOT_VISUALLY_HIDDEN_CLASS: ":not(.is-visually-hidden)"
};
var Events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};
var dom = {
  attr: function attr(element, _attr, newValue) {
    if (newValue === false) {
      return element.removeAttribute(_attr);
    }

    if (typeof newValue === "string" || newValue === null) {
      return element.setAttribute(_attr, newValue);
    }

    return element.getAttribute(_attr);
  },
  hasAttr: function hasAttr(element, attr) {
    return element.hasAttribute(attr);
  },
  find: function find(selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return parent.querySelector(selector);
  },
  findAll: function findAll(selector) {
    var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return _toConsumableArray(parent.querySelectorAll(selector));
  },
  css: function css(element, property, value) {
    if (typeof value === "string" || value === null) {
      return element.style[property] = value;
    }

    return element.style[property];
  },
  addClass: function addClass(element) {
    var _element$classList;

    for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      classes[_key - 1] = arguments[_key];
    }

    return (_element$classList = element.classList).add.apply(_element$classList, classes);
  },
  removeClass: function removeClass(element) {
    var _element$classList2;

    for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      classes[_key2 - 1] = arguments[_key2];
    }

    return (_element$classList2 = element.classList).remove.apply(_element$classList2, classes);
  },
  hasClass: function hasClass(element) {
    for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      classes[_key3 - 1] = arguments[_key3];
    }

    if (classes.length) {
      return classes.filter(function (cls) {
        return element.classList.contains(cls);
      }).length;
    }

    return element.classList.contains(classes[0]);
  }
};
exports.dom = dom;

var getFocusableElements = function getFocusableElements(container) {
  var focusables = Selectors.FOCUSABLE_TAGS.map(function (element) {
    return "".concat(container, " ").concat(element).concat(Selectors.NOT_VISUALLY_HIDDEN_CLASS);
  }).join(", ");
  return dom.findAll(focusables);
};

exports.getFocusableElements = getFocusableElements;
var iOSMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent);
exports.iOSMobile = iOSMobile;

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
      this._focusableChildren = getFocusableElements(this._focusContainerSelector);
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
    key: "_listenForKeyboard",
    value: function _listenForKeyboard() {
      document.body.classList.add(Selectors.KEYBOARD_CLASS);
      document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
      document.addEventListener(Events.CLICK, this._listenForClick);
      this._listeningForKeydown = false;
    }
  }, {
    key: "_listenForClick",
    value: function _listenForClick() {
      document.body.classList.remove(Selectors.KEYBOARD_CLASS);
      document.removeEventListener(Events.CLICK, this._listenForClick);
      document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
      this._listeningForKeydown = true;
    }
  }, {
    key: "_handleFocusTrapWithTab",
    value: function _handleFocusTrapWithTab(event) {
      var containerElement = dom.find(this._focusContainerSelector);
      var containerActive = document.activeElement === containerElement;
      var firstActive = document.activeElement === this._focusableFirstChild;
      var lastActive = document.activeElement === this._focusableLastChild;
      var tabKey = event.which === KeyCodes.TAB;
      var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
      var hasShift = shiftKey && tabKey;
      var noShift = !shiftKey && tabKey;

      if (hasShift && (firstActive || containerActive)) {
        event.preventDefault();

        this._focusableLastChild.focus();
      } else if (noShift && lastActive) {
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