"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _modal = _interopRequireDefault(require("./components/modal"));

var _accordion = _interopRequireDefault(require("./components/accordion"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modals = new _modal.default();
var Accordions = new _accordion.default();
var Utilities = new _utils.default();
var Undernet = {
  Modals: Modals,
  Accordions: Accordions,
  Utilities: Utilities
};

Undernet.start = function () {
  Undernet.Modals.start();
  Undernet.Accordions.start();
};

Undernet.stop = function () {
  Undernet.Modals.stop();
  Undernet.Accordions.stop();
};

window.Undernet = Undernet;
var _default = Undernet;
exports.default = _default;