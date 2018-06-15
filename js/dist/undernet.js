"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require("./components/modal");

var _modal2 = _interopRequireDefault(_modal);

var _accordion = require("./components/accordion");

var _accordion2 = _interopRequireDefault(_accordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modals = new _modal2.default();
var Accordions = new _accordion2.default();

var Undernet = {
  Modals: Modals,
  Accordions: Accordions
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
exports.default = Undernet;