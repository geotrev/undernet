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
  SPACE: 32
};
var selectors = {
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
var events = {
  CLICK: "click",
  KEYDOWN: "keydown"
};
var messages = {
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
    return "Could not accordion content block with [id] ".concat(id, " associated with [data-target='").concat(id, "'].");
  }
};

var Accordion = function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));
    _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this._handleSpaceKeyPress = _this._handleSpaceKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.accordionButtons = [];
    _this.accordionContentsAttr = "";
    _this.accordionContents = [];
    _this.activeContainer = null;
    _this.activeButton = null;
    _this.activeAccordionRowId = "";
    _this.activeRowAttr = "";
    _this.activeRow = "";
    _this.activeContainerId = "";
    _this.activeContainerAttr = "";
    _this.activeContent = null;
    _this.activeButtonExpandState = "";
    _this.activeContentHiddenState = "";
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.accordionButtons = this._getElements("[".concat(selectors.ACCORDION_CONTAINER, "] [").concat(selectors.DATA_TARGET, "]"));

      if (this.accordionButtons.length) {
        this.accordionButtons.forEach(function (button) {
          _this2._setupAccordion(button);

          button.addEventListener(events.CLICK, _this2._render);
          button.addEventListener(events.KEYDOWN, _this2._handleSpaceKeyPress);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.accordionButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3._render);
        button.removeEventListener(events.KEYDOWN, _this3._handleSpaceKeyPress);
      });
    }
  }, {
    key: "_setupAccordion",
    value: function _setupAccordion(button) {
      var buttonId = button.getAttribute(selectors.DATA_TARGET);

      if (!document.getElementById(buttonId)) {
        return console.error(messages.NO_CONTENT_ERROR(buttonId));
      }

      var buttonContent = document.getElementById(buttonId);

      var accordionRowAttr = this._getAccordionRowAttr(buttonId);

      if (!document.querySelector(accordionRowAttr)) {
        return console.error(messages.NO_ROW_ERROR(buttonId));
      }

      var accordionRow = document.querySelector(accordionRowAttr);

      var buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);

      var buttonHeader = this._getElements(buttonHeaderAttr)[0];

      if (!buttonHeader || !buttonHeader.id) {
        console.error(messages.NO_HEADER_ID_ERROR(buttonId));
      }

      var buttonContentChildren = this._getFocusableElements("#".concat(buttonContent.id));

      button.setAttribute(selectors.ARIA_CONTROLS, buttonId);
      buttonContent.setAttribute(selectors.ARIA_LABELLEDBY, buttonHeader.id);

      if (!accordionRow.getAttribute(selectors.DATA_VISIBLE)) {
        return console.error(messages.NO_VISIBLE_ERROR(buttonId));
      }

      var contentShouldExpand = accordionRow.getAttribute(selectors.DATA_VISIBLE);

      if (contentShouldExpand === "true") {
        buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
        button.setAttribute(selectors.ARIA_EXPANDED, "true");
        buttonContent.setAttribute(selectors.ARIA_HIDDEN, "false");
        buttonContentChildren.forEach(function (element) {
          element.setAttribute(selectors.TABINDEX, "0");
        });
      } else {
        button.setAttribute(selectors.ARIA_EXPANDED, "false");
        buttonContent.setAttribute(selectors.ARIA_HIDDEN, "true");
        buttonContentChildren.forEach(function (element) {
          element.setAttribute(selectors.TABINDEX, "-1");
        });
      }
    }
  }, {
    key: "_getPossibleAccordionHeaderAttrs",
    value: function _getPossibleAccordionHeaderAttrs(attr) {
      return "".concat(attr, " h1, ").concat(attr, " h2, ").concat(attr, " h3, ").concat(attr, " h4, ").concat(attr, " h5, ").concat(attr, " h6");
    }
  }, {
    key: "_getAccordionRowAttr",
    value: function _getAccordionRowAttr(id) {
      return "[".concat(selectors.ACCORDION_ROW, "='").concat(id, "']");
    }
  }, {
    key: "_render",
    value: function _render(event) {
      event.preventDefault();
      this.activeButton = event.target;
      this.activeAccordionRowId = this.activeButton.getAttribute(selectors.DATA_TARGET);
      this.activeRowAttr = this._getAccordionRowAttr(this.activeAccordionRowId);
      this.activeRow = document.querySelector(this.activeRowAttr);

      if (!this.activeButton.getAttribute(selectors.DATA_PARENT)) {
        return console.error(messages.NO_PARENT_ERROR(this.activeAccordionRowId));
      }

      this.activeContainerId = this.activeButton.getAttribute(selectors.DATA_PARENT);
      this.activeContainerAttr = "[".concat(selectors.ACCORDION_CONTAINER, "='").concat(this.activeContainerId, "']");

      if (!document.querySelector(this.activeContainerAttr)) {
        return console.error(messages.NO_ACCORDION_ERROR(this.activeContainerId));
      }

      this.activeContainer = document.querySelector(this.activeContainerAttr);
      this.activeContent = document.getElementById(this.activeAccordionRowId);
      var accordionButtonState = this.activeRow.getAttribute(selectors.DATA_VISIBLE);
      this.activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
      this.activeContentHiddenState = this.activeButtonExpandState === "false" ? "true" : "false";

      this._closeAllIfToggleable();

      this._toggleSelectedAccordion();
    }
  }, {
    key: "_handleSpaceKeyPress",
    value: function _handleSpaceKeyPress(event) {
      if (event.which === keyCodes.SPACE) this._render(event);
    }
  }, {
    key: "_closeAllIfToggleable",
    value: function _closeAllIfToggleable() {
      var _this4 = this;

      if (this.activeContainer.hasAttribute(selectors.DATA_TOGGLE_MULTIPLE)) return;
      var allContentAttr = "".concat(this.activeContainerAttr, " [").concat(selectors.ARIA_HIDDEN, "]");

      var allRows = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors.DATA_VISIBLE, "]"));

      var allContent = this._getElements(allContentAttr);

      var allButtons = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors.DATA_TARGET, "]"));

      allContent.forEach(function (content) {
        if (!(content === _this4.activeContent)) content.style.maxHeight = null;
      });

      this._getFocusableElements(allContentAttr).forEach(function (element) {
        element.setAttribute(selectors.TABINDEX, "-1");
      });

      this._toggleAttributeInCollection(allRows, selectors.DATA_VISIBLE, "true", "false");

      this._toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false");

      this._toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true");
    }
  }, {
    key: "_toggleSelectedAccordion",
    value: function _toggleSelectedAccordion() {
      var _this5 = this;

      this.activeRow.setAttribute(selectors.DATA_VISIBLE, this.activeButtonExpandState);
      this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.activeButtonExpandState);
      this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.activeContentHiddenState);
      var activeContentBlock = "#".concat(this.activeAccordionRowId);

      this._getFocusableElements(activeContentBlock).forEach(function (element) {
        var value = _this5.activeButtonExpandState === "true" ? "0" : "-1";
        element.setAttribute(selectors.TABINDEX, value);
      });

      if (this.activeContent.style.maxHeight) {
        this.activeContent.style.maxHeight = null;
      } else {
        this.activeContent.style.maxHeight = "".concat(this.activeContent.scrollHeight, "px");
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