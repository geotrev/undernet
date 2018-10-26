"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Utils = exports.Accordions = exports.Modals = void 0;

var _modal = _interopRequireDefault(require("./components/modal"));

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import _Dropdown from "./components/dropdown"
var Modals = new _modal.default();
exports.Modals = Modals;
var Accordions = new _accordion.default(); // export const Dropdowns = new _Dropdown()

exports.Accordions = Accordions;
var Utils = new _utils.default();
exports.Utils = Utils;
var Undernet = {
  // Components
  Modals: Modals,
  Accordions: Accordions,
  // Dropdowns,
  // Utils
  Utils: Utils
};

Undernet.start = function () {
  // Components
  Undernet.Modals.start();
  Undernet.Accordions.start(); // Undernet.Dropdowns.start()
  // Utils

  Undernet.Utils.enableFocusOutline();
};

Undernet.stop = function () {
  // Components
  Undernet.Modals.stop();
  Undernet.Accordions.stop(); // Undernet.Dropdowns.stop()
  // Utils

  Undernet.Utils.disableFocusOutline();
};

window.Undernet = Undernet;
var _default = Undernet;
exports.default = _default;