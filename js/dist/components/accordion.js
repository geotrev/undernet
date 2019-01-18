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

function _classPrivateFieldGet(receiver, privateMap) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return privateMap.get(receiver).value; }

function _classPrivateFieldSet(receiver, privateMap, value) { if (!privateMap.has(receiver)) { throw new TypeError("attempted to set private field on non-instance"); } var descriptor = privateMap.get(receiver); if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; return value; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var Selectors = {
  DATA_ACCORDION: "data-accordion",
  DATA_ACCORDION_ROW: "data-accordion-row",
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

    _accordionButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _accordionContentsAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _accordionContents.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _activeContainer.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeButton.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeAccordionRowId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeRowAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeRow.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContainerId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContainerAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContent.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeButtonExpandState.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContentHiddenState.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _headerLevels.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: [1, 2, 3, 4, 5, 6]
    });

    _setupAccordion.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getPossibleAccordionButtonAttrs.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getPossibleAccordionHeaderAttrs.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getAccordionRowAttr.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _render.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton, event.target);

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton).getAttribute(Selectors.DATA_TARGET));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr, _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _getAccordionRowAttr, _getAccordionRowAttr2).call(_assertThisInitialized(_assertThisInitialized(_this)), _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr)));

        if (!_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton).getAttribute(Selectors.DATA_PARENT)) {
          return console.error(Messages.NO_PARENT_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton).getAttribute(Selectors.DATA_PARENT));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr, "[".concat(Selectors.DATA_ACCORDION, "='").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId), "']"));

        if (!document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr))) {
          return console.error(Messages.NO_ACCORDION_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainer, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContent, document.getElementById(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)));

        var accordionButtonState = _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow).getAttribute(Selectors.DATA_VISIBLE);

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState, accordionButtonState === "true" ? "false" : "true");

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContentHiddenState, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState) === "false" ? "true" : "false");

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _closeAllIfToggleable, _closeAllIfToggleable2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _toggleSelectedAccordion, _toggleSelectedAccordion2).call(_assertThisInitialized(_assertThisInitialized(_this)));
      }
    });

    _closeAllIfToggleable.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _toggleSelectedAccordion.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _toggleAttributeInCollection.add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var accordionButtonSelector = _classPrivateMethodGet(this, _getPossibleAccordionButtonAttrs, _getPossibleAccordionButtonAttrs2).call(this, "[".concat(Selectors.DATA_ACCORDION, "]"));

      _classPrivateFieldSet(this, _accordionButtons, this.getElements(accordionButtonSelector));

      if (_classPrivateFieldGet(this, _accordionButtons).length) {
        _classPrivateFieldGet(this, _accordionButtons).forEach(function (button) {
          _classPrivateMethodGet(_this2, _setupAccordion, _setupAccordion2).call(_this2, button);

          button.addEventListener(Events.CLICK, _classPrivateFieldGet(_this2, _render));
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldGet(this, _accordionButtons).forEach(function (button) {
        button.removeEventListener(Events.CLICK, _classPrivateFieldGet(_this3, _render));
      });
    }
  }]);

  return Accordion;
}(_utils.default);

exports.default = Accordion;

var _accordionButtons = new WeakMap();

var _accordionContentsAttr = new WeakMap();

var _accordionContents = new WeakMap();

var _activeContainer = new WeakMap();

var _activeButton = new WeakMap();

var _activeAccordionRowId = new WeakMap();

var _activeRowAttr = new WeakMap();

var _activeRow = new WeakMap();

var _activeContainerId = new WeakMap();

var _activeContainerAttr = new WeakMap();

var _activeContent = new WeakMap();

var _activeButtonExpandState = new WeakMap();

var _activeContentHiddenState = new WeakMap();

var _headerLevels = new WeakMap();

var _setupAccordion = new WeakSet();

var _getPossibleAccordionButtonAttrs = new WeakSet();

var _getPossibleAccordionHeaderAttrs = new WeakSet();

var _getAccordionRowAttr = new WeakSet();

var _render = new WeakMap();

var _closeAllIfToggleable = new WeakSet();

var _toggleSelectedAccordion = new WeakSet();

var _toggleAttributeInCollection = new WeakSet();

var _setupAccordion2 = function _setupAccordion2(button) {
  var buttonId = button.getAttribute(Selectors.DATA_TARGET);

  if (!document.getElementById(buttonId)) {
    return console.error(Messages.NO_CONTENT_ERROR(buttonId));
  }

  var buttonContent = document.getElementById(buttonId);

  var accordionRowAttr = _classPrivateMethodGet(this, _getAccordionRowAttr, _getAccordionRowAttr2).call(this, buttonId);

  if (!document.querySelector(accordionRowAttr)) {
    return console.error(Messages.NO_ROW_ERROR(buttonId));
  }

  var accordionRow = document.querySelector(accordionRowAttr);

  var buttonHeaderAttr = _classPrivateMethodGet(this, _getPossibleAccordionHeaderAttrs, _getPossibleAccordionHeaderAttrs2).call(this, accordionRowAttr);

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

var _getPossibleAccordionButtonAttrs2 = function _getPossibleAccordionButtonAttrs2(attr) {
  return _classPrivateFieldGet(this, _headerLevels).map(function (num) {
    return "".concat(attr, " > [").concat(Selectors.DATA_ACCORDION_ROW, "] > h").concat(num, " [").concat(Selectors.DATA_TARGET, "]");
  }).join(", ");
};

var _getPossibleAccordionHeaderAttrs2 = function _getPossibleAccordionHeaderAttrs2(attr) {
  return _classPrivateFieldGet(this, _headerLevels).map(function (num) {
    return "".concat(attr, " > h").concat(num);
  }).join(", ");
};

var _getAccordionRowAttr2 = function _getAccordionRowAttr2(id) {
  return "[".concat(Selectors.DATA_ACCORDION_ROW, "='").concat(id, "']");
};

var _closeAllIfToggleable2 = function _closeAllIfToggleable2() {
  var _this4 = this;

  if (_classPrivateFieldGet(this, _activeContainer).hasAttribute(Selectors.DATA_TOGGLE_MULTIPLE)) return;
  var allContentAttr = "".concat(_classPrivateFieldGet(this, _activeContainerAttr), " [").concat(Selectors.ARIA_HIDDEN, "]");
  var allRows = this.getElements("".concat(_classPrivateFieldGet(this, _activeContainerAttr), " [").concat(Selectors.DATA_VISIBLE, "]"));
  var allContent = this.getElements(allContentAttr);

  var accordionButtonSelector = _classPrivateMethodGet(this, _getPossibleAccordionButtonAttrs, _getPossibleAccordionButtonAttrs2).call(this, _classPrivateFieldGet(this, _activeContainerAttr));

  var allButtons = this.getElements(accordionButtonSelector);
  allContent.forEach(function (content) {
    if (content !== _classPrivateFieldGet(_this4, _activeContent)) content.style.maxHeight = null;
  });
  this.getFocusableElements(allContentAttr).forEach(function (element) {
    element.setAttribute(Selectors.TABINDEX, "-1");
  });

  _classPrivateMethodGet(this, _toggleAttributeInCollection, _toggleAttributeInCollection2).call(this, allRows, Selectors.DATA_VISIBLE, "true", "false");

  _classPrivateMethodGet(this, _toggleAttributeInCollection, _toggleAttributeInCollection2).call(this, allButtons, Selectors.ARIA_EXPANDED, "true", "false");

  _classPrivateMethodGet(this, _toggleAttributeInCollection, _toggleAttributeInCollection2).call(this, allContent, Selectors.ARIA_HIDDEN, "false", "true");
};

var _toggleSelectedAccordion2 = function _toggleSelectedAccordion2() {
  var _this5 = this;

  _classPrivateFieldGet(this, _activeRow).setAttribute(Selectors.DATA_VISIBLE, _classPrivateFieldGet(this, _activeButtonExpandState));

  _classPrivateFieldGet(this, _activeButton).setAttribute(Selectors.ARIA_EXPANDED, _classPrivateFieldGet(this, _activeButtonExpandState));

  _classPrivateFieldGet(this, _activeContent).setAttribute(Selectors.ARIA_HIDDEN, _classPrivateFieldGet(this, _activeContentHiddenState));

  var activeContentBlock = "#".concat(_classPrivateFieldGet(this, _activeAccordionRowId));
  this.getFocusableElements(activeContentBlock).forEach(function (element) {
    var value = _classPrivateFieldGet(_this5, _activeButtonExpandState) === "true" ? "0" : "-1";
    element.setAttribute(Selectors.TABINDEX, value);
  });

  if (_classPrivateFieldGet(this, _activeContent).style.maxHeight) {
    _classPrivateFieldGet(this, _activeContent).style.maxHeight = null;
  } else {
    _classPrivateFieldGet(this, _activeContent).style.maxHeight = "".concat(_classPrivateFieldGet(this, _activeContent).scrollHeight, "px");
  }
};

var _toggleAttributeInCollection2 = function _toggleAttributeInCollection2(elements, attributeName, currentValue, newValue) {
  elements.forEach(function (element) {
    if (element.hasAttribute(attributeName, currentValue)) {
      element.setAttribute(attributeName, newValue);
    }
  });
};