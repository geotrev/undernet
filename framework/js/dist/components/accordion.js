"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var keyCodes = {
  SPACE: 32
};

var selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_EXPANDED: "data-accordion-expanded",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content",
  ACCORDION_MULTIPLE: "data-accordion-toggle-multiple"
};

var events = {
  CLICK: "click",
  KEYDOWN: "keydown"
};

var messages = {
  MISSING_ACCORDION_CONTENT: "You have an accordion button that is missing its content block or its [data-accordion-content] attribute.",
  MISSING_ACCORDION_BUTTONS: "You have an accordion component with no [data-accordion-button] children."
};

var Accordion = function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    _classCallCheck(this, Accordion);

    var _this = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this));

    _this.accordionContainers = _this.findElements("[" + selectors.ACCORDION_CONTAINER + "]");
    _this.accordionButtons = _this.findElements("[" + selectors.ACCORDION_BUTTON + "]");
    _this.accordionContents = _this.findElements("[" + selectors.ACCORDION_CONTENT + "]");

    // bind events to calss
    _this.getAccordion = _this.getAccordion.bind(_this);
    _this.handleSpaceKeyPress = _this.handleSpaceKeyPress.bind(_this);
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (this.accordionButtons.length) {
        this.accordionButtons.forEach(function (button) {
          button.setAttribute("role", "heading");

          var buttonExpandState = button.parentNode.getAttribute("data-accordion-expanded") === "true" ? "true" : "false";
          button.setAttribute("aria-expanded", buttonExpandState);

          button.addEventListener(events.CLICK, _this2.getAccordion);
          button.addEventListener(events.KEYDOWN, _this2.handleSpaceKeyPress);
        });
      }

      if (this.accordionContents.length) {
        this.accordionContents.forEach(function (content) {
          content.setAttribute("role", "region");
          var contentHiddenState = content.parentNode.getAttribute("data-accordion-expanded");
          var toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true";
          content.setAttribute("aria-hidden", toggleContentHiddenState);
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.accordionButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3.getAccordion);
        button.removeEventListener(events.KEYDOWN, _this3.handleSpaceKeyPress);
      });
    }
  }, {
    key: "handleSpaceKeyPress",
    value: function handleSpaceKeyPress(event) {
      if (event.which === keyCodes.SPACE) this.getAccordion(event);
    }
  }, {
    key: "getAccordion",
    value: function getAccordion(event) {
      event.preventDefault();
      this.expandAccordion(event);
    }
  }, {
    key: "expandAccordion",
    value: function expandAccordion(event) {
      var button = event.target;
      var accordionRow = button.parentNode;
      var container = button.parentNode.parentNode;
      var accordionContent = button.nextElementSibling;
      var accordionContentHasAttr = accordionContent.hasAttribute(selectors.ACCORDION_CONTENT);

      if (!accordionContentHasAttr) {
        throw messages.MISSING_ACCORDION_CONTENT;
        return;
      }

      var containerId = container.getAttribute(selectors.ACCORDION_CONTAINER);
      var containerAttr = "[" + selectors.ACCORDION_CONTAINER + "='" + containerId + "']";
      var accordionContentsAttr = containerAttr + " [" + selectors.ACCORDION_CONTENT + "]";
      var allAccordionRows = this.findElements(containerAttr + " [" + selectors.ACCORDION_EXPANDED + "]");
      var allAccordionContent = this.findElements(accordionContentsAttr);

      var accordionButtonState = accordionRow.getAttribute(selectors.ACCORDION_EXPANDED);
      var accordionContentState = accordionContent.getAttribute(selectors.ACCORDION_CONTENT);
      var toggleExpandState = accordionButtonState === "true" ? "false" : "true";
      var toggleAccordionContentState = accordionContentState === "visible" ? "hidden" : "visible";
      var accordionContentAriaHiddenState = accordionContent.getAttribute("aria-hidden");
      var toggleHiddenState = accordionContentAriaHiddenState === "false" ? "true" : "false";

      if (!container.hasAttribute(selectors.ACCORDION_MULTIPLE)) {
        this.toggleChildAttributes(allAccordionRows, selectors.ACCORDION_EXPANDED, "true", "false");
        this.toggleChildAttributes(allAccordionContent, selectors.ACCORDION_CONTENT, "visible", "hidden");
      }

      accordionRow.setAttribute(selectors.ACCORDION_EXPANDED, toggleExpandState);
      accordionContent.setAttribute(selectors.ACCORDION_CONTENT, toggleAccordionContentState);
      button.setAttribute("aria-expanded", toggleExpandState);
      accordionContent.setAttribute("aria-hidden", toggleHiddenState);
    }
  }, {
    key: "toggleChildAttributes",
    value: function toggleChildAttributes(elements, selector, currentAttr, newAttr) {
      elements.forEach(function (element) {
        if (element.hasAttribute(selector, currentAttr)) {
          element.setAttribute(selector, newAttr);
        }
      });
    }
  }]);

  return Accordion;
}(_utils2.default);

exports.default = Accordion;