'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _modal = require('./components/modal');

var _modal2 = _interopRequireDefault(_modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Monolith = {
  modals: function modals() {
    return new _modal2.default();
  }
};

Monolith.start = function () {
  Monolith.modals().start();
};

Monolith.stop = function () {
  Monolith.modals().stop();
};

exports.default = Monolith;