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
  DATA_EXPANDED: "data-expanded",
  DATA_TARGET: "data-target",
  DATA_CONTENT: "data-content",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  DATA_PARENT: "data-parent",
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  TABINDEX: "tabindex"
};
var events = {
  CLICK: "click",
  KEYDOWN: "keydown"
};
var messages = {
  MISSING_CONTENT: "You have an accordion button that is missing its [data-content] attribute, and has a matching id to the button's [data-target] attribute's value."
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
    _this.toggleExpandState = "";
    _this.toggleContentState = "";
    _this.toggleHiddenState = "";
    _this.allContentAttr = "";
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.accordionButtons = this._getElements("[".concat(selectors.ACCORDION_CONTAINER, "] [").concat(selectors.DATA_TARGET, "]"));
      this.accordionContentsAttr = "[".concat(selectors.ACCORDION_CONTAINER, "] [").concat(selectors.DATA_CONTENT, "]");
      this.accordionContents = this._getElements(this.accordionContentsAttr);

      this._getFocusableElements(this.accordionContentsAttr).forEach(function (element) {
        element.setAttribute(selectors.TABINDEX, "-1");
      });

      if (this.accordionButtons.length) {
        this.accordionButtons.forEach(function (button) {
          _this2._setupButton(button);

          button.addEventListener(events.CLICK, _this2._render);
          button.addEventListener(events.KEYDOWN, _this2._handleSpaceKeyPress);
        });
      }

      if (this.accordionContents.length) {
        this.accordionContents.forEach(function (content) {
          var contentRowAttr = _this2._getAccordionRowAttr(content.id);

          var contentRow = document.querySelector(contentRowAttr);
          var contentHiddenState = contentRow.getAttribute(selectors.DATA_EXPANDED);
          var toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true";
          content.setAttribute(selectors.ARIA_HIDDEN, toggleContentHiddenState);

          if (toggleContentHiddenState === "false") {
            _this2._getFocusableElements("#".concat(content.id)).forEach(function (element) {
              element.setAttribute(selectors.TABINDEX, "0");
            });
          }
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
    key: "_setupButton",
    value: function _setupButton(button) {
      var buttonId = button.getAttribute(selectors.DATA_TARGET);

      var accordionRowAttr = this._getAccordionRowAttr(buttonId);

      var accordionRow = document.querySelector(accordionRowAttr);
      var shouldContentExpand = accordionRow.getAttribute(selectors.DATA_EXPANDED);
      var buttonContent = document.getElementById(buttonId);
      button.setAttribute(selectors.ARIA_CONTROLS, buttonId);

      if (shouldContentExpand === "true") {
        buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
        button.setAttribute(selectors.ARIA_EXPANDED, "true");
      } else {
        button.setAttribute(selectors.ARIA_EXPANDED, "false");
      }
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
      this.activeContainerId = this.activeButton.getAttribute(selectors.DATA_PARENT);
      this.activeContainerAttr = "[".concat(selectors.ACCORDION_CONTAINER, "='").concat(this.activeContainerId, "']");
      this.activeContainer = document.querySelector(this.activeContainerAttr);
      this.activeContent = document.getElementById(this.activeAccordionRowId);
      var accordionContentHasAttr = this.activeContent.hasAttribute(selectors.DATA_CONTENT);

      if (!accordionContentHasAttr) {
        throw messages.MISSING_CONTENT;
        return;
      }

      var accordionButtonState = this.activeRow.getAttribute(selectors.DATA_EXPANDED);
      var accordionContentState = this.activeContent.getAttribute(selectors.DATA_CONTENT);
      this.toggleExpandState = accordionButtonState === "true" ? "false" : "true";
      this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible";
      this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false";

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
      var allContentAttr = "".concat(this.activeContainerAttr, " [").concat(selectors.DATA_CONTENT, "]");

      var allRows = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors.DATA_EXPANDED, "]"));

      var allContent = this._getElements(allContentAttr);

      var allButtons = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors.DATA_TARGET, "]"));

      allContent.forEach(function (content) {
        if (!(content === _this4.activeContent)) content.style.maxHeight = null;
      });

      this._getFocusableElements(allContentAttr).forEach(function (element) {
        element.setAttribute(selectors.TABINDEX, "-1");
      });

      this._toggleAttributeInCollection(allRows, selectors.DATA_EXPANDED, "true", "false");

      this._toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false");

      this._toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true");

      this._toggleAttributeInCollection(allContent, selectors.DATA_CONTENT, "visible", "hidden");
    }
  }, {
    key: "_toggleSelectedAccordion",
    value: function _toggleSelectedAccordion() {
      var _this5 = this;

      this.activeRow.setAttribute(selectors.DATA_EXPANDED, this.toggleExpandState);
      this.activeContent.setAttribute(selectors.DATA_CONTENT, this.toggleContentState);
      this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.toggleExpandState);
      this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.toggleHiddenState);
      var activeContentBlock = "#".concat(this.activeAccordionRowId);

      this._getFocusableElements(activeContentBlock).forEach(function (element) {
        var value = _this5.toggleExpandState === "true" ? "0" : "-1";
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