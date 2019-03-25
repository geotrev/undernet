"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Selectors = {
  DATA_TOOLTIP: "data-tooltip",
  DATA_TARGET: "data-target",
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  DROP_LEFT_CLASS: "is-drop-left",
  DROP_RIGHT_CLASS: "is-drop-right"
};
var Events = {
  CLICK: "click"
};
var Messages = {
  NO_ID_ERROR: "Could not find an tooltip trigger associated with your element. Make sure your `data-tooltip` and `data-target` attributes have matching values."
};

var Tooltip = function () {
  function Tooltip() {
    _classCallCheck(this, Tooltip);

    this._setCursorPointer = this._setCursorPointer.bind(this);
    this._setCursorAuto = this._setCursorAuto.bind(this);
    this._allTooltipTriggers = [];
  }

  _createClass(Tooltip, [{
    key: "start",
    value: function start() {
      var _this = this;

      this._allTooltipTriggers = document.querySelectorAll("[".concat(Selectors.DATA_TOOLTIP, "]"));

      this._allTooltipTriggers.forEach(function (element) {
        var id = element.getAttribute(Selectors.DATA_TOOLTIP);
        var trigger;

        if (!element.querySelector(_this._getTargetAttr(id))) {
          return console.error(Messages.NO_ID_ERROR);
        } else {
          trigger = element.querySelector(_this._getTargetAttr(id));
        }

        var tooltip = document.getElementById(id);

        _this._setupTooltip(trigger, tooltip, id);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      if (_utils.iOSMobile) {
        this._allTooltipTriggers.forEach(function (element) {
          element.removeEventListener(Events.CLICK, _this2._setCursorPointer);
        });
      }
    }
  }, {
    key: "_alignTooltip",
    value: function _alignTooltip(trigger, tooltip, property) {
      var triggerLength = this._getComputedLength(trigger, property);

      var tooltipLength = this._getComputedLength(tooltip, property);

      var triggerIsLongest = triggerLength > tooltipLength;
      var offset = triggerIsLongest ? (triggerLength - tooltipLength) / 2 : (tooltipLength - triggerLength) / -2;

      if (property === "height") {
        tooltip.style.top = "".concat(offset, "px");
      } else {
        tooltip.style.left = "".concat(offset, "px");
      }
    }
  }, {
    key: "_setCursorPointer",
    value: function _setCursorPointer(event) {
      event.preventDefault();
      event.stopPropagation();
      document.body.addEventListener(Events.CLICK, this._setCursorAuto);
      document.body.style.cursor = "pointer";
    }
  }, {
    key: "_setCursorAuto",
    value: function _setCursorAuto(event) {
      event.preventDefault();
      document.body.removeEventListener(Events.CLICK, this._setCursorAuto);
      document.body.style.cursor = "auto";
    }
  }, {
    key: "_setupTooltip",
    value: function _setupTooltip(trigger, tooltip, id) {
      trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, id);
      tooltip.setAttribute(Selectors.ROLE, "tooltip");

      if (_utils.iOSMobile) {
        trigger.addEventListener(Events.CLICK, this._setCursorPointer);
      }

      if (this._isLeftOrRight(tooltip)) {
        this._alignTooltip(trigger, tooltip, "height");
      } else {
        this._alignTooltip(trigger, tooltip, "width");
      }
    }
  }, {
    key: "_getTargetAttr",
    value: function _getTargetAttr(id) {
      return "[".concat(Selectors.DATA_TARGET, "=\"").concat(id, "\"]");
    }
  }, {
    key: "_getComputedLength",
    value: function _getComputedLength(element, property) {
      return parseInt(window.getComputedStyle(element)[property].slice(0, -2));
    }
  }, {
    key: "_isLeftOrRight",
    value: function _isLeftOrRight(tooltip) {
      var classes = tooltip.classList;
      return classes.contains(Selectors.DROP_LEFT_CLASS) || classes.contains(Selectors.DROP_RIGHT_CLASS);
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
//# sourceMappingURL=tooltip.js.map