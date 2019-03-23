"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Utils = exports.Tooltips = exports.Modals = exports.Dropdowns = exports.Accordions = void 0;

var _accordion = _interopRequireDefault(require("./accordion"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _modal = _interopRequireDefault(require("./modal"));

var _tooltip = _interopRequireDefault(require("./tooltip"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Accordions = new _accordion.default();
exports.Accordions = Accordions;
var Dropdowns = new _dropdown.default();
exports.Dropdowns = Dropdowns;
var Modals = new _modal.default();
exports.Modals = Modals;
var Tooltips = new _tooltip.default();
exports.Tooltips = Tooltips;
var Utils = new _utils.default();
exports.Utils = Utils;
var Undernet = {
  Modals: Modals,
  Accordions: Accordions,
  Dropdowns: Dropdowns,
  Tooltips: Tooltips,
  Utils: Utils
};

Undernet.start = function () {
  Undernet.Modals.start();
  Undernet.Accordions.start();
  Undernet.Dropdowns.start();
  Undernet.Tooltips.start();
  Undernet.Utils.enableFocusOutline();
};

Undernet.stop = function () {
  Undernet.Modals.stop();
  Undernet.Accordions.stop();
  Undernet.Dropdowns.stop();
  Undernet.Utils.disableFocusOutline();
};

var _default = Undernet;
exports.default = _default;
//# sourceMappingURL=index.js.map