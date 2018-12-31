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

function _classPrivateFieldLooseBase(receiver, privateKey) { if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) { throw new TypeError("attempted to use private field on non-instance"); } return receiver; }

var id = 0;

function _classPrivateFieldLooseKey(name) { return "__private_" + id++ + "_" + name; }

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
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton, {
      writable: true,
      value: null
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown, {
      writable: true,
      value: null
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu, {
      writable: true,
      value: null
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn, {
      writable: true,
      value: true
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _dropdownButtons, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _dropdowns, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _dropdownTargetAttr, {
      writable: true,
      value: "[".concat(Selectors.DATA_TARGET, "]")
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _render, {
      writable: true,
      value: function value(event, key) {
        if (!key) event.preventDefault();
        event.stopPropagation();

        if (_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton]) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)[_allowFocusReturn] = false;

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)[_allowFocusReturn] = true;
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton] = event.target;

        if (!_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].getAttribute(Selectors.DATA_PARENT)) {
          return console.error(Messages.NO_PARENT_ERROR);
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId)[_activeDropdownId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].getAttribute(Selectors.DATA_PARENT);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr] = "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId)[_activeDropdownId], "\"]");

        if (!document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr])) {
          return console.error(Messages.NO_DROPDOWN_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr]));
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown)[_activeDropdown] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId)[_activeDropdownMenuId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].getAttribute(Selectors.DATA_TARGET);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu)[_activeDropdownMenu] = document.getElementById(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId)[_activeDropdownMenuId]);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].setAttribute(Selectors.ARIA_EXPANDED, "true");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown)[_activeDropdown].setAttribute(Selectors.DATA_VISIBLE, "true");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _render)[_render]);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);

        document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress)[_handleEscapeKeyPress]);
        document.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick)[_handleOffMenuClick]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _getDropdownLinks)[_getDropdownLinks](_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr]);
        _this.firstDropdownLink = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks][0];
        _this.lastDropdownLink = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks][_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks].length - 1];

        _this.firstDropdownLink.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleFirstTabClose)[_handleFirstTabClose]);

        _this.lastDropdownLink.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleLastTabClose)[_handleLastTabClose]);

        if (key && key === KeyCodes.ARROW_UP) {
          _this.lastDropdownLink.focus();
        } else {
          _this.firstDropdownLink.focus();
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks].forEach(function (link) {
          link.setAttribute(Selectors.TABINDEX, "0");
          link.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);
        });

        _this.captureFocus("".concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr], " > ul"), {
          useArrows: true
        });
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleFirstTabClose, {
      writable: true,
      value: function value(event) {
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes.TAB;

        if (shiftKey && tabKey) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleLastTabClose, {
      writable: true,
      value: function value(event) {
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes.TAB;

        if (tabKey && !shiftKey) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _renderWithKeys, {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _render)[_render](event, event.which);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose, {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _this.releaseFocus();

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].setAttribute(Selectors.ARIA_EXPANDED, "false");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown)[_activeDropdown].setAttribute(Selectors.DATA_VISIBLE, "false");

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks].forEach(function (link) {
          link.setAttribute(Selectors.TABINDEX, "-1");
          link.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);
        });

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _render)[_render]);

        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress)[_handleEscapeKeyPress]);
        document.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick)[_handleOffMenuClick]);

        if (_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)[_allowFocusReturn]) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus)[_handleReturnFocus]();
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress, {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes.ESCAPE) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick, {
      writable: true,
      value: function value(event) {
        if (event.target !== _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton] && event.target !== _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu)[_activeDropdownMenu]) {
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
        }
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus, {
      value: _handleReturnFocus2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _getDropdownLinks, {
      value: _getDropdownLinks2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _setupDropdown, {
      value: _setupDropdown2
    });
    return _this;
  }

  _createClass(Dropdown, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldLooseBase(this, _dropdowns)[_dropdowns] = this.getElements("[".concat(Selectors.DATA_DROPDOWN, "]"));
      _classPrivateFieldLooseBase(this, _dropdownButtons)[_dropdownButtons] = this.getElements("[".concat(Selectors.DATA_DROPDOWN, "] > ").concat(_classPrivateFieldLooseBase(this, _dropdownTargetAttr)[_dropdownTargetAttr]));

      if (_classPrivateFieldLooseBase(this, _dropdowns)[_dropdowns].length) {
        _classPrivateFieldLooseBase(this, _dropdowns)[_dropdowns].forEach(function (dropdown) {
          return _classPrivateFieldLooseBase(_this2, _setupDropdown)[_setupDropdown](dropdown);
        });
      }

      _classPrivateFieldLooseBase(this, _dropdownButtons)[_dropdownButtons].forEach(function (button) {
        button.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this2, _render)[_render]);
        button.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_this2, _renderWithKeys)[_renderWithKeys]);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldLooseBase(this, _dropdownButtons)[_dropdownButtons].forEach(function (button) {
        button.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this3, _render)[_render]);
        button.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_this3, _renderWithKeys)[_renderWithKeys]);
      });
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;

var _activeDropdownButton = _classPrivateFieldLooseKey("activeDropdownButton");

var _activeDropdown = _classPrivateFieldLooseKey("activeDropdown");

var _activeDropdownMenu = _classPrivateFieldLooseKey("activeDropdownMenu");

var _activeDropdownLinks = _classPrivateFieldLooseKey("activeDropdownLinks");

var _allowFocusReturn = _classPrivateFieldLooseKey("allowFocusReturn");

var _activeDropdownId = _classPrivateFieldLooseKey("activeDropdownId");

var _activeDropdownAttr = _classPrivateFieldLooseKey("activeDropdownAttr");

var _activeDropdownMenuId = _classPrivateFieldLooseKey("activeDropdownMenuId");

var _dropdownButtons = _classPrivateFieldLooseKey("dropdownButtons");

var _dropdowns = _classPrivateFieldLooseKey("dropdowns");

var _dropdownTargetAttr = _classPrivateFieldLooseKey("dropdownTargetAttr");

var _render = _classPrivateFieldLooseKey("render");

var _handleFirstTabClose = _classPrivateFieldLooseKey("handleFirstTabClose");

var _handleLastTabClose = _classPrivateFieldLooseKey("handleLastTabClose");

var _renderWithKeys = _classPrivateFieldLooseKey("renderWithKeys");

var _handleClose = _classPrivateFieldLooseKey("handleClose");

var _handleEscapeKeyPress = _classPrivateFieldLooseKey("handleEscapeKeyPress");

var _handleOffMenuClick = _classPrivateFieldLooseKey("handleOffMenuClick");

var _handleReturnFocus = _classPrivateFieldLooseKey("handleReturnFocus");

var _getDropdownLinks = _classPrivateFieldLooseKey("getDropdownLinks");

var _setupDropdown = _classPrivateFieldLooseKey("setupDropdown");

var _handleReturnFocus2 = function _handleReturnFocus2() {
  _classPrivateFieldLooseBase(this, _activeDropdownButton)[_activeDropdownButton].setAttribute(Selectors.TAB_INDEX, "-1");

  _classPrivateFieldLooseBase(this, _activeDropdownButton)[_activeDropdownButton].focus();

  _classPrivateFieldLooseBase(this, _activeDropdownButton)[_activeDropdownButton].removeAttribute(Selectors.TAB_INDEX);
};

var _getDropdownLinks2 = function _getDropdownLinks2(attr) {
  return this.getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
};

var _setupDropdown2 = function _setupDropdown2(dropdown) {
  var dropdownId = dropdown.getAttribute(Selectors.DATA_DROPDOWN);
  var dropdownIdAttr = "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
  var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");

  if (!document.querySelector("".concat(dropdownIdAttr, " > ul"))) {
    return console.error(Messages.NO_MENU_ERROR(dropdownIdAttr));
  }

  var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
  var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(_classPrivateFieldLooseBase(this, _dropdownTargetAttr)[_dropdownTargetAttr]));
  dropdownButton.setAttribute(Selectors.ARIA_CONTROLS, dropdownMenu.id);
  dropdownButton.setAttribute(Selectors.ARIA_HASPOPUP, "true");
  dropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false");
  dropdownMenu.setAttribute(Selectors.ARIA_LABELLEDBY, dropdownButton.id);
  var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
  dropdownMenuItems.forEach(function (item) {
    return item.setAttribute(Selectors.ROLE, "none");
  });

  _classPrivateFieldLooseBase(this, _getDropdownLinks)[_getDropdownLinks](dropdownIdAttr).forEach(function (link) {
    link.setAttribute(Selectors.ROLE, "menuitem");
    link.setAttribute(Selectors.TABINDEX, "-1");
  });
};