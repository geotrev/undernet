"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Utils = exports.Accordions = exports.Modals = void 0;

var _modal = _interopRequireDefault(require("./components/modal"));

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modals = new _modal.default();
exports.Modals = Modals;
var Accordions = new _accordion.default();
exports.Accordions = Accordions;
var Utils = new _utils.default();
exports.Utils = Utils;
var Undernet = {
  Modals: Modals,
  Accordions: Accordions,
  Utils: Utils
};

Undernet.start = function () {
  Undernet.Modals.start();
  Undernet.Accordions.start();
  Undernet.Utils.enableFocusOutline();
};

Undernet.stop = function () {
  Undernet.Modals.stop();
  Undernet.Accordions.stop();
  Undernet.Utils.disableFocusOutline();
};

window.Undernet = Undernet;
var _default = Undernet;
exports.default = _default;