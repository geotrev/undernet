"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _modal = _interopRequireDefault(require("./components/modal"));

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _dropdown = _interopRequireDefault(require("./components/dropdown"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modals = new _modal.default();
var Accordions = new _accordion.default();
var Dropdowns = new _dropdown.default();
var Utils = new _utils.default();
var Undernet = {
  Modals: Modals,
  Accordions: Accordions,
  Dropdowns: Dropdowns,
  Utils: Utils
};

Undernet.start = function () {
  Undernet.Modals.start();
  Undernet.Accordions.start();
  Undernet.Dropdowns.start();
  Undernet.Utils.enableFocusOutline();
};

Undernet.stop = function () {
  Undernet.Modals.stop();
  Undernet.Accordions.stop();
  Undernet.Dropdowns.stop();
  Undernet.Utils.disableFocusOutline();
};

window.Undernet = Undernet;
var _default = Undernet;
exports.default = _default;