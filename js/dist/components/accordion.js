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

var Selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_ROW: "data-accordion-row",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  DATA_PARENT: "data-parent",
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_LABELLEDBY: "aria-labelledby",
  TABINDEX: "tabindex"
};
var Events = {
  CLICK: "click",
  KEYDOWN: "keydown"
};
var Messages = {
  NO_VISIBLE_ERROR: function NO_VISIBLE_ERROR(id) {
    return "Could not find parent with [data-visible] attribute associated with [data-target='".concat(id, "'].");
  },
  NO_ROW_ERROR: function NO_ROW_ERROR(id) {
    return "Could not find [data-accordion-row] associated with ".concat(id, ".");
  },
  NO_HEADER_ID_ERROR: function NO_HEADER_ID_ERROR(id) {
    return "Could not find header tag associated with [data-target='".concat(id, "'].");
  },
  NO_PARENT_ERROR: function NO_PARENT_ERROR(id) {
    return "Could not find [data-parent] associated with [data-target='".concat(id, "'].");
  },
  NO_CONTENT_ERROR: function NO_CONTENT_ERROR(id) {
    return "Could not find accordion content block with [id] ".concat(id, " associated with [data-target='").concat(id, "'].");
  }
};

var Accordion = function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _accordionButtons, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _accordionContentsAttr, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _accordionContents, {
      writable: true,
      value: []
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainer, {
      writable: true,
      value: {}
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton, {
      writable: true,
      value: {}
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContent, {
      writable: true,
      value: {}
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContentHiddenState, {
      writable: true,
      value: ""
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _setupAccordion, {
      value: _setupAccordion2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _getPossibleAccordionHeaderAttrs, {
      value: _getPossibleAccordionHeaderAttrs2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _getAccordionRowAttr, {
      value: _getAccordionRowAttr2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _render, {
      writable: true,
      value: function value(event) {
        event.preventDefault();
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton] = event.target;
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton].getAttribute(Selectors.DATA_TARGET);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr)[_activeRowAttr] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _getAccordionRowAttr)[_getAccordionRowAttr](_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow)[_activeRow] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr)[_activeRowAttr]);

        if (!_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton].getAttribute(Selectors.DATA_PARENT)) {
          return console.error(Messages.NO_PARENT_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId]));
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)[_activeContainerId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton].getAttribute(Selectors.DATA_PARENT);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)[_activeContainerAttr] = "[".concat(Selectors.ACCORDION_CONTAINER, "='").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)[_activeContainerId], "']");

        if (!document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)[_activeContainerAttr])) {
          return console.error(Messages.NO_ACCORDION_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)[_activeContainerId]));
        }

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainer)[_activeContainer] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)[_activeContainerAttr]);
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContent)[_activeContent] = document.getElementById(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId]);

        var accordionButtonState = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow)[_activeRow].getAttribute(Selectors.DATA_VISIBLE);

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState)[_activeButtonExpandState] = accordionButtonState === "true" ? "false" : "true";
        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContentHiddenState)[_activeContentHiddenState] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState)[_activeButtonExpandState] === "false" ? "true" : "false";

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _closeAllIfToggleable)[_closeAllIfToggleable]();

        _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _toggleSelectedAccordion)[_toggleSelectedAccordion]();
      }
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _closeAllIfToggleable, {
      value: _closeAllIfToggleable2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _toggleSelectedAccordion, {
      value: _toggleSelectedAccordion2
    });
    Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _toggleAttributeInCollection, {
      value: _toggleAttributeInCollection2
    });
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons] = this.getElements("[".concat(Selectors.ACCORDION_CONTAINER, "] [").concat(Selectors.DATA_TARGET, "]"));

      if (_classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons].length) {
        _classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons].forEach(function (button) {
          _classPrivateFieldLooseBase(_this2, _setupAccordion)[_setupAccordion](button);

          button.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this2, _render)[_render]);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons].forEach(function (button) {
        button.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this3, _render)[_render]);
      });
    }
  }]);

  return Accordion;
}(_utils.default);

exports.default = Accordion;

var _accordionButtons = _classPrivateFieldLooseKey("accordionButtons");

var _accordionContentsAttr = _classPrivateFieldLooseKey("accordionContentsAttr");

var _accordionContents = _classPrivateFieldLooseKey("accordionContents");

var _activeContainer = _classPrivateFieldLooseKey("activeContainer");

var _activeButton = _classPrivateFieldLooseKey("activeButton");

var _activeAccordionRowId = _classPrivateFieldLooseKey("activeAccordionRowId");

var _activeRowAttr = _classPrivateFieldLooseKey("activeRowAttr");

var _activeRow = _classPrivateFieldLooseKey("activeRow");

var _activeContainerId = _classPrivateFieldLooseKey("activeContainerId");

var _activeContainerAttr = _classPrivateFieldLooseKey("activeContainerAttr");

var _activeContent = _classPrivateFieldLooseKey("activeContent");

var _activeButtonExpandState = _classPrivateFieldLooseKey("activeButtonExpandState");

var _activeContentHiddenState = _classPrivateFieldLooseKey("activeContentHiddenState");

var _setupAccordion = _classPrivateFieldLooseKey("setupAccordion");

var _getPossibleAccordionHeaderAttrs = _classPrivateFieldLooseKey("getPossibleAccordionHeaderAttrs");

var _getAccordionRowAttr = _classPrivateFieldLooseKey("getAccordionRowAttr");

var _render = _classPrivateFieldLooseKey("render");

var _closeAllIfToggleable = _classPrivateFieldLooseKey("closeAllIfToggleable");

var _toggleSelectedAccordion = _classPrivateFieldLooseKey("toggleSelectedAccordion");

var _toggleAttributeInCollection = _classPrivateFieldLooseKey("toggleAttributeInCollection");

var _setupAccordion2 = function _setupAccordion2(button) {
  var buttonId = button.getAttribute(Selectors.DATA_TARGET);

  if (!document.getElementById(buttonId)) {
    return console.error(Messages.NO_CONTENT_ERROR(buttonId));
  }

  var buttonContent = document.getElementById(buttonId);

  var accordionRowAttr = _classPrivateFieldLooseBase(this, _getAccordionRowAttr)[_getAccordionRowAttr](buttonId);

  if (!document.querySelector(accordionRowAttr)) {
    return console.error(Messages.NO_ROW_ERROR(buttonId));
  }

  var accordionRow = document.querySelector(accordionRowAttr);

  var buttonHeaderAttr = _classPrivateFieldLooseBase(this, _getPossibleAccordionHeaderAttrs)[_getPossibleAccordionHeaderAttrs](accordionRowAttr);

  var buttonHeader = this.getElements(buttonHeaderAttr)[0];

  if (!buttonHeader || !buttonHeader.id) {
    console.error(Messages.NO_HEADER_ID_ERROR(buttonId));
  }

  var buttonContentChildren = this.getFocusableElements("#".concat(buttonContent.id));
  button.setAttribute(Selectors.ARIA_CONTROLS, buttonId);
  buttonContent.setAttribute(Selectors.ARIA_LABELLEDBY, buttonHeader.id);

  if (!accordionRow.getAttribute(Selectors.DATA_VISIBLE)) {
    return console.error(Messages.NO_VISIBLE_ERROR(buttonId));
  }

  var contentShouldExpand = accordionRow.getAttribute(Selectors.DATA_VISIBLE);

  if (contentShouldExpand === "true") {
    buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
    button.setAttribute(Selectors.ARIA_EXPANDED, "true");
    buttonContent.setAttribute(Selectors.ARIA_HIDDEN, "false");
    buttonContentChildren.forEach(function (element) {
      element.setAttribute(Selectors.TABINDEX, "0");
    });
  } else {
    button.setAttribute(Selectors.ARIA_EXPANDED, "false");
    buttonContent.setAttribute(Selectors.ARIA_HIDDEN, "true");
    buttonContentChildren.forEach(function (element) {
      element.setAttribute(Selectors.TABINDEX, "-1");
    });
  }
};

var _getPossibleAccordionHeaderAttrs2 = function _getPossibleAccordionHeaderAttrs2(attr) {
  return "".concat(attr, " h1, ").concat(attr, " h2, ").concat(attr, " h3, ").concat(attr, " h4, ").concat(attr, " h5, ").concat(attr, " h6");
};

var _getAccordionRowAttr2 = function _getAccordionRowAttr2(id) {
  return "[".concat(Selectors.ACCORDION_ROW, "='").concat(id, "']");
};

var _closeAllIfToggleable2 = function _closeAllIfToggleable2() {
  var _this4 = this;

  if (_classPrivateFieldLooseBase(this, _activeContainer)[_activeContainer].hasAttribute(Selectors.DATA_TOGGLE_MULTIPLE)) return;
  var allContentAttr = "".concat(_classPrivateFieldLooseBase(this, _activeContainerAttr)[_activeContainerAttr], " [").concat(Selectors.ARIA_HIDDEN, "]");
  var allRows = this.getElements("".concat(_classPrivateFieldLooseBase(this, _activeContainerAttr)[_activeContainerAttr], " [").concat(Selectors.DATA_VISIBLE, "]"));
  var allContent = this.getElements(allContentAttr);
  var allButtons = this.getElements("".concat(_classPrivateFieldLooseBase(this, _activeContainerAttr)[_activeContainerAttr], " [").concat(Selectors.DATA_TARGET, "]"));
  allContent.forEach(function (content) {
    if (!(content === _classPrivateFieldLooseBase(_this4, _activeContent)[_activeContent])) content.style.maxHeight = null;
  });
  this.getFocusableElements(allContentAttr).forEach(function (element) {
    element.setAttribute(Selectors.TABINDEX, "-1");
  });

  _classPrivateFieldLooseBase(this, _toggleAttributeInCollection)[_toggleAttributeInCollection](allRows, Selectors.DATA_VISIBLE, "true", "false");

  _classPrivateFieldLooseBase(this, _toggleAttributeInCollection)[_toggleAttributeInCollection](allButtons, Selectors.ARIA_EXPANDED, "true", "false");

  _classPrivateFieldLooseBase(this, _toggleAttributeInCollection)[_toggleAttributeInCollection](allContent, Selectors.ARIA_HIDDEN, "false", "true");
};

var _toggleSelectedAccordion2 = function _toggleSelectedAccordion2() {
  var _this5 = this;

  _classPrivateFieldLooseBase(this, _activeRow)[_activeRow].setAttribute(Selectors.DATA_VISIBLE, _classPrivateFieldLooseBase(this, _activeButtonExpandState)[_activeButtonExpandState]);

  _classPrivateFieldLooseBase(this, _activeButton)[_activeButton].setAttribute(Selectors.ARIA_EXPANDED, _classPrivateFieldLooseBase(this, _activeButtonExpandState)[_activeButtonExpandState]);

  _classPrivateFieldLooseBase(this, _activeContent)[_activeContent].setAttribute(Selectors.ARIA_HIDDEN, _classPrivateFieldLooseBase(this, _activeContentHiddenState)[_activeContentHiddenState]);

  var activeContentBlock = "#".concat(_classPrivateFieldLooseBase(this, _activeAccordionRowId)[_activeAccordionRowId]);
  this.getFocusableElements(activeContentBlock).forEach(function (element) {
    var value = _classPrivateFieldLooseBase(_this5, _activeButtonExpandState)[_activeButtonExpandState] === "true" ? "0" : "-1";
    element.setAttribute(Selectors.TABINDEX, value);
  });

  if (_classPrivateFieldLooseBase(this, _activeContent)[_activeContent].style.maxHeight) {
    _classPrivateFieldLooseBase(this, _activeContent)[_activeContent].style.maxHeight = null;
  } else {
    _classPrivateFieldLooseBase(this, _activeContent)[_activeContent].style.maxHeight = "".concat(_classPrivateFieldLooseBase(this, _activeContent)[_activeContent].scrollHeight, "px");
  }
};

var _toggleAttributeInCollection2 = function _toggleAttributeInCollection2(elements, attributeName, currentValue, newValue) {
  elements.forEach(function (element) {
    if (element.hasAttribute(attributeName, currentValue)) {
      element.setAttribute(attributeName, newValue);
    }
  });
};