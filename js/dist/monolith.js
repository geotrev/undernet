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

var Monolith = {
  modals: modals,
  accordions: accordions
};

Monolith.start = function () {
  Monolith.modals.start();
  Monolith.accordions.start();
};

Monolith.stop = function () {
  Monolith.modals.stop();
  Monolith.accordions.stop();
};

window.Monolith = Monolith;
exports.default = Monolith;