/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v3.1.4 (https://undernet.io)
  * Copyright 2017-2019 George Treviranus
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.undernet = {})));
}(this, (function (exports) { 'use strict';

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

  var id = 0;

  function _classPrivateFieldLooseKey(name) {
    return "__private_" + id++ + "_" + name;
  }

  function _classPrivateFieldLooseBase(receiver, privateKey) {
    if (!Object.prototype.hasOwnProperty.call(receiver, privateKey)) {
      throw new TypeError("attempted to use private field on non-instance");
    }

    return receiver;
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

      Object.defineProperty(this, _focusContainerSelector, {
        writable: true,
        value: ""
      });
      Object.defineProperty(this, _focusableChildren, {
        writable: true,
        value: []
      });
      Object.defineProperty(this, _focusableFirstChild, {
        writable: true,
        value: {}
      });
      Object.defineProperty(this, _focusableLastChild, {
        writable: true,
        value: {}
      });
      Object.defineProperty(this, _listeningForKeydown, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _trapFocusWithArrows, {
        writable: true,
        value: false
      });
      Object.defineProperty(this, _listenForKeyboard, {
        writable: true,
        value: function value(event) {
          var tabKey = event.which === KeyCodes.TAB;
          var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
          var arrowUp = event.which === KeyCodes.ARROW_UP;
          var arrowDown = event.which === KeyCodes.ARROW_DOWN;

          if (tabKey || shiftKey || arrowUp || arrowDown) {
            document.body.classList.add(Selectors.KEYBOARD_CLASS);
            document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_this, _listenForKeyboard)[_listenForKeyboard]);
            document.addEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this, _listenForClick)[_listenForClick]);
            _classPrivateFieldLooseBase(_this, _listeningForKeydown)[_listeningForKeydown] = false;
          }
        }
      });
      Object.defineProperty(this, _listenForClick, {
        writable: true,
        value: function value(event) {
          document.body.classList.remove(Selectors.KEYBOARD_CLASS);
          document.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(_this, _listenForClick)[_listenForClick]);
          document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(_this, _listenForKeyboard)[_listenForKeyboard]);
          _classPrivateFieldLooseBase(_this, _listeningForKeydown)[_listeningForKeydown] = true;
        }
      });
      Object.defineProperty(this, _handleFocusTrapWithTab, {
        writable: true,
        value: function value(event) {
          var containerElement = document.querySelector(_classPrivateFieldLooseBase(_this, _focusContainerSelector)[_focusContainerSelector]);
          var containerActive = document.activeElement === containerElement;

          var firstActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild];

          var lastActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild];

          var tabKey = event.which === KeyCodes.TAB;
          var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;

          if (shiftKey && tabKey && (firstActive || containerActive)) {
            event.preventDefault();

            _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild].focus();
          } else if (!shiftKey && tabKey && lastActive) {
            event.preventDefault();

            _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild].focus();
          }
        }
      });
      Object.defineProperty(this, _handleFocusTrapWithArrows, {
        writable: true,
        value: function value(event) {
          var firstActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild];

          var lastActive = document.activeElement === _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild];

          var arrowUp = event.which === KeyCodes.ARROW_UP;
          var arrowDown = event.which === KeyCodes.ARROW_DOWN;

          if (arrowUp || arrowDown) {
            event.preventDefault();

            if (firstActive && arrowUp) {
              _classPrivateFieldLooseBase(_this, _focusableLastChild)[_focusableLastChild].focus();
            } else if (lastActive && arrowDown) {
              _classPrivateFieldLooseBase(_this, _focusableFirstChild)[_focusableFirstChild].focus();
            } else if (arrowDown) {
              _classPrivateFieldLooseBase(_this, _focusNextChild)[_focusNextChild]();
            } else if (arrowUp) {
              _classPrivateFieldLooseBase(_this, _focusLastChild)[_focusLastChild]();
            }
          }
        }
      });
      Object.defineProperty(this, _focusNextChild, {
        value: _focusNextChild2
      });
      Object.defineProperty(this, _focusLastChild, {
        value: _focusLastChild2
      });
    }

    _createClass(Utils, [{
      key: "captureFocus",
      value: function captureFocus(container, options) {
        _classPrivateFieldLooseBase(this, _focusContainerSelector)[_focusContainerSelector] = container;
        _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren] = this.getFocusableElements(_classPrivateFieldLooseBase(this, _focusContainerSelector)[_focusContainerSelector]);
        _classPrivateFieldLooseBase(this, _focusableFirstChild)[_focusableFirstChild] = _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][0];
        _classPrivateFieldLooseBase(this, _focusableLastChild)[_focusableLastChild] = _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][_classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren].length - 1];

        if (options) {
          if (options.useArrows) {
            _classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows] = options.useArrows || _classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows];
            document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithArrows)[_handleFocusTrapWithArrows]);
          }
        } else {
          document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithTab)[_handleFocusTrapWithTab]);
        }
      }
    }, {
      key: "releaseFocus",
      value: function releaseFocus() {
        if (_classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows]) {
          document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithArrows)[_handleFocusTrapWithArrows]);
          _classPrivateFieldLooseBase(this, _trapFocusWithArrows)[_trapFocusWithArrows] = false;
        } else {
          document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _handleFocusTrapWithTab)[_handleFocusTrapWithTab]);
        }
      }
    }, {
      key: "enableFocusOutline",
      value: function enableFocusOutline() {
        document.addEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _listenForKeyboard)[_listenForKeyboard]);
      }
    }, {
      key: "disableFocusOutline",
      value: function disableFocusOutline() {
        if (_classPrivateFieldLooseBase(this, _listeningForKeydown)[_listeningForKeydown]) {
          document.removeEventListener(Events.KEYDOWN, _classPrivateFieldLooseBase(this, _listenForKeyboard)[_listenForKeyboard]);
        } else {
          document.removeEventListener(Events.CLICK, _classPrivateFieldLooseBase(this, _listenForClick)[_listenForClick]);
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

  var _focusContainerSelector = _classPrivateFieldLooseKey("focusContainerSelector");

  var _focusableChildren = _classPrivateFieldLooseKey("focusableChildren");

  var _focusableFirstChild = _classPrivateFieldLooseKey("focusableFirstChild");

  var _focusableLastChild = _classPrivateFieldLooseKey("focusableLastChild");

  var _listeningForKeydown = _classPrivateFieldLooseKey("listeningForKeydown");

  var _trapFocusWithArrows = _classPrivateFieldLooseKey("trapFocusWithArrows");

  var _listenForKeyboard = _classPrivateFieldLooseKey("listenForKeyboard");

  var _listenForClick = _classPrivateFieldLooseKey("listenForClick");

  var _handleFocusTrapWithTab = _classPrivateFieldLooseKey("handleFocusTrapWithTab");

  var _handleFocusTrapWithArrows = _classPrivateFieldLooseKey("handleFocusTrapWithArrows");

  var _focusNextChild = _classPrivateFieldLooseKey("focusNextChild");

  var _focusLastChild = _classPrivateFieldLooseKey("focusLastChild");

  var _focusNextChild2 = function _focusNextChild2() {
    for (var i = 0; i < _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren].length; i++) {
      if (_classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i] === document.activeElement) {
        _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i + 1].focus();

        break;
      }
    }
  };

  var _focusLastChild2 = function _focusLastChild2() {
    for (var i = 0; i < _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren].length; i++) {
      if (_classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i] === document.activeElement) {
        _classPrivateFieldLooseBase(this, _focusableChildren)[_focusableChildren][i - 1].focus();

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
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _modals, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _modalButtons, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton, {
        writable: true,
        value: {}
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay, {
        writable: true,
        value: {}
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal, {
        writable: true,
        value: {}
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _modalContainerAttr, {
        writable: true,
        value: "[".concat(Selectors$1.MODAL_CONTAINER, "]")
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _render, {
        writable: true,
        value: function value(event) {
          event.preventDefault();
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton)[_activeModalButton] = event.target;

          if (!_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton)[_activeModalButton].getAttribute(Selectors$1.DATA_TARGET)) {
            return console.error(Messages.NO_TARGET_ERROR);
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)[_activeModalId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalButton)[_activeModalButton].getAttribute(Selectors$1.DATA_TARGET);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr] = "[".concat(Selectors$1.MODAL_ID, "=\"").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)[_activeModalId], "\"]");

          if (!document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr])) {
            return console.error(Messages.NO_ID_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalId)[_activeModalId]));
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector] = "".concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr], " ").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _modalContainerAttr)[_modalContainerAttr]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons)[_activeModalCloseButtons] = _this.getElements("".concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlayAttr)[_activeModalOverlayAttr], " [").concat(Selectors$1.MODAL_CONTAINER, "] [").concat(Selectors$1.DATA_CLOSE, "]"));

          _this.getFocusableElements(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]).forEach(function (element) {
            element.setAttribute(Selectors$1.TABINDEX, "0");
          });

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollStop)[_handleScrollStop]();

          _this.captureFocus(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors$1.ARIA_HIDDEN, "false");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal].setAttribute(Selectors$1.TABINDEX, "-1");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors$1.DATA_VISIBLE, "true");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal].focus();

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].scrollTop = 0;
          document.addEventListener(Events$1.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress)[_handleEscapeKeyPress]);
          document.addEventListener(Events$1.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick)[_handleOverlayClick]);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons)[_activeModalCloseButtons].forEach(function (button) {
            button.addEventListener(Events$1.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);
          });
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _setupModal, {
        value: _setupModal2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose, {
        writable: true,
        value: function value(event) {
          event.preventDefault();

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors$1.DATA_VISIBLE, "false");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus)[_handleReturnFocus]();

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollRestore)[_handleScrollRestore]();

          _this.releaseFocus();

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay].setAttribute(Selectors$1.ARIA_HIDDEN, "true");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModal)[_activeModal].removeAttribute(Selectors$1.TABINDEX);

          _this.getFocusableElements(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalSelector)[_activeModalSelector]).forEach(function (element) {
            element.setAttribute(Selectors$1.TABINDEX, "-1");
          });

          document.removeEventListener(Events$1.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress)[_handleEscapeKeyPress]);
          document.removeEventListener(Events$1.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick)[_handleOverlayClick]);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalCloseButtons)[_activeModalCloseButtons].forEach(function (button) {
            button.removeEventListener(Events$1.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose]);
          });
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleOverlayClick, {
        writable: true,
        value: function value(event) {
          if (event.target === _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeModalOverlay)[_activeModalOverlay]) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress, {
        writable: true,
        value: function value(event) {
          if (event.which === KeyCodes$1.ESCAPE) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose)[_handleClose](event);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus, {
        value: _handleReturnFocus2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollRestore, {
        value: _handleScrollRestore2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleScrollStop, {
        value: _handleScrollStop2
      });
      return _this;
    }

    _createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        _classPrivateFieldLooseBase(this, _modals)[_modals] = this.getElements(_classPrivateFieldLooseBase(this, _modalContainerAttr)[_modalContainerAttr]);
        _classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons] = this.getElements("[".concat(Selectors$1.MODAL_BUTTON, "]"));
        this.getFocusableElements(_classPrivateFieldLooseBase(this, _modalContainerAttr)[_modalContainerAttr]).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "-1");
        });

        if (_classPrivateFieldLooseBase(this, _modals)[_modals].length) {
          _classPrivateFieldLooseBase(this, _modals)[_modals].forEach(function (modal) {
            _classPrivateFieldLooseBase(_this2, _setupModal)[_setupModal](modal);
          });
        }

        if (_classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons].length) {
          _classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons].forEach(function (button) {
            button.addEventListener(Events$1.CLICK, _classPrivateFieldLooseBase(_this2, _render)[_render]);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        _classPrivateFieldLooseBase(this, _modalButtons)[_modalButtons].forEach(function (button) {
          button.removeEventListener(Events$1.CLICK, _classPrivateFieldLooseBase(_this3, _render)[_render]);
        });
      }
    }]);

    return Modal;
  }(Utils);

  var _modals = _classPrivateFieldLooseKey("modals");

  var _modalButtons = _classPrivateFieldLooseKey("modalButtons");

  var _activeModalButton = _classPrivateFieldLooseKey("activeModalButton");

  var _activeModalOverlay = _classPrivateFieldLooseKey("activeModalOverlay");

  var _activeModal = _classPrivateFieldLooseKey("activeModal");

  var _activeModalId = _classPrivateFieldLooseKey("activeModalId");

  var _activeModalOverlayAttr = _classPrivateFieldLooseKey("activeModalOverlayAttr");

  var _activeModalSelector = _classPrivateFieldLooseKey("activeModalSelector");

  var _activeModalCloseButtons = _classPrivateFieldLooseKey("activeModalCloseButtons");

  var _modalContainerAttr = _classPrivateFieldLooseKey("modalContainerAttr");

  var _render = _classPrivateFieldLooseKey("render");

  var _setupModal = _classPrivateFieldLooseKey("setupModal");

  var _handleClose = _classPrivateFieldLooseKey("handleClose");

  var _handleOverlayClick = _classPrivateFieldLooseKey("handleOverlayClick");

  var _handleEscapeKeyPress = _classPrivateFieldLooseKey("handleEscapeKeyPress");

  var _handleReturnFocus = _classPrivateFieldLooseKey("handleReturnFocus");

  var _handleScrollRestore = _classPrivateFieldLooseKey("handleScrollRestore");

  var _handleScrollStop = _classPrivateFieldLooseKey("handleScrollStop");

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
    _classPrivateFieldLooseBase(this, _activeModalButton)[_activeModalButton].setAttribute(Selectors$1.TABINDEX, "-1");

    _classPrivateFieldLooseBase(this, _activeModalButton)[_activeModalButton].focus();

    _classPrivateFieldLooseBase(this, _activeModalButton)[_activeModalButton].removeAttribute(Selectors$1.TABINDEX);
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
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _accordionButtons, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _accordionContentsAttr, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _accordionContents, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainer, {
        writable: true,
        value: {}
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton, {
        writable: true,
        value: {}
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContent, {
        writable: true,
        value: {}
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeContentHiddenState, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _setupAccordion, {
        value: _setupAccordion2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _getPossibleAccordionHeaderAttrs, {
        value: _getPossibleAccordionHeaderAttrs2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _getAccordionRowAttr, {
        value: _getAccordionRowAttr2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _render$1, {
        writable: true,
        value: function value(event) {
          event.preventDefault();
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton] = event.target;
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton].getAttribute(Selectors$2.DATA_TARGET);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr)[_activeRowAttr] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _getAccordionRowAttr)[_getAccordionRowAttr](_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow)[_activeRow] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRowAttr)[_activeRowAttr]);

          if (!_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton].getAttribute(Selectors$2.DATA_PARENT)) {
            return console.error(Messages$1.NO_PARENT_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId]));
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)[_activeContainerId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButton)[_activeButton].getAttribute(Selectors$2.DATA_PARENT);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)[_activeContainerAttr] = "[".concat(Selectors$2.ACCORDION_CONTAINER, "='").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)[_activeContainerId], "']");

          if (!document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)[_activeContainerAttr])) {
            return console.error(Messages$1.NO_ACCORDION_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerId)[_activeContainerId]));
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainer)[_activeContainer] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContainerAttr)[_activeContainerAttr]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContent)[_activeContent] = document.getElementById(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeAccordionRowId)[_activeAccordionRowId]);

          var accordionButtonState = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeRow)[_activeRow].getAttribute(Selectors$2.DATA_VISIBLE);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState)[_activeButtonExpandState] = accordionButtonState === "true" ? "false" : "true";
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeContentHiddenState)[_activeContentHiddenState] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeButtonExpandState)[_activeButtonExpandState] === "false" ? "true" : "false";

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _closeAllIfToggleable)[_closeAllIfToggleable]();

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _toggleSelectedAccordion)[_toggleSelectedAccordion]();
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _closeAllIfToggleable, {
        value: _closeAllIfToggleable2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _toggleSelectedAccordion, {
        value: _toggleSelectedAccordion2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _toggleAttributeInCollection, {
        value: _toggleAttributeInCollection2
      });
      return _this;
    }

    _createClass(Accordion, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        _classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons] = this.getElements("[".concat(Selectors$2.ACCORDION_CONTAINER, "] [").concat(Selectors$2.DATA_TARGET, "]"));

        if (_classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons].length) {
          _classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons].forEach(function (button) {
            _classPrivateFieldLooseBase(_this2, _setupAccordion)[_setupAccordion](button);

            button.addEventListener(Events$2.CLICK, _classPrivateFieldLooseBase(_this2, _render$1)[_render$1]);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        _classPrivateFieldLooseBase(this, _accordionButtons)[_accordionButtons].forEach(function (button) {
          button.removeEventListener(Events$2.CLICK, _classPrivateFieldLooseBase(_this3, _render$1)[_render$1]);
        });
      }
    }]);

    return Accordion;
  }(Utils);

  var _accordionButtons = _classPrivateFieldLooseKey("accordionButtons");

  var _accordionContentsAttr = _classPrivateFieldLooseKey("accordionContentsAttr");

  var _accordionContents = _classPrivateFieldLooseKey("accordionContents");

  var _activeContainer = _classPrivateFieldLooseKey("activeContainer");

  var _activeButton = _classPrivateFieldLooseKey("activeButton");

  var _activeAccordionRowId = _classPrivateFieldLooseKey("activeAccordionRowId");

  var _activeRowAttr = _classPrivateFieldLooseKey("activeRowAttr");

  var _activeRow = _classPrivateFieldLooseKey("activeRow");

  var _activeContainerId = _classPrivateFieldLooseKey("activeContainerId");

  var _activeContainerAttr = _classPrivateFieldLooseKey("activeContainerAttr");

  var _activeContent = _classPrivateFieldLooseKey("activeContent");

  var _activeButtonExpandState = _classPrivateFieldLooseKey("activeButtonExpandState");

  var _activeContentHiddenState = _classPrivateFieldLooseKey("activeContentHiddenState");

  var _setupAccordion = _classPrivateFieldLooseKey("setupAccordion");

  var _getPossibleAccordionHeaderAttrs = _classPrivateFieldLooseKey("getPossibleAccordionHeaderAttrs");

  var _getAccordionRowAttr = _classPrivateFieldLooseKey("getAccordionRowAttr");

  var _render$1 = _classPrivateFieldLooseKey("render");

  var _closeAllIfToggleable = _classPrivateFieldLooseKey("closeAllIfToggleable");

  var _toggleSelectedAccordion = _classPrivateFieldLooseKey("toggleSelectedAccordion");

  var _toggleAttributeInCollection = _classPrivateFieldLooseKey("toggleAttributeInCollection");

  var _setupAccordion2 = function _setupAccordion2(button) {
    var buttonId = button.getAttribute(Selectors$2.DATA_TARGET);

    if (!document.getElementById(buttonId)) {
      return console.error(Messages$1.NO_CONTENT_ERROR(buttonId));
    }

    var buttonContent = document.getElementById(buttonId);

    var accordionRowAttr = _classPrivateFieldLooseBase(this, _getAccordionRowAttr)[_getAccordionRowAttr](buttonId);

    if (!document.querySelector(accordionRowAttr)) {
      return console.error(Messages$1.NO_ROW_ERROR(buttonId));
    }

    var accordionRow = document.querySelector(accordionRowAttr);

    var buttonHeaderAttr = _classPrivateFieldLooseBase(this, _getPossibleAccordionHeaderAttrs)[_getPossibleAccordionHeaderAttrs](accordionRowAttr);

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

    if (_classPrivateFieldLooseBase(this, _activeContainer)[_activeContainer].hasAttribute(Selectors$2.DATA_TOGGLE_MULTIPLE)) return;
    var allContentAttr = "".concat(_classPrivateFieldLooseBase(this, _activeContainerAttr)[_activeContainerAttr], " [").concat(Selectors$2.ARIA_HIDDEN, "]");
    var allRows = this.getElements("".concat(_classPrivateFieldLooseBase(this, _activeContainerAttr)[_activeContainerAttr], " [").concat(Selectors$2.DATA_VISIBLE, "]"));
    var allContent = this.getElements(allContentAttr);
    var allButtons = this.getElements("".concat(_classPrivateFieldLooseBase(this, _activeContainerAttr)[_activeContainerAttr], " [").concat(Selectors$2.DATA_TARGET, "]"));
    allContent.forEach(function (content) {
      if (!(content === _classPrivateFieldLooseBase(_this4, _activeContent)[_activeContent])) content.style.maxHeight = null;
    });
    this.getFocusableElements(allContentAttr).forEach(function (element) {
      element.setAttribute(Selectors$2.TABINDEX, "-1");
    });

    _classPrivateFieldLooseBase(this, _toggleAttributeInCollection)[_toggleAttributeInCollection](allRows, Selectors$2.DATA_VISIBLE, "true", "false");

    _classPrivateFieldLooseBase(this, _toggleAttributeInCollection)[_toggleAttributeInCollection](allButtons, Selectors$2.ARIA_EXPANDED, "true", "false");

    _classPrivateFieldLooseBase(this, _toggleAttributeInCollection)[_toggleAttributeInCollection](allContent, Selectors$2.ARIA_HIDDEN, "false", "true");
  };

  var _toggleSelectedAccordion2 = function _toggleSelectedAccordion2() {
    var _this5 = this;

    _classPrivateFieldLooseBase(this, _activeRow)[_activeRow].setAttribute(Selectors$2.DATA_VISIBLE, _classPrivateFieldLooseBase(this, _activeButtonExpandState)[_activeButtonExpandState]);

    _classPrivateFieldLooseBase(this, _activeButton)[_activeButton].setAttribute(Selectors$2.ARIA_EXPANDED, _classPrivateFieldLooseBase(this, _activeButtonExpandState)[_activeButtonExpandState]);

    _classPrivateFieldLooseBase(this, _activeContent)[_activeContent].setAttribute(Selectors$2.ARIA_HIDDEN, _classPrivateFieldLooseBase(this, _activeContentHiddenState)[_activeContentHiddenState]);

    var activeContentBlock = "#".concat(_classPrivateFieldLooseBase(this, _activeAccordionRowId)[_activeAccordionRowId]);
    this.getFocusableElements(activeContentBlock).forEach(function (element) {
      var value = _classPrivateFieldLooseBase(_this5, _activeButtonExpandState)[_activeButtonExpandState] === "true" ? "0" : "-1";
      element.setAttribute(Selectors$2.TABINDEX, value);
    });

    if (_classPrivateFieldLooseBase(this, _activeContent)[_activeContent].style.maxHeight) {
      _classPrivateFieldLooseBase(this, _activeContent)[_activeContent].style.maxHeight = null;
    } else {
      _classPrivateFieldLooseBase(this, _activeContent)[_activeContent].style.maxHeight = "".concat(_classPrivateFieldLooseBase(this, _activeContent)[_activeContent].scrollHeight, "px");
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
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton, {
        writable: true,
        value: null
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown, {
        writable: true,
        value: null
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu, {
        writable: true,
        value: null
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn, {
        writable: true,
        value: true
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId, {
        writable: true,
        value: ""
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _dropdownButtons, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _dropdowns, {
        writable: true,
        value: []
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _dropdownTargetAttr, {
        writable: true,
        value: "[".concat(Selectors$3.DATA_TARGET, "]")
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _render$2, {
        writable: true,
        value: function value(event, key) {
          if (!key) event.preventDefault();
          event.stopPropagation();

          if (_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton]) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)[_allowFocusReturn] = false;

            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1](event);

            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)[_allowFocusReturn] = true;
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton] = event.target;

          if (!_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].getAttribute(Selectors$3.DATA_PARENT)) {
            return console.error(Messages$2.NO_PARENT_ERROR);
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId)[_activeDropdownId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].getAttribute(Selectors$3.DATA_PARENT);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr] = "[".concat(Selectors$3.DATA_DROPDOWN, "=\"").concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownId)[_activeDropdownId], "\"]");

          if (!document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr])) {
            return console.error(Messages$2.NO_DROPDOWN_ERROR(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr]));
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown)[_activeDropdown] = document.querySelector(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId)[_activeDropdownMenuId] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].getAttribute(Selectors$3.DATA_TARGET);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu)[_activeDropdownMenu] = document.getElementById(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenuId)[_activeDropdownMenuId]);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].setAttribute(Selectors$3.ARIA_EXPANDED, "true");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown)[_activeDropdown].setAttribute(Selectors$3.DATA_VISIBLE, "true");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].removeEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _render$2)[_render$2]);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].addEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1]);

          document.addEventListener(Events$3.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress$1)[_handleEscapeKeyPress$1]);
          document.addEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick)[_handleOffMenuClick]);
          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks] = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _getDropdownLinks)[_getDropdownLinks](_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr]);
          _this.firstDropdownLink = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks][0];
          _this.lastDropdownLink = _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks][_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks].length - 1];

          _this.firstDropdownLink.addEventListener(Events$3.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleFirstTabClose)[_handleFirstTabClose]);

          _this.lastDropdownLink.addEventListener(Events$3.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleLastTabClose)[_handleLastTabClose]);

          if (key && key === KeyCodes$2.ARROW_UP) {
            _this.lastDropdownLink.focus();
          } else {
            _this.firstDropdownLink.focus();
          }

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks].forEach(function (link) {
            link.setAttribute(Selectors$3.TABINDEX, "0");
            link.addEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1]);
          });

          _this.captureFocus("".concat(_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownAttr)[_activeDropdownAttr], " > ul"), {
            useArrows: true
          });
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleFirstTabClose, {
        writable: true,
        value: function value(event) {
          var shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
          var tabKey = event.which === KeyCodes$2.TAB;

          if (shiftKey && tabKey) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1](event);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleLastTabClose, {
        writable: true,
        value: function value(event) {
          var shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
          var tabKey = event.which === KeyCodes$2.TAB;

          if (tabKey && !shiftKey) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1](event);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _renderWithKeys, {
        writable: true,
        value: function value(event) {
          if (event.which === KeyCodes$2.ARROW_UP || event.which === KeyCodes$2.ARROW_DOWN) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _render$2)[_render$2](event, event.which);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1, {
        writable: true,
        value: function value(event) {
          event.preventDefault();

          _this.releaseFocus();

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].setAttribute(Selectors$3.ARIA_EXPANDED, "false");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdown)[_activeDropdown].setAttribute(Selectors$3.DATA_VISIBLE, "false");

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownLinks)[_activeDropdownLinks].forEach(function (link) {
            link.setAttribute(Selectors$3.TABINDEX, "-1");
            link.removeEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1]);
          });

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].removeEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1]);

          _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton].addEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _render$2)[_render$2]);

          document.removeEventListener(Events$3.KEYDOWN, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress$1)[_handleEscapeKeyPress$1]);
          document.removeEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick)[_handleOffMenuClick]);

          if (_classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _allowFocusReturn)[_allowFocusReturn]) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus$1)[_handleReturnFocus$1]();
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleEscapeKeyPress$1, {
        writable: true,
        value: function value(event) {
          if (event.which === KeyCodes$2.ESCAPE) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1](event);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleOffMenuClick, {
        writable: true,
        value: function value(event) {
          if (event.target !== _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownButton)[_activeDropdownButton] && event.target !== _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _activeDropdownMenu)[_activeDropdownMenu]) {
            _classPrivateFieldLooseBase(_assertThisInitialized(_assertThisInitialized(_this)), _handleClose$1)[_handleClose$1](event);
          }
        }
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _handleReturnFocus$1, {
        value: _handleReturnFocus2$1
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _getDropdownLinks, {
        value: _getDropdownLinks2
      });
      Object.defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), _setupDropdown, {
        value: _setupDropdown2
      });
      return _this;
    }

    _createClass(Dropdown, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        _classPrivateFieldLooseBase(this, _dropdowns)[_dropdowns] = this.getElements("[".concat(Selectors$3.DATA_DROPDOWN, "]"));
        _classPrivateFieldLooseBase(this, _dropdownButtons)[_dropdownButtons] = this.getElements("[".concat(Selectors$3.DATA_DROPDOWN, "] > ").concat(_classPrivateFieldLooseBase(this, _dropdownTargetAttr)[_dropdownTargetAttr]));

        if (_classPrivateFieldLooseBase(this, _dropdowns)[_dropdowns].length) {
          _classPrivateFieldLooseBase(this, _dropdowns)[_dropdowns].forEach(function (dropdown) {
            return _classPrivateFieldLooseBase(_this2, _setupDropdown)[_setupDropdown](dropdown);
          });
        }

        _classPrivateFieldLooseBase(this, _dropdownButtons)[_dropdownButtons].forEach(function (button) {
          button.addEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_this2, _render$2)[_render$2]);
          button.addEventListener(Events$3.KEYDOWN, _classPrivateFieldLooseBase(_this2, _renderWithKeys)[_renderWithKeys]);
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        _classPrivateFieldLooseBase(this, _dropdownButtons)[_dropdownButtons].forEach(function (button) {
          button.removeEventListener(Events$3.CLICK, _classPrivateFieldLooseBase(_this3, _render$2)[_render$2]);
          button.removeEventListener(Events$3.KEYDOWN, _classPrivateFieldLooseBase(_this3, _renderWithKeys)[_renderWithKeys]);
        });
      }
    }]);

    return Dropdown;
  }(Utils);

  var _activeDropdownButton = _classPrivateFieldLooseKey("activeDropdownButton");

  var _activeDropdown = _classPrivateFieldLooseKey("activeDropdown");

  var _activeDropdownMenu = _classPrivateFieldLooseKey("activeDropdownMenu");

  var _activeDropdownLinks = _classPrivateFieldLooseKey("activeDropdownLinks");

  var _allowFocusReturn = _classPrivateFieldLooseKey("allowFocusReturn");

  var _activeDropdownId = _classPrivateFieldLooseKey("activeDropdownId");

  var _activeDropdownAttr = _classPrivateFieldLooseKey("activeDropdownAttr");

  var _activeDropdownMenuId = _classPrivateFieldLooseKey("activeDropdownMenuId");

  var _dropdownButtons = _classPrivateFieldLooseKey("dropdownButtons");

  var _dropdowns = _classPrivateFieldLooseKey("dropdowns");

  var _dropdownTargetAttr = _classPrivateFieldLooseKey("dropdownTargetAttr");

  var _render$2 = _classPrivateFieldLooseKey("render");

  var _handleFirstTabClose = _classPrivateFieldLooseKey("handleFirstTabClose");

  var _handleLastTabClose = _classPrivateFieldLooseKey("handleLastTabClose");

  var _renderWithKeys = _classPrivateFieldLooseKey("renderWithKeys");

  var _handleClose$1 = _classPrivateFieldLooseKey("handleClose");

  var _handleEscapeKeyPress$1 = _classPrivateFieldLooseKey("handleEscapeKeyPress");

  var _handleOffMenuClick = _classPrivateFieldLooseKey("handleOffMenuClick");

  var _handleReturnFocus$1 = _classPrivateFieldLooseKey("handleReturnFocus");

  var _getDropdownLinks = _classPrivateFieldLooseKey("getDropdownLinks");

  var _setupDropdown = _classPrivateFieldLooseKey("setupDropdown");

  var _handleReturnFocus2$1 = function _handleReturnFocus2() {
    _classPrivateFieldLooseBase(this, _activeDropdownButton)[_activeDropdownButton].setAttribute(Selectors$3.TAB_INDEX, "-1");

    _classPrivateFieldLooseBase(this, _activeDropdownButton)[_activeDropdownButton].focus();

    _classPrivateFieldLooseBase(this, _activeDropdownButton)[_activeDropdownButton].removeAttribute(Selectors$3.TAB_INDEX);
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
    var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(_classPrivateFieldLooseBase(this, _dropdownTargetAttr)[_dropdownTargetAttr]));
    dropdownButton.setAttribute(Selectors$3.ARIA_CONTROLS, dropdownMenu.id);
    dropdownButton.setAttribute(Selectors$3.ARIA_HASPOPUP, "true");
    dropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "false");
    dropdownMenu.setAttribute(Selectors$3.ARIA_LABELLEDBY, dropdownButton.id);
    var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
    dropdownMenuItems.forEach(function (item) {
      return item.setAttribute(Selectors$3.ROLE, "none");
    });

    _classPrivateFieldLooseBase(this, _getDropdownLinks)[_getDropdownLinks](dropdownIdAttr).forEach(function (link) {
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
  window.Undernet = Undernet || {};

  exports.Modals = Modals;
  exports.Accordions = Accordions;
  exports.Dropdowns = Dropdowns;
  exports.Utils = Utils$1;
  exports.default = Undernet;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=undernet.bundle.js.map
