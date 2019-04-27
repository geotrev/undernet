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
    this._activeTrigger = null;
    this._activeTooltip = null;
    this._allTooltips = [];
  }

  _createClass(Tooltip, [{
    key: "start",
    value: function start() {
      var _this = this;

      this._allTooltips = _utils.dom.findAll("[".concat(Selectors.DATA_TOOLTIP, "]"));

      this._allTooltips.forEach(function (instance) {
        _this._setup(instance);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this2 = this;

      this._allTooltips.forEach(function (instance) {
        var id = _utils.dom.attr(instance, Selectors.DATA_TOOLTIP);

        var trigger = _utils.dom.find(_this2._getTrigger(id), instance);

        if (_this2._activeTooltip || _this2._activeTrigger) {
          _this2._handleClose();
        }

        trigger.removeEventListener(Events.MOUSEOVER, _this2._render);
        trigger.removeEventListener(Events.FOCUS, _this2._render);
      });
    }
  }, {
    key: "_setup",
    value: function _setup(instance) {
      var tooltipId = _utils.dom.attr(instance, Selectors.DATA_TOOLTIP);

      if (!tooltipId) {
        throw new Error(Messages.NO_ID_ERROR);
      }

      var trigger = _utils.dom.find(this._getTrigger(tooltipId), instance);

      var tooltip = _utils.dom.find("#".concat(tooltipId), instance);

      if (!trigger) {
        throw new Error(Messages.NO_TRIGGER_ERROR(tooltipId));
      }

      if (!tooltip) {
        throw new Error(Messages.NO_TOOLTIP_ERROR(tooltipId));
      }

      _utils.dom.attr(trigger, Selectors.ARIA_DESCRIBEDBY, tooltipId);

      _utils.dom.attr(tooltip, Selectors.ROLE, "tooltip");

      trigger.addEventListener(Events.MOUSEOVER, this._render);
      trigger.addEventListener(Events.FOCUS, this._render);
    }
  }, {
    key: "_render",
    value: function _render(event) {
      this._activeTrigger = event.target;

      var tooltipId = this._activeTrigger.getAttribute(Selectors.DATA_TARGET);

      this._activeTooltip = document.getElementById(tooltipId);

      if (this._isLeftOrRight()) {
        this._alignTooltip("height");
      } else {
        this._alignTooltip("width");
      }

      this._setVisibleState();

      this._startCloseEvents();
    }
  }, {
    key: "_handleClose",
    value: function _handleClose() {
      this._setHideState();

      this._startOpenEvents();

      this._activeTrigger = null;
      this._activeTooltip = null;
    }
  }, {
    key: "_setVisibleState",
    value: function _setVisibleState() {
      _utils.dom.attr(this._activeTooltip, Selectors.DATA_VISIBLE, "true");
    }
  }, {
    key: "_setHideState",
    value: function _setHideState() {
      _utils.dom.attr(this._activeTooltip, Selectors.DATA_VISIBLE, "false");
    }
  }, {
    key: "_startCloseEvents",
    value: function _startCloseEvents() {
      this._activeTrigger.removeEventListener(Events.MOUSEOVER, this._render);

      this._activeTrigger.removeEventListener(Events.FOCUS, this._render);

      this._activeTrigger.addEventListener(Events.MOUSEOUT, this._handleClose);

      this._activeTrigger.addEventListener(Events.BLUR, this._handleClose);

      document.addEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);

      if (_utils.iOSMobile) {
        _utils.dom.css(document.body, "cursor", "pointer");
      }
    }
  }, {
    key: "_handleEscapeKeyPress",
    value: function _handleEscapeKeyPress(event) {
      if (event.which === KeyCodes.ESCAPE) {
        this._handleClose();
      }
    }
  }, {
    key: "_startOpenEvents",
    value: function _startOpenEvents() {
      this._activeTrigger.removeEventListener(Events.MOUSEOUT, this._handleClose);

      this._activeTrigger.removeEventListener(Events.BLUR, this._handleClose);

      this._activeTrigger.addEventListener(Events.MOUSEOVER, this._render);

      this._activeTrigger.addEventListener(Events.FOCUS, this._render);

      document.removeEventListener(Events.KEYDOWN, this._handleEscapeKeyPress);
      if (_utils.iOSMobile) _utils.dom.css(document.body, "cursor", "auto");
    }
  }, {
    key: "_alignTooltip",
    value: function _alignTooltip(property) {
      var triggerSize = this._getSize(this._activeTrigger, property);

      var tooltipSize = this._getSize(this._activeTooltip, property);

      var triggerIsBigger = triggerSize > tooltipSize;
      var offset = triggerIsBigger ? (triggerSize - tooltipSize) / 2 : (tooltipSize - triggerSize) / -2;

      if (property === "height") {
        _utils.dom.css(this._activeTooltip, "top", "".concat(offset, "px"));
      } else {
        _utils.dom.css(this._activeTooltip, "left", "".concat(offset, "px"));
      }
    }
  }, {
    key: "_getTrigger",
    value: function _getTrigger(id) {
      return "[".concat(Selectors.DATA_TARGET, "=\"").concat(id, "\"]");
    }
  }, {
    key: "_getSize",
    value: function _getSize(element, property) {
      return Math.floor(element.getBoundingClientRect()[property]);
    }
  }, {
    key: "_isLeftOrRight",
    value: function _isLeftOrRight() {
      return _utils.dom.hasClass(this._activeTooltip, Selectors.DROP_LEFT_CLASS, Selectors.DROP_RIGHT_CLASS);
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;
//# sourceMappingURL=tooltip.js.map