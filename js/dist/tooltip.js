"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("./utils");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var KeyCodes = {
  ESCAPE: 27
};
var Selectors = {
  DATA_TOOLTIP: "data-tooltip",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  ROLE: "role",
  ARIA_DESCRIBEDBY: "aria-describedby",
  DROP_LEFT_CLASS: "is-drop-left",
  DROP_RIGHT_CLASS: "is-drop-right"
};
var Events = {
  CLICK: "click",
  MOUSEENTER: "onmouseenter",
  MOUSELEAVE: "onmouseleave",
  FOCUS: "focus",
  BLUR: "blur",
  KEYDOWN: "keydown"
};
var Messages = {
  NO_ID_ERROR: "Could not find an tooltip trigger associated with your element. Make sure your `data-tooltip` and `data-target` attributes have matching values."
};

var Tooltip = function () {
  function Tooltip() {
    _classCallCheck(this, Tooltip);

    this._render = this._render.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this);
    this._setCursorPointer = this._setCursorPointer.bind(this);
    this._setCursorAuto = this._setCursorAuto.bind(this);
    this._allTooltipTriggers = [];
  }

  _createClass(Tooltip, [{
    key: "start",
    value: function start() {
      var _this = this;

      this._allTooltipTriggers = document.querySelectorAll("[".concat(Selectors.DATA_TOOLTIP, "]"));

      this._allTooltipTriggers.forEach(function (element) {
        var id = element.getAttribute(Selectors.DATA_TOOLTIP);
        var trigger;

        if (!element.querySelector(_this._getTargetAttr(id))) {
          return console.error(Messages.NO_ID_ERROR);
        } else {
          trigger = element.querySelector(_this._getTargetAttr(id));
        }

        var tooltip = document.getElementById(id);

        _this._setupTooltip(trigger, tooltip, id);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      if (_utils.iOSMobile) {
        this._allTooltipTriggers.forEach(function (element) {
          element.removeEventListener(Events.CLICK, _this2._setCursorPointer);
        });
      }
    }
  }, {
    key: "_render",
    value: function _render(event) {
      event.preventDefault();

      if (this._activeTooltip) {
        this._handleClose(event);
      }

      this._activeTrigger = event.target;
      this._activeTooltipId = trigger.getAttribute(Selectors.DATA_TARGET);
      this._activeTooltip = document.getElementById(tooltipId);

      if (this._isLeftOrRight()) {
        this._alignTooltip("height");
      } else {
        this._alignTooltip("width");
      }

      this._showTooltip();

      this._listenForClose();
    }
  }, {
    key: "_handleClose",
    value: function _handleClose(event) {
      event.preventDefault();

      this._hideTooltip();

      this._activeTrigger = null;
      this._activeTooltipId = null;
      this._activeTooltip = null;

      this._listenForOpen();
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
      event.preventDefault();
      if (event.which === Events.ESCAPE) this._handleClose(event);
    }
  }, {
    key: "_showTooltip",
    value: function _showTooltip() {
      this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "true");
    }
  }, {
    key: "_hideTooltip",
    value: function _hideTooltip() {
      this._activeTooltip.setAttribute(Selectors.DATA_VISIBLE, "false");
    }
  }, {
    key: "_listenForClose",
    value: function _listenForClose() {
      this._activeTrigger.removeEventListener(Events.MOUSEENTER, this._render);

      this._activeTrigger.removeEventListener(Events.FOCUS, this._render);

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);

      this._activeTrigger.addEventListener(Events.MOUSELEAVE, this._handleClose);

      this._activeTrigger.addEventListener(Events.BLUR, this._handleClose);
    }
  }, {
    key: "_listenForOpen",
    value: function _listenForOpen() {
      this._activeTrigger.removeEventListener(Events.MOUSELEAVE, this._render);

      this._activeTrigger.removeEventListener(Events.BLUR, this._render);

      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);

      this._activeTrigger.addEventListener(Events.MOUSEENTER, this._handleClose);

      this._activeTrigger.addEventListener(Events.FOCUS, this._handleClose);
    }
  }, {
    key: "_alignTooltip",
    value: function _alignTooltip(property) {
      var triggerLength = this._getComputedLength(this._activeTrigger, property);

      var tooltipLength = this._getComputedLength(this._activeTooltip, property);

      var triggerIsLongest = triggerLength > tooltipLength;
      var offset = triggerIsLongest ? (triggerLength - tooltipLength) / 2 : (tooltipLength - triggerLength) / -2;

      if (property === "height") {
        this._activeTooltip.style.top = "".concat(offset, "px");
      } else {
        this._activeTooltip.style.left = "".concat(offset, "px");
      }
    }
  }, {
    key: "_setCursorPointer",
    value: function _setCursorPointer(event) {
      event.preventDefault();
      event.stopPropagation();
      document.body.addEventListener(Events.CLICK, this._setCursorAuto);
      document.body.style.cursor = "pointer";
    }
  }, {
    key: "_setupTooltip",
    value: function _setupTooltip(trigger, tooltip, id) {
      trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, id);
      tooltip.setAttribute(Selectors.ROLE, "tooltip");
      trigger.addEventListener(Events.MOUSEENTER, this._render);
      trigger.addEventListener(Events.FOCUS, this._render);
    }
  }, {
    key: "_getTargetAttr",
    value: function _getTargetAttr(id) {
      return "[".concat(Selectors.DATA_TARGET, "=\"").concat(id, "\"]");
    }
  }, {
    key: "_getComputedLength",
    value: function _getComputedLength(element, property) {
      return parseInt(window.getComputedStyle(element)[property].slice(0, -2));
    }
  }, {
    key: "_isLeftOrRight",
    value: function _isLeftOrRight() {
      var classes = this._activeTooltip.classList;
      return classes.contains(Selectors.DROP_LEFT_CLASS) || classes.contains(Selectors.DROP_RIGHT_CLASS);
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
//# sourceMappingURL=tooltip.js.map