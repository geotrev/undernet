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
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  SPACE: 32,
  ESCAPE: 27
};
var selectors = {
  // unique
  DATA_DROPDOWN: "data-dropdown",
  // common
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  // accessibility
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
var messages = {
  MISSING_DROPDOWN: "You have a dropdown button missing its corresponding menu." // Attributes for button in JS:
  // - aria-haspopup="true"
  // - aria-expanded="false"
  // - aria-controls === ul id
  //
  // Attributes for ul in JS:
  // - aria-labelledby === button id
  // - list items have role="none"
  // - anchors inside li have role="menuitem"
  //
  // Opens with:
  // - Down arrow, focus to first element
  // - Up arrow, focus to last element
  // - Space
  // - Enter
  //
  // `tabindex` on menu items set to "0":
  // - When menu is open
  //
  // `tabindex` on menu items set to "-1":
  // - When menu is closed
  //
  // Close menu:
  // - Escape
  //
  // Trap focus:
  // - Using arrow keys (up and down)
  //
  // Stop trapping focus and close menu:
  // - Using tab on last item, or shift+tab on first item
  //
  // Set focus to menu button
  // - When menu is closed

  /**
   * Dropdown component class.
   * @module Dropdown
   * @requires Utils
   */

};

var Dropdown =
/*#__PURE__*/
function (_Utils) {
  _inherits(Dropdown, _Utils);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this)); //  dropdown event methods

    _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this))); // active dropdown

    _this.activeDropdownButton = {};
    _this.activeDropdownId = "";
    _this.activeDropdownAttr = "";
    _this.activeDropdownMenuId = "";
    _this.activeDropdown = {};
    _this.activeDropdownMenu = {};
    _this.activeDropdownLinks = []; // all dropdowns

    _this.dropdowns = [];
    _this.dropdownButtons = [];
    _this.dropdownAttr = "[".concat(selectors.DATA_DROPDOWN, "]");
    _this.dropdownButtonAttr = "[".concat(selectors.DATA_DROPDOWN, "] > [").concat(selectors.DATA_TARGET, "]");
    return _this;
  } // public


  _createClass(Dropdown, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.dropdowns = this._getElements(this.dropdownAttr);
      this.dropdownButtons = this._getElements(this.dropdownButtonAttr);

      if (this.dropdowns.length) {
        this.dropdowns.forEach(function (dropdown) {
          _this2._setupDropdown(dropdown);
        });
      }

      this.dropdownButtons.forEach(function (button) {
        button.addEventListener(events.CLICK, _this2._render);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.dropdownButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3._render);
      });
    } // private

  }, {
    key: "_render",
    value: function _render(event) {
      var _this4 = this;

      // dropdown button / trigger
      this.activeDropdownButton = event.target;
      this.activeDropdownId = this.activeDropdownButton.getAttribute(selectors.DATA_PARENT);

      if (!this.activeDropdownId || !document.getElementById(this.activeDropdownId)) {
        throw messages.MISSING_DROPDOWN;
        return;
      }

      this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true"); // dropdown container

      this.activeDropdownAttr = "[".concat(selectors.DATA_DROPDOWN, "=\"").concat(this.activeDropdownId, "\"]");
      this.activeDropdown = document.querySelector(this.activeDropdownAttr); // dropdown menu

      this.activeDropdownMenuId = this.activeDropdownButton.getAttribute(selectors.DATA_TARGET);
      this.activeDropdownMenu = document.getElementById(this.activeDropdownMenuId);
      this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true");
      this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "true");
      this.activeDropdownLinks = this._getElements("".concat(this.activeDropdownAttr, " > ul > li > a"));
      var accordionContentHasAttr = this.activeContent.hasAttribute(selectors.CONTENT);

      if (!accordionContentHasAttr) {
        throw messages.MISSING_CONTENT;
        return;
      }

      this.activeDropdownLinks.forEach(function (link) {
        link.setAttribute(selectors.TABINDEX, "0");
        link.addEventListener(events.CLICK, _this4._handleClose);
      });
    }
  }, {
    key: "_handleClose",
    value: function _handleClose() {
      var _this5 = this;

      this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false");
      this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "false");
      this.activeDropdownLinks.forEach(function (link) {
        link.setAttribute(selectors.TABINDEX, "-1");
        link.removeEventListener(events.CLICK, _this5._handleClose);
      });
    }
  }, {
    key: "_setupDropdown",
    value: function _setupDropdown(dropdown) {
      var dropdownId = dropdown.getAttribute(selectors.DATA_DROPDOWN);
      var dropdownIdAttr = "[".concat(selectors.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
      var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
      var dropdownMenuId = dropdownMenu.id;

      var dropdownMenuItems = this._getElements("".concat(dropdownIdAttr, " > ul > li"));

      var dropdownMenuItemLinks = this._getElements("".concat(dropdownIdAttr, " > ul > li > a"));

      var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(selectors.DATA_TARGET));
      var dropdownButtonId = dropdownButton.id;
      dropdownButton.setAttribute(selectors.ARIA_CONTROLS, dropdownMenuId);
      dropdownButton.setAttribute(selectors.ARIA_HASPOPUP, "true");
      dropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false");
      dropdownMenu.setAttribute(selectors.ARIA_LABELLEDBY, dropdownButtonId);
      dropdownMenuItems.forEach(function (item) {
        item.setAttribute(selectors.ROLE, "none");
      });
      dropdownMenuItemLinks.forEach(function (link) {
        link.setAttribute(selectors.ROLE, "menuitem");
        link.setAttribute(selectors.TABINDEX, "-1");
      });
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;