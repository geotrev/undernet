/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v3.2.0 (https://undernet.io)
  * Copyright 2017-2019 George Treviranus
  */
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver).value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  var descriptor = privateMap.get(receiver);

  if (!descriptor.writable) {
    throw new TypeError("attempted to set read only private field");
  }

  descriptor.value = value;
  return value;
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

var KeyCodes = {
  SHIFT: 16,
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var Selectors = {
  NOT_VISUALLY_HIDDEN: ":not(.is-visually-hidden)",
  FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
  KEYBOARD_CLASS: "using-keyboard"
};
var Events = {
  KEYDOWN: "keydown",
  CLICK: "click"
};

var Utils = function () {
  function Utils() {
    var _this = this;

    _classCallCheck(this, Utils);

    _focusContainerSelector.set(this, {
      writable: true,
      value: ""
    });

    _focusableChildren.set(this, {
      writable: true,
      value: []
    });

    _focusableFirstChild.set(this, {
      writable: true,
      value: {}
    });

    _focusableLastChild.set(this, {
      writable: true,
      value: {}
    });

    _listeningForKeydown.set(this, {
      writable: true,
      value: false
    });

    _trapFocusWithArrows.set(this, {
      writable: true,
      value: false
    });

    _listenForKeyboard.set(this, {
      writable: true,
      value: function value(event) {
        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (tabKey || shiftKey || arrowUp || arrowDown) {
          document.body.classList.add(Selectors.KEYBOARD_CLASS);
          document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(_this, _listenForKeyboard));
          document.addEventListener(Events.CLICK, _classPrivateFieldGet(_this, _listenForClick));

          _classPrivateFieldSet(_this, _listeningForKeydown, false);
        }
      }
    });

    _listenForClick.set(this, {
      writable: true,
      value: function value(event) {
        document.body.classList.remove(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.CLICK, _classPrivateFieldGet(_this, _listenForClick));
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(_this, _listenForKeyboard));

        _classPrivateFieldSet(_this, _listeningForKeydown, true);
      }
    });

    _handleFocusTrapWithTab.set(this, {
      writable: true,
      value: function value(event) {
        var containerElement = document.querySelector(_classPrivateFieldGet(_this, _focusContainerSelector));
        var containerActive = document.activeElement === containerElement;

        var firstActive = document.activeElement === _classPrivateFieldGet(_this, _focusableFirstChild);

        var lastActive = document.activeElement === _classPrivateFieldGet(_this, _focusableLastChild);

        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;

        if (shiftKey && tabKey && (firstActive || containerActive)) {
          event.preventDefault();

          _classPrivateFieldGet(_this, _focusableLastChild).focus();
        } else if (!shiftKey && tabKey && lastActive) {
          event.preventDefault();

          _classPrivateFieldGet(_this, _focusableFirstChild).focus();
        }
      }
    });

    _handleFocusTrapWithArrows.set(this, {
      writable: true,
      value: function value(event) {
        var firstActive = document.activeElement === _classPrivateFieldGet(_this, _focusableFirstChild);

        var lastActive = document.activeElement === _classPrivateFieldGet(_this, _focusableLastChild);

        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (arrowUp || arrowDown) {
          event.preventDefault();

          if (firstActive && arrowUp) {
            _classPrivateFieldGet(_this, _focusableLastChild).focus();
          } else if (lastActive && arrowDown) {
            _classPrivateFieldGet(_this, _focusableFirstChild).focus();
          } else if (arrowDown) {
            _classPrivateMethodGet(_this, _focusNextChild, _focusNextChild2).call(_this);
          } else if (arrowUp) {
            _classPrivateMethodGet(_this, _focusLastChild, _focusLastChild2).call(_this);
          }
        }
      }
    });

    _focusNextChild.add(this);

    _focusLastChild.add(this);
  }

  _createClass(Utils, [{
    key: "captureFocus",
    value: function captureFocus(container, options) {
      _classPrivateFieldSet(this, _focusContainerSelector, container);

      _classPrivateFieldSet(this, _focusableChildren, this.getFocusableElements(_classPrivateFieldGet(this, _focusContainerSelector)));

      _classPrivateFieldSet(this, _focusableFirstChild, _classPrivateFieldGet(this, _focusableChildren)[0]);

      _classPrivateFieldSet(this, _focusableLastChild, _classPrivateFieldGet(this, _focusableChildren)[_classPrivateFieldGet(this, _focusableChildren).length - 1]);

      if (options) {
        if (options.useArrows) {
          _classPrivateFieldSet(this, _trapFocusWithArrows, options.useArrows || _classPrivateFieldGet(this, _trapFocusWithArrows));

          document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithArrows));
        }
      } else {
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithTab));
      }
    }
  }, {
    key: "releaseFocus",
    value: function releaseFocus() {
      if (_classPrivateFieldGet(this, _trapFocusWithArrows)) {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithArrows));

        _classPrivateFieldSet(this, _trapFocusWithArrows, false);
      } else {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _handleFocusTrapWithTab));
      }
    }
  }, {
    key: "enableFocusOutline",
    value: function enableFocusOutline() {
      document.addEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _listenForKeyboard));
    }
  }, {
    key: "disableFocusOutline",
    value: function disableFocusOutline() {
      if (_classPrivateFieldGet(this, _listeningForKeydown)) {
        document.removeEventListener(Events.KEYDOWN, _classPrivateFieldGet(this, _listenForKeyboard));
      } else {
        document.removeEventListener(Events.CLICK, _classPrivateFieldGet(this, _listenForClick));
      }
    }
  }, {
    key: "getElements",
    value: function getElements(element) {
      var nodeList = document.querySelectorAll(element);
      return Array.apply(null, nodeList);
    }
  }, {
    key: "getFocusableElements",
    value: function getFocusableElements(container) {
      var focusables = Selectors.FOCUSABLE_TAGS.map(function (element) {
        return "".concat(container, " ").concat(element).concat(Selectors.NOT_VISUALLY_HIDDEN);
      });
      return this.getElements(focusables.join(", "));
    }
  }]);

  return Utils;
}();

var _focusContainerSelector = new WeakMap();

var _focusableChildren = new WeakMap();

var _focusableFirstChild = new WeakMap();

var _focusableLastChild = new WeakMap();

var _listeningForKeydown = new WeakMap();

var _trapFocusWithArrows = new WeakMap();

var _listenForKeyboard = new WeakMap();

var _listenForClick = new WeakMap();

var _handleFocusTrapWithTab = new WeakMap();

var _handleFocusTrapWithArrows = new WeakMap();

var _focusNextChild = new WeakSet();

var _focusLastChild = new WeakSet();

var _focusNextChild2 = function _focusNextChild2() {
  for (var i = 0; i < _classPrivateFieldGet(this, _focusableChildren).length; i++) {
    if (_classPrivateFieldGet(this, _focusableChildren)[i] === document.activeElement) {
      _classPrivateFieldGet(this, _focusableChildren)[i + 1].focus();

      break;
    }
  }
};

var _focusLastChild2 = function _focusLastChild2() {
  for (var i = 0; i < _classPrivateFieldGet(this, _focusableChildren).length; i++) {
    if (_classPrivateFieldGet(this, _focusableChildren)[i] === document.activeElement) {
      _classPrivateFieldGet(this, _focusableChildren)[i - 1].focus();

      break;
    }
  }
};

var KeyCodes$1 = {
  ESCAPE: 27
};
var Selectors$1 = {
  MODAL_CONTAINER: "data-modal",
  MODAL_ID: "data-modal-id",
  MODAL_BUTTON: "data-modal-button",
  NO_SCROLL: "no-scroll",
  DATA_VISIBLE: "data-visible",
  DATA_CLOSE: "data-close",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_MODAL: "aria-modal",
  ROLE: "role",
  TABINDEX: "tabindex"
};
var Events$1 = {
  KEYDOWN: "keydown",
  CLICK: "click",
  RESIZE: "resize"
};
var Messages = {
  NO_TARGET_ERROR: "Could not find [data-target] attribute associated with a [data-modal-button] element.",
  NO_PARENT_ERROR: "Could not find [data-parent] attribute associated with a [data-modal] element.",
  NO_ID_ERROR: function NO_ID_ERROR(id) {
    return "Could not find [data-modal-id='".concat(id, "'] associated with a [data-modal] element.");
  }
};

var Modal = function (_Utils) {
  _inherits(Modal, _Utils);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));

    _modals.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _modalButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _activeModalButton.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeModalOverlay.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeModal.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeModalId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeModalOverlayAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeModalSelector.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeModalCloseButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _modalContainerAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: "[".concat(Selectors$1.MODAL_CONTAINER, "]")
    });

    _render.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton, event.target);

        if (!_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton).getAttribute(Selectors$1.DATA_TARGET)) {
          return console.error(Messages.NO_TARGET_ERROR);
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton).getAttribute(Selectors$1.DATA_TARGET));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr, "[".concat(Selectors$1.MODAL_ID, "=\"").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId), "\"]"));

        if (!document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr))) {
          return console.error(Messages.NO_ID_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector, "".concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr), " ").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _modalContainerAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons, _this.getElements("".concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr), " [").concat(Selectors$1.MODAL_CONTAINER, "] [").concat(Selectors$1.DATA_CLOSE, "]")));

        _this.getFocusableElements(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "0");
        });

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollStop, _handleScrollStop2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _this.captureFocus(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors$1.ARIA_HIDDEN, "false");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal).setAttribute(Selectors$1.TABINDEX, "-1");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors$1.DATA_VISIBLE, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal).focus();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).scrollTop = 0;
        document.addEventListener(Events$1.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress));
        document.addEventListener(Events$1.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons).forEach(function (button) {
          button.addEventListener(Events$1.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));
        });
      }
    });

    _setupModal.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _handleClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors$1.DATA_VISIBLE, "false");

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus, _handleReturnFocus2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollRestore, _handleScrollRestore2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _this.releaseFocus();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay).setAttribute(Selectors$1.ARIA_HIDDEN, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal).removeAttribute(Selectors$1.TABINDEX);

        _this.getFocusableElements(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "-1");
        });

        document.removeEventListener(Events$1.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress));
        document.removeEventListener(Events$1.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons).forEach(function (button) {
          button.removeEventListener(Events$1.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose));
        });
      }
    });

    _handleOverlayClick.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.target === _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleEscapeKeyPress.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes$1.ESCAPE) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleReturnFocus.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _handleScrollRestore.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _handleScrollStop.add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Modal, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldSet(this, _modals, this.getElements(_classPrivateFieldGet(this, _modalContainerAttr)));

      _classPrivateFieldSet(this, _modalButtons, this.getElements("[".concat(Selectors$1.MODAL_BUTTON, "]")));

      this.getFocusableElements(_classPrivateFieldGet(this, _modalContainerAttr)).forEach(function (element) {
        element.setAttribute(Selectors$1.TABINDEX, "-1");
      });

      if (_classPrivateFieldGet(this, _modals).length) {
        _classPrivateFieldGet(this, _modals).forEach(function (modal) {
          _classPrivateMethodGet(_this2, _setupModal, _setupModal2).call(_this2, modal);
        });
      }

      if (_classPrivateFieldGet(this, _modalButtons).length) {
        _classPrivateFieldGet(this, _modalButtons).forEach(function (button) {
          button.addEventListener(Events$1.CLICK, _classPrivateFieldGet(_this2, _render));
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldGet(this, _modalButtons).forEach(function (button) {
        button.removeEventListener(Events$1.CLICK, _classPrivateFieldGet(_this3, _render));
      });
    }
  }]);

  return Modal;
}(Utils);

var _modals = new WeakMap();

var _modalButtons = new WeakMap();

var _activeModalButton = new WeakMap();

var _activeModalOverlay = new WeakMap();

var _activeModal = new WeakMap();

var _activeModalId = new WeakMap();

var _activeModalOverlayAttr = new WeakMap();

var _activeModalSelector = new WeakMap();

var _activeModalCloseButtons = new WeakMap();

var _modalContainerAttr = new WeakMap();

var _render = new WeakMap();

var _setupModal = new WeakSet();

var _handleClose = new WeakMap();

var _handleOverlayClick = new WeakMap();

var _handleEscapeKeyPress = new WeakMap();

var _handleReturnFocus = new WeakSet();

var _handleScrollRestore = new WeakSet();

var _handleScrollStop = new WeakSet();

var _setupModal2 = function _setupModal2(modal) {
  var modalId;

  if (!modal.getAttribute(Selectors$1.DATA_PARENT)) {
    return console.error(Messages.NO_PARENT_ERROR);
  } else {
    modalId = modal.getAttribute(Selectors$1.DATA_PARENT);
  }

  var modalWrapper;

  if (!document.querySelector("[".concat(Selectors$1.MODAL_ID, "='").concat(modalId, "']"))) {
    return console.error(Messages.NO_ID_ERROR(modalId));
  } else {
    modalWrapper = document.querySelector("[".concat(Selectors$1.MODAL_ID, "='").concat(modalId, "']"));
  }

  modalWrapper.setAttribute(Selectors$1.ARIA_HIDDEN, "true");
  modalWrapper.setAttribute(Selectors$1.DATA_VISIBLE, "false");
  modal.setAttribute(Selectors$1.ARIA_MODAL, "true");
  modal.setAttribute(Selectors$1.ROLE, "dialog");
};

var _handleReturnFocus2 = function _handleReturnFocus2() {
  _classPrivateFieldGet(this, _activeModalButton).setAttribute(Selectors$1.TABINDEX, "-1");

  _classPrivateFieldGet(this, _activeModalButton).focus();

  _classPrivateFieldGet(this, _activeModalButton).removeAttribute(Selectors$1.TABINDEX);
};

var _handleScrollRestore2 = function _handleScrollRestore2() {
  document.body.classList.remove(Selectors$1.NO_SCROLL);
  document.querySelector("html").classList.remove(Selectors$1.NO_SCROLL);
};

var _handleScrollStop2 = function _handleScrollStop2() {
  document.body.classList.add(Selectors$1.NO_SCROLL);
  document.querySelector("html").classList.add(Selectors$1.NO_SCROLL);
};

var Selectors$2 = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_ROW: "data-accordion-row",
  DATA_VISIBLE: "data-visible",
  DATA_TARGET: "data-target",
  DATA_TOGGLE_MULTIPLE: "data-toggle-multiple",
  DATA_PARENT: "data-parent",
  ARIA_EXPANDED: "aria-expanded",
  ARIA_CONTROLS: "aria-controls",
  ARIA_HIDDEN: "aria-hidden",
  ARIA_LABELLEDBY: "aria-labelledby",
  TABINDEX: "tabindex"
};
var Events$2 = {
  CLICK: "click",
  KEYDOWN: "keydown"
};
var Messages$1 = {
  NO_VISIBLE_ERROR: function NO_VISIBLE_ERROR(id) {
    return "Could not find parent with [data-visible] attribute associated with [data-target='".concat(id, "'].");
  },
  NO_ROW_ERROR: function NO_ROW_ERROR(id) {
    return "Could not find [data-accordion-row] associated with ".concat(id, ".");
  },
  NO_HEADER_ID_ERROR: function NO_HEADER_ID_ERROR(id) {
    return "Could not find header tag associated with [data-target='".concat(id, "'].");
  },
  NO_PARENT_ERROR: function NO_PARENT_ERROR(id) {
    return "Could not find [data-parent] associated with [data-target='".concat(id, "'].");
  },
  NO_CONTENT_ERROR: function NO_CONTENT_ERROR(id) {
    return "Could not find accordion content block with [id] ".concat(id, " associated with [data-target='").concat(id, "'].");
  }
};

var Accordion = function (_Utils) {
  _inherits(Accordion, _Utils);

  function Accordion() {
    var _this;

    _classCallCheck(this, Accordion);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));

    _accordionButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _accordionContentsAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _accordionContents.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _activeContainer.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeButton.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeAccordionRowId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeRowAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeRow.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContainerId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContainerAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContent.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: {}
    });

    _activeButtonExpandState.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeContentHiddenState.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _setupAccordion.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getPossibleAccordionHeaderAttrs.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getAccordionRowAttr.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _render$1.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton, event.target);

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton).getAttribute(Selectors$2.DATA_TARGET));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr, _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _getAccordionRowAttr, _getAccordionRowAttr2).call(_assertThisInitialized(_assertThisInitialized(_this)), _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr)));

        if (!_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton).getAttribute(Selectors$2.DATA_PARENT)) {
          return console.error(Messages$1.NO_PARENT_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton).getAttribute(Selectors$2.DATA_PARENT));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr, "[".concat(Selectors$2.ACCORDION_CONTAINER, "='").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId), "']"));

        if (!document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr))) {
          return console.error(Messages$1.NO_ACCORDION_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainer, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContent, document.getElementById(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)));

        var accordionButtonState = _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow).getAttribute(Selectors$2.DATA_VISIBLE);

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState, accordionButtonState === "true" ? "false" : "true");

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeContentHiddenState, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState) === "false" ? "true" : "false");

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _closeAllIfToggleable, _closeAllIfToggleable2).call(_assertThisInitialized(_assertThisInitialized(_this)));

        _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _toggleSelectedAccordion, _toggleSelectedAccordion2).call(_assertThisInitialized(_assertThisInitialized(_this)));
      }
    });

    _closeAllIfToggleable.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _toggleSelectedAccordion.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _toggleAttributeInCollection.add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Accordion, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldSet(this, _accordionButtons, this.getElements("[".concat(Selectors$2.ACCORDION_CONTAINER, "] [").concat(Selectors$2.DATA_TARGET, "]")));

      if (_classPrivateFieldGet(this, _accordionButtons).length) {
        _classPrivateFieldGet(this, _accordionButtons).forEach(function (button) {
          _classPrivateMethodGet(_this2, _setupAccordion, _setupAccordion2).call(_this2, button);

          button.addEventListener(Events$2.CLICK, _classPrivateFieldGet(_this2, _render$1));
        });
      }
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldGet(this, _accordionButtons).forEach(function (button) {
        button.removeEventListener(Events$2.CLICK, _classPrivateFieldGet(_this3, _render$1));
      });
    }
  }]);

  return Accordion;
}(Utils);

var _accordionButtons = new WeakMap();

var _accordionContentsAttr = new WeakMap();

var _accordionContents = new WeakMap();

var _activeContainer = new WeakMap();

var _activeButton = new WeakMap();

var _activeAccordionRowId = new WeakMap();

var _activeRowAttr = new WeakMap();

var _activeRow = new WeakMap();

var _activeContainerId = new WeakMap();

var _activeContainerAttr = new WeakMap();

var _activeContent = new WeakMap();

var _activeButtonExpandState = new WeakMap();

var _activeContentHiddenState = new WeakMap();

var _setupAccordion = new WeakSet();

var _getPossibleAccordionHeaderAttrs = new WeakSet();

var _getAccordionRowAttr = new WeakSet();

var _render$1 = new WeakMap();

var _closeAllIfToggleable = new WeakSet();

var _toggleSelectedAccordion = new WeakSet();

var _toggleAttributeInCollection = new WeakSet();

var _setupAccordion2 = function _setupAccordion2(button) {
  var buttonId = button.getAttribute(Selectors$2.DATA_TARGET);

  if (!document.getElementById(buttonId)) {
    return console.error(Messages$1.NO_CONTENT_ERROR(buttonId));
  }

  var buttonContent = document.getElementById(buttonId);

  var accordionRowAttr = _classPrivateMethodGet(this, _getAccordionRowAttr, _getAccordionRowAttr2).call(this, buttonId);

  if (!document.querySelector(accordionRowAttr)) {
    return console.error(Messages$1.NO_ROW_ERROR(buttonId));
  }

  var accordionRow = document.querySelector(accordionRowAttr);

  var buttonHeaderAttr = _classPrivateMethodGet(this, _getPossibleAccordionHeaderAttrs, _getPossibleAccordionHeaderAttrs2).call(this, accordionRowAttr);

  var buttonHeader = this.getElements(buttonHeaderAttr)[0];

  if (!buttonHeader || !buttonHeader.id) {
    console.error(Messages$1.NO_HEADER_ID_ERROR(buttonId));
  }

  var buttonContentChildren = this.getFocusableElements("#".concat(buttonContent.id));
  button.setAttribute(Selectors$2.ARIA_CONTROLS, buttonId);
  buttonContent.setAttribute(Selectors$2.ARIA_LABELLEDBY, buttonHeader.id);

  if (!accordionRow.getAttribute(Selectors$2.DATA_VISIBLE)) {
    return console.error(Messages$1.NO_VISIBLE_ERROR(buttonId));
  }

  var contentShouldExpand = accordionRow.getAttribute(Selectors$2.DATA_VISIBLE);

  if (contentShouldExpand === "true") {
    buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
    button.setAttribute(Selectors$2.ARIA_EXPANDED, "true");
    buttonContent.setAttribute(Selectors$2.ARIA_HIDDEN, "false");
    buttonContentChildren.forEach(function (element) {
      element.setAttribute(Selectors$2.TABINDEX, "0");
    });
  } else {
    button.setAttribute(Selectors$2.ARIA_EXPANDED, "false");
    buttonContent.setAttribute(Selectors$2.ARIA_HIDDEN, "true");
    buttonContentChildren.forEach(function (element) {
      element.setAttribute(Selectors$2.TABINDEX, "-1");
    });
  }
};

var _getPossibleAccordionHeaderAttrs2 = function _getPossibleAccordionHeaderAttrs2(attr) {
  return "".concat(attr, " h1, ").concat(attr, " h2, ").concat(attr, " h3, ").concat(attr, " h4, ").concat(attr, " h5, ").concat(attr, " h6");
};

var _getAccordionRowAttr2 = function _getAccordionRowAttr2(id) {
  return "[".concat(Selectors$2.ACCORDION_ROW, "='").concat(id, "']");
};

var _closeAllIfToggleable2 = function _closeAllIfToggleable2() {
  var _this4 = this;

  if (_classPrivateFieldGet(this, _activeContainer).hasAttribute(Selectors$2.DATA_TOGGLE_MULTIPLE)) return;
  var allContentAttr = "".concat(_classPrivateFieldGet(this, _activeContainerAttr), " [").concat(Selectors$2.ARIA_HIDDEN, "]");
  var allRows = this.getElements("".concat(_classPrivateFieldGet(this, _activeContainerAttr), " [").concat(Selectors$2.DATA_VISIBLE, "]"));
  var allContent = this.getElements(allContentAttr);
  var allButtons = this.getElements("".concat(_classPrivateFieldGet(this, _activeContainerAttr), " [").concat(Selectors$2.DATA_TARGET, "]"));
  allContent.forEach(function (content) {
    if (!(content === _classPrivateFieldGet(_this4, _activeContent))) content.style.maxHeight = null;
  });
  this.getFocusableElements(allContentAttr).forEach(function (element) {
    element.setAttribute(Selectors$2.TABINDEX, "-1");
  });

  _classPrivateMethodGet(this, _toggleAttributeInCollection, _toggleAttributeInCollection2).call(this, allRows, Selectors$2.DATA_VISIBLE, "true", "false");

  _classPrivateMethodGet(this, _toggleAttributeInCollection, _toggleAttributeInCollection2).call(this, allButtons, Selectors$2.ARIA_EXPANDED, "true", "false");

  _classPrivateMethodGet(this, _toggleAttributeInCollection, _toggleAttributeInCollection2).call(this, allContent, Selectors$2.ARIA_HIDDEN, "false", "true");
};

var _toggleSelectedAccordion2 = function _toggleSelectedAccordion2() {
  var _this5 = this;

  _classPrivateFieldGet(this, _activeRow).setAttribute(Selectors$2.DATA_VISIBLE, _classPrivateFieldGet(this, _activeButtonExpandState));

  _classPrivateFieldGet(this, _activeButton).setAttribute(Selectors$2.ARIA_EXPANDED, _classPrivateFieldGet(this, _activeButtonExpandState));

  _classPrivateFieldGet(this, _activeContent).setAttribute(Selectors$2.ARIA_HIDDEN, _classPrivateFieldGet(this, _activeContentHiddenState));

  var activeContentBlock = "#".concat(_classPrivateFieldGet(this, _activeAccordionRowId));
  this.getFocusableElements(activeContentBlock).forEach(function (element) {
    var value = _classPrivateFieldGet(_this5, _activeButtonExpandState) === "true" ? "0" : "-1";
    element.setAttribute(Selectors$2.TABINDEX, value);
  });

  if (_classPrivateFieldGet(this, _activeContent).style.maxHeight) {
    _classPrivateFieldGet(this, _activeContent).style.maxHeight = null;
  } else {
    _classPrivateFieldGet(this, _activeContent).style.maxHeight = "".concat(_classPrivateFieldGet(this, _activeContent).scrollHeight, "px");
  }
};

var _toggleAttributeInCollection2 = function _toggleAttributeInCollection2(elements, attributeName, currentValue, newValue) {
  elements.forEach(function (element) {
    if (element.hasAttribute(attributeName, currentValue)) {
      element.setAttribute(attributeName, newValue);
    }
  });
};

var KeyCodes$2 = {
  TAB: 9,
  SHIFT: 16,
  ESCAPE: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
var Selectors$3 = {
  DATA_DROPDOWN: "data-dropdown",
  DATA_TARGET: "data-target",
  DATA_PARENT: "data-parent",
  DATA_VISIBLE: "data-visible",
  TABINDEX: "tabindex",
  ARIA_HASPOPUP: "aria-haspopup",
  ARIA_CONTROLS: "aria-controls",
  ARIA_LABELLEDBY: "aria-labelledby",
  ARIA_EXPANDED: "aria-expanded",
  ROLE: "role"
};
var Events$3 = {
  KEYDOWN: "keydown",
  CLICK: "click"
};
var Messages$2 = {
  NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute.",
  NO_DROPDOWN_ERROR: function NO_DROPDOWN_ERROR(attr) {
    return "Could not find dropdown container associated with ".concat(attr, ".");
  },
  NO_MENU_ERROR: function NO_MENU_ERROR(attr) {
    return "Could not find menu associated with ".concat(attr, ".");
  }
};

var Dropdown = function (_Utils) {
  _inherits(Dropdown, _Utils);

  function Dropdown() {
    var _this;

    _classCallCheck(this, Dropdown);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Dropdown).call(this));

    _activeDropdownButton.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: null
    });

    _activeDropdown.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: null
    });

    _activeDropdownMenu.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: null
    });

    _activeDropdownLinks.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _allowFocusReturn.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: true
    });

    _activeDropdownId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeDropdownAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _activeDropdownMenuId.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: ""
    });

    _dropdownButtons.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _dropdowns.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: []
    });

    _dropdownTargetAttr.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: "[".concat(Selectors$3.DATA_TARGET, "]")
    });

    _render$2.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event, key) {
        if (!key) event.preventDefault();
        event.stopPropagation();

        if (_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)) {
          _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn, false);

          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1).call(_assertThisInitialized(_assertThisInitialized(_this)), event);

          _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn, true);
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton, event.target);

        if (!_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).getAttribute(Selectors$3.DATA_PARENT)) {
          return console.error(Messages$2.NO_PARENT_ERROR);
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).getAttribute(Selectors$3.DATA_PARENT));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr, "[".concat(Selectors$3.DATA_DROPDOWN, "=\"").concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId), "\"]"));

        if (!document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr))) {
          return console.error(Messages$2.NO_DROPDOWN_ERROR(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)));
        }

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown, document.querySelector(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).getAttribute(Selectors$3.DATA_TARGET));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu, document.getElementById(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId)));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).setAttribute(Selectors$3.ARIA_EXPANDED, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown).setAttribute(Selectors$3.DATA_VISIBLE, "true");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).removeEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _render$2));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).addEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1));

        document.addEventListener(Events$3.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress$1));
        document.addEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick));

        _classPrivateFieldSet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks, _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _getDropdownLinks, _getDropdownLinks2).call(_assertThisInitialized(_assertThisInitialized(_this)), _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)));

        _this.firstDropdownLink = _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[0];
        _this.lastDropdownLink = _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks).length - 1];

        _this.firstDropdownLink.addEventListener(Events$3.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleFirstTabClose));

        _this.lastDropdownLink.addEventListener(Events$3.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleLastTabClose));

        if (key && key === KeyCodes$2.ARROW_UP) {
          _this.lastDropdownLink.focus();
        } else {
          _this.firstDropdownLink.focus();
        }

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks).forEach(function (link) {
          link.setAttribute(Selectors$3.TABINDEX, "0");
          link.addEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1));
        });

        _this.captureFocus("".concat(_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr), " > ul"), {
          useArrows: true
        });
      }
    });

    _handleFirstTabClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        var shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes$2.TAB;

        if (shiftKey && tabKey) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleLastTabClose.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        var shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes$2.TAB;

        if (tabKey && !shiftKey) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _renderWithKeys.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes$2.ARROW_UP || event.which === KeyCodes$2.ARROW_DOWN) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _render$2).call(_assertThisInitialized(_assertThisInitialized(_this)), event, event.which);
        }
      }
    });

    _handleClose$1.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        event.preventDefault();

        _this.releaseFocus();

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).setAttribute(Selectors$3.ARIA_EXPANDED, "false");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown).setAttribute(Selectors$3.DATA_VISIBLE, "false");

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks).forEach(function (link) {
          link.setAttribute(Selectors$3.TABINDEX, "-1");
          link.removeEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1));
        });

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).removeEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1));

        _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton).addEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _render$2));

        document.removeEventListener(Events$3.KEYDOWN, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress$1));
        document.removeEventListener(Events$3.CLICK, _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick));

        if (_classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)) {
          _classPrivateMethodGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus$1, _handleReturnFocus2$1).call(_assertThisInitialized(_assertThisInitialized(_this)));
        }
      }
    });

    _handleEscapeKeyPress$1.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.which === KeyCodes$2.ESCAPE) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleOffMenuClick.set(_assertThisInitialized(_assertThisInitialized(_this)), {
      writable: true,
      value: function value(event) {
        if (event.target !== _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton) && event.target !== _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu)) {
          _classPrivateFieldGet(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1).call(_assertThisInitialized(_assertThisInitialized(_this)), event);
        }
      }
    });

    _handleReturnFocus$1.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _getDropdownLinks.add(_assertThisInitialized(_assertThisInitialized(_this)));

    _setupDropdown.add(_assertThisInitialized(_assertThisInitialized(_this)));

    return _this;
  }

  _createClass(Dropdown, [{
    key: "start",
    value: function start() {
      var _this2 = this;

      _classPrivateFieldSet(this, _dropdowns, this.getElements("[".concat(Selectors$3.DATA_DROPDOWN, "]")));

      _classPrivateFieldSet(this, _dropdownButtons, this.getElements("[".concat(Selectors$3.DATA_DROPDOWN, "] > ").concat(_classPrivateFieldGet(this, _dropdownTargetAttr))));

      if (_classPrivateFieldGet(this, _dropdowns).length) {
        _classPrivateFieldGet(this, _dropdowns).forEach(function (dropdown) {
          return _classPrivateMethodGet(_this2, _setupDropdown, _setupDropdown2).call(_this2, dropdown);
        });
      }

      _classPrivateFieldGet(this, _dropdownButtons).forEach(function (button) {
        button.addEventListener(Events$3.CLICK, _classPrivateFieldGet(_this2, _render$2));
        button.addEventListener(Events$3.KEYDOWN, _classPrivateFieldGet(_this2, _renderWithKeys));
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _this3 = this;

      _classPrivateFieldGet(this, _dropdownButtons).forEach(function (button) {
        button.removeEventListener(Events$3.CLICK, _classPrivateFieldGet(_this3, _render$2));
        button.removeEventListener(Events$3.KEYDOWN, _classPrivateFieldGet(_this3, _renderWithKeys));
      });
    }
  }]);

  return Dropdown;
}(Utils);

var _activeDropdownButton = new WeakMap();

var _activeDropdown = new WeakMap();

var _activeDropdownMenu = new WeakMap();

var _activeDropdownLinks = new WeakMap();

var _allowFocusReturn = new WeakMap();

var _activeDropdownId = new WeakMap();

var _activeDropdownAttr = new WeakMap();

var _activeDropdownMenuId = new WeakMap();

var _dropdownButtons = new WeakMap();

var _dropdowns = new WeakMap();

var _dropdownTargetAttr = new WeakMap();

var _render$2 = new WeakMap();

var _handleFirstTabClose = new WeakMap();

var _handleLastTabClose = new WeakMap();

var _renderWithKeys = new WeakMap();

var _handleClose$1 = new WeakMap();

var _handleEscapeKeyPress$1 = new WeakMap();

var _handleOffMenuClick = new WeakMap();

var _handleReturnFocus$1 = new WeakSet();

var _getDropdownLinks = new WeakSet();

var _setupDropdown = new WeakSet();

var _handleReturnFocus2$1 = function _handleReturnFocus2() {
  _classPrivateFieldGet(this, _activeDropdownButton).setAttribute(Selectors$3.TAB_INDEX, "-1");

  _classPrivateFieldGet(this, _activeDropdownButton).focus();

  _classPrivateFieldGet(this, _activeDropdownButton).removeAttribute(Selectors$3.TAB_INDEX);
};

var _getDropdownLinks2 = function _getDropdownLinks2(attr) {
  return this.getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
};

var _setupDropdown2 = function _setupDropdown2(dropdown) {
  var dropdownId = dropdown.getAttribute(Selectors$3.DATA_DROPDOWN);
  var dropdownIdAttr = "[".concat(Selectors$3.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
  var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");

  if (!document.querySelector("".concat(dropdownIdAttr, " > ul"))) {
    return console.error(Messages$2.NO_MENU_ERROR(dropdownIdAttr));
  }

  var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
  var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(_classPrivateFieldGet(this, _dropdownTargetAttr)));
  dropdownButton.setAttribute(Selectors$3.ARIA_CONTROLS, dropdownMenu.id);
  dropdownButton.setAttribute(Selectors$3.ARIA_HASPOPUP, "true");
  dropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "false");
  dropdownMenu.setAttribute(Selectors$3.ARIA_LABELLEDBY, dropdownButton.id);
  var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
  dropdownMenuItems.forEach(function (item) {
    return item.setAttribute(Selectors$3.ROLE, "none");
  });

  _classPrivateMethodGet(this, _getDropdownLinks, _getDropdownLinks2).call(this, dropdownIdAttr).forEach(function (link) {
    link.setAttribute(Selectors$3.ROLE, "menuitem");
    link.setAttribute(Selectors$3.TABINDEX, "-1");
  });
};

var Modals = new Modal();
var Accordions = new Accordion();
var Dropdowns = new Dropdown();
var Utils$1 = new Utils();
var Undernet = {
  Modals: Modals,
  Accordions: Accordions,
  Dropdowns: Dropdowns,
  Utils: Utils$1
};

Undernet.start = function () {
  Undernet.Modals.start();
  Undernet.Accordions.start();
  Undernet.Dropdowns.start();
  Undernet.Utils.enableFocusOutline();
};

Undernet.stop = function () {
  Undernet.Modals.stop();
  Undernet.Accordions.stop();
  Undernet.Dropdowns.stop();
  Undernet.Utils.disableFocusOutline();
};

export default Undernet;
export { Modals, Accordions, Dropdowns, Utils$1 as Utils };
