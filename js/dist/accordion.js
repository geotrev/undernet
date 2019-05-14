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
    return "Could not find accordion row with [data-visible] attribute associated with [data-target='".concat(id, "'].");
  },
  NO_ROW_ERROR: function NO_ROW_ERROR(id) {
    return "Could not find [data-accordion-row] associated with [data-target='".concat(id, "'].");
  },
  NO_HEADER_ID_ERROR: function NO_HEADER_ID_ERROR(attr) {
    return "Could not find an id on your header associated with ".concat(attr, ".");
  },
  NO_ACCORDION_ID_ERROR: function NO_ACCORDION_ID_ERROR(id) {
    return "Could not find [data-accordion] attribute associated with [data-target='".concat(id, "'].");
  },
  NO_CONTENT_ERROR: function NO_CONTENT_ERROR(id) {
    return "Could not find accordion content block with id '".concat(id, "'; should match trigger with [data-target='").concat(id, "'].");
  }
};

var Accordion = function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));
    _this._render = _this._render.bind(_assertThisInitialized(_this));
    _this._accordionButtons = [];
    _this._accordionContentsAttr = "";
    _this._accordionContents = [];
    _this._activeContainer = {};
    _this._activeButton = {};
    _this._activeAccordionRowId = "";
    _this._activeRowAttr = "";
    _this._activeRow = "";
    _this._activeContainerId = "";
    _this._activeContainerAttr = "";
    _this._activeContent = {};
    _this._activeButtonExpandState = "";
    _this._activeContentHiddenState = "";
    _this._headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var accordionButtonSelector = this._getAccordionButtonSelector("[".concat(Selectors.DATA_ACCORDION, "]"));

      this._accordionButtons = _utils.dom.findAll(accordionButtonSelector);

      if (this._accordionButtons.length) {
        this._accordionButtons.forEach(function (instance) {
          _this2._setup(instance);

          instance.addEventListener(Events.CLICK, _this2._render);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this._accordionButtons.forEach(function (instance) {
        instance.removeEventListener(Events.CLICK, _this3._render);
      });
    }
  }, {
    key: "_setup",
    value: function _setup(instance) {
      var buttonTargetId = _utils.dom.attr(instance, Selectors.DATA_TARGET);

      var accordionId = _utils.dom.attr(instance, Selectors.DATA_PARENT);

      var buttonContent = _utils.dom.find("#".concat(buttonTargetId));

      if (!accordionId) {
        throw new Error(Messages.NO_ACCORDION_ID_ERROR(buttonTargetId));
      }

      if (!buttonContent) {
        throw new Error(Messages.NO_CONTENT_ERROR(buttonTargetId));
      }

      var accordionRowAttr = this._getAccordionRowAttr(buttonTargetId);

      var accordionRow = _utils.dom.find(accordionRowAttr);

      if (!accordionRow) {
        throw new Error(Messages.NO_ROW_ERROR(buttonTargetId));
      }

      var buttonId = instance.id;

      if (!buttonId) {
        throw new Error(Messages.NO_HEADER_ID_ERROR(accordionRowAttr));
      }

      var buttonContentChildren = (0, _utils.getFocusableElements)("#".concat(buttonContent.id));

      _utils.dom.attr(instance, Selectors.ARIA_CONTROLS, buttonTargetId);

      _utils.dom.attr(buttonContent, Selectors.ARIA_LABELLEDBY, buttonId);

      var contentShouldExpand = _utils.dom.attr(accordionRow, Selectors.DATA_VISIBLE);

      if (!contentShouldExpand) {
        throw new Error(Messages.NO_VISIBLE_ERROR(buttonTargetId));
      }

      if (contentShouldExpand === "true") {
        _utils.dom.css(buttonContent, "maxHeight", "".concat(buttonContent.scrollHeight, "px"));

        _utils.dom.attr(instance, Selectors.ARIA_EXPANDED, "true");

        _utils.dom.attr(buttonContent, Selectors.ARIA_HIDDEN, "false");

        buttonContentChildren.forEach(function (element) {
          _utils.dom.attr(element, Selectors.TABINDEX, "0");
        });
      } else {
        _utils.dom.attr(instance, Selectors.ARIA_EXPANDED, "false");

        _utils.dom.attr(buttonContent, Selectors.ARIA_HIDDEN, "true");

        buttonContentChildren.forEach(function (element) {
          _utils.dom.attr(element, Selectors.TABINDEX, "-1");
        });
      }
    }
  }, {
    key: "_render",
    value: function _render(event) {
      event.preventDefault();
      this._activeButton = event.target;

      this._setIds();

      this._setActiveRow();

      this._setActiveContainer();

      this._setActiveContent();

      this._setVisibleState();

      var canExpandMultiple = _utils.dom.hasAttr(this._activeContainer, Selectors.DATA_TOGGLE_MULTIPLE);

      if (!canExpandMultiple) this._closeAllIfToggleable();

      this._toggleSelectedAccordion();

      this._activeRow = null;
      this._activeButton = null;
      this._activeContent = null;
      this._activeContainer = null;
    }
  }, {
    key: "_setActiveContent",
    value: function _setActiveContent() {
      this._activeContent = _utils.dom.find("#".concat(this._activeAccordionRowId));
    }
  }, {
    key: "_setVisibleState",
    value: function _setVisibleState() {
      var accordionButtonState = _utils.dom.attr(this._activeRow, Selectors.DATA_VISIBLE);

      this._nextButtonExpandState = accordionButtonState === "true" ? "false" : "true";
      this._nextContentHiddenState = this._nextButtonExpandState === "false" ? "true" : "false";
    }
  }, {
    key: "_setIds",
    value: function _setIds() {
      this._activeContainerId = _utils.dom.attr(this._activeButton, Selectors.DATA_PARENT);
      this._activeAccordionRowId = _utils.dom.attr(this._activeButton, Selectors.DATA_TARGET);
    }
  }, {
    key: "_setActiveContainer",
    value: function _setActiveContainer() {
      this._activeContainerAttr = "[".concat(Selectors.DATA_ACCORDION, "='").concat(this._activeContainerId, "']");
      this._activeContainer = _utils.dom.find(this._activeContainerAttr);
    }
  }, {
    key: "_setActiveRow",
    value: function _setActiveRow() {
      this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
      this._activeRow = _utils.dom.find(this._activeRowAttr);
    }
  }, {
    key: "_getAccordionButtonSelector",
    value: function _getAccordionButtonSelector(attr) {
      return this._headers.map(function (header) {
        return "".concat(attr, " > [").concat(Selectors.DATA_ACCORDION_ROW, "] > ").concat(header, " [").concat(Selectors.DATA_TARGET, "]");
      }).join(", ");
    }
  }, {
    key: "_getAccordionRowAttr",
    value: function _getAccordionRowAttr(id) {
      return "[".concat(Selectors.DATA_ACCORDION_ROW, "='").concat(id, "']");
    }
  }, {
    key: "_closeAllIfToggleable",
    value: function _closeAllIfToggleable() {
      var _this4 = this;

      var allContentAttr = "".concat(this._activeContainerAttr, " > [").concat(Selectors.DATA_ACCORDION_ROW, "] > [").concat(Selectors.ARIA_HIDDEN, "]");

      var allContent = _utils.dom.findAll(allContentAttr);

      var accordionButtonSelector = this._getAccordionButtonSelector(this._activeContainerAttr);

      var allButtons = _utils.dom.findAll(accordionButtonSelector);

      var allRows = _utils.dom.findAll("".concat(this._activeContainerAttr, " > [").concat(Selectors.DATA_ACCORDION_ROW, "]"));

      allContent.filter(function (content) {
        return content !== _this4._activeContent;
      }).forEach(function (content) {
        return _utils.dom.css(content, "maxHeight", null);
      });
      (0, _utils.getFocusableElements)(allContentAttr).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      this._toggleAttributeInCollection(allRows, Selectors.DATA_VISIBLE, "false");

      this._toggleAttributeInCollection(allButtons, Selectors.ARIA_EXPANDED, "false");

      this._toggleAttributeInCollection(allContent, Selectors.ARIA_HIDDEN, "true");
    }
  }, {
    key: "_toggleSelectedAccordion",
    value: function _toggleSelectedAccordion() {
      var _this5 = this;

      _utils.dom.attr(this._activeRow, Selectors.DATA_VISIBLE, this._nextButtonExpandState);

      _utils.dom.attr(this._activeButton, Selectors.ARIA_EXPANDED, this._nextButtonExpandState);

      _utils.dom.attr(this._activeContent, Selectors.ARIA_HIDDEN, this._nextContentHiddenState);

      (0, _utils.getFocusableElements)("#".concat(this._activeAccordionRowId)).forEach(function (element) {
        var value = _this5._nextButtonExpandState === "true" ? "0" : "-1";

        _utils.dom.attr(element, Selectors.TABINDEX, value);
      });

      if (_utils.dom.css(this._activeContent, "maxHeight")) {
        _utils.dom.css(this._activeContent, "maxHeight", null);
      } else {
        _utils.dom.css(this._activeContent, "maxHeight", "".concat(this._activeContent.scrollHeight, "px"));
      }
    }
  }, {
    key: "_toggleAttributeInCollection",
    value: function _toggleAttributeInCollection(elements, attributeName, newValue) {
      elements.forEach(function (element) {
        return _utils.dom.attr(element, attributeName, newValue);
      });
    }
  }]);

  return Accordion;
}(_utils.default);

exports.default = Accordion;
//# sourceMappingURL=accordion.js.map