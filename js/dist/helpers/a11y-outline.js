"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var keyCodes = {
  TAB: 9
};
var selectors = {
  KEYBOARD: "using-keyboard"
};
var events = {
  KEYDOWN: "keydown"
  /**
   * Helper component class.
   * @module Helpers
   */

};

var A11yOutline =
/*#__PURE__*/
function () {
  function A11yOutline() {
    _classCallCheck(this, A11yOutline);

    this.listenForKeyboard = this.listenForKeyboard.bind(this);
  }

  _createClass(A11yOutline, [{
    key: "start",
    value: function start() {
      document.addEventListener(events.KEYDOWN, this.listenForKeyboard);
    }
  }, {
    key: "listenForKeyboard",
    value: function listenForKeyboard(event) {
      var tabKey = event.which === keyCodes.TAB;

      if (tabKey) {
        document.body.classList.add(selectors.KEYBOARD);
      } else {
        document.body.classList.remove(selectors.KEYBOARD);
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      document.addEventListener("keydown", this.listenForKeyboard);
    }
  }]);

  return A11yOutline;
}();

exports.default = A11yOutline;