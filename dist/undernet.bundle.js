/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v3.0.0 (https://undernet.io)
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
      _classCallCheck(this, Utils);

      this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
      this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);
      this._listenForKeyboard = this._listenForKeyboard.bind(this);
      this._listenForClick = this._listenForClick.bind(this);
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
        this.focusableChildren = this._getFocusableElements(this.focusContainerSelector);
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
      key: "_listenForKeyboard",
      value: function _listenForKeyboard(event) {
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;
        var arrowUp = event.which === keyCodes.ARROW_UP;
        var arrowDown = event.which === keyCodes.ARROW_DOWN;

        if (tabKey || shiftKey || arrowUp || arrowDown) {
          document.body.classList.add(selectors.KEYBOARD_CLASS);
          document.removeEventListener(events.KEYDOWN, this._listenForKeyboard);
          document.addEventListener(events.CLICK, this._listenForClick);
          this.listeningForKeydown = false;
        }
      }
    }, {
      key: "_listenForClick",
      value: function _listenForClick(event) {
        document.body.classList.remove(selectors.KEYBOARD_CLASS);
        document.removeEventListener(events.CLICK, this._listenForClick);
        document.addEventListener(events.KEYDOWN, this._listenForKeyboard);
        this.listeningForKeydown = true;
      }
    }, {
      key: "_getElements",
      value: function _getElements(element) {
        var nodeList = document.querySelectorAll(element);
        return Array.apply(null, nodeList);
      }
    }, {
      key: "_getFocusableElements",
      value: function _getFocusableElements(container) {
        var focusables = selectors.FOCUSABLE_TAGS.map(function (element) {
          return "".concat(container, " ").concat(element).concat(selectors.NOT_VISUALLY_HIDDEN);
        });
        return this._getElements(focusables.join(", "));
      }
    }, {
      key: "_handleFocusTrapWithTab",
      value: function _handleFocusTrapWithTab(event) {
        var containerElement = document.querySelector(this.focusContainerSelector);
        var containerActive = document.activeElement === containerElement;
        var firstActive = document.activeElement === this.focusableFirstChild;
        var lastActive = document.activeElement === this.focusableLastChild;
        var tabKey = event.which === keyCodes.TAB;
        var shiftKey = event.which === keyCodes.SHIFT || event.shiftKey;

        if (shiftKey && tabKey && (firstActive || containerActive)) {
          event.preventDefault();
          this.focusableLastChild.focus();
        } else if (!shiftKey && tabKey && lastActive) {
          event.preventDefault();
          this.focusableFirstChild.focus();
        }
      }
    }, {
      key: "_handleFocusTrapWithArrows",
      value: function _handleFocusTrapWithArrows(event) {
        var firstActive = document.activeElement === this.focusableFirstChild;
        var lastActive = document.activeElement === this.focusableLastChild;
        var arrowUp = event.which === keyCodes.ARROW_UP;
        var arrowDown = event.which === keyCodes.ARROW_DOWN;

        if (arrowUp || arrowDown) {
          event.preventDefault();

          if (firstActive && arrowUp) {
            this.focusableLastChild.focus();
          } else if (lastActive && arrowDown) {
            this.focusableFirstChild.focus();
          } else if (arrowDown) {
            this._focusNextChild();
          } else if (arrowUp) {
            this._focusLastChild();
          }
        }
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
      _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

        this.modals = this._getElements(this.modalContainerAttr);
        this.modalButtons = this._getElements("[".concat(selectors$1.MODAL_BUTTON, "]"));

        this._getFocusableElements(this.modalContainerAttr).forEach(function (element) {
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
      key: "_render",
      value: function _render(event) {
        var _this4 = this;

        event.preventDefault();
        this.activeModalButton = event.target;

        if (!this.activeModalButton.getAttribute(selectors$1.DATA_TARGET)) {
          return console.error(messages.NO_TARGET_ERROR);
        }

        this.activeModalId = this.activeModalButton.getAttribute(selectors$1.DATA_TARGET);
        this.activeModalOverlayAttr = "[".concat(selectors$1.MODAL_ID, "=\"").concat(this.activeModalId, "\"]");

        if (!document.querySelector(this.activeModalOverlayAttr)) {
          return console.error(messages.NO_ID_ERROR(this.activeModalId));
        }

        this.activeModalOverlay = document.querySelector(this.activeModalOverlayAttr);
        this.activeModalSelector = "".concat(this.activeModalOverlayAttr, " ").concat(this.modalContainerAttr);
        this.activeModal = document.querySelector(this.activeModalSelector);
        this.activeModalCloseButtons = this._getElements("".concat(this.activeModalOverlayAttr, " [").concat(selectors$1.MODAL_CONTAINER, "] [").concat(selectors$1.DATA_CLOSE, "]"));

        this._getFocusableElements(this.activeModalSelector).forEach(function (element) {
          element.setAttribute(selectors$1.TABINDEX, "0");
        });

        this._handleScrollStop();

        this.captureFocus(this.activeModalSelector);
        this.activeModalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "false");
        this.activeModal.setAttribute(selectors$1.TABINDEX, "-1");
        this.activeModalOverlay.setAttribute(selectors$1.DATA_VISIBLE, "true");
        this.activeModal.focus();
        this.activeModalOverlay.scrollTop = 0;
        document.addEventListener(events$1.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(events$1.CLICK, this._handleOverlayClick);
        this.activeModalCloseButtons.forEach(function (button) {
          button.addEventListener(events$1.CLICK, _this4._handleClose);
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
      key: "_handleClose",
      value: function _handleClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.activeModalOverlay.setAttribute(selectors$1.DATA_VISIBLE, "false");

        this._handleReturnFocus();

        this._handleScrollRestore();

        this.releaseFocus();
        this.activeModalOverlay.setAttribute(selectors$1.ARIA_HIDDEN, "true");
        this.activeModal.removeAttribute(selectors$1.TABINDEX);

        this._getFocusableElements(this.activeModalSelector).forEach(function (element) {
          element.setAttribute(selectors$1.TABINDEX, "-1");
        });

        document.removeEventListener(events$1.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(events$1.CLICK, this._handleOverlayClick);
        this.activeModalCloseButtons.forEach(function (button) {
          button.removeEventListener(events$1.CLICK, _this5._handleClose);
        });
      }
    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick(event) {
        if (event.target === this.activeModalOverlay) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === keyCodes$1.ESCAPE) {
          this._handleClose(event);
        }
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
      _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleSpaceKeyPress = _this._handleSpaceKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

        this.accordionButtons = this._getElements("[".concat(selectors$2.ACCORDION_CONTAINER, "] [").concat(selectors$2.DATA_TARGET, "]"));

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

        var buttonHeader = this._getElements(buttonHeaderAttr)[0];

        if (!buttonHeader || !buttonHeader.id) {
          console.error(messages$1.NO_HEADER_ID_ERROR(buttonId));
        }

        var buttonContentChildren = this._getFocusableElements("#".concat(buttonContent.id));

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
      key: "_render",
      value: function _render(event) {
        event.preventDefault();
        this.activeButton = event.target;
        this.activeAccordionRowId = this.activeButton.getAttribute(selectors$2.DATA_TARGET);
        this.activeRowAttr = this._getAccordionRowAttr(this.activeAccordionRowId);
        this.activeRow = document.querySelector(this.activeRowAttr);

        if (!this.activeButton.getAttribute(selectors$2.DATA_PARENT)) {
          return console.error(messages$1.NO_PARENT_ERROR(this.activeAccordionRowId));
        }

        this.activeContainerId = this.activeButton.getAttribute(selectors$2.DATA_PARENT);
        this.activeContainerAttr = "[".concat(selectors$2.ACCORDION_CONTAINER, "='").concat(this.activeContainerId, "']");

        if (!document.querySelector(this.activeContainerAttr)) {
          return console.error(messages$1.NO_ACCORDION_ERROR(this.activeContainerId));
        }

        this.activeContainer = document.querySelector(this.activeContainerAttr);
        this.activeContent = document.getElementById(this.activeAccordionRowId);
        var accordionButtonState = this.activeRow.getAttribute(selectors$2.DATA_VISIBLE);
        this.activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
        this.activeContentHiddenState = this.activeButtonExpandState === "false" ? "true" : "false";

        this._closeAllIfToggleable();

        this._toggleSelectedAccordion();
      }
    }, {
      key: "_handleSpaceKeyPress",
      value: function _handleSpaceKeyPress(event) {
        if (event.which === keyCodes$2.SPACE) this._render(event);
      }
    }, {
      key: "_closeAllIfToggleable",
      value: function _closeAllIfToggleable() {
        var _this4 = this;

        if (this.activeContainer.hasAttribute(selectors$2.DATA_TOGGLE_MULTIPLE)) return;
        var allContentAttr = "".concat(this.activeContainerAttr, " [").concat(selectors$2.ARIA_HIDDEN, "]");

        var allRows = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors$2.DATA_VISIBLE, "]"));

        var allContent = this._getElements(allContentAttr);

        var allButtons = this._getElements("".concat(this.activeContainerAttr, " [").concat(selectors$2.DATA_TARGET, "]"));

        allContent.forEach(function (content) {
          if (!(content === _this4.activeContent)) content.style.maxHeight = null;
        });

        this._getFocusableElements(allContentAttr).forEach(function (element) {
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

        this._getFocusableElements(activeContentBlock).forEach(function (element) {
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
      _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._renderWithKeys = _this._renderWithKeys.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleOffMenuClick = _this._handleOffMenuClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleFirstTabClose = _this._handleFirstTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleLastTabClose = _this._handleLastTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
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

        this.dropdowns = this._getElements("[".concat(selectors$3.DATA_DROPDOWN, "]"));
        this.dropdownButtons = this._getElements(this.dropdownButtonAttr);

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
      key: "_render",
      value: function _render(event, key) {
        var _this4 = this;

        if (!key) event.preventDefault();
        event.stopPropagation();

        if (this.activeDropdownButton) {
          this.allowFocusReturn = false;

          this._handleClose(event);

          this.allowFocusReturn = true;
        }

        this.activeDropdownButton = event.target;

        if (!this.activeDropdownButton.getAttribute(selectors$3.DATA_PARENT)) {
          return messages$2.NO_PARENT_ERROR;
        }

        this.activeDropdownId = this.activeDropdownButton.getAttribute(selectors$3.DATA_PARENT);
        this.activeDropdownButton.setAttribute(selectors$3.ARIA_EXPANDED, "true");
        this.activeDropdownAttr = "[".concat(selectors$3.DATA_DROPDOWN, "=\"").concat(this.activeDropdownId, "\"]");

        if (!document.querySelector(this.activeDropdownAttr)) {
          return messages$2.NO_DROPDOWN_ERROR(this.activeDropdownAttr);
        }

        this.activeDropdown = document.querySelector(this.activeDropdownAttr);
        this.activeDropdownMenuId = this.activeDropdownButton.getAttribute(selectors$3.DATA_TARGET);
        this.activeDropdownMenu = document.getElementById(this.activeDropdownMenuId);
        this.activeDropdownButton.setAttribute(selectors$3.ARIA_EXPANDED, "true");
        this.activeDropdown.setAttribute(selectors$3.DATA_VISIBLE, "true");
        this.activeDropdownButton.removeEventListener(events$3.CLICK, this._render);
        this.activeDropdownButton.addEventListener(events$3.CLICK, this._handleClose);
        document.addEventListener(events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(events$3.CLICK, this._handleOffMenuClick);
        this.activeDropdownLinks = this._getDropdownButtons(this.activeDropdownAttr);
        this.firstDropdownLink = this.activeDropdownLinks[0];
        this.lastDropdownLink = this.activeDropdownLinks[this.activeDropdownLinks.length - 1];
        this.firstDropdownLink.addEventListener(events$3.KEYDOWN, this._handleFirstTabClose);
        this.lastDropdownLink.addEventListener(events$3.KEYDOWN, this._handleLastTabClose);

        if (key && key === keyCodes$3.ARROW_UP) {
          this.lastDropdownLink.focus();
        } else {
          this.firstDropdownLink.focus();
        }

        this.activeDropdownLinks.forEach(function (link) {
          link.setAttribute(selectors$3.TABINDEX, "0");
          link.addEventListener(events$3.CLICK, _this4._handleClose);
        });
        this.captureFocus("".concat(this.activeDropdownAttr, " > ul"), {
          useArrows: true
        });
      }
    }, {
      key: "_handleFirstTabClose",
      value: function _handleFirstTabClose(event) {
        var shiftKey = event.which === keyCodes$3.SHIFT || event.shiftKey;
        var tabKey = event.which === keyCodes$3.TAB;

        if (shiftKey && tabKey) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleLastTabClose",
      value: function _handleLastTabClose(event) {
        var shiftKey = event.which === keyCodes$3.SHIFT || event.shiftKey;
        var tabKey = event.which === keyCodes$3.TAB;

        if (tabKey && !shiftKey) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_renderWithKeys",
      value: function _renderWithKeys(event) {
        if (event.which === keyCodes$3.ARROW_UP || event.which === keyCodes$3.ARROW_DOWN) {
          this._render(event, event.which);
        }
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.releaseFocus();
        this.activeDropdownButton.setAttribute(selectors$3.ARIA_EXPANDED, "false");
        this.activeDropdown.setAttribute(selectors$3.DATA_VISIBLE, "false");
        this.activeDropdownLinks.forEach(function (link) {
          link.setAttribute(selectors$3.TABINDEX, "-1");
          link.removeEventListener(events$3.CLICK, _this5._handleClose);
        });
        this.activeDropdownButton.removeEventListener(events$3.CLICK, this._handleClose);
        this.activeDropdownButton.addEventListener(events$3.CLICK, this._render);
        document.removeEventListener(events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(events$3.CLICK, this._handleOffMenuClick);

        if (this.allowFocusReturn) {
          this._handleReturnFocus();
        }
      }
    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === keyCodes$3.ESCAPE) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleOffMenuClick",
      value: function _handleOffMenuClick(event) {
        if (event.target !== this.activeDropdownButton && event.target !== this.activeDropdownMenu) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this.activeDropdownButton.setAttribute(selectors$3.TAB_INDEX, "-1");
        this.activeDropdownButton.focus();
        this.activeDropdownButton.removeAttribute(selectors$3.TAB_INDEX);
      }
    }, {
      key: "_getDropdownButtons",
      value: function _getDropdownButtons(attr) {
        return this._getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
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

        var dropdownMenuItems = this._getElements(dropdownMenuItemsAttr);

        dropdownMenuItems.forEach(function (item) {
          return item.setAttribute(selectors$3.ROLE, "none");
        });

        this._getDropdownButtons(dropdownIdAttr).forEach(function (link) {
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
