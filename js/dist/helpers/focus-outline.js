"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var keyCodes = {
  SHIFT: 16,
  TAB: 9
};
var selectors = {
  USING_KEYBOARD: "using-keyboard"
};
var events = {
  KEYDOWN: "keydown",
  CLICK: "click"
  /**
   * Helper component class.
   * @module FocusOutline
   */

};

var FocusOutline =
/*#__PURE__*/
function () {
  function FocusOutline() {
    _classCallCheck(this, FocusOutline);

    this.listenForKeyboard = this.listenForKeyboard.bind(this);
    this.listenForClick = this.listenForClick.bind(this);
  }

  _createClass(FocusOutline, [{
    key: "start",
    value: function start() {
      document.addEventListener(events.KEYDOWN, this.listenForKeyboard);
    }
  }, {
    key: "listenForKeyboard",
    value: function listenForKeyboard(event) {
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;

      if (tabKey || shiftKey) {
        document.body.classList.add(selectors.USING_KEYBOARD);
        document.removeEventListener(events.KEYDOWN, this.listenForKeyboard);
        document.addEventListener(events.CLICK, this.listenForClick);
      }
    }
  }, {
    key: "listenForClick",
    value: function listenForClick(event) {
      document.body.classList.remove(selectors.USING_KEYBOARD);
      document.removeEventListener(events.CLICK, this.listenForClick);
      document.addEventListener(events.KEYDOWN, this.listenForKeyboard);
    }
  }, {
    key: "stop",
    value: function stop() {
      document.removeEventListener(events.KEYDOWN, this.listenForKeyboard);
      document.removeEventListener(events.CLICK, this.listenForKeyboard);
    }
  }]);

  return FocusOutline;
}();

exports.default = FocusOutline;