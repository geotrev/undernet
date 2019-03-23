"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Tooltips = exports.Dropdowns = exports.Accordions = exports.Modals = void 0;

var _modal = _interopRequireDefault(require("./modal"));

var _accordion = _interopRequireDefault(require("./accordion"));

var _dropdown = _interopRequireDefault(require("./dropdown"));

var _utils = _interopRequireDefault(require("./utils"));

var _tooltips = _interopRequireDefault(require("./tooltips"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modals = new _modal.default();
exports.Modals = Modals;
var Accordions = new _accordion.default();
exports.Accordions = Accordions;
var Dropdowns = new _dropdown.default();
exports.Dropdowns = Dropdowns;
var Tooltips = new _tooltips.default();
exports.Tooltips = Tooltips;
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
  Undernet.Tooltips.stop();
  Undernet.Utils.disableFocusOutline();
};

var _default = Undernet;
exports.default = _default;
//# sourceMappingURL=index.js.map