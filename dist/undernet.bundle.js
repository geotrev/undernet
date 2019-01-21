/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v3.2.1 (https://undernet.io)
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
      _classCallCheck(this, Utils);

      this._listenForKeyboard = this._listenForKeyboard.bind(this);
      this._listenForClick = this._listenForClick.bind(this);
      this._handleFocusTrapWithTab = this._handleFocusTrapWithTab.bind(this);
      this._handleFocusTrapWithArrows = this._handleFocusTrapWithArrows.bind(this);
      this._focusContainerSelector = "";
      this._focusableChildren = [];
      this._focusableFirstChild = {};
      this._focusableLastChild = {};
      this._listeningForKeydown = false;
      this._trapFocusWithArrows = false;
    }

    _createClass(Utils, [{
      key: "captureFocus",
      value: function captureFocus(container, options) {
        this._focusContainerSelector = container;
        this._focusableChildren = this.getFocusableElements(this._focusContainerSelector);
        this._focusableFirstChild = this._focusableChildren[0];
        this._focusableLastChild = this._focusableChildren[this._focusableChildren.length - 1];

        if (options) {
          if (options.useArrows) {
            this._trapFocusWithArrows = options.useArrows || this._trapFocusWithArrows;
            document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
          }
        } else {
          document.addEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
        }
      }
    }, {
      key: "releaseFocus",
      value: function releaseFocus() {
        if (this._trapFocusWithArrows) {
          document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithArrows);
          this._trapFocusWithArrows = false;
        } else {
          document.removeEventListener(Events.KEYDOWN, this._handleFocusTrapWithTab);
        }
      }
    }, {
      key: "enableFocusOutline",
      value: function enableFocusOutline() {
        document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
      }
    }, {
      key: "disableFocusOutline",
      value: function disableFocusOutline() {
        if (this._listeningForKeydown) {
          document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
        } else {
          document.removeEventListener(Events.CLICK, this._listenForClick);
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
    }, {
      key: "_listenForKeyboard",
      value: function _listenForKeyboard(event) {
        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (tabKey || shiftKey || arrowUp || arrowDown) {
          document.body.classList.add(Selectors.KEYBOARD_CLASS);
          document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
          document.addEventListener(Events.CLICK, this._listenForClick);
          this._listeningForKeydown = false;
        }
      }
    }, {
      key: "_listenForClick",
      value: function _listenForClick(event) {
        document.body.classList.remove(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.CLICK, this._listenForClick);
        document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
        this._listeningForKeydown = true;
      }
    }, {
      key: "_handleFocusTrapWithTab",
      value: function _handleFocusTrapWithTab(event) {
        var containerElement = document.querySelector(this._focusContainerSelector);
        var containerActive = document.activeElement === containerElement;
        var firstActive = document.activeElement === this._focusableFirstChild;
        var lastActive = document.activeElement === this._focusableLastChild;
        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;

        if (shiftKey && tabKey && (firstActive || containerActive)) {
          event.preventDefault();

          this._focusableLastChild.focus();
        } else if (!shiftKey && tabKey && lastActive) {
          event.preventDefault();

          this._focusableFirstChild.focus();
        }
      }
    }, {
      key: "_handleFocusTrapWithArrows",
      value: function _handleFocusTrapWithArrows(event) {
        var firstActive = document.activeElement === this._focusableFirstChild;
        var lastActive = document.activeElement === this._focusableLastChild;
        var arrowUp = event.which === KeyCodes.ARROW_UP;
        var arrowDown = event.which === KeyCodes.ARROW_DOWN;

        if (arrowUp || arrowDown) {
          event.preventDefault();

          if (firstActive && arrowUp) {
            this._focusableLastChild.focus();
          } else if (lastActive && arrowDown) {
            this._focusableFirstChild.focus();
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
        for (var i = 0; i < this._focusableChildren.length; i++) {
          if (this._focusableChildren[i] === document.activeElement) {
            this._focusableChildren[i + 1].focus();

            break;
          }
        }
      }
    }, {
      key: "_focusLastChild",
      value: function _focusLastChild() {
        for (var i = 0; i < this._focusableChildren.length; i++) {
          if (this._focusableChildren[i] === document.activeElement) {
            this._focusableChildren[i - 1].focus();

            break;
          }
        }
      }
    }]);

    return Utils;
  }();

  var KeyCodes$1 = {
    ESCAPE: 27
  };
  var Selectors$1 = {
    DATA_MODAL: "data-modal",
    DATA_MODAL_ID: "data-modal-id",
    DATA_MODAL_BUTTON: "data-modal-button",
    DATA_VISIBLE: "data-visible",
    DATA_CLOSE: "data-close",
    DATA_TARGET: "data-target",
    DATA_PARENT: "data-parent",
    ARIA_HIDDEN: "aria-hidden",
    ARIA_MODAL: "aria-modal",
    ROLE: "role",
    TABINDEX: "tabindex",
    NO_SCROLL: "no-scroll"
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
      _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._modals = [];
      _this._modalButtons = [];
      _this._activeModalButton = {};
      _this._activeModalOverlay = {};
      _this._activeModal = {};
      _this._activeModalId = "";
      _this._activeModalOverlayAttr = "";
      _this._activeModalSelector = "";
      _this._activeModalCloseButtons = [];
      _this._modalContainerAttr = "[".concat(Selectors$1.DATA_MODAL, "]");
      return _this;
    }

    _createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this._modals = this.getElements(this._modalContainerAttr);
        this._modalButtons = this.getElements("[".concat(Selectors$1.DATA_MODAL_BUTTON, "]"));
        this.getFocusableElements(this._modalContainerAttr).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "-1");
        });

        if (this._modals.length) {
          this._modals.forEach(function (modal) {
            _this2._setupModal(modal);
          });
        }

        if (this._modalButtons.length) {
          this._modalButtons.forEach(function (button) {
            button.addEventListener(Events$1.CLICK, _this2._render);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._modalButtons.forEach(function (button) {
          button.removeEventListener(Events$1.CLICK, _this3._render);
        });
      }
    }, {
      key: "_render",
      value: function _render(event) {
        var _this4 = this;

        event.preventDefault();
        this._activeModalButton = event.target;

        if (!this._activeModalButton.getAttribute(Selectors$1.DATA_TARGET)) {
          return console.error(Messages.NO_TARGET_ERROR);
        }

        this._activeModalId = this._activeModalButton.getAttribute(Selectors$1.DATA_TARGET);
        this._activeModalOverlayAttr = "[".concat(Selectors$1.DATA_MODAL_ID, "=\"").concat(this._activeModalId, "\"]");

        if (!document.querySelector(this._activeModalOverlayAttr)) {
          return console.error(Messages.NO_ID_ERROR(this._activeModalId));
        }

        this._activeModalOverlay = document.querySelector(this._activeModalOverlayAttr);
        this._activeModalSelector = "".concat(this._activeModalOverlayAttr, " ").concat(this._modalContainerAttr);
        this._activeModal = document.querySelector(this._activeModalSelector);
        this._activeModalCloseButtons = this.getElements("".concat(this._activeModalOverlayAttr, " [").concat(Selectors$1.DATA_CLOSE, "]"));
        this.getFocusableElements(this._activeModalSelector).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "0");
        });

        this._handleScrollStop();

        this.captureFocus(this._activeModalSelector);

        this._activeModalOverlay.setAttribute(Selectors$1.ARIA_HIDDEN, "false");

        this._activeModal.setAttribute(Selectors$1.TABINDEX, "-1");

        this._activeModalOverlay.setAttribute(Selectors$1.DATA_VISIBLE, "true");

        this._activeModal.focus();

        this._activeModalOverlay.scrollTop = 0;
        document.addEventListener(Events$1.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(Events$1.CLICK, this._handleOverlayClick);

        this._activeModalCloseButtons.forEach(function (button) {
          button.addEventListener(Events$1.CLICK, _this4._handleClose);
        });
      }
    }, {
      key: "_setupModal",
      value: function _setupModal(modal) {
        var modalId;

        if (!modal.getAttribute(Selectors$1.DATA_PARENT)) {
          return console.error(Messages.NO_PARENT_ERROR);
        } else {
          modalId = modal.getAttribute(Selectors$1.DATA_PARENT);
        }

        var modalWrapper;

        if (!document.querySelector("[".concat(Selectors$1.DATA_MODAL_ID, "='").concat(modalId, "']"))) {
          return console.error(Messages.NO_ID_ERROR(modalId));
        } else {
          modalWrapper = document.querySelector("[".concat(Selectors$1.DATA_MODAL_ID, "='").concat(modalId, "']"));
        }

        modalWrapper.setAttribute(Selectors$1.ARIA_HIDDEN, "true");
        modalWrapper.setAttribute(Selectors$1.DATA_VISIBLE, "false");
        modal.setAttribute(Selectors$1.ARIA_MODAL, "true");
        modal.setAttribute(Selectors$1.ROLE, "dialog");
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        var _this5 = this;

        event.preventDefault();

        this._activeModalOverlay.setAttribute(Selectors$1.DATA_VISIBLE, "false");

        this._handleReturnFocus();

        this._handleScrollRestore();

        this.releaseFocus();

        this._activeModalOverlay.setAttribute(Selectors$1.ARIA_HIDDEN, "true");

        this._activeModal.removeAttribute(Selectors$1.TABINDEX);

        this.getFocusableElements(this._activeModalSelector).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "-1");
        });
        document.removeEventListener(Events$1.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(Events$1.CLICK, this._handleOverlayClick);

        this._activeModalCloseButtons.forEach(function (button) {
          button.removeEventListener(Events$1.CLICK, _this5._handleClose);
        });
      }
    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick(event) {
        if (event.target === this._activeModalOverlay) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === KeyCodes$1.ESCAPE) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this._activeModalButton.setAttribute(Selectors$1.TABINDEX, "-1");

        this._activeModalButton.focus();

        this._activeModalButton.removeAttribute(Selectors$1.TABINDEX);
      }
    }, {
      key: "_handleScrollRestore",
      value: function _handleScrollRestore() {
        document.body.classList.remove(Selectors$1.NO_SCROLL);
        document.querySelector("html").classList.remove(Selectors$1.NO_SCROLL);
      }
    }, {
      key: "_handleScrollStop",
      value: function _handleScrollStop() {
        document.body.classList.add(Selectors$1.NO_SCROLL);
        document.querySelector("html").classList.add(Selectors$1.NO_SCROLL);
      }
    }]);

    return Modal;
  }(Utils);

  var Selectors$2 = {
    DATA_ACCORDION: "data-accordion",
    DATA_ACCORDION_ROW: "data-accordion-row",
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
      _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._accordionButtons = [];
      _this._accordionContentsAttr = "";
      _this._accordionContents = [];
      _this._activeContainer = {};
      _this._activeButton = {};
      _this._activeAccordionRowId = "";
      _this._activeRowAttr = "";
      _this._activeRow = "";
      _this._activeContainerId = "";
      _this._activeContainerAttr = "";
      _this._activeContent = {};
      _this._activeButtonExpandState = "";
      _this._activeContentHiddenState = "";
      _this._headerLevels = [1, 2, 3, 4, 5, 6];
      return _this;
    }

    _createClass(Accordion, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        var accordionButtonSelector = this._getPossibleAccordionButtonAttrs("[".concat(Selectors$2.DATA_ACCORDION, "]"));

        this._accordionButtons = this.getElements(accordionButtonSelector);

        if (this._accordionButtons.length) {
          this._accordionButtons.forEach(function (button) {
            _this2._setupAccordion(button);

            button.addEventListener(Events$2.CLICK, _this2._render);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._accordionButtons.forEach(function (button) {
          button.removeEventListener(Events$2.CLICK, _this3._render);
        });
      }
    }, {
      key: "_setupAccordion",
      value: function _setupAccordion(button) {
        var buttonId = button.getAttribute(Selectors$2.DATA_TARGET);

        if (!document.getElementById(buttonId)) {
          return console.error(Messages$1.NO_CONTENT_ERROR(buttonId));
        }

        var buttonContent = document.getElementById(buttonId);

        var accordionRowAttr = this._getAccordionRowAttr(buttonId);

        if (!document.querySelector(accordionRowAttr)) {
          return console.error(Messages$1.NO_ROW_ERROR(buttonId));
        }

        var accordionRow = document.querySelector(accordionRowAttr);

        var buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);

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
      }
    }, {
      key: "_getPossibleAccordionButtonAttrs",
      value: function _getPossibleAccordionButtonAttrs(attr) {
        return this._headerLevels.map(function (num) {
          return "".concat(attr, " > [").concat(Selectors$2.DATA_ACCORDION_ROW, "] > h").concat(num, " [").concat(Selectors$2.DATA_TARGET, "]");
        }).join(", ");
      }
    }, {
      key: "_getPossibleAccordionHeaderAttrs",
      value: function _getPossibleAccordionHeaderAttrs(attr) {
        return this._headerLevels.map(function (num) {
          return "".concat(attr, " > h").concat(num);
        }).join(", ");
      }
    }, {
      key: "_getAccordionRowAttr",
      value: function _getAccordionRowAttr(id) {
        return "[".concat(Selectors$2.DATA_ACCORDION_ROW, "='").concat(id, "']");
      }
    }, {
      key: "_render",
      value: function _render(event) {
        event.preventDefault();
        this._activeButton = event.target;
        this._activeAccordionRowId = this._activeButton.getAttribute(Selectors$2.DATA_TARGET);
        this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
        this._activeRow = document.querySelector(this._activeRowAttr);

        if (!this._activeButton.getAttribute(Selectors$2.DATA_PARENT)) {
          return console.error(Messages$1.NO_PARENT_ERROR(this._activeAccordionRowId));
        }

        this._activeContainerId = this._activeButton.getAttribute(Selectors$2.DATA_PARENT);
        this._activeContainerAttr = "[".concat(Selectors$2.DATA_ACCORDION, "='").concat(this._activeContainerId, "']");

        if (!document.querySelector(this._activeContainerAttr)) {
          return console.error(Messages$1.NO_ACCORDION_ERROR(this._activeContainerId));
        }

        this._activeContainer = document.querySelector(this._activeContainerAttr);
        this._activeContent = document.getElementById(this._activeAccordionRowId);

        var accordionButtonState = this._activeRow.getAttribute(Selectors$2.DATA_VISIBLE);

        this._activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
        this._activeContentHiddenState = this._activeButtonExpandState === "false" ? "true" : "false";

        this._closeAllIfToggleable();

        this._toggleSelectedAccordion();
      }
    }, {
      key: "_closeAllIfToggleable",
      value: function _closeAllIfToggleable() {
        var _this4 = this;

        if (this._activeContainer.hasAttribute(Selectors$2.DATA_TOGGLE_MULTIPLE)) return;
        var allContentAttr = "".concat(this._activeContainerAttr, " [").concat(Selectors$2.ARIA_HIDDEN, "]");
        var allRows = this.getElements("".concat(this._activeContainerAttr, " [").concat(Selectors$2.DATA_VISIBLE, "]"));
        var allContent = this.getElements(allContentAttr);

        var accordionButtonSelector = this._getPossibleAccordionButtonAttrs(this._activeContainerAttr);

        var allButtons = this.getElements(accordionButtonSelector);
        allContent.forEach(function (content) {
          if (content !== _this4._activeContent) content.style.maxHeight = null;
        });
        this.getFocusableElements(allContentAttr).forEach(function (element) {
          element.setAttribute(Selectors$2.TABINDEX, "-1");
        });

        this._toggleAttributeInCollection(allRows, Selectors$2.DATA_VISIBLE, "true", "false");

        this._toggleAttributeInCollection(allButtons, Selectors$2.ARIA_EXPANDED, "true", "false");

        this._toggleAttributeInCollection(allContent, Selectors$2.ARIA_HIDDEN, "false", "true");
      }
    }, {
      key: "_toggleSelectedAccordion",
      value: function _toggleSelectedAccordion() {
        var _this5 = this;

        this._activeRow.setAttribute(Selectors$2.DATA_VISIBLE, this._activeButtonExpandState);

        this._activeButton.setAttribute(Selectors$2.ARIA_EXPANDED, this._activeButtonExpandState);

        this._activeContent.setAttribute(Selectors$2.ARIA_HIDDEN, this._activeContentHiddenState);

        var activeContentBlock = "#".concat(this._activeAccordionRowId);
        this.getFocusableElements(activeContentBlock).forEach(function (element) {
          var value = _this5._activeButtonExpandState === "true" ? "0" : "-1";
          element.setAttribute(Selectors$2.TABINDEX, value);
        });

        if (this._activeContent.style.maxHeight) {
          this._activeContent.style.maxHeight = null;
        } else {
          this._activeContent.style.maxHeight = "".concat(this._activeContent.scrollHeight, "px");
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
      _this._render = _this._render.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleFirstTabClose = _this._handleFirstTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleLastTabClose = _this._handleLastTabClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._renderWithKeys = _this._renderWithKeys.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._handleOffMenuClick = _this._handleOffMenuClick.bind(_assertThisInitialized(_assertThisInitialized(_this)));
      _this._activeDropdownButton = null;
      _this._activeDropdown = null;
      _this._activeDropdownMenu = null;
      _this._activeDropdownLinks = [];
      _this._allowFocusReturn = true;
      _this._activeDropdownId = "";
      _this._activeDropdownAttr = "";
      _this._activeDropdownMenuId = "";
      _this._dropdownButtons = [];
      _this._dropdowns = [];
      _this._dropdownContainerAttr = "[".concat(Selectors$3.DATA_DROPDOWN, "]");
      _this._dropdownTargetAttr = "[".concat(Selectors$3.DATA_TARGET, "]");
      return _this;
    }

    _createClass(Dropdown, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this._dropdowns = this.getElements("".concat(this._dropdownContainerAttr));
        this._dropdownButtons = this.getElements("".concat(this._dropdownContainerAttr, " > ").concat(this._dropdownTargetAttr));

        if (this._dropdowns.length) {
          this._dropdowns.forEach(function (dropdown) {
            return _this2._setupDropdown(dropdown);
          });
        }

        this._dropdownButtons.forEach(function (button) {
          button.addEventListener(Events$3.CLICK, _this2._render);
          button.addEventListener(Events$3.KEYDOWN, _this2._renderWithKeys);
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._dropdownButtons.forEach(function (button) {
          button.removeEventListener(Events$3.CLICK, _this3._render);
          button.removeEventListener(Events$3.KEYDOWN, _this3._renderWithKeys);
        });
      }
    }, {
      key: "_render",
      value: function _render(event, key) {
        var _this4 = this;

        if (!key) event.preventDefault();
        event.stopPropagation();

        if (this._activeDropdownButton) {
          this._allowFocusReturn = false;

          this._handleClose(event);

          this._allowFocusReturn = true;
        }

        this._activeDropdownButton = event.target;

        if (!this._activeDropdownButton.getAttribute(Selectors$3.DATA_PARENT)) {
          return console.error(Messages$2.NO_PARENT_ERROR);
        }

        this._activeDropdownId = this._activeDropdownButton.getAttribute(Selectors$3.DATA_PARENT);
        this._activeDropdownAttr = "[".concat(Selectors$3.DATA_DROPDOWN, "=\"").concat(this._activeDropdownId, "\"]");

        if (!document.querySelector(this._activeDropdownAttr)) {
          return console.error(Messages$2.NO_DROPDOWN_ERROR(this._activeDropdownAttr));
        }

        this._activeDropdown = document.querySelector(this._activeDropdownAttr);
        this._activeDropdownMenuId = this._activeDropdownButton.getAttribute(Selectors$3.DATA_TARGET);
        this._activeDropdownMenu = document.getElementById(this._activeDropdownMenuId);

        this._activeDropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "true");

        this._activeDropdown.setAttribute(Selectors$3.DATA_VISIBLE, "true");

        this._activeDropdownButton.removeEventListener(Events$3.CLICK, this._render);

        this._activeDropdownButton.addEventListener(Events$3.CLICK, this._handleClose);

        document.addEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(Events$3.CLICK, this._handleOffMenuClick);
        this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);
        this.firstDropdownLink = this._activeDropdownLinks[0];
        this.lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];
        this.firstDropdownLink.addEventListener(Events$3.KEYDOWN, this._handleFirstTabClose);
        this.lastDropdownLink.addEventListener(Events$3.KEYDOWN, this._handleLastTabClose);

        if (key && key === KeyCodes$2.ARROW_UP) {
          this.lastDropdownLink.focus();
        } else {
          this.firstDropdownLink.focus();
        }

        this._activeDropdownLinks.forEach(function (link) {
          link.setAttribute(Selectors$3.TABINDEX, "0");
          link.addEventListener(Events$3.CLICK, _this4._handleClose);
        });

        this.captureFocus("".concat(this._activeDropdownAttr, " > ul"), {
          useArrows: true
        });
      }
    }, {
      key: "_handleFirstTabClose",
      value: function _handleFirstTabClose(event) {
        var shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes$2.TAB;

        if (shiftKey && tabKey) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleLastTabClose",
      value: function _handleLastTabClose(event) {
        var shiftKey = event.which === KeyCodes$2.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes$2.TAB;

        if (tabKey && !shiftKey) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_renderWithKeys",
      value: function _renderWithKeys(event) {
        if (event.which === KeyCodes$2.ARROW_UP || event.which === KeyCodes$2.ARROW_DOWN) {
          this._render(event, event.which);
        }
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.releaseFocus();

        this._activeDropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "false");

        this._activeDropdown.setAttribute(Selectors$3.DATA_VISIBLE, "false");

        this._activeDropdownLinks.forEach(function (link) {
          link.setAttribute(Selectors$3.TABINDEX, "-1");
          link.removeEventListener(Events$3.CLICK, _this5._handleClose);
        });

        this._activeDropdownButton.removeEventListener(Events$3.CLICK, this._handleClose);

        this._activeDropdownButton.addEventListener(Events$3.CLICK, this._render);

        document.removeEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(Events$3.CLICK, this._handleOffMenuClick);

        if (this._allowFocusReturn) {
          this._handleReturnFocus();
        }
      }
    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === KeyCodes$2.ESCAPE) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleOffMenuClick",
      value: function _handleOffMenuClick(event) {
        if (event.target !== this._activeDropdownButton && event.target !== this._activeDropdownMenu) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this._activeDropdownButton.setAttribute(Selectors$3.TAB_INDEX, "-1");

        this._activeDropdownButton.focus();

        this._activeDropdownButton.removeAttribute(Selectors$3.TAB_INDEX);
      }
    }, {
      key: "_getDropdownLinks",
      value: function _getDropdownLinks(attr) {
        return this.getElements("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown(dropdown) {
        var dropdownId = dropdown.getAttribute(Selectors$3.DATA_DROPDOWN);
        var dropdownIdAttr = "[".concat(Selectors$3.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
        var dropdownMenuItemsAttr = "".concat(dropdownIdAttr, " > ul > li");

        if (!document.querySelector("".concat(dropdownIdAttr, " > ul"))) {
          return console.error(Messages$2.NO_MENU_ERROR(dropdownIdAttr));
        }

        var dropdownMenu = document.querySelector("".concat(dropdownIdAttr, " > ul"));
        var dropdownButton = document.querySelector("".concat(dropdownIdAttr, " > ").concat(this._dropdownTargetAttr));
        dropdownButton.setAttribute(Selectors$3.ARIA_CONTROLS, dropdownMenu.id);
        dropdownButton.setAttribute(Selectors$3.ARIA_HASPOPUP, "true");
        dropdownButton.setAttribute(Selectors$3.ARIA_EXPANDED, "false");
        dropdownMenu.setAttribute(Selectors$3.ARIA_LABELLEDBY, dropdownButton.id);
        var dropdownMenuItems = this.getElements(dropdownMenuItemsAttr);
        dropdownMenuItems.forEach(function (item) {
          return item.setAttribute(Selectors$3.ROLE, "none");
        });

        this._getDropdownLinks(dropdownIdAttr).forEach(function (link) {
          link.setAttribute(Selectors$3.ROLE, "menuitem");
          link.setAttribute(Selectors$3.TABINDEX, "-1");
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

  exports.default = Undernet;
  exports.Modals = Modals;
  exports.Accordions = Accordions;
  exports.Dropdowns = Dropdowns;
  exports.Utils = Utils$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=undernet.bundle.js.map
