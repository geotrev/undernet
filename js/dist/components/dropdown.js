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

var KeyCodes = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var Selectors = {
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
var Events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};
var Messages = {
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
    _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleFirstTabClose = _this._handleFirstTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleLastTabClose = _this._handleLastTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._renderWithKeys = _this._renderWithKeys.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleOffMenuClick = _this._handleOffMenuClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._activeDropdownButton = null;
    _this._activeDropdown = null;
    _this._activeDropdownMenu = null;
    _this._activeDropdownLinks = [];
    _this._allowFocusReturn = true;
    _this._activeDropdownId = "";
    _this._activeDropdownAttr = "";
    _this._activeDropdownMenuId = "";
    _this._dropdownButtons = [];
    _this._dropdowns = [];
    _this._dropdownContainerAttr = "[".concat(Selectors.DATA_DROPDOWN, "]");
    _this._dropdownTargetAttr = "[".concat(Selectors.DATA_TARGET, "]");
    return _this;
  }

  _createClass(Dropdown, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this._dropdowns = this.getElements("".concat(this._dropdownContainerAttr));
      this._dropdownButtons = this.getElements("".concat(this._dropdownContainerAttr, " > ").concat(this._dropdownTargetAttr));

      if (this._dropdowns.length) {
        this._dropdowns.forEach(function (dropdown) {
          return _this2._setupDropdown(dropdown);
        });
      }

      this._dropdownButtons.forEach(function (button) {
        button.addEventListener(Events.CLICK, _this2._render);
        button.addEventListener(Events.KEYDOWN, _this2._renderWithKeys);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this._dropdownButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this3._render);
        button.removeEventListener(Events.KEYDOWN, _this3._renderWithKeys);
      });
    }
  }, {
    key: "_render",
    value: function _render(event, key) {
      var _this4 = this;

      if (!key) event.preventDefault();
      event.stopPropagation();

      if (this._activeDropdownButton) {
        this._allowFocusReturn = false;

        this._handleClose(event);

        this._allowFocusReturn = true;
      }

      this._activeDropdownButton = event.target;

      if (!this._activeDropdownButton.getAttribute(Selectors.DATA_PARENT)) {
        return console.error(Messages.NO_PARENT_ERROR);
      }

      this._activeDropdownId = this._activeDropdownButton.getAttribute(Selectors.DATA_PARENT);
      this._activeDropdownAttr = "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(this._activeDropdownId, "\"]");

      if (!document.querySelector(this._activeDropdownAttr)) {
        return console.error(Messages.NO_DROPDOWN_ERROR(this._activeDropdownAttr));
      }

      this._activeDropdown = document.querySelector(this._activeDropdownAttr);
      this._activeDropdownMenuId = this._activeDropdownButton.getAttribute(Selectors.DATA_TARGET);
      this._activeDropdownMenu = document.getElementById(this._activeDropdownMenuId);

      this._activeDropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "true");

      this._activeDropdown.setAttribute(Selectors.DATA_VISIBLE, "true");

      this._activeDropdownButton.removeEventListener(Events.CLICK, this._render);

      this._activeDropdownButton.addEventListener(Events.CLICK, this._handleClose);

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.addEventListener(Events.CLICK, this._handleOffMenuClick);
      this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);
      this.firstDropdownLink = this._activeDropdownLinks[0];
      this.lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];
      this.firstDropdownLink.addEventListener(Events.KEYDOWN, this._handleFirstTabClose);
      this.lastDropdownLink.addEventListener(Events.KEYDOWN, this._handleLastTabClose);

      if (key && key === KeyCodes.ARROW_UP) {
        this.lastDropdownLink.focus();
      } else {
        this.firstDropdownLink.focus();
      }

      this._activeDropdownLinks.forEach(function (link) {
        link.setAttribute(Selectors.TABINDEX, "0");
        link.addEventListener(Events.CLICK, _this4._handleClose);
      });

      this.captureFocus("".concat(this._activeDropdownAttr, " > ul"), {
        useArrows: true
      });
    }
  }, {
    key: "_handleFirstTabClose",
    value: function _handleFirstTabClose(event) {
      var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
      var tabKey = event.which === KeyCodes.TAB;

      if (shiftKey && tabKey) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleLastTabClose",
    value: function _handleLastTabClose(event) {
      var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
      var tabKey = event.which === KeyCodes.TAB;

      if (tabKey && !shiftKey) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_renderWithKeys",
    value: function _renderWithKeys(event) {
      if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
        this._render(event, event.which);
      }
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      var _this5 = this;

      event.preventDefault();
      this.releaseFocus();

      this._activeDropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false");

      this._activeDropdown.setAttribute(Selectors.DATA_VISIBLE, "false");

      this._activeDropdownLinks.forEach(function (link) {
        link.setAttribute(Selectors.TABINDEX, "-1");
        link.removeEventListener(Events.CLICK, _this5._handleClose);
      });

      this._activeDropdownButton.removeEventListener(Events.CLICK, this._handleClose);

      this._activeDropdownButton.addEventListener(Events.CLICK, this._render);

      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.removeEventListener(Events.CLICK, this._handleOffMenuClick);

      if (this._allowFocusReturn) {
        this._handleReturnFocus();
      }
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
      if (event.which === KeyCodes.ESCAPE) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleOffMenuClick",
    value: function _handleOffMenuClick(event) {
      if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
        this._handleClose(event);
      }
    }
  }, {
    key: "_handleReturnFocus",
    value: function _handleReturnFocus() {
      this._activeDropdownButton.setAttribute(Selectors.TAB_INDEX, "-1");

      this._activeDropdownButton.focus();

      this._activeDropdownButton.removeAttribute(Selectors.TAB_INDEX);
    }
  }, {
    key: "_getDropdownLinks",
    value: function _getDropdownLinks(attr) {
      return this.getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
    }
  }, {
    key: "_setupDropdown",
    value: function _setupDropdown(dropdown) {
      var dropdownId = dropdown.getAttribute(Selectors.DATA_DROPDOWN);
      var dropdownIdAttr = "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
      var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");

      if (!document.querySelector("".concat(dropdownIdAttr, " > ul"))) {
        return console.error(Messages.NO_MENU_ERROR(dropdownIdAttr));
      }

      var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
      var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(this._dropdownTargetAttr));
      dropdownButton.setAttribute(Selectors.ARIA_CONTROLS, dropdownMenu.id);
      dropdownButton.setAttribute(Selectors.ARIA_HASPOPUP, "true");
      dropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false");
      dropdownMenu.setAttribute(Selectors.ARIA_LABELLEDBY, dropdownButton.id);
      var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
      dropdownMenuItems.forEach(function (item) {
        return item.setAttribute(Selectors.ROLE, "none");
      });

      this._getDropdownLinks(dropdownIdAttr).forEach(function (link) {
        link.setAttribute(Selectors.ROLE, "menuitem");
        link.setAttribute(Selectors.TABINDEX, "-1");
      });
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;
//# sourceMappingURL=dropdown.js.map