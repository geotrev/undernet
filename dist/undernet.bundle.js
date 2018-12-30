/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v3.1.0 (https://undernet.io)
  * Copyright 2017-2018 George Treviranus
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.undernet = factory());
}(this, (function () { 'use strict';

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

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
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

  var keyCodes = {
    SHIFT: 16,
    TAB: 9,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  };
  var selectors = {
    NOT_VISUALLY_HIDDEN: ":not(.is-visually-hidden)",
    FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
    KEYBOARD_CLASS: "using-keyboard"
  };
  var events = {
    KEYDOWN: "keydown",
    CLICK: "click"
  };

  var Utils = function () {
    function Utils() {
      var _this = this;

      _classCallCheck(this, Utils);

      _defineProperty(this, "_listenForKeyboard", function (event) {
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
        var arrowUp = event.which === keyCodes.ARROW_UP;
        var arrowDown = event.which === keyCodes.ARROW_DOWN;

        if (tabKey || shiftKey || arrowUp || arrowDown) {
          document.body.classList.add(selectors.KEYBOARD_CLASS);
          document.removeEventListener(events.KEYDOWN, _this._listenForKeyboard);
          document.addEventListener(events.CLICK, _this._listenForClick);
          _this.listeningForKeydown = false;
        }
      });

      _defineProperty(this, "_listenForClick", function (event) {
        document.body.classList.remove(selectors.KEYBOARD_CLASS);
        document.removeEventListener(events.CLICK, _this._listenForClick);
        document.addEventListener(events.KEYDOWN, _this._listenForKeyboard);
        _this.listeningForKeydown = true;
      });

      _defineProperty(this, "_handleFocusTrapWithTab", function (event) {
        var containerElement = document.querySelector(_this.focusContainerSelector);
        var containerActive = document.activeElement === containerElement;
        var firstActive = document.activeElement === _this.focusableFirstChild;
        var lastActive = document.activeElement === _this.focusableLastChild;
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;

        if (shiftKey && tabKey && (firstActive || containerActive)) {
          event.preventDefault();

          _this.focusableLastChild.focus();
        } else if (!shiftKey && tabKey && lastActive) {
          event.preventDefault();

          _this.focusableFirstChild.focus();
        }
      });

      _defineProperty(this, "_handleFocusTrapWithArrows", function (event) {
        var firstActive = document.activeElement === _this.focusableFirstChild;
        var lastActive = document.activeElement === _this.focusableLastChild;
        var arrowUp = event.which === keyCodes.ARROW_UP;
        var arrowDown = event.which === keyCodes.ARROW_DOWN;

        if (arrowUp || arrowDown) {
          event.preventDefault();

          if (firstActive && arrowUp) {
            _this.focusableLastChild.focus();
          } else if (lastActive && arrowDown) {
            _this.focusableFirstChild.focus();
          } else if (arrowDown) {
            _this._focusNextChild();
          } else if (arrowUp) {
            _this._focusLastChild();
          }
        }
      });

      this.focusContainerSelector = "";
      this.focusableChildren = [];
      this.focusableFirstChild = null;
      this.focusableLastChild = null;
      this.listeningForKeydown = false;
      this.trapFocusWithArrows = false;
    }

    _createClass(Utils, [{
      key: "captureFocus",
      value: function captureFocus(container, options) {
        this.focusContainerSelector = container;
        this.focusableChildren = this.getFocusableElements(this.focusContainerSelector);
        this.focusableFirstChild = this.focusableChildren[0];
        this.focusableLastChild = this.focusableChildren[this.focusableChildren.length - 1];

        if (options) {
          if (options.useArrows) {
            this.trapFocusWithArrows = options.useArrows || this.trapFocusWithArrows;
            document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows);
          }
        } else {
          document.addEventListener(events.KEYDOWN, this._handleFocusTrapWithTab);
        }
      }
    }, {
      key: "releaseFocus",
      value: function releaseFocus() {
        if (this.trapFocusWithArrows) {
          document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithArrows);
          this.trapFocusWithArrows = false;
        } else {
          document.removeEventListener(events.KEYDOWN, this._handleFocusTrapWithTab);
        }
      }
    }, {
      key: "enableFocusOutline",
      value: function enableFocusOutline() {
        document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
      }
    }, {
      key: "disableFocusOutline",
      value: function disableFocusOutline() {
        if (this.listeningForKeydown) {
          document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
        } else {
          document.removeEventListener(events.CLICK, this._listenForClick);
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
        var focusables = selectors.FOCUSABLE_TAGS.map(function (element) {
          return "".concat(container, " ").concat(element).concat(selectors.NOT_VISUALLY_HIDDEN);
        });
        return this.getElements(focusables.join(", "));
      }
    }, {
      key: "_focusNextChild",
      value: function _focusNextChild() {
        for (var i = 0; i < this.focusableChildren.length; i++) {
          if (this.focusableChildren[i] === document.activeElement) {
            this.focusableChildren[i + 1].focus();
            break;
          }
        }
      }
    }, {
      key: "_focusLastChild",
      value: function _focusLastChild() {
        for (var i = 0; i < this.focusableChildren.length; i++) {
          if (this.focusableChildren[i] === document.activeElement) {
            this.focusableChildren[i - 1].focus();
            break;
          }
        }
      }
    }]);

    return Utils;
  }();

  var keyCodes$1 = {
    ESCAPE: 27
  };
  var selectors$1 = {
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
  var events$1 = {
    KEYDOWN: "keydown",
    CLICK: "click",
    RESIZE: "resize"
  };
  var messages = {
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

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_render", function (event) {
        event.preventDefault();
        _this.activeModalButton = event.target;

        if (!_this.activeModalButton.getAttribute(selectors$1.DATA_TARGET)) {
          return console.error(messages.NO_TARGET_ERROR);
        }

        _this.activeModalId = _this.activeModalButton.getAttribute(selectors$1.DATA_TARGET);
        _this.activeModalOverlayAttr = "[".concat(selectors$1.MODAL_ID, "=\"").concat(_this.activeModalId, "\"]");

        if (!document.querySelector(_this.activeModalOverlayAttr)) {
          return console.error(messages.NO_ID_ERROR(_this.activeModalId));
        }

        _this.activeModalOverlay = document.querySelector(_this.activeModalOverlayAttr);
        _this.activeModalSelector = "".concat(_this.activeModalOverlayAttr, " ").concat(_this.modalContainerAttr);
        _this.activeModal = document.querySelector(_this.activeModalSelector);
        _this.activeModalCloseButtons = _this.getElements("".concat(_this.activeModalOverlayAttr, " [").concat(selectors$1.MODAL_CONTAINER, "] [").concat(selectors$1.DATA_CLOSE, "]"));

        _this.getFocusableElements(_this.activeModalSelector).forEach(function (element) {
          element.setAttribute(selectors$1.TABINDEX, "0");
        });

        _this._handleScrollStop();

        _this.captureFocus(_this.activeModalSelector);

        _this.activeModalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "false");

        _this.activeModal.setAttribute(selectors$1.TABINDEX, "-1");

        _this.activeModalOverlay.setAttribute(selectors$1.DATA_VISIBLE, "true");

        _this.activeModal.focus();

        _this.activeModalOverlay.scrollTop = 0;
        document.addEventListener(events$1.KEYDOWN, _this._handleEscapeKeyPress);
        document.addEventListener(events$1.CLICK, _this._handleOverlayClick);

        _this.activeModalCloseButtons.forEach(function (button) {
          button.addEventListener(events$1.CLICK, _this._handleClose);
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClose", function (event) {
        event.preventDefault();

        _this.activeModalOverlay.setAttribute(selectors$1.DATA_VISIBLE, "false");

        _this._handleReturnFocus();

        _this._handleScrollRestore();

        _this.releaseFocus();

        _this.activeModalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "true");

        _this.activeModal.removeAttribute(selectors$1.TABINDEX);

        _this.getFocusableElements(_this.activeModalSelector).forEach(function (element) {
          element.setAttribute(selectors$1.TABINDEX, "-1");
        });

        document.removeEventListener(events$1.KEYDOWN, _this._handleEscapeKeyPress);
        document.removeEventListener(events$1.CLICK, _this._handleOverlayClick);

        _this.activeModalCloseButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this._handleClose);
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleOverlayClick", function (event) {
        if (event.target === _this.activeModalOverlay) {
          _this._handleClose(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleEscapeKeyPress", function (event) {
        if (event.which === keyCodes$1.ESCAPE) {
          _this._handleClose(event);
        }
      });

      _this.modals = [];
      _this.modalButtons = [];
      _this.activeModalButton = null;
      _this.activeModalOverlay = null;
      _this.activeModal = null;
      _this.activeModalId = "";
      _this.activeModalOverlayAttr = "";
      _this.activeModalSelector = "";
      _this.activeModalCloseButtons = [];
      _this.modalContainerAttr = "[".concat(selectors$1.MODAL_CONTAINER, "]");
      _this.closeButtonAttr = "[".concat(selectors$1.MODAL_CONTAINER, "] [").concat(selectors$1.DATA_CLOSE, "]");
      return _this;
    }

    _createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.modals = this.getElements(this.modalContainerAttr);
        this.modalButtons = this.getElements("[".concat(selectors$1.MODAL_BUTTON, "]"));
        this.getFocusableElements(this.modalContainerAttr).forEach(function (element) {
          element.setAttribute(selectors$1.TABINDEX, "-1");
        });

        if (this.modals.length) {
          this.modals.forEach(function (modal) {
            _this2._setupModal(modal);
          });
        }

        if (this.modalButtons.length) {
          this.modalButtons.forEach(function (button) {
            button.addEventListener(events$1.CLICK, _this2._render);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this.modalButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this3._render);
        });
      }
    }, {
      key: "_setupModal",
      value: function _setupModal(modal) {
        var modalId;

        if (!modal.getAttribute(selectors$1.DATA_PARENT)) {
          return console.warn(messages.NO_PARENT_ERROR);
        } else {
          modalId = modal.getAttribute(selectors$1.DATA_PARENT);
        }

        var modalWrapper;

        if (!document.querySelector("[".concat(selectors$1.MODAL_ID, "='").concat(modalId, "']"))) {
          return console.error(messages.NO_ID_ERROR(modalId));
        } else {
          modalWrapper = document.querySelector("[".concat(selectors$1.MODAL_ID, "='").concat(modalId, "']"));
        }

        modalWrapper.setAttribute(selectors$1.ARIA_HIDDEN, "true");
        modalWrapper.setAttribute(selectors$1.DATA_VISIBLE, "false");
        modal.setAttribute(selectors$1.ARIA_MODAL, "true");
        modal.setAttribute(selectors$1.ROLE, "dialog");
      }
    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this.activeModalButton.setAttribute(selectors$1.TABINDEX, "-1");
        this.activeModalButton.focus();
        this.activeModalButton.removeAttribute(selectors$1.TABINDEX);
      }
    }, {
      key: "_handleScrollRestore",
      value: function _handleScrollRestore() {
        document.body.classList.remove(selectors$1.NO_SCROLL);
        document.querySelector("html").classList.remove(selectors$1.NO_SCROLL);
      }
    }, {
      key: "_handleScrollStop",
      value: function _handleScrollStop() {
        document.body.classList.add(selectors$1.NO_SCROLL);
        document.querySelector("html").classList.add(selectors$1.NO_SCROLL);
      }
    }]);

    return Modal;
  }(Utils);

  var keyCodes$2 = {
    SPACE: 32
  };
  var selectors$2 = {
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
  var events$2 = {
    CLICK: "click",
    KEYDOWN: "keydown"
  };
  var messages$1 = {
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
      return "Could not accordion content block with [id] ".concat(id, " associated with [data-target='").concat(id, "'].");
    }
  };

  var Accordion = function (_Utils) {
    _inherits(Accordion, _Utils);

    function Accordion() {
      var _this;

      _classCallCheck(this, Accordion);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Accordion).call(this));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_render", function (event) {
        event.preventDefault();
        _this.activeButton = event.target;
        _this.activeAccordionRowId = _this.activeButton.getAttribute(selectors$2.DATA_TARGET);
        _this.activeRowAttr = _this._getAccordionRowAttr(_this.activeAccordionRowId);
        _this.activeRow = document.querySelector(_this.activeRowAttr);

        if (!_this.activeButton.getAttribute(selectors$2.DATA_PARENT)) {
          return console.error(messages$1.NO_PARENT_ERROR(_this.activeAccordionRowId));
        }

        _this.activeContainerId = _this.activeButton.getAttribute(selectors$2.DATA_PARENT);
        _this.activeContainerAttr = "[".concat(selectors$2.ACCORDION_CONTAINER, "='").concat(_this.activeContainerId, "']");

        if (!document.querySelector(_this.activeContainerAttr)) {
          return console.error(messages$1.NO_ACCORDION_ERROR(_this.activeContainerId));
        }

        _this.activeContainer = document.querySelector(_this.activeContainerAttr);
        _this.activeContent = document.getElementById(_this.activeAccordionRowId);

        var accordionButtonState = _this.activeRow.getAttribute(selectors$2.DATA_VISIBLE);

        _this.activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
        _this.activeContentHiddenState = _this.activeButtonExpandState === "false" ? "true" : "false";

        _this._closeAllIfToggleable();

        _this._toggleSelectedAccordion();
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleSpaceKeyPress", function (event) {
        if (event.which === keyCodes$2.SPACE) _this._render(event);
      });

      _this.accordionButtons = [];
      _this.accordionContentsAttr = "";
      _this.accordionContents = [];
      _this.activeContainer = null;
      _this.activeButton = null;
      _this.activeAccordionRowId = "";
      _this.activeRowAttr = "";
      _this.activeRow = "";
      _this.activeContainerId = "";
      _this.activeContainerAttr = "";
      _this.activeContent = null;
      _this.activeButtonExpandState = "";
      _this.activeContentHiddenState = "";
      return _this;
    }

    _createClass(Accordion, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.accordionButtons = this.getElements("[".concat(selectors$2.ACCORDION_CONTAINER, "] [").concat(selectors$2.DATA_TARGET, "]"));

        if (this.accordionButtons.length) {
          this.accordionButtons.forEach(function (button) {
            _this2._setupAccordion(button);

            button.addEventListener(events$2.CLICK, _this2._render);
            button.addEventListener(events$2.KEYDOWN, _this2._handleSpaceKeyPress);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this.accordionButtons.forEach(function (button) {
          button.removeEventListener(events$2.CLICK, _this3._render);
          button.removeEventListener(events$2.KEYDOWN, _this3._handleSpaceKeyPress);
        });
      }
    }, {
      key: "_setupAccordion",
      value: function _setupAccordion(button) {
        var buttonId = button.getAttribute(selectors$2.DATA_TARGET);

        if (!document.getElementById(buttonId)) {
          return console.error(messages$1.NO_CONTENT_ERROR(buttonId));
        }

        var buttonContent = document.getElementById(buttonId);

        var accordionRowAttr = this._getAccordionRowAttr(buttonId);

        if (!document.querySelector(accordionRowAttr)) {
          return console.error(messages$1.NO_ROW_ERROR(buttonId));
        }

        var accordionRow = document.querySelector(accordionRowAttr);

        var buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);

        var buttonHeader = this.getElements(buttonHeaderAttr)[0];

        if (!buttonHeader || !buttonHeader.id) {
          console.error(messages$1.NO_HEADER_ID_ERROR(buttonId));
        }

        var buttonContentChildren = this.getFocusableElements("#".concat(buttonContent.id));
        button.setAttribute(selectors$2.ARIA_CONTROLS, buttonId);
        buttonContent.setAttribute(selectors$2.ARIA_LABELLEDBY, buttonHeader.id);

        if (!accordionRow.getAttribute(selectors$2.DATA_VISIBLE)) {
          return console.error(messages$1.NO_VISIBLE_ERROR(buttonId));
        }

        var contentShouldExpand = accordionRow.getAttribute(selectors$2.DATA_VISIBLE);

        if (contentShouldExpand === "true") {
          buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
          button.setAttribute(selectors$2.ARIA_EXPANDED, "true");
          buttonContent.setAttribute(selectors$2.ARIA_HIDDEN, "false");
          buttonContentChildren.forEach(function (element) {
            element.setAttribute(selectors$2.TABINDEX, "0");
          });
        } else {
          button.setAttribute(selectors$2.ARIA_EXPANDED, "false");
          buttonContent.setAttribute(selectors$2.ARIA_HIDDEN, "true");
          buttonContentChildren.forEach(function (element) {
            element.setAttribute(selectors$2.TABINDEX, "-1");
          });
        }
      }
    }, {
      key: "_getPossibleAccordionHeaderAttrs",
      value: function _getPossibleAccordionHeaderAttrs(attr) {
        return "".concat(attr, " h1, ").concat(attr, " h2, ").concat(attr, " h3, ").concat(attr, " h4, ").concat(attr, " h5, ").concat(attr, " h6");
      }
    }, {
      key: "_getAccordionRowAttr",
      value: function _getAccordionRowAttr(id) {
        return "[".concat(selectors$2.ACCORDION_ROW, "='").concat(id, "']");
      }
    }, {
      key: "_closeAllIfToggleable",
      value: function _closeAllIfToggleable() {
        var _this4 = this;

        if (this.activeContainer.hasAttribute(selectors$2.DATA_TOGGLE_MULTIPLE)) return;
        var allContentAttr = "".concat(this.activeContainerAttr, " [").concat(selectors$2.ARIA_HIDDEN, "]");
        var allRows = this.getElements("".concat(this.activeContainerAttr, " [").concat(selectors$2.DATA_VISIBLE, "]"));
        var allContent = this.getElements(allContentAttr);
        var allButtons = this.getElements("".concat(this.activeContainerAttr, " [").concat(selectors$2.DATA_TARGET, "]"));
        allContent.forEach(function (content) {
          if (!(content === _this4.activeContent)) content.style.maxHeight = null;
        });
        this.getFocusableElements(allContentAttr).forEach(function (element) {
          element.setAttribute(selectors$2.TABINDEX, "-1");
        });

        this._toggleAttributeInCollection(allRows, selectors$2.DATA_VISIBLE, "true", "false");

        this._toggleAttributeInCollection(allButtons, selectors$2.ARIA_EXPANDED, "true", "false");

        this._toggleAttributeInCollection(allContent, selectors$2.ARIA_HIDDEN, "false", "true");
      }
    }, {
      key: "_toggleSelectedAccordion",
      value: function _toggleSelectedAccordion() {
        var _this5 = this;

        this.activeRow.setAttribute(selectors$2.DATA_VISIBLE, this.activeButtonExpandState);
        this.activeButton.setAttribute(selectors$2.ARIA_EXPANDED, this.activeButtonExpandState);
        this.activeContent.setAttribute(selectors$2.ARIA_HIDDEN, this.activeContentHiddenState);
        var activeContentBlock = "#".concat(this.activeAccordionRowId);
        this.getFocusableElements(activeContentBlock).forEach(function (element) {
          var value = _this5.activeButtonExpandState === "true" ? "0" : "-1";
          element.setAttribute(selectors$2.TABINDEX, value);
        });

        if (this.activeContent.style.maxHeight) {
          this.activeContent.style.maxHeight = null;
        } else {
          this.activeContent.style.maxHeight = "".concat(this.activeContent.scrollHeight, "px");
        }
      }
    }, {
      key: "_toggleAttributeInCollection",
      value: function _toggleAttributeInCollection(elements, attributeName, currentValue, newValue) {
        elements.forEach(function (element) {
          if (element.hasAttribute(attributeName, currentValue)) {
            element.setAttribute(attributeName, newValue);
          }
        });
      }
    }]);

    return Accordion;
  }(Utils);

  var keyCodes$3 = {
    TAB: 9,
    SHIFT: 16,
    ESCAPE: 27,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  };
  var selectors$3 = {
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
  var events$3 = {
    KEYDOWN: "keydown",
    CLICK: "click"
  };
  var messages$2 = {
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

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_render", function (event, key) {
        if (!key) event.preventDefault();
        event.stopPropagation();

        if (_this.activeDropdownButton) {
          _this.allowFocusReturn = false;

          _this._handleClose(event);

          _this.allowFocusReturn = true;
        }

        _this.activeDropdownButton = event.target;

        if (!_this.activeDropdownButton.getAttribute(selectors$3.DATA_PARENT)) {
          return messages$2.NO_PARENT_ERROR;
        }

        _this.activeDropdownId = _this.activeDropdownButton.getAttribute(selectors$3.DATA_PARENT);
        _this.activeDropdownAttr = "[".concat(selectors$3.DATA_DROPDOWN, "=\"").concat(_this.activeDropdownId, "\"]");

        if (!document.querySelector(_this.activeDropdownAttr)) {
          return messages$2.NO_DROPDOWN_ERROR(_this.activeDropdownAttr);
        }

        _this.activeDropdown = document.querySelector(_this.activeDropdownAttr);
        _this.activeDropdownMenuId = _this.activeDropdownButton.getAttribute(selectors$3.DATA_TARGET);
        _this.activeDropdownMenu = document.getElementById(_this.activeDropdownMenuId);

        _this.activeDropdownButton.setAttribute(selectors$3.ARIA_EXPANDED, "true");

        _this.activeDropdown.setAttribute(selectors$3.DATA_VISIBLE, "true");

        _this.activeDropdownButton.removeEventListener(events$3.CLICK, _this._render);

        _this.activeDropdownButton.addEventListener(events$3.CLICK, _this._handleClose);

        document.addEventListener(events$3.KEYDOWN, _this._handleEscapeKeyPress);
        document.addEventListener(events$3.CLICK, _this._handleOffMenuClick);
        _this.activeDropdownLinks = _this._getDropdownLinks(_this.activeDropdownAttr);
        _this.firstDropdownLink = _this.activeDropdownLinks[0];
        _this.lastDropdownLink = _this.activeDropdownLinks[_this.activeDropdownLinks.length - 1];

        _this.firstDropdownLink.addEventListener(events$3.KEYDOWN, _this._handleFirstTabClose);

        _this.lastDropdownLink.addEventListener(events$3.KEYDOWN, _this._handleLastTabClose);

        if (key && key === keyCodes$3.ARROW_UP) {
          _this.lastDropdownLink.focus();
        } else {
          _this.firstDropdownLink.focus();
        }

        _this.activeDropdownLinks.forEach(function (link) {
          link.setAttribute(selectors$3.TABINDEX, "0");
          link.addEventListener(events$3.CLICK, _this._handleClose);
        });

        _this.captureFocus("".concat(_this.activeDropdownAttr, " > ul"), {
          useArrows: true
        });
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleFirstTabClose", function (event) {
        var shiftKey = event.which === keyCodes$3.SHIFT || event.shiftKey;
        var tabKey = event.which === keyCodes$3.TAB;

        if (shiftKey && tabKey) {
          _this._handleClose(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleLastTabClose", function (event) {
        var shiftKey = event.which === keyCodes$3.SHIFT || event.shiftKey;
        var tabKey = event.which === keyCodes$3.TAB;

        if (tabKey && !shiftKey) {
          _this._handleClose(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_renderWithKeys", function (event) {
        if (event.which === keyCodes$3.ARROW_UP || event.which === keyCodes$3.ARROW_DOWN) {
          _this._render(event, event.which);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleClose", function (event) {
        event.preventDefault();

        _this.releaseFocus();

        _this.activeDropdownButton.setAttribute(selectors$3.ARIA_EXPANDED, "false");

        _this.activeDropdown.setAttribute(selectors$3.DATA_VISIBLE, "false");

        _this.activeDropdownLinks.forEach(function (link) {
          link.setAttribute(selectors$3.TABINDEX, "-1");
          link.removeEventListener(events$3.CLICK, _this._handleClose);
        });

        _this.activeDropdownButton.removeEventListener(events$3.CLICK, _this._handleClose);

        _this.activeDropdownButton.addEventListener(events$3.CLICK, _this._render);

        document.removeEventListener(events$3.KEYDOWN, _this._handleEscapeKeyPress);
        document.removeEventListener(events$3.CLICK, _this._handleOffMenuClick);

        if (_this.allowFocusReturn) {
          _this._handleReturnFocus();
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleEscapeKeyPress", function (event) {
        if (event.which === keyCodes$3.ESCAPE) {
          _this._handleClose(event);
        }
      });

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "_handleOffMenuClick", function (event) {
        if (event.target !== _this.activeDropdownButton && event.target !== _this.activeDropdownMenu) {
          _this._handleClose(event);
        }
      });

      _this.activeDropdownButton = null;
      _this.activeDropdown = null;
      _this.activeDropdownMenu = null;
      _this.activeDropdownLinks = [];
      _this.allowFocusReturn = true;
      _this.activeDropdownId = "";
      _this.activeDropdownAttr = "";
      _this.activeDropdownMenuId = "";
      _this.dropdownButtons = [];
      _this.dropdowns = [];
      _this.dropdownTargetAttr = "[".concat(selectors$3.DATA_TARGET, "]");
      _this.dropdownButtonAttr = "[".concat(selectors$3.DATA_DROPDOWN, "] > ").concat(_this.dropdownTargetAttr);
      return _this;
    }

    _createClass(Dropdown, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this.dropdowns = this.getElements("[".concat(selectors$3.DATA_DROPDOWN, "]"));
        this.dropdownButtons = this.getElements(this.dropdownButtonAttr);

        if (this.dropdowns.length) {
          this.dropdowns.forEach(function (dropdown) {
            return _this2._setupDropdown(dropdown);
          });
        }

        this.dropdownButtons.forEach(function (button) {
          button.addEventListener(events$3.CLICK, _this2._render);
          button.addEventListener(events$3.KEYDOWN, _this2._renderWithKeys);
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this.dropdownButtons.forEach(function (button) {
          button.removeEventListener(events$3.CLICK, _this3._render);
          button.removeEventListener(events$3.KEYDOWN, _this3._renderWithKeys);
        });
      }
    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this.activeDropdownButton.setAttribute(selectors$3.TAB_INDEX, "-1");
        this.activeDropdownButton.focus();
        this.activeDropdownButton.removeAttribute(selectors$3.TAB_INDEX);
      }
    }, {
      key: "_getDropdownLinks",
      value: function _getDropdownLinks(attr) {
        return this.getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown(dropdown) {
        var dropdownId = dropdown.getAttribute(selectors$3.DATA_DROPDOWN);
        var dropdownIdAttr = "[".concat(selectors$3.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
        var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");

        if (!document.querySelector("".concat(dropdownIdAttr, " > ul"))) {
          return messages$2.NO_MENU_ERROR(dropdownIdAttr);
        }

        var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
        var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(this.dropdownTargetAttr));
        dropdownButton.setAttribute(selectors$3.ARIA_CONTROLS, dropdownMenu.id);
        dropdownButton.setAttribute(selectors$3.ARIA_HASPOPUP, "true");
        dropdownButton.setAttribute(selectors$3.ARIA_EXPANDED, "false");
        dropdownMenu.setAttribute(selectors$3.ARIA_LABELLEDBY, dropdownButton.id);
        var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
        dropdownMenuItems.forEach(function (item) {
          return item.setAttribute(selectors$3.ROLE, "none");
        });

        this._getDropdownLinks(dropdownIdAttr).forEach(function (link) {
          link.setAttribute(selectors$3.ROLE, "menuitem");
          link.setAttribute(selectors$3.TABINDEX, "-1");
        });
      }
    }]);

    return Dropdown;
  }(Utils);

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

  window.Undernet = Undernet;

  return Undernet;

})));
//# sourceMappingURL=undernet.bundle.js.map
