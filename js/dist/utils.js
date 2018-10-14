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
  FOCUSABLE_SELECTOR: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"]
};
var events = {
  KEYDOWN: "keydown"
  /**
   * Utility methods for DOM traversal and focus trapping.
   * @module Utils
   */

};

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);

    // bind events to Utils
    this.handleFocusTrap = this.handleFocusTrap.bind(this);
  }
  /**
   * Because IE does not recognize NodeList.forEach(),
   * we use a cross-browser solution for returning an array of DOM nodes every time.
   * @param {String} element - A DOM node's class, attribute, etc., to search the document.
   * @return {Array}
   */


  _createClass(Utils, [{
    key: "getElements",
    value: function getElements(element) {
      var nodeList = document.querySelectorAll(element);
      return Array.apply(null, nodeList);
    }
    /**
     * Creates a string of element selector patterns using common elements.
     * @param {String} container - The enclosing container's class, attribute, etc.
     * @return {String}
     */

  }, {
    key: "getFocusableElements",
    value: function getFocusableElements(container) {
      var focusables = [];
      selectors.FOCUSABLE_TAGS.map(function (element) {
        return focusables.push("".concat(container, " ").concat(element).concat(selectors.FOCUSABLE_SELECTOR));
      });
      return this.getElements(focusables.join(", "));
    }
    /**
     * Listens to the first and last elements matched from this.getFocusableElements()
     * @param {String} container - The container's class, attribute, etc.
     */

  }, {
    key: "captureFocus",
    value: function captureFocus(container) {
      this.focusContainer = container;
      var children = this.getFocusableElements(this.focusContainer);
      this.focusableFirstChild = children[0];
      this.focusableLastChild = children[children.length - 1];
      document.addEventListener(events.KEYDOWN, this.handleFocusTrap);
    }
    /**
     * Handles focus on first or last child in a container.
     * @param {Object} event - Event (keypress)
     */

  }, {
    key: "handleFocusTrap",
    value: function handleFocusTrap(event) {
      var active = document.activeElement;
      var containerElement = document.querySelector(this.focusContainer);
      var containerActive = active === containerElement;
      var firstActive = active === this.focusableFirstChild;
      var lastActive = active === this.focusableLastChild;
      var tabKey = event.which === keyCodes.TAB;
      var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
      var hasShift = shiftKey && tabKey;
      var noShift = !shiftKey && tabKey; // Just in case the first or last child have changed -
      // recapture focus and continue trapping.

      this.releaseFocus();
      this.captureFocus(this.focusContainer);

      if (hasShift && (firstActive || containerActive)) {
        event.preventDefault();
        this.focusableLastChild.focus();
      } else if (noShift && lastActive) {
        event.preventDefault();
        this.focusableFirstChild.focus();
      }
    }
    /**
     * Stop trapping focus set in this.captureFocus()
     */

  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      document.removeEventListener(events.KEYDOWN, this.handleFocusTrap);
    }
  }]);

  return Utils;
}();

exports.default = Utils;