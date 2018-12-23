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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
var messages = {
  NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute.",
  NO_DROPDOWN_ERROR: function NO_DROPDOWN_ERROR(attr) {
    return "Could not find dropdown container associated with ".concat(attr, ".");
  },
  NO_MENU_ERROR: function NO_MENU_ERROR(attr) {
    return "Could not find menu associated with ".concat(attr, ".");
  }
};

var Dropdown = function (_Utils) {
  _inherits(Dropdown, _Utils);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_render", function (event, key) {
      if (!key) event.preventDefault();
      event.stopPropagation();

      if (_this.activeDropdownButton) {
        _this.allowFocusReturn = false;

        _this._handleClose(event);

        _this.allowFocusReturn = true;
      }

      _this.activeDropdownButton = event.target;

      if (!_this.activeDropdownButton.getAttribute(selectors.DATA_PARENT)) {
        return messages.NO_PARENT_ERROR;
      }

      _this.activeDropdownId = _this.activeDropdownButton.getAttribute(selectors.DATA_PARENT);
      _this.activeDropdownAttr = "[".concat(selectors.DATA_DROPDOWN, "=\"").concat(_this.activeDropdownId, "\"]");

      if (!document.querySelector(_this.activeDropdownAttr)) {
        return messages.NO_DROPDOWN_ERROR(_this.activeDropdownAttr);
      }

      _this.activeDropdown = document.querySelector(_this.activeDropdownAttr);
      _this.activeDropdownMenuId = _this.activeDropdownButton.getAttribute(selectors.DATA_TARGET);
      _this.activeDropdownMenu = document.getElementById(_this.activeDropdownMenuId);

      _this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "true");

      _this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "true");

      _this.activeDropdownButton.removeEventListener(events.CLICK, _this._render);

      _this.activeDropdownButton.addEventListener(events.CLICK, _this._handleClose);

      document.addEventListener(events.KEYDOWN, _this._handleEscapeKeyPress);
      document.addEventListener(events.CLICK, _this._handleOffMenuClick);
      _this.activeDropdownLinks = _this._getDropdownLinks(_this.activeDropdownAttr);
      _this.firstDropdownLink = _this.activeDropdownLinks[0];
      _this.lastDropdownLink = _this.activeDropdownLinks[_this.activeDropdownLinks.length - 1];

      _this.firstDropdownLink.addEventListener(events.KEYDOWN, _this._handleFirstTabClose);

      _this.lastDropdownLink.addEventListener(events.KEYDOWN, _this._handleLastTabClose);

      if (key && key === keyCodes.ARROW_UP) {
        _this.lastDropdownLink.focus();
      } else {
        _this.firstDropdownLink.focus();
      }

      _this.activeDropdownLinks.forEach(function (link) {
        link.setAttribute(selectors.TABINDEX, "0");
        link.addEventListener(events.CLICK, _this._handleClose);
      });

      _this.captureFocus("".concat(_this.activeDropdownAttr, " > ul"), {
        useArrows: true
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleFirstTabClose", function (event) {
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var tabKey = event.which === keyCodes.TAB;

      if (shiftKey && tabKey) {
        _this._handleClose(event);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleLastTabClose", function (event) {
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var tabKey = event.which === keyCodes.TAB;

      if (tabKey && !shiftKey) {
        _this._handleClose(event);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderWithKeys", function (event) {
      if (event.which === keyCodes.ARROW_UP || event.which === keyCodes.ARROW_DOWN) {
        _this._render(event, event.which);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClose", function (event) {
      event.preventDefault();

      _this.releaseFocus();

      _this.activeDropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false");

      _this.activeDropdown.setAttribute(selectors.DATA_VISIBLE, "false");

      _this.activeDropdownLinks.forEach(function (link) {
        link.setAttribute(selectors.TABINDEX, "-1");
        link.removeEventListener(events.CLICK, _this._handleClose);
      });

      _this.activeDropdownButton.removeEventListener(events.CLICK, _this._handleClose);

      _this.activeDropdownButton.addEventListener(events.CLICK, _this._render);

      document.removeEventListener(events.KEYDOWN, _this._handleEscapeKeyPress);
      document.removeEventListener(events.CLICK, _this._handleOffMenuClick);

      if (_this.allowFocusReturn) {
        _this._handleReturnFocus();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleEscapeKeyPress", function (event) {
      if (event.which === keyCodes.ESCAPE) {
        _this._handleClose(event);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleOffMenuClick", function (event) {
      if (event.target !== _this.activeDropdownButton && event.target !== _this.activeDropdownMenu) {
        _this._handleClose(event);
      }
    });

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

      this.dropdowns = this.getElements("[".concat(selectors.DATA_DROPDOWN, "]"));
      this.dropdownButtons = this.getElements(this.dropdownButtonAttr);

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
    key: "_handleReturnFocus",
    value: function _handleReturnFocus() {
      this.activeDropdownButton.setAttribute(selectors.TAB_INDEX, "-1");
      this.activeDropdownButton.focus();
      this.activeDropdownButton.removeAttribute(selectors.TAB_INDEX);
    }
  }, {
    key: "_getDropdownLinks",
    value: function _getDropdownLinks(attr) {
      return this.getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
    }
  }, {
    key: "_setupDropdown",
    value: function _setupDropdown(dropdown) {
      var dropdownId = dropdown.getAttribute(selectors.DATA_DROPDOWN);
      var dropdownIdAttr = "[".concat(selectors.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
      var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");

      if (!document.querySelector("".concat(dropdownIdAttr, " > ul"))) {
        return messages.NO_MENU_ERROR(dropdownIdAttr);
      }

      var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
      var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(this.dropdownTargetAttr));
      dropdownButton.setAttribute(selectors.ARIA_CONTROLS, dropdownMenu.id);
      dropdownButton.setAttribute(selectors.ARIA_HASPOPUP, "true");
      dropdownButton.setAttribute(selectors.ARIA_EXPANDED, "false");
      dropdownMenu.setAttribute(selectors.ARIA_LABELLEDBY, dropdownButton.id);
      var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
      dropdownMenuItems.forEach(function (item) {
        return item.setAttribute(selectors.ROLE, "none");
      });

      this._getDropdownLinks(dropdownIdAttr).forEach(function (link) {
        link.setAttribute(selectors.ROLE, "menuitem");
        link.setAttribute(selectors.TABINDEX, "-1");
      });
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;