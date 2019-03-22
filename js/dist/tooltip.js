"use strict";

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    value: function start() {}
  }, {
    key: "stop",
    value: function stop() {}
  }, {
    key: "_render",
    value: function _render() {}
  }, {
    key: "_setupTooltips",
    value: function _setupTooltips() {}
  }]);

  return Tooltip;
}();
//# sourceMappingURL=tooltip.js.map