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
  MOUSEOVER: "mouseover",
  MOUSEOUT: "mouseout",
  FOCUS: "focus",
  BLUR: "blur",
  KEYDOWN: "keydown"
};
var Messages = {
  NO_ID_ERROR: "Could not find your tooltip's id.",
  NO_TRIGGER_ERROR: function NO_TRIGGER_ERROR(id) {
    return "Could not find a tooltip trigger with id of ".concat(id, ".");
  },
  NO_TOOLTIP_ERROR: function NO_TOOLTIP_ERROR(id) {
    return "Could not find a tooltip with id of ".concat(id, ".");
  }
};

var Tooltip = function () {
  function Tooltip() {
    _classCallCheck(this, Tooltip);

    this._render = this._render.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleEscapeKeyPress = this._handleEscapeKeyPress.bind(this);
    this._allTooltipTriggers = [];
  }

  _createClass(Tooltip, [{
    key: "start",
    value: function start() {
      var _this = this;

      this._allTooltipTriggers = document.querySelectorAll("[".concat(Selectors.DATA_TOOLTIP, "]"));

      this._allTooltipTriggers.forEach(function (instance) {
        _this._setupTooltip(instance);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this._allTooltipTriggers.forEach(function (element) {
        var id = element.getAttribute(Selectors.DATA_TOOLTIP);
        var trigger = element.querySelector(_this2._getTrigger(id));
        element.removeEventListener(Events.MOUSEOVER, _this2._render);
        element.removeEventListener(Events.FOCUS, _this2._render);
      });
    }
  }, {
    key: "_render",
    value: function _render(event) {
      if (this._activeTooltip) {
        this._handleClose(event);
      }

      this._activeTrigger = event.target;
      this._activeTooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET);
      this._activeTooltip = document.getElementById(this._activeTooltipId);

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
      this._hideTooltip();

      this._listenForOpen();

      this._activeTrigger = null;
      this._activeTooltipId = null;
      this._activeTooltip = null;
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
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
      this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._render);

      this._activeTrigger.removeEventListener(Events.FOCUS, this._render);

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);

      this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose);

      this._activeTrigger.addEventListener(Events.BLUR, this._handleClose);
    }
  }, {
    key: "_listenForOpen",
    value: function _listenForOpen() {
      this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose);

      this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose);

      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);

      this._activeTrigger.addEventListener(Events.MOUSEOVER, this._render);

      this._activeTrigger.addEventListener(Events.FOCUS, this._render);
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
    key: "_setupTooltip",
    value: function _setupTooltip(instance) {
      var id = instance.getAttribute(Selectors.DATA_TOOLTIP);
      var trigger = instance.querySelector(this._getTrigger(id));
      var tooltip = document.getElementById(id);

      if (!id) {
        return console.error(Messages.NO_ID_ERROR);
      }

      if (!trigger) {
        return console.error(Messages.NO_TRIGGER_ERROR(id));
      }

      if (!tooltip) {
        return console.error(Messages.NO_TOOLTIP_ERROR(id));
      }

      trigger.setAttribute(Selectors.ARIA_DESCRIBEDBY, id);
      tooltip.setAttribute(Selectors.ROLE, "tooltip");
      trigger.addEventListener(Events.MOUSEOVER, this._render);
      trigger.addEventListener(Events.FOCUS, this._render);
    }
  }, {
    key: "_getTrigger",
    value: function _getTrigger(id) {
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