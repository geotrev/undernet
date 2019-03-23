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
  }

  _createClass(Tooltip, [{
    key: "start",
    value: function start() {
      var _this = this;

      document.querySelectorAll("[data-tooltip]").forEach(function (instance) {
        var id = instance.getAttribute("data-tooltip");
        var trigger = instance.querySelector("[data-parent=\"".concat(id, "\"]"));
        var tooltip = document.getElementById(id);

        _this._setupTooltip(trigger, tooltip, id);
      });
    }
  }, {
    key: "_setupTooltip",
    value: function _setupTooltip(trigger, tooltip, id) {
      trigger.setAttribute("aria-describedby", id);
      tooltip.setAttribute("role", "tooltip");

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
      return tooltip.classList.contains("is-drop-left") || tooltip.classList.contains("is-drop-right");
    }
  }, {
    key: "_alignTooltip",
    value: function _alignTooltip(trigger, tooltip, property) {
      var triggerLength = this._getComputedLength(trigger, property);

      var tooltipLength = this._getComputedLength(tooltip, property);

      var triggerIsLongest = triggerLength > tooltipLength;
      var offset = triggerIsLongest ? (triggerLength - tooltipLength) / 2 : (tooltipLength - triggerLength) / -2;
      if (property === "height") tooltip.style.top = "".concat(offset, "px");else {
        tooltip.style.left = "".concat(offset, "px");
      }
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
//# sourceMappingURL=tooltip.js.map