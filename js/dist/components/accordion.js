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
    _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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
    _this._headerLevels = [1, 2, 3, 4, 5, 6];
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      var accordionButtonSelector = this._getPossibleAccordionButtonAttrs("[".concat(Selectors.DATA_ACCORDION, "]"));

      this._accordionButtons = this.getElements(accordionButtonSelector);

      if (this._accordionButtons.length) {
        this._accordionButtons.forEach(function (button) {
          _this2._setupAccordion(button);

          button.addEventListener(Events.CLICK, _this2._render);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this._accordionButtons.forEach(function (button) {
        button.removeEventListener(Events.CLICK, _this3._render);
      });
    }
  }, {
    key: "_setupAccordion",
    value: function _setupAccordion(button) {
      var buttonId = button.getAttribute(Selectors.DATA_TARGET);

      if (!document.getElementById(buttonId)) {
        return console.error(Messages.NO_CONTENT_ERROR(buttonId));
      }

      var buttonContent = document.getElementById(buttonId);

      var accordionRowAttr = this._getAccordionRowAttr(buttonId);

      if (!document.querySelector(accordionRowAttr)) {
        return console.error(Messages.NO_ROW_ERROR(buttonId));
      }

      var accordionRow = document.querySelector(accordionRowAttr);

      var buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);

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
    }
  }, {
    key: "_getPossibleAccordionButtonAttrs",
    value: function _getPossibleAccordionButtonAttrs(attr) {
      return this._headerLevels.map(function (num) {
        return "".concat(attr, " > [").concat(Selectors.DATA_ACCORDION_ROW, "] > h").concat(num, " [").concat(Selectors.DATA_TARGET, "]");
      }).join(", ");
    }
  }, {
    key: "_getPossibleAccordionHeaderAttrs",
    value: function _getPossibleAccordionHeaderAttrs(attr) {
      return this._headerLevels.map(function (num) {
        return "".concat(attr, " > h").concat(num);
      }).join(", ");
    }
  }, {
    key: "_getAccordionRowAttr",
    value: function _getAccordionRowAttr(id) {
      return "[".concat(Selectors.DATA_ACCORDION_ROW, "='").concat(id, "']");
    }
  }, {
    key: "_render",
    value: function _render(event) {
      event.preventDefault();
      this._activeButton = event.target;
      this._activeAccordionRowId = this._activeButton.getAttribute(Selectors.DATA_TARGET);
      this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
      this._activeRow = document.querySelector(this._activeRowAttr);

      if (!this._activeButton.getAttribute(Selectors.DATA_PARENT)) {
        return console.error(Messages.NO_PARENT_ERROR(this._activeAccordionRowId));
      }

      this._activeContainerId = this._activeButton.getAttribute(Selectors.DATA_PARENT);
      this._activeContainerAttr = "[".concat(Selectors.DATA_ACCORDION, "='").concat(this._activeContainerId, "']");

      if (!document.querySelector(this._activeContainerAttr)) {
        return console.error(Messages.NO_ACCORDION_ERROR(this._activeContainerId));
      }

      this._activeContainer = document.querySelector(this._activeContainerAttr);
      this._activeContent = document.getElementById(this._activeAccordionRowId);

      var accordionButtonState = this._activeRow.getAttribute(Selectors.DATA_VISIBLE);

      this._activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
      this._activeContentHiddenState = this._activeButtonExpandState === "false" ? "true" : "false";

      this._closeAllIfToggleable();

      this._toggleSelectedAccordion();
    }
  }, {
    key: "_closeAllIfToggleable",
    value: function _closeAllIfToggleable() {
      var _this4 = this;

      if (this._activeContainer.hasAttribute(Selectors.DATA_TOGGLE_MULTIPLE)) return;
      var allContentAttr = "".concat(this._activeContainerAttr, " [").concat(Selectors.ARIA_HIDDEN, "]");
      var allRows = this.getElements("".concat(this._activeContainerAttr, " [").concat(Selectors.DATA_VISIBLE, "]"));
      var allContent = this.getElements(allContentAttr);

      var accordionButtonSelector = this._getPossibleAccordionButtonAttrs(this._activeContainerAttr);

      var allButtons = this.getElements(accordionButtonSelector);
      allContent.forEach(function (content) {
        if (content !== _this4._activeContent) content.style.maxHeight = null;
      });
      this.getFocusableElements(allContentAttr).forEach(function (element) {
        element.setAttribute(Selectors.TABINDEX, "-1");
      });

      this._toggleAttributeInCollection(allRows, Selectors.DATA_VISIBLE, "true", "false");

      this._toggleAttributeInCollection(allButtons, Selectors.ARIA_EXPANDED, "true", "false");

      this._toggleAttributeInCollection(allContent, Selectors.ARIA_HIDDEN, "false", "true");
    }
  }, {
    key: "_toggleSelectedAccordion",
    value: function _toggleSelectedAccordion() {
      var _this5 = this;

      this._activeRow.setAttribute(Selectors.DATA_VISIBLE, this._activeButtonExpandState);

      this._activeButton.setAttribute(Selectors.ARIA_EXPANDED, this._activeButtonExpandState);

      this._activeContent.setAttribute(Selectors.ARIA_HIDDEN, this._activeContentHiddenState);

      var activeContentBlock = "#".concat(this._activeAccordionRowId);
      this.getFocusableElements(activeContentBlock).forEach(function (element) {
        var value = _this5._activeButtonExpandState === "true" ? "0" : "-1";
        element.setAttribute(Selectors.TABINDEX, value);
      });

      if (this._activeContent.style.maxHeight) {
        this._activeContent.style.maxHeight = null;
      } else {
        this._activeContent.style.maxHeight = "".concat(this._activeContent.scrollHeight, "px");
      }
    }
  }, {
    key: "_toggleAttributeInCollection",
    value: function _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
      elements.forEach(function (element) {
        if (element.hasAttribute(attributeName, currentValue)) {
          element.setAttribute(attributeName, newValue);
        }
      });
    }
  }]);

  return Accordion;
}(_utils.default);

exports.default = Accordion;
//# sourceMappingURL=accordion.js.map