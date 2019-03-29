/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v4.0.0 (https://undernet.io)
  * Copyright 2017-2019 George Treviranus
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.undernet = {}));
}(this, function (exports) { 'use strict';

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
  var nodeListToArray = function nodeListToArray(nodeList) {
    return Array.apply(null, document.querySelectorAll(nodeList));
  };
  var getFocusableElements = function getFocusableElements(container) {
    var focusables = Selectors.FOCUSABLE_TAGS.map(function (element) {
      return "".concat(container, " ").concat(element).concat(Selectors.NOT_VISUALLY_HIDDEN);
    }).join(", ");
    return nodeListToArray(focusables);
  };
  var iOSMobile = /(iphone|ipod|ipad)/i.test(navigator.userAgent);

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
        this._focusableChildren = getFocusableElements(this._focusContainerSelector);
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
      key: "_listenForKeyboard",
      value: function _listenForKeyboard(event) {
        document.body.classList.add(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
        document.addEventListener(Events.CLICK, this._listenForClick);
        this._listeningForKeydown = false;
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

  var Selectors$1 = {
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
  var Events$1 = {
    CLICK: "click",
    KEYDOWN: "keydown"
  };
  var Messages = {
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
      _this._render = _this._render.bind(_assertThisInitialized(_this));
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

        var accordionButtonSelector = this._getPossibleAccordionButtonAttrs("[".concat(Selectors$1.DATA_ACCORDION, "]"));

        this._accordionButtons = nodeListToArray(accordionButtonSelector);

        if (this._accordionButtons.length) {
          this._accordionButtons.forEach(function (button) {
            _this2._setupAccordion(button);

            button.addEventListener(Events$1.CLICK, _this2._render);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._accordionButtons.forEach(function (button) {
          button.removeEventListener(Events$1.CLICK, _this3._render);
        });
      }
    }, {
      key: "_render",
      value: function _render(event) {
        event.preventDefault();
        this._activeButton = event.target;
        this._activeAccordionRowId = this._activeButton.getAttribute(Selectors$1.DATA_TARGET);
        this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
        this._activeRow = document.querySelector(this._activeRowAttr);
        this._activeContainerId = this._activeButton.getAttribute(Selectors$1.DATA_PARENT);

        if (!this._activeContainerId) {
          return console.error(Messages.NO_PARENT_ERROR(this._activeAccordionRowId));
        }

        this._activeContainerAttr = "[".concat(Selectors$1.DATA_ACCORDION, "='").concat(this._activeContainerId, "']");
        this._activeContainer = document.querySelector(this._activeContainerAttr);

        if (!this._activeContainer) {
          return console.error(Messages.NO_ACCORDION_ERROR(this._activeContainerId));
        }

        this._activeContent = document.getElementById(this._activeAccordionRowId);

        var accordionButtonState = this._activeRow.getAttribute(Selectors$1.DATA_VISIBLE);

        this._activeButtonExpandState = accordionButtonState === "true" ? "false" : "true";
        this._activeContentHiddenState = this._activeButtonExpandState === "false" ? "true" : "false";

        this._closeAllIfToggleable();

        this._toggleSelectedAccordion();

        this._activeContainerId = null;
        this._activeContainer = null;
      }
    }, {
      key: "_setupAccordion",
      value: function _setupAccordion(button) {
        var buttonId = button.getAttribute(Selectors$1.DATA_TARGET);
        var buttonContent = document.getElementById(buttonId);

        if (!buttonContent) {
          return console.error(Messages.NO_CONTENT_ERROR(buttonId));
        }

        var accordionRowAttr = this._getAccordionRowAttr(buttonId);

        var accordionRow = document.querySelector(accordionRowAttr);

        if (!accordionRow) {
          return console.error(Messages.NO_ROW_ERROR(buttonId));
        }

        var buttonHeaderAttr = this._getPossibleAccordionHeaderAttrs(accordionRowAttr);

        var buttonHeader = nodeListToArray(buttonHeaderAttr)[0];

        if (!buttonHeader || !buttonHeader.id) {
          console.error(Messages.NO_HEADER_ID_ERROR(buttonId));
        }

        var buttonContentChildren = getFocusableElements("#".concat(buttonContent.id));
        button.setAttribute(Selectors$1.ARIA_CONTROLS, buttonId);
        buttonContent.setAttribute(Selectors$1.ARIA_LABELLEDBY, buttonHeader.id);
        var contentShouldExpand = accordionRow.getAttribute(Selectors$1.DATA_VISIBLE);

        if (!contentShouldExpand) {
          return console.error(Messages.NO_VISIBLE_ERROR(buttonId));
        }

        if (contentShouldExpand === "true") {
          buttonContent.style.maxHeight = "".concat(buttonContent.scrollHeight, "px");
          button.setAttribute(Selectors$1.ARIA_EXPANDED, "true");
          buttonContent.setAttribute(Selectors$1.ARIA_HIDDEN, "false");
          buttonContentChildren.forEach(function (element) {
            element.setAttribute(Selectors$1.TABINDEX, "0");
          });
        } else {
          button.setAttribute(Selectors$1.ARIA_EXPANDED, "false");
          buttonContent.setAttribute(Selectors$1.ARIA_HIDDEN, "true");
          buttonContentChildren.forEach(function (element) {
            element.setAttribute(Selectors$1.TABINDEX, "-1");
          });
        }
      }
    }, {
      key: "_getPossibleAccordionButtonAttrs",
      value: function _getPossibleAccordionButtonAttrs(attr) {
        return this._headerLevels.map(function (num) {
          return "".concat(attr, " > [").concat(Selectors$1.DATA_ACCORDION_ROW, "] > h").concat(num, " [").concat(Selectors$1.DATA_TARGET, "]");
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
        return "[".concat(Selectors$1.DATA_ACCORDION_ROW, "='").concat(id, "']");
      }
    }, {
      key: "_closeAllIfToggleable",
      value: function _closeAllIfToggleable() {
        var _this4 = this;

        if (this._activeContainer.hasAttribute(Selectors$1.DATA_TOGGLE_MULTIPLE)) return;
        var allContentAttr = "".concat(this._activeContainerAttr, " [").concat(Selectors$1.ARIA_HIDDEN, "]");
        var allRows = nodeListToArray("".concat(this._activeContainerAttr, " [").concat(Selectors$1.DATA_VISIBLE, "]"));
        var allContent = nodeListToArray(allContentAttr);

        var accordionButtonSelector = this._getPossibleAccordionButtonAttrs(this._activeContainerAttr);

        var allButtons = nodeListToArray(accordionButtonSelector);
        allContent.forEach(function (content) {
          if (content !== _this4._activeContent) content.style.maxHeight = null;
        });
        getFocusableElements(allContentAttr).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "-1");
        });

        this._toggleAttributeInCollection(allRows, Selectors$1.DATA_VISIBLE, "true", "false");

        this._toggleAttributeInCollection(allButtons, Selectors$1.ARIA_EXPANDED, "true", "false");

        this._toggleAttributeInCollection(allContent, Selectors$1.ARIA_HIDDEN, "false", "true");
      }
    }, {
      key: "_toggleSelectedAccordion",
      value: function _toggleSelectedAccordion() {
        var _this5 = this;

        this._activeRow.setAttribute(Selectors$1.DATA_VISIBLE, this._activeButtonExpandState);

        this._activeButton.setAttribute(Selectors$1.ARIA_EXPANDED, this._activeButtonExpandState);

        this._activeContent.setAttribute(Selectors$1.ARIA_HIDDEN, this._activeContentHiddenState);

        var activeContentBlock = "#".concat(this._activeAccordionRowId);
        getFocusableElements(activeContentBlock).forEach(function (element) {
          var value = _this5._activeButtonExpandState === "true" ? "0" : "-1";
          element.setAttribute(Selectors$1.TABINDEX, value);
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

  var KeyCodes$1 = {
    TAB: 9,
    SHIFT: 16,
    ESCAPE: 27,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  };
  var Selectors$2 = {
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
  var Events$2 = {
    KEYDOWN: "keydown",
    CLICK: "click"
  };
  var Messages$1 = {
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
      _this._render = _this._render.bind(_assertThisInitialized(_this));
      _this._handleFirstTabClose = _this._handleFirstTabClose.bind(_assertThisInitialized(_this));
      _this._handleLastTabClose = _this._handleLastTabClose.bind(_assertThisInitialized(_this));
      _this._renderWithKeys = _this._renderWithKeys.bind(_assertThisInitialized(_this));
      _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_this));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_this));
      _this._handleOffMenuClick = _this._handleOffMenuClick.bind(_assertThisInitialized(_this));
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
      _this._dropdownContainerAttr = "[".concat(Selectors$2.DATA_DROPDOWN, "]");
      _this._dropdownTargetAttr = "[".concat(Selectors$2.DATA_TARGET, "]");
      return _this;
    }

    _createClass(Dropdown, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this._dropdowns = nodeListToArray("".concat(this._dropdownContainerAttr));
        this._dropdownButtons = nodeListToArray("".concat(this._dropdownContainerAttr, " > ").concat(this._dropdownTargetAttr));

        if (this._dropdowns.length) {
          this._dropdowns.forEach(function (dropdown) {
            return _this2._setupDropdown(dropdown);
          });
        }

        this._dropdownButtons.forEach(function (button) {
          button.addEventListener(Events$2.CLICK, _this2._render);
          button.addEventListener(Events$2.KEYDOWN, _this2._renderWithKeys);
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._dropdownButtons.forEach(function (button) {
          button.removeEventListener(Events$2.CLICK, _this3._render);
          button.removeEventListener(Events$2.KEYDOWN, _this3._renderWithKeys);
        });
      }
    }, {
      key: "_render",
      value: function _render(event, key) {
        var _this4 = this;

        event.preventDefault();
        event.stopPropagation();

        if (this._activeDropdownButton) {
          this._allowFocusReturn = false;

          this._handleClose(event);

          this._allowFocusReturn = true;
        }

        this._activeDropdownButton = event.target;
        this._activeDropdownId = this._activeDropdownButton.getAttribute(Selectors$2.DATA_PARENT);

        if (!this._activeDropdownId) {
          return console.error(Messages$1.NO_PARENT_ERROR);
        }

        this._activeDropdownAttr = "[".concat(Selectors$2.DATA_DROPDOWN, "=\"").concat(this._activeDropdownId, "\"]");
        this._activeDropdown = document.querySelector(this._activeDropdownAttr);

        if (!this._activeDropdown) {
          return console.error(Messages$1.NO_DROPDOWN_ERROR(this._activeDropdownAttr));
        }

        this._activeDropdownMenuId = this._activeDropdownButton.getAttribute(Selectors$2.DATA_TARGET);
        this._activeDropdownMenu = document.getElementById(this._activeDropdownMenuId);

        this._activeDropdownButton.setAttribute(Selectors$2.ARIA_EXPANDED, "true");

        this._activeDropdown.setAttribute(Selectors$2.DATA_VISIBLE, "true");

        this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._render);

        this._activeDropdownButton.addEventListener(Events$2.CLICK, this._handleClose);

        document.addEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(Events$2.CLICK, this._handleOffMenuClick);

        if (iOSMobile) {
          document.body.style.cursor = "pointer";
        }

        this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);
        this.firstDropdownLink = this._activeDropdownLinks[0];
        this.lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];
        this.firstDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleFirstTabClose);
        this.lastDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleLastTabClose);

        if (key && key === KeyCodes$1.ARROW_UP) {
          this.lastDropdownLink.focus();
        } else {
          this.firstDropdownLink.focus();
        }

        this._activeDropdownLinks.forEach(function (link) {
          link.setAttribute(Selectors$2.TABINDEX, "0");
          link.addEventListener(Events$2.CLICK, _this4._handleClose);
        });

        this.captureFocus("".concat(this._activeDropdownAttr, " > ul"), {
          useArrows: true
        });
      }
    }, {
      key: "_handleFirstTabClose",
      value: function _handleFirstTabClose(event) {
        var shiftKey = event.which === KeyCodes$1.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes$1.TAB;

        if (shiftKey && tabKey) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleLastTabClose",
      value: function _handleLastTabClose(event) {
        var shiftKey = event.which === KeyCodes$1.SHIFT || event.shiftKey;
        var tabKey = event.which === KeyCodes$1.TAB;

        if (tabKey && !shiftKey) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_renderWithKeys",
      value: function _renderWithKeys(event) {
        if (event.which === KeyCodes$1.ARROW_UP || event.which === KeyCodes$1.ARROW_DOWN) {
          this._render(event, event.which);
        }
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        var _this5 = this;

        event.preventDefault();
        this.releaseFocus();

        this._activeDropdownButton.setAttribute(Selectors$2.ARIA_EXPANDED, "false");

        this._activeDropdown.setAttribute(Selectors$2.DATA_VISIBLE, "false");

        this._activeDropdownLinks.forEach(function (link) {
          link.setAttribute(Selectors$2.TABINDEX, "-1");
          link.removeEventListener(Events$2.CLICK, _this5._handleClose);
        });

        this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._handleClose);

        this._activeDropdownButton.addEventListener(Events$2.CLICK, this._render);

        document.removeEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);

        if (iOSMobile) {
          document.body.style.cursor = "auto";
        }

        document.removeEventListener(Events$2.CLICK, this._handleOffMenuClick);

        if (this._allowFocusReturn) {
          this._handleReturnFocus();
        }

        this._activeDropdownButton = null;
        this._activeDropdownId = null;
        this._activeDropdown = null;
      }
    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === KeyCodes$1.ESCAPE) {
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
        this._activeDropdownButton.setAttribute(Selectors$2.TAB_INDEX, "-1");

        this._activeDropdownButton.focus();

        this._activeDropdownButton.removeAttribute(Selectors$2.TAB_INDEX);
      }
    }, {
      key: "_getDropdownLinks",
      value: function _getDropdownLinks(attr) {
        return nodeListToArray("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown(dropdown) {
        var dropdownId = dropdown.getAttribute(Selectors$2.DATA_DROPDOWN);
        var dropdownAttr = "[".concat(Selectors$2.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
        var dropdownMenuItemsAttr = "".concat(dropdownAttr, " > ul > li");
        var dropdownMenu = document.querySelector("".concat(dropdownAttr, " > ul"));

        if (!dropdownMenu) {
          return console.error(Messages$1.NO_MENU_ERROR(dropdownAttr));
        }

        var dropdownButton = document.querySelector("".concat(dropdownAttr, " > ").concat(this._dropdownTargetAttr));
        dropdownButton.setAttribute(Selectors$2.ARIA_CONTROLS, dropdownMenu.id);
        dropdownButton.setAttribute(Selectors$2.ARIA_HASPOPUP, "true");
        dropdownButton.setAttribute(Selectors$2.ARIA_EXPANDED, "false");
        dropdownMenu.setAttribute(Selectors$2.ARIA_LABELLEDBY, dropdownButton.id);
        var dropdownMenuListItems = nodeListToArray(dropdownMenuItemsAttr);
        dropdownMenuListItems.forEach(function (item) {
          return item.setAttribute(Selectors$2.ROLE, "none");
        });

        var dropdownMenuButtons = this._getDropdownLinks(dropdownAttr);

        dropdownMenuButtons.forEach(function (link) {
          link.setAttribute(Selectors$2.ROLE, "menuitem");
          link.setAttribute(Selectors$2.TABINDEX, "-1");
        });
      }
    }]);

    return Dropdown;
  }(Utils);

  var KeyCodes$2 = {
    ESCAPE: 27
  };
  var Selectors$3 = {
    DATA_MODAL: "data-modal",
    DATA_MODAL_BUTTON: "data-modal-button",
    DATA_VISIBLE: "data-visible",
    DATA_CLOSE: "data-close",
    DATA_PARENT: "data-parent",
    ARIA_HIDDEN: "aria-hidden",
    ARIA_MODAL: "aria-modal",
    ROLE: "role",
    TABINDEX: "tabindex",
    NO_SCROLL: "no-scroll"
  };
  var Events$3 = {
    KEYDOWN: "keydown",
    CLICK: "click",
    RESIZE: "resize"
  };
  var Messages$2 = {
    NO_BUTTON_ID_ERROR: "Could not find an id on your [data-modal-button] element. Modal can't be opened.",
    NO_MODAL_ID_ERROR: "Could not detect an id on your [data-modal] element. Please add a value matching a button's [data-modal-button] attribute.",
    NO_MODAL_ERROR: function NO_MODAL_ERROR(id) {
      return "Could not find a [data-parent='".concat(id, "'] attribute within your [data-modal='").concat(id, "'] element.");
    }
  };

  var Modal = function (_Utils) {
    _inherits(Modal, _Utils);

    function Modal() {
      var _this;

      _classCallCheck(this, Modal);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Modal).call(this));
      _this._render = _this._render.bind(_assertThisInitialized(_this));
      _this._handleClose = _this._handleClose.bind(_assertThisInitialized(_this));
      _this._handleOverlayClick = _this._handleOverlayClick.bind(_assertThisInitialized(_this));
      _this._handleEscapeKeyPress = _this._handleEscapeKeyPress.bind(_assertThisInitialized(_this));
      _this._modals = [];
      _this._modalButtons = [];
      _this._activeModalButton = {};
      _this._activeModalOverlay = {};
      _this._activeModal = {};
      _this._activeModalId = "";
      _this._activeModalOverlayAttr = "";
      _this._activeModalSelector = "";
      _this._activeModalCloseButtons = [];
      _this._modalContainerAttr = "[".concat(Selectors$3.DATA_MODAL, "]");
      return _this;
    }

    _createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this._modals = nodeListToArray(this._modalContainerAttr);
        this._modalButtons = nodeListToArray("[".concat(Selectors$3.DATA_MODAL_BUTTON, "]"));
        getFocusableElements(this._modalContainerAttr).forEach(function (element) {
          element.setAttribute(Selectors$3.TABINDEX, "-1");
        });

        if (this._modals.length) {
          this._modals.forEach(function (instance) {
            _this2._setupModal(instance);
          });
        }

        if (this._modalButtons.length) {
          this._modalButtons.forEach(function (button) {
            button.addEventListener(Events$3.CLICK, _this2._render);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._modalButtons.forEach(function (button) {
          button.removeEventListener(Events$3.CLICK, _this3._render);
        });
      }
    }, {
      key: "_render",
      value: function _render(event) {
        var _this4 = this;

        event.preventDefault();
        this._activeModalButton = event.target;
        this._activeModalId = this._activeModalButton.getAttribute(Selectors$3.DATA_MODAL_BUTTON);

        if (!this._activeModalId) {
          return console.error(Messages$2.NO_BUTTON_ID_ERROR);
        }

        this._activeModalOverlay = document.querySelector("[".concat(Selectors$3.DATA_MODAL, "=\"").concat(this._activeModalId, "\"]"));
        this._activeModalSelector = "[".concat(Selectors$3.DATA_PARENT, "='").concat(this._activeModalId, "']");
        this._activeModal = this._activeModalOverlay.querySelector(this._activeModalSelector);
        this._activeModalCloseButtons = nodeListToArray("".concat(this._activeModalSelector, " [").concat(Selectors$3.DATA_CLOSE, "]"));
        getFocusableElements(this._activeModalSelector).forEach(function (element) {
          element.setAttribute(Selectors$3.TABINDEX, "0");
        });

        this._handleScrollStop();

        this.captureFocus(this._activeModalSelector);

        this._activeModalOverlay.setAttribute(Selectors$3.ARIA_HIDDEN, "false");

        this._activeModalOverlay.setAttribute(Selectors$3.DATA_VISIBLE, "true");

        this._activeModal.setAttribute(Selectors$3.TABINDEX, "-1");

        this._activeModal.focus();

        this._activeModalOverlay.scrollTop = 0;

        if (iOSMobile) {
          this._activeModalOverlay.style.cursor = "pointer";
        }

        document.addEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(Events$3.CLICK, this._handleOverlayClick);

        this._activeModalCloseButtons.forEach(function (button) {
          button.addEventListener(Events$3.CLICK, _this4._handleClose);
        });
      }
    }, {
      key: "_setupModal",
      value: function _setupModal(instance) {
        var modalId = instance.getAttribute(Selectors$3.DATA_MODAL);

        if (!modalId) {
          return console.error(Messages$2.NO_MODAL_ID_ERROR);
        }

        var modal = instance.querySelector("[".concat(Selectors$3.DATA_PARENT, "='").concat(modalId, "']"));

        if (!modal) {
          return console.error(Messages$2.NO_MODAL_ERROR(modalId));
        }

        var modalWrapper = document.querySelector("[".concat(Selectors$3.DATA_MODAL, "='").concat(modalId, "']"));
        modalWrapper.setAttribute(Selectors$3.ARIA_HIDDEN, "true");
        modalWrapper.setAttribute(Selectors$3.DATA_VISIBLE, "false");
        modal.setAttribute(Selectors$3.ARIA_MODAL, "true");
        modal.setAttribute(Selectors$3.ROLE, "dialog");
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        var _this5 = this;

        event.preventDefault();

        this._activeModalOverlay.setAttribute(Selectors$3.DATA_VISIBLE, "false");

        this._handleReturnFocus();

        this._handleScrollRestore();

        this.releaseFocus();

        this._activeModalOverlay.setAttribute(Selectors$3.ARIA_HIDDEN, "true");

        this._activeModal.removeAttribute(Selectors$3.TABINDEX);

        getFocusableElements(this._activeModalSelector).forEach(function (element) {
          element.setAttribute(Selectors$3.TABINDEX, "-1");
        });

        if (iOSMobile) {
          this._activeModalOverlay.style.cursor = "auto";
        }

        document.removeEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(Events$3.CLICK, this._handleOverlayClick);

        this._activeModalCloseButtons.forEach(function (button) {
          button.removeEventListener(Events$3.CLICK, _this5._handleClose);
        });

        this._activeModalId = null;
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
        if (event.which === KeyCodes$2.ESCAPE) {
          this._handleClose(event);
        }
      }
    }, {
      key: "_handleReturnFocus",
      value: function _handleReturnFocus() {
        this._activeModalButton.setAttribute(Selectors$3.TABINDEX, "-1");

        this._activeModalButton.focus();

        this._activeModalButton.removeAttribute(Selectors$3.TABINDEX);
      }
    }, {
      key: "_handleScrollRestore",
      value: function _handleScrollRestore() {
        document.body.classList.remove(Selectors$3.NO_SCROLL);
        document.documentElement.classList.remove(Selectors$3.NO_SCROLL);
      }
    }, {
      key: "_handleScrollStop",
      value: function _handleScrollStop() {
        document.body.classList.add(Selectors$3.NO_SCROLL);
        document.documentElement.classList.add(Selectors$3.NO_SCROLL);
      }
    }]);

    return Modal;
  }(Utils);

  var KeyCodes$3 = {
    ESCAPE: 27
  };
  var Selectors$4 = {
    DATA_TOOLTIP: "data-tooltip",
    DATA_VISIBLE: "data-visible",
    DATA_TARGET: "data-target",
    ROLE: "role",
    ARIA_DESCRIBEDBY: "aria-describedby",
    DROP_LEFT_CLASS: "is-drop-left",
    DROP_RIGHT_CLASS: "is-drop-right"
  };
  var Events$4 = {
    CLICK: "click",
    MOUSEOVER: "mouseover",
    MOUSEOUT: "mouseout",
    FOCUS: "focus",
    BLUR: "blur",
    KEYDOWN: "keydown"
  };
  var Messages$3 = {
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

        this._allTooltips = document.querySelectorAll("[".concat(Selectors$4.DATA_TOOLTIP, "]"));

        this._allTooltips.forEach(function (instance) {
          _this._setupTooltip(instance);
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this2 = this;

        this._allTooltips.forEach(function (instance) {
          var id = instance.getAttribute(Selectors$4.DATA_TOOLTIP);
          var trigger = instance.querySelector(_this2._getTrigger(id));
          trigger.removeEventListener(Events$4.MOUSEOVER, _this2._render);
          trigger.removeEventListener(Events$4.FOCUS, _this2._render);
        });
      }
    }, {
      key: "_render",
      value: function _render(event) {
        this._activeTrigger = event.target;

        var tooltipId = this._activeTrigger.getAttribute(Selectors$4.DATA_TARGET);

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
      value: function _handleClose() {
        this._hideTooltip();

        this._listenForOpen();

        this._activeTrigger = null;
        this._activeTooltip = null;
      }
    }, {
      key: "_showTooltip",
      value: function _showTooltip() {
        this._activeTooltip.setAttribute(Selectors$4.DATA_VISIBLE, "true");
      }
    }, {
      key: "_hideTooltip",
      value: function _hideTooltip() {
        this._activeTooltip.setAttribute(Selectors$4.DATA_VISIBLE, "false");
      }
    }, {
      key: "_listenForClose",
      value: function _listenForClose() {
        this._activeTrigger.removeEventListener(Events$4.MOUSEOVER, this._render);

        this._activeTrigger.removeEventListener(Events$4.FOCUS, this._render);

        this._activeTrigger.addEventListener(Events$4.MOUSEOUT, this._handleClose);

        this._activeTrigger.addEventListener(Events$4.BLUR, this._handleClose);

        document.addEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

        if (iOSMobile) {
          document.body.style.cursor = "pointer";
        }
      }
    }, {
      key: "_handleEscapeKeyPress",
      value: function _handleEscapeKeyPress(event) {
        if (event.which === KeyCodes$3.ESCAPE) {
          this._handleClose();
        }
      }
    }, {
      key: "_listenForOpen",
      value: function _listenForOpen() {
        this._activeTrigger.removeEventListener(Events$4.MOUSEOUT, this._handleClose);

        this._activeTrigger.removeEventListener(Events$4.BLUR, this._handleClose);

        this._activeTrigger.addEventListener(Events$4.MOUSEOVER, this._render);

        this._activeTrigger.addEventListener(Events$4.FOCUS, this._render);

        document.removeEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

        if (iOSMobile) {
          document.body.style.cursor = "auto";
        }
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
        var id = instance.getAttribute(Selectors$4.DATA_TOOLTIP);
        var trigger = instance.querySelector(this._getTrigger(id));
        var tooltip = document.getElementById(id);

        if (!id) {
          return console.error(Messages$3.NO_ID_ERROR);
        }

        if (!trigger) {
          return console.error(Messages$3.NO_TRIGGER_ERROR(id));
        }

        if (!tooltip) {
          return console.error(Messages$3.NO_TOOLTIP_ERROR(id));
        }

        trigger.setAttribute(Selectors$4.ARIA_DESCRIBEDBY, id);
        tooltip.setAttribute(Selectors$4.ROLE, "tooltip");
        trigger.addEventListener(Events$4.MOUSEOVER, this._render);
        trigger.addEventListener(Events$4.FOCUS, this._render);
      }
    }, {
      key: "_getTrigger",
      value: function _getTrigger(id) {
        return "[".concat(Selectors$4.DATA_TARGET, "=\"").concat(id, "\"]");
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
        return classes.contains(Selectors$4.DROP_LEFT_CLASS) || classes.contains(Selectors$4.DROP_RIGHT_CLASS);
      }
    }]);

    return Tooltip;
  }();

  var Accordions = new Accordion();
  var Dropdowns = new Dropdown();
  var Modals = new Modal();
  var Tooltips = new Tooltip();
  var Utils$1 = new Utils();
  var Undernet = {
    Modals: Modals,
    Accordions: Accordions,
    Dropdowns: Dropdowns,
    Tooltips: Tooltips,
    Utils: Utils$1
  };

  Undernet.start = function () {
    Undernet.Modals.start();
    Undernet.Accordions.start();
    Undernet.Dropdowns.start();
    Undernet.Tooltips.start();
    Undernet.Utils.enableFocusOutline();
  };

  Undernet.stop = function () {
    Undernet.Modals.stop();
    Undernet.Accordions.stop();
    Undernet.Dropdowns.stop();
    Undernet.Utils.disableFocusOutline();
  };

  window.Undernet = Undernet;

  exports.Undernet = Undernet;
  exports.Modals = Modals;
  exports.Accordions = Accordions;
  exports.Dropdowns = Dropdowns;
  exports.Tooltips = Tooltips;
  exports.Utils = Utils$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=undernet.bundle.js.map
