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

var keyCodes = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var selectors = {
  DATA_DROPDOWN: "data-dropdown",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  TABINDEX: "tabindex",
  ARIA_HASPOPUP: "aria-haspopup",
  ARIA_CONTROLS: "aria-controls",
  ARIA_LABELLEDBY: "aria-labelledby",
  ARIA_EXPANDED: "aria-expanded",
  ROLE: "role"
};
var events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};

var Dropdown = function (_Utils) {
  _inherits(Dropdown, _Utils);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));
    _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._renderWithKeys = _this._renderWithKeys.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleOffMenuClick = _this._handleOffMenuClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleFirstTabClose = _this._handleFirstTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleLastTabClose = _this._handleLastTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.activeDropdownButton = null;
    _this.activeDropdown = null;
    _this.activeDropdownMenu = null;
    _this.activeDropdownLinks = [];
    _this.allowFocusReturn = true;
    _this.activeDropdownId = "";
    _this.activeDropdownAttr = "";
    _this.activeDropdownMenuId = "";
    _this.dropdownButtons = [];
    _this.dropdowns = [];
    _this.dropdownTargetAttr = "[".concat(selectors.DATA_TARGET, "]");
    _this.dropdownButtonAttr = "[".concat(selectors.DATA_DROPDOWN, "] > ").concat(_this.dropdownTargetAttr);
    return _this;
  }

  _createClass(Dropdown, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.dropdowns = this._getElements("[".concat(selectors.DATA_DROPDOWN, "]"));
      this.dropdownButtons = this._getElements(this.dropdownButtonAttr);

      if (this.dropdowns.length) {
        this.dropdowns.forEach(function (dropdown) {
          return _this2._setupDropdown(dropdown);
        });
      }

      this.dropdownButtons.forEach(function (button) {
        button.addEventListener(events.CLICK, _this2._render);
        button.addEventListener(events.KEYDOWN, _this2._renderWithKeys);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.dropdownButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3._render);
        button.removeEventListener(events.KEYDOWN, _this3._renderWithKeys);
      });
    }
  }, {
    key: "_render",
    value: function _render(event, key) {
      var _this4 = this;

      if (!key) event.preventDefault();
      event.stopPropagation();

      if (this.activeDropdownButton) {
        this.allowFocusReturn = false;

        this._handleClose(event);

        this.allowFocusReturn = true;
      }

      this.activeDropdownButton = event.target;
      this.activeDropdownId = this.activeDropdownButton.getAttribute(selectors.DATA_PARENT);
      this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true");
      this.activeDropdownAttr = "[".concat(selectors.DATA_DROPDOWN, "=\"").concat(this.activeDropdownId, "\"]");
      this.activeDropdown = document.querySelector(this.activeDropdownAttr);
      this.activeDropdownMenuId = this.activeDropdownButton.getAttribute(selectors.DATA_TARGET);
      this.activeDropdownMenu = document.getElementById(this.activeDropdownMenuId);
      this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true");
      this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "true");
      this.activeDropdownButton.removeEventListener(events.CLICK, this._render);
      this.activeDropdownButton.addEventListener(events.CLICK, this._handleClose);
      document.addEventListener(events.KEYDOWN, this._handleEscapeKeyPress);
      document.addEventListener(events.CLICK, this._handleOffMenuClick);
      var buttonSelector = "".concat(this.activeDropdownAttr, " > ul > li");
      this.activeDropdownLinks = this._getElements("".concat(buttonSelector, " > a, ").concat(buttonSelector, " > button"));
      this.firstDropdownLink = this.activeDropdownLinks[0];
      this.lastDropdownLink = this.activeDropdownLinks[this.activeDropdownLinks.length - 1];
      this.firstDropdownLink.addEventListener(events.KEYDOWN, this._handleFirstTabClose);
      this.lastDropdownLink.addEventListener(events.KEYDOWN, this._handleLastTabClose);

      if (key && key === keyCodes.ARROW_UP) {
        this.lastDropdownLink.focus();
      } else {
        this.firstDropdownLink.focus();
      }

      this.activeDropdownLinks.forEach(function (link) {
        link.setAttribute(selectors.TABINDEX, "0");
        link.addEventListener(events.CLICK, _this4._handleClose);
      });
      this.captureFocus("".concat(this.activeDropdownAttr, " > ul"), {
        useArrows: true
      });
    }
  }, {
    key: "_handleFirstTabClose",
    value: function _handleFirstTabClose(event) {
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var tabKey = event.which === keyCodes.TAB;

      if (shiftKey && tabKey) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleLastTabClose",
    value: function _handleLastTabClose(event) {
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var tabKey = event.which === keyCodes.TAB;

      if (tabKey && !shiftKey) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_renderWithKeys",
    value: function _renderWithKeys(event) {
      if (event.which === keyCodes.ARROW_UP || event.which === keyCodes.ARROW_DOWN) {
        this._render(event, event.which);
      }
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      var _this5 = this;

      event.preventDefault();
      this.releaseFocus();
      this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false");
      this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "false");
      this.activeDropdownLinks.forEach(function (link) {
        link.setAttribute(selectors.TABINDEX, "-1");
        link.removeEventListener(events.CLICK, _this5._handleClose);
      });
      this.activeDropdownButton.removeEventListener(events.CLICK, this._handleClose);
      this.activeDropdownButton.addEventListener(events.CLICK, this._render);
      document.removeEventListener(events.KEYDOWN, this._handleEscapeKeyPress);
      document.removeEventListener(events.CLICK, this._handleOffMenuClick);

      if (this.allowFocusReturn) {
        this._handleReturnFocus();
      }
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
      if (event.which === keyCodes.ESCAPE) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleOffMenuClick",
    value: function _handleOffMenuClick(event) {
      if (event.target !== this.activeDropdownButton && event.target !== this.activeDropdownMenu) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleReturnFocus",
    value: function _handleReturnFocus() {
      this.activeDropdownButton.setAttribute(selectors.TAB_INDEX, "-1");
      this.activeDropdownButton.focus();
      this.activeDropdownButton.removeAttribute(selectors.TAB_INDEX);
    }
  }, {
    key: "_setupDropdown",
    value: function _setupDropdown(dropdown) {
      var dropdownId = dropdown.getAttribute(selectors.DATA_DROPDOWN);
      var dropdownIdAttr = "[".concat(selectors.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
      var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");
      var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
      var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(this.dropdownTargetAttr));
      dropdownButton.setAttribute(selectors.ARIA_CONTROLS, dropdownMenu.id);
      dropdownButton.setAttribute(selectors.ARIA_HASPOPUP, "true");
      dropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false");
      dropdownMenu.setAttribute(selectors.ARIA_LABELLEDBY, dropdownButton.id);

      var dropdownMenuItems = this._getElements(dropdownMenuItemsAttr);

      dropdownMenuItems.forEach(function (item) {
        return item.setAttribute(selectors.ROLE, "none");
      });

      var dropdownMenuItemLinks = this._getElements("".concat(dropdownMenuItemsAttr, " > a, ").concat(dropdownMenuItemsAttr, " > button"));

      dropdownMenuItemLinks.forEach(function (link) {
        link.setAttribute(selectors.ROLE, "menuitem");
        link.setAttribute(selectors.TABINDEX, "-1");
      });
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;