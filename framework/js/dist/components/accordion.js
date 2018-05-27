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
  ACCORDION_ITEM: "data-accordion-item",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content"
};

var events = {
  CLICK: "click"
};

var messages = {
  MISSING_ACCORDION_CONTENT: "You have an accordion button that is missing it's content block.",
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
    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      if (this.accordionButtons.length) {
        this.accordionButtons.forEach(function (button) {
          button.addEventListener(events.CLICK, _this2.getAccordion);
        });
      }
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
      var container = button.parentNode.parentNode;
      var content = button.nextElementSibling;

      var allContents = this.findElements("#" + container.id + " [" + selectors.ACCORDION_CONTENT + "]");

      allContents.forEach(function (content) {
        if (content.classList.contains("is-block")) {
          content.classList.remove("is-block");
        }
      });

      content.classList.toggle("is-block");
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      this.accordionButtons.forEach(function (button) {
        button.removeEventListener(events.CLICK, _this3.getAccordion);
      });
    }
  }]);

  return Accordion;
}(_utils2.default);

exports.default = Accordion;