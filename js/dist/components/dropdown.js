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

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

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

    _activeDropdownButton.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: null
    });

    _activeDropdown.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: null
    });

    _activeDropdownMenu.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: null
    });

    _activeDropdownLinks.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _allowFocusReturn.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: true
    });

    _activeDropdownId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeDropdownAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeDropdownMenuId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _dropdownButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _dropdowns.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _dropdownContainerAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: "[".concat(Selectors.DATA_DROPDOWN, "]")
    });

    _dropdownTargetAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: "[".concat(Selectors.DATA_TARGET, "]")
    });

    _render.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event, key) {
        if (!key) event.preventDefault();
        event.stopPropagation();

        if (_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)) {
          _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn, false);

          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);

          _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn, true);
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton, event.target);

        if (!_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).getAttribute(Selectors.DATA_PARENT)) {
          return console.error(Messages.NO_PARENT_ERROR);
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).getAttribute(Selectors.DATA_PARENT));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr, "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId), "\"]"));

        if (!document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr))) {
          return console.error(Messages.NO_DROPDOWN_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).getAttribute(Selectors.DATA_TARGET));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu, document.getElementById(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId)));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).setAttribute(Selectors.ARIA_EXPANDED, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown).setAttribute(Selectors.DATA_VISIBLE, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).removeEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _render));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).addEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));

        document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress));
        document.addEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks, _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _getDropdownLinks, _getDropdownLinks2).call(_assertThisInitialized(_assertThisInitialized(_this)), _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)));

        _this.firstDropdownLink = _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[0];
        _this.lastDropdownLink = _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks).length - 1];

        _this.firstDropdownLink.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleFirstTabClose));

        _this.lastDropdownLink.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleLastTabClose));

        if (key && key === KeyCodes.ARROW_UP) {
          _this.lastDropdownLink.focus();
        } else {
          _this.firstDropdownLink.focus();
        }

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks).forEach(function (link) {
          link.setAttribute(Selectors.TABINDEX, "0");
          link.addEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));
        });

        _this.captureFocus("".concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr), " > ul"), {
          useArrows: true
        });
      }
    });

    _handleFirstTabClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes.TAB;

        if (shiftKey && tabKey) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleLastTabClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes.TAB;

        if (tabKey && !shiftKey) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _renderWithKeys.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes.ARROW_UP || event.which === KeyCodes.ARROW_DOWN) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _render).call(_assertThisInitialized(_assertThisInitialized(_this)), event, event.which);
        }
      }
    });

    _handleClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _this.releaseFocus();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).setAttribute(Selectors.ARIA_EXPANDED, "false");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown).setAttribute(Selectors.DATA_VISIBLE, "false");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks).forEach(function (link) {
          link.setAttribute(Selectors.TABINDEX, "-1");
          link.removeEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));
        });

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).removeEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).addEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _render));

        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress));
        document.removeEventListener(Events.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick));

        if (_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)) {
          _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus, _handleReturnFocus2).call(_assertThisInitialized(_assertThisInitialized(_this)));
        }
      }
    });

    _handleEscapeKeyPress.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes.ESCAPE) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleOffMenuClick.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.target !== _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton) && event.target !== _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu)) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleReturnFocus.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getDropdownLinks.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _setupDropdown.add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Dropdown, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldSet(this, _dropdowns, this.getElements("".concat(_classPrivateFieldGet(this, _dropdownContainerAttr))));

      _classPrivateFieldSet(this, _dropdownButtons, this.getElements("".concat(_classPrivateFieldGet(this, _dropdownContainerAttr), " > ").concat(_classPrivateFieldGet(this, _dropdownTargetAttr))));

      if (_classPrivateFieldGet(this, _dropdowns).length) {
        _classPrivateFieldGet(this, _dropdowns).forEach(function (dropdown) {
          return _classPrivateMethodGet(_this2, _setupDropdown, _setupDropdown2).call(_this2, dropdown);
        });
      }

      _classPrivateFieldGet(this, _dropdownButtons).forEach(function (button) {
        button.addEventListener(Events.CLICK, _classPrivateFieldGet(_this2, _render));
        button.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_this2, _renderWithKeys));
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldGet(this, _dropdownButtons).forEach(function (button) {
        button.removeEventListener(Events.CLICK, _classPrivateFieldGet(_this3, _render));
        button.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(_this3, _renderWithKeys));
      });
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;

var _activeDropdownButton = new WeakMap();

var _activeDropdown = new WeakMap();

var _activeDropdownMenu = new WeakMap();

var _activeDropdownLinks = new WeakMap();

var _allowFocusReturn = new WeakMap();

var _activeDropdownId = new WeakMap();

var _activeDropdownAttr = new WeakMap();

var _activeDropdownMenuId = new WeakMap();

var _dropdownButtons = new WeakMap();

var _dropdowns = new WeakMap();

var _dropdownContainerAttr = new WeakMap();

var _dropdownTargetAttr = new WeakMap();

var _render = new WeakMap();

var _handleFirstTabClose = new WeakMap();

var _handleLastTabClose = new WeakMap();

var _renderWithKeys = new WeakMap();

var _handleClose = new WeakMap();

var _handleEscapeKeyPress = new WeakMap();

var _handleOffMenuClick = new WeakMap();

var _handleReturnFocus = new WeakSet();

var _getDropdownLinks = new WeakSet();

var _setupDropdown = new WeakSet();

var _handleReturnFocus2 = function _handleReturnFocus2() {
  _classPrivateFieldGet(this, _activeDropdownButton).setAttribute(Selectors.TAB_INDEX, "-1");

  _classPrivateFieldGet(this, _activeDropdownButton).focus();

  _classPrivateFieldGet(this, _activeDropdownButton).removeAttribute(Selectors.TAB_INDEX);
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
  var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(_classPrivateFieldGet(this, _dropdownTargetAttr)));
  dropdownButton.setAttribute(Selectors.ARIA_CONTROLS, dropdownMenu.id);
  dropdownButton.setAttribute(Selectors.ARIA_HASPOPUP, "true");
  dropdownButton.setAttribute(Selectors.ARIA_EXPANDED, "false");
  dropdownMenu.setAttribute(Selectors.ARIA_LABELLEDBY, dropdownButton.id);
  var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
  dropdownMenuItems.forEach(function (item) {
    return item.setAttribute(Selectors.ROLE, "none");
  });

  _classPrivateMethodGet(this, _getDropdownLinks, _getDropdownLinks2).call(this, dropdownIdAttr).forEach(function (link) {
    link.setAttribute(Selectors.ROLE, "menuitem");
    link.setAttribute(Selectors.TABINDEX, "-1");
  });
};