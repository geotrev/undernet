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
  // unique
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_ROW: "data-accordion-row",
  // common
  EXPANDED: "data-expanded",
  TARGET: "data-target",
  CONTENT: "data-content",
  TOGGLE_MULTIPLE: "data-toggle-multiple",
  PARENT: "data-parent",
  // aria
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden"
};
var events = {
  CLICK: "click",
  KEYDOWN: "keydown"
};
var messages = {
  MISSING_CONTENT: "You have an accordion button that is missing its [data-content] attribute, and has a matching id to the button's [data-target] attribute's value."
  /**
   * Accordion component class.
   * @module Accordion
   * @requires Utils
   */

};

var Accordion =
/*#__PURE__*/
function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));
    _this.accordionButtons = null;
    _this.accordionContents = null;
    _this.activeContainer = null; // bind events to class

    _this.renderAccordionContent = _this.renderAccordionContent.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.handleSpaceKeyPress = _this.handleSpaceKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }
  /**
   * Add accessible attributes [data-accordion-button] and [data-accordion-content] elements
   * Begin listening to [data-accordion-button] elements
   */


  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      this.accordionButtons = this.getElements("[".concat(selectors.ACCORDION_CONTAINER, "] [").concat(selectors.TARGET, "]"));
      this.accordionContents = this.getElements("[".concat(selectors.ACCORDION_CONTAINER, "] [").concat(selectors.CONTENT, "]"));

      if (this.accordionButtons.length) {
        this.accordionButtons.forEach(function (button) {
          _this2.setupButton(button);

          button.addEventListener(events.CLICK, _this2.renderAccordionContent);
          button.addEventListener(events.KEYDOWN, _this2.handleSpaceKeyPress);
        });
      }

      if (this.accordionContents.length) {
        this.accordionContents.forEach(function (content) {
          var contentRowAttr = _this2.getAccordionRowAttr(content.id);

          var contentRow = document.querySelector(contentRowAttr);
          var contentHiddenState = contentRow.getAttribute(selectors.EXPANDED);
          var toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true";
          content.setAttribute(selectors.ARIA_HIDDEN, toggleContentHiddenState);
        });
      }
    }
    /**
     * Stop listening to accordion buttons.
     */

  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.accordionButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3.renderAccordionContent);
        button.removeEventListener(events.KEYDOWN, _this3.handleSpaceKeyPress);
      });
    }
  }, {
    key: "setupButton",
    value: function setupButton(button) {
      var buttonId = button.getAttribute(selectors.TARGET);
      var accordionRowAttr = this.getAccordionRowAttr(buttonId);
      var accordionRow = document.querySelector(accordionRowAttr);
      var shouldContentExpand = accordionRow.getAttribute(selectors.EXPANDED);
      var buttonContent = document.getElementById(buttonId);
      button.setAttribute(selectors.ARIA_CONTROLS, buttonId);

      if (shouldContentExpand === "true") {
        buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
        button.setAttribute(selectors.ARIA_EXPANDED, "true");
      } else {
        button.setAttribute(selectors.ARIA_EXPANDED, "false");
      }
    }
    /**
     * Return a selector that targets `selectors.ACCORDION_ROW` with value of the id.
     * @param {String} id - An id value associated with a given selectors.TARGET
     * @return {String}
     */

  }, {
    key: "getAccordionRowAttr",
    value: function getAccordionRowAttr(id) {
      return "[".concat(selectors.ACCORDION_ROW, "='").concat(id, "']");
    }
    /**
     * Open accordion content associated with a [data-accordion-button] element.
     * @param {Object} event - The event object.
     */

  }, {
    key: "renderAccordionContent",
    value: function renderAccordionContent(event) {
      event.preventDefault();
      this.activeButton = event.target;
      var activeAccordionRow = this.activeButton.getAttribute(selectors.TARGET);
      this.activeRowAttr = this.getAccordionRowAttr(activeAccordionRow);
      this.activeRow = document.querySelector(this.activeRowAttr);
      this.activeContainerId = this.activeButton.getAttribute(selectors.PARENT);
      this.activeContainerAttr = "[".concat(selectors.ACCORDION_CONTAINER, "='").concat(this.activeContainerId, "']");
      this.activeContainer = document.querySelector(this.activeContainerAttr);
      this.activeContent = document.getElementById(activeAccordionRow);
      var accordionContentHasAttr = this.activeContent.hasAttribute(selectors.CONTENT);

      if (!accordionContentHasAttr) {
        throw messages.MISSING_CONTENT;
        return;
      }

      var accordionButtonState = this.activeRow.getAttribute(selectors.EXPANDED);
      var accordionContentState = this.activeContent.getAttribute(selectors.CONTENT);
      this.toggleExpandState = accordionButtonState === "true" ? "false" : "true";
      this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible";
      this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false";
      this.closeAllIfToggleable();
      this.toggleSelectedAccordion();
    }
    /**
     * If a keypress is the spacebar on a button, open its correlated content.
     * @param {Object} event - The event object.
     */

  }, {
    key: "handleSpaceKeyPress",
    value: function handleSpaceKeyPress(event) {
      if (event.which === keyCodes.SPACE) this.renderAccordionContent(event);
    }
    /**
     * If toggling multiple rows at once isn't enabled, close all rows except the selected one.
     * This ensures the selected one can be closed if it's already open.
     */

  }, {
    key: "closeAllIfToggleable",
    value: function closeAllIfToggleable() {
      var _this4 = this;

      if (this.activeContainer.hasAttribute(selectors.TOGGLE_MULTIPLE)) return;
      var allRows = this.getElements("".concat(this.activeContainerAttr, " [").concat(selectors.EXPANDED, "]"));
      var allContent = this.getElements("".concat(this.activeContainerAttr, " [").concat(selectors.CONTENT, "]"));
      var allButtons = this.getElements("".concat(this.activeContainerAttr, " [").concat(selectors.TARGET, "]"));
      allContent.forEach(function (content) {
        if (!(content === _this4.activeContent)) content.style.maxHeight = null;
      });
      this.toggleAttributeInCollection(allRows, selectors.EXPANDED, "true", "false");
      this.toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false");
      this.toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true");
      this.toggleAttributeInCollection(allContent, selectors.CONTENT, "visible", "hidden");
    }
    /**
     * Toggle a [data-accordion-button]'s related [data-accordion-content] element.
     */

  }, {
    key: "toggleSelectedAccordion",
    value: function toggleSelectedAccordion() {
      this.activeRow.setAttribute(selectors.EXPANDED, this.toggleExpandState);
      this.activeContent.setAttribute(selectors.CONTENT, this.toggleContentState);
      this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.toggleExpandState);
      this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.toggleHiddenState);

      if (this.activeContent.style.maxHeight) {
        this.activeContent.style.maxHeight = null;
      } else {
        this.activeContent.style.maxHeight = "".concat(this.activeContent.scrollHeight, "px");
      }
    }
    /**
     * Toggles a single attribute of a series of elements within a parent.
     */

  }, {
    key: "toggleAttributeInCollection",
    value: function toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
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