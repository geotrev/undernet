"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireWildcard(require("./utils"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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
  NO_DROPDOWN_ID_ERROR: "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value.",
  NO_MENU_ERROR: function NO_MENU_ERROR(attr) {
    return "Could not find menu associated with ".concat(attr, ".");
  },
  NO_DROPDOWN_ITEMS_ERROR: function NO_DROPDOWN_ITEMS_ERROR(attr) {
    return "Could not find any list items associated with ".concat(attr, ".");
  },
  NO_DROPDOWN_BUTTONS_ERROR: function NO_DROPDOWN_BUTTONS_ERROR(attr) {
    return "Could not find any button or anchor elements associated with ".concat(attr, ".");
  },
  NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute."
};

var Dropdown = function (_Utils) {
  _inherits(Dropdown, _Utils);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));
    _this._render = _this._render.bind(_assertThisInitialized(_this));
    _this._handleFirstTabClose = _this._handleFirstTabClose.bind(_assertThisInitialized(_this));
    _this._handleLastTabClose = _this._handleLastTabClose.bind(_assertThisInitialized(_this));
    _this._renderWithKeys = _this._renderWithKeys.bind(_assertThisInitialized(_this));
    _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_this));
    _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_this));
    _this._handleOffMenuClick = _this._handleOffMenuClick.bind(_assertThisInitialized(_this));
    _this._activeDropdown = {};
    _this._activeDropdownButton = null;
    _this._activeDropdownMenu = {};
    _this._activeDropdownLinks = [];
    _this._allowFocusReturn = true;
    _this._activeDropdownId = "";
    _this._activeDropdownAttr = "";
    _this._activeDropdownMenuId = "";
    _this._firstDropdownLink = {};
    _this._lastDropdownLink = {};
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

      this._dropdowns = _utils.dom.findAll("".concat(this._dropdownContainerAttr));
      this._dropdownButtons = _utils.dom.findAll("".concat(this._dropdownContainerAttr, " > ").concat(this._dropdownTargetAttr));

      if (this._dropdowns.length) {
        this._dropdowns.forEach(function (instance) {
          return _this2._setup(instance);
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
    key: "_setup",
    value: function _setup(instance) {
      var dropdownId = instance.getAttribute(Selectors.DATA_DROPDOWN);

      if (!dropdownId) {
        throw new Error(Messages.NO_DROPDOWN_ID_ERROR);
      }

      var dropdownAttr = "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");

      var dropdownButton = _utils.dom.find("".concat(dropdownAttr, " > ").concat(this._dropdownTargetAttr));

      if (!_utils.dom.attr(dropdownButton, Selectors.DATA_PARENT)) {
        throw new Error(Messages.NO_PARENT_ERROR);
      }

      var dropdownMenu = _utils.dom.find("".concat(dropdownAttr, " > ul"));

      if (!dropdownMenu) {
        throw new Error(Messages.NO_MENU_ERROR(dropdownAttr));
      }

      _utils.dom.attr(dropdownMenu, Selectors.ARIA_LABELLEDBY, dropdownButton.id);

      _utils.dom.attr(dropdownButton, Selectors.ARIA_CONTROLS, dropdownMenu.id);

      _utils.dom.attr(dropdownButton, Selectors.ARIA_HASPOPUP, "true");

      _utils.dom.attr(dropdownButton, Selectors.ARIA_EXPANDED, "false");

      var dropdownMenuItemsAttr = "".concat(dropdownAttr, " > ul > li");

      var dropdownMenuListItems = _utils.dom.findAll(dropdownMenuItemsAttr);

      if (!dropdownMenuListItems.length) {
        throw new Error(Messages.NO_DROPDOWN_ITEMS_ERROR(dropdownAttr));
      }

      dropdownMenuListItems.forEach(function (item) {
        return _utils.dom.attr(item, Selectors.ROLE, "none");
      });

      var dropdownMenuButtons = this._getDropdownLinks(dropdownAttr);

      if (!dropdownMenuButtons.length) {
        throw new Error(Messages.NO_DROPDOWN_BUTTONS_ERROR(dropdownAttr));
      }

      dropdownMenuButtons.forEach(function (link) {
        _utils.dom.attr(link, Selectors.ROLE, "menuitem");

        _utils.dom.attr(link, Selectors.TABINDEX, "-1");
      });
    }
  }, {
    key: "_render",
    value: function _render(event, key) {
      event.preventDefault();
      event.stopPropagation();

      this._handleOpenDropdown(event);

      this._activeDropdownButton = event.target;

      this._setActiveDropdownId();

      this._setActiveDropdown();

      this._setActiveDropdownMenu();

      this._setVisibleState();

      this._listenToClose();

      this._startEvents();

      if (key && key === KeyCodes.ARROW_UP) {
        this._lastDropdownLink.focus();
      } else {
        this._firstDropdownLink.focus();
      }

      if (_utils.iOSMobile) _utils.dom.css(document.body, "cursor", "pointer");
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      event.preventDefault();
      if (_utils.iOSMobile) _utils.dom.css(document.body, "cursor", "auto");
      this.releaseFocus();

      this._handleHideState();

      this._listenToRender();

      this._stopEvents();

      if (this._allowFocusReturn) {
        this._handleReturnFocus();
      }

      this._activeDropdownButton = null;
      this._activeDropdownId = null;
      this._activeDropdown = null;
    }
  }, {
    key: "_listenToRender",
    value: function _listenToRender() {
      this._activeDropdownButton.removeEventListener(Events.CLICK, this._handleClose);

      this._activeDropdownButton.addEventListener(Events.CLICK, this._render);
    }
  }, {
    key: "_handleHideState",
    value: function _handleHideState() {
      var _this4 = this;

      _utils.dom.attr(this._activeDropdownButton, Selectors.ARIA_EXPANDED, "false");

      _utils.dom.attr(this._activeDropdown, Selectors.DATA_VISIBLE, "false");

      this._activeDropdownLinks.forEach(function (link) {
        _utils.dom.attr(link, Selectors.TABINDEX, "-1");

        link.removeEventListener(Events.CLICK, _this4._handleClose);
      });
    }
  }, {
    key: "_stopEvents",
    value: function _stopEvents() {
      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.removeEventListener(Events.CLICK, this._handleOffMenuClick);
    }
  }, {
    key: "_setActiveDropdownId",
    value: function _setActiveDropdownId() {
      this._activeDropdownId = _utils.dom.attr(this._activeDropdownButton, Selectors.DATA_PARENT);
    }
  }, {
    key: "_startEvents",
    value: function _startEvents() {
      var _this5 = this;

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      document.addEventListener(Events.CLICK, this._handleOffMenuClick);
      this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);
      this._firstDropdownLink = this._activeDropdownLinks[0];
      this._lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];

      this._firstDropdownLink.addEventListener(Events.KEYDOWN, this._handleFirstTabClose);

      this._lastDropdownLink.addEventListener(Events.KEYDOWN, this._handleLastTabClose);

      this._activeDropdownLinks.forEach(function (link) {
        _utils.dom.attr(link, Selectors.TABINDEX, "0");

        link.addEventListener(Events.CLICK, _this5._handleClose);
      });

      this.captureFocus("".concat(this._activeDropdownAttr, " > ul"), {
        useArrows: true
      });
    }
  }, {
    key: "_listenToClose",
    value: function _listenToClose() {
      this._activeDropdownButton.removeEventListener(Events.CLICK, this._render);

      this._activeDropdownButton.addEventListener(Events.CLICK, this._handleClose);
    }
  }, {
    key: "_setVisibleState",
    value: function _setVisibleState() {
      _utils.dom.attr(this._activeDropdownButton, Selectors.ARIA_EXPANDED, "true");

      _utils.dom.attr(this._activeDropdown, Selectors.DATA_VISIBLE, "true");
    }
  }, {
    key: "_setActiveDropdownMenu",
    value: function _setActiveDropdownMenu() {
      this._activeDropdownMenuId = _utils.dom.attr(this._activeDropdownButton, Selectors.DATA_TARGET);
      this._activeDropdownMenu = _utils.dom.find("#".concat(this._activeDropdownMenuId));
    }
  }, {
    key: "_setActiveDropdown",
    value: function _setActiveDropdown() {
      this._activeDropdownAttr = "[".concat(Selectors.DATA_DROPDOWN, "=\"").concat(this._activeDropdownId, "\"]");
      this._activeDropdown = _utils.dom.find(this._activeDropdownAttr);
    }
  }, {
    key: "_handleOpenDropdown",
    value: function _handleOpenDropdown(event) {
      if (!this._activeDropdownButton) return;
      this._allowFocusReturn = false;

      this._handleClose(event);

      this._allowFocusReturn = true;
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
      _utils.dom.attr(this._activeDropdownButton, Selectors.TAB_INDEX, "-1");

      this._activeDropdownButton.focus();

      _utils.dom.attr(this._activeDropdownButton, Selectors.TAB_INDEX, false);
    }
  }, {
    key: "_getDropdownLinks",
    value: function _getDropdownLinks(attr) {
      return _utils.dom.findAll("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
    }
  }]);

  return Dropdown;
}(_utils.default);

exports.default = Dropdown;
//# sourceMappingURL=dropdown.js.map