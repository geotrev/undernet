"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require("./components/modal");

var _modal2 = _interopRequireDefault(_modal);

var _accordion = require("./components/accordion");

var _accordion2 = _interopRequireDefault(_accordion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var modals = new _modal2.default();
var accordions = new _accordion2.default();

var Undernet = {
  modals: modals,
  accordions: accordions
};

Undernet.start = function () {
  Undernet.modals.start();
  Undernet.accordions.start();
};

Undernet.stop = function () {
  Undernet.modals.stop();
  Undernet.accordions.stop();
};

window.Undernet = Undernet;
exports.default = Undernet;