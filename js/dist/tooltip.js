"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyCodes = {};
var Selectors = {};
var Events = {};
var Messages = {};

var Tooltip = function () {
  function Tooltip() {
    _classCallCheck(this, Tooltip);

    this._iosMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent);
    this._render = this._render.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._allTooltipTriggers = [];
  }

  _createClass(Tooltip, [{
    key: "start",
    value: function start() {
      var _this = this;

      this._allTooltipTriggers = document.querySelectorAll("[data-tooltip]");

      this._allTooltipTriggers.forEach(function (element) {
        var id = element.getAttribute("data-tooltip");
        var trigger = element.querySelector("[data-target=\"".concat(id, "\"]"));
        var tooltip = document.getElementById(id);

        _this._setupTooltip(trigger, tooltip, id);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      if (this._iosMobile) {
        this._allTooltipTriggers.forEach(function (element) {
          element.removeEventListener("click", _this2._render);
        });
      }
    }
  }, {
    key: "_render",
    value: function _render(event) {
      event.preventDefault();
      document.body.style.cursor = "pointer";
      document.body.addEventListener("click", this._handleClose);
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      event.preventDefault();
      document.body.style.cursor = "auto";
      document.body.removeEventListener("click", this._handleClose);
    }
  }, {
    key: "_setupTooltip",
    value: function _setupTooltip(trigger, tooltip, id) {
      trigger.setAttribute("aria-describedby", id);
      tooltip.setAttribute("role", "tooltip");

      if (this._iosMobile) {
        trigger.addEventListener("click", this._render);
      }

      if (this._isLeftOrRight(tooltip)) {
        this._alignTooltip(trigger, tooltip, "height");
      } else {
        this._alignTooltip(trigger, tooltip, "width");
      }
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
      return classes.contains("is-drop-left") || classes.contains("is-drop-right");
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
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
//# sourceMappingURL=tooltip.js.map