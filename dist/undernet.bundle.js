/*!
  * @license MIT (https://github.com/geotrev/undernet/blob/master/LICENSE)
  * Undernet v4.4.1 (https://undernet.io)
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var KeyCodes = {
    SHIFT: 16,
    TAB: 9,
    ARROW_UP: 38,
    ARROW_DOWN: 40
  };
  var Selectors = {
    FOCUSABLE_TAGS: ["a", "button", "input", "object", "select", "textarea", "[tabindex]"],
    KEYBOARD_CLASS: "using-keyboard",
    NOT_VISUALLY_HIDDEN_CLASS: ":not(.is-visually-hidden)"
  };
  var Events = {
    KEYDOWN: "keydown",
    CLICK: "click"
  };
  var dom = {
    attr: function attr(element, _attr, newValue) {
      if (newValue === false) {
        return element.removeAttribute(_attr);
      }

      if (typeof newValue === "string" || newValue === null) {
        return element.setAttribute(_attr, newValue);
      }

      return element.getAttribute(_attr);
    },
    hasAttr: function hasAttr(element, attr) {
      return element.hasAttribute(attr);
    },
    find: function find(selector) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      return parent.querySelector(selector);
    },
    findAll: function findAll(selector) {
      var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
      return _toConsumableArray(parent.querySelectorAll(selector));
    },
    css: function css(element, property, value) {
      if (typeof value === "string" || value === null) {
        return element.style[property] = value;
      }

      return element.style[property];
    },
    addClass: function addClass(element) {
      var _element$classList;

      for (var _len = arguments.length, classes = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        classes[_key - 1] = arguments[_key];
      }

      return (_element$classList = element.classList).add.apply(_element$classList, classes);
    },
    removeClass: function removeClass(element) {
      var _element$classList2;

      for (var _len2 = arguments.length, classes = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        classes[_key2 - 1] = arguments[_key2];
      }

      return (_element$classList2 = element.classList).remove.apply(_element$classList2, classes);
    },
    hasClass: function hasClass(element) {
      for (var _len3 = arguments.length, classes = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        classes[_key3 - 1] = arguments[_key3];
      }

      if (classes.length) {
        return classes.filter(function (cls) {
          return element.classList.contains(cls);
        }).length;
      }

      return element.classList.contains(classes[0]);
    }
  };
  var getFocusableElements = function getFocusableElements(container) {
    var focusables = Selectors.FOCUSABLE_TAGS.map(function (element) {
      return "".concat(container, " ").concat(element).concat(Selectors.NOT_VISUALLY_HIDDEN_CLASS);
    }).join(", ");
    return dom.findAll(focusables);
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
      value: function _listenForKeyboard() {
        document.body.classList.add(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.KEYDOWN, this._listenForKeyboard);
        document.addEventListener(Events.CLICK, this._listenForClick);
        this._listeningForKeydown = false;
      }
    }, {
      key: "_listenForClick",
      value: function _listenForClick() {
        document.body.classList.remove(Selectors.KEYBOARD_CLASS);
        document.removeEventListener(Events.CLICK, this._listenForClick);
        document.addEventListener(Events.KEYDOWN, this._listenForKeyboard);
        this._listeningForKeydown = true;
      }
    }, {
      key: "_handleFocusTrapWithTab",
      value: function _handleFocusTrapWithTab(event) {
        var containerElement = dom.find(this._focusContainerSelector);
        var containerActive = document.activeElement === containerElement;
        var firstActive = document.activeElement === this._focusableFirstChild;
        var lastActive = document.activeElement === this._focusableLastChild;
        var tabKey = event.which === KeyCodes.TAB;
        var shiftKey = event.which === KeyCodes.SHIFT || event.shiftKey;
        var hasShift = shiftKey && tabKey;
        var noShift = !shiftKey && tabKey;

        if (hasShift && (firstActive || containerActive)) {
          event.preventDefault();

          this._focusableLastChild.focus();
        } else if (noShift && lastActive) {
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
      return "Could not find accordion row with [data-visible] attribute associated with [data-target='".concat(id, "'].");
    },
    NO_ROW_ERROR: function NO_ROW_ERROR(id) {
      return "Could not find [data-accordion-row] associated with [data-target='".concat(id, "'].");
    },
    NO_HEADER_ID_ERROR: function NO_HEADER_ID_ERROR(attr) {
      return "Could not find an id on your header associated with ".concat(attr, ".");
    },
    NO_ACCORDION_ID_ERROR: function NO_ACCORDION_ID_ERROR(id) {
      return "Could not find [data-accordion] attribute associated with [data-target='".concat(id, "'].");
    },
    NO_CONTENT_ERROR: function NO_CONTENT_ERROR(id) {
      return "Could not find accordion content block with id '".concat(id, "'; should match trigger with [data-target='").concat(id, "'].");
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
      _this._headers = ["h1", "h2", "h3", "h4", "h5", "h6"];
      return _this;
    }

    _createClass(Accordion, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        var accordionButtonSelector = this._getAccordionButtonSelector("[".concat(Selectors$1.DATA_ACCORDION, "]"));

        this._accordionButtons = dom.findAll(accordionButtonSelector);

        if (this._accordionButtons.length) {
          this._accordionButtons.forEach(function (instance) {
            _this2._setup(instance);

            instance.addEventListener(Events$1.CLICK, _this2._render);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._accordionButtons.forEach(function (instance) {
          instance.removeEventListener(Events$1.CLICK, _this3._render);
        });
      }
    }, {
      key: "_setup",
      value: function _setup(instance) {
        var buttonTargetId = dom.attr(instance, Selectors$1.DATA_TARGET);
        var accordionId = dom.attr(instance, Selectors$1.DATA_PARENT);
        var buttonContent = dom.find("#".concat(buttonTargetId));

        if (!accordionId) {
          throw new Error(Messages.NO_ACCORDION_ID_ERROR(buttonTargetId));
        }

        if (!buttonContent) {
          throw new Error(Messages.NO_CONTENT_ERROR(buttonTargetId));
        }

        var accordionRowAttr = this._getAccordionRowAttr(buttonTargetId);

        var accordionRow = dom.find(accordionRowAttr);

        if (!accordionRow) {
          throw new Error(Messages.NO_ROW_ERROR(buttonTargetId));
        }

        var buttonId = instance.id;

        if (!buttonId) {
          throw new Error(Messages.NO_HEADER_ID_ERROR(accordionRowAttr));
        }

        var buttonContentChildren = getFocusableElements("#".concat(buttonContent.id));
        dom.attr(instance, Selectors$1.ARIA_CONTROLS, buttonTargetId);
        dom.attr(buttonContent, Selectors$1.ARIA_LABELLEDBY, buttonId);
        var contentShouldExpand = dom.attr(accordionRow, Selectors$1.DATA_VISIBLE);

        if (!contentShouldExpand) {
          throw new Error(Messages.NO_VISIBLE_ERROR(buttonTargetId));
        }

        if (contentShouldExpand === "true") {
          dom.css(buttonContent, "maxHeight", "".concat(buttonContent.scrollHeight, "px"));
          dom.attr(instance, Selectors$1.ARIA_EXPANDED, "true");
          dom.attr(buttonContent, Selectors$1.ARIA_HIDDEN, "false");
          buttonContentChildren.forEach(function (element) {
            dom.attr(element, Selectors$1.TABINDEX, "0");
          });
        } else {
          dom.attr(instance, Selectors$1.ARIA_EXPANDED, "false");
          dom.attr(buttonContent, Selectors$1.ARIA_HIDDEN, "true");
          buttonContentChildren.forEach(function (element) {
            dom.attr(element, Selectors$1.TABINDEX, "-1");
          });
        }
      }
    }, {
      key: "_render",
      value: function _render(event) {
        event.preventDefault();
        this._activeButton = event.target;

        this._setIds();

        this._setActiveRow();

        this._setActiveContainer();

        this._setActiveContent();

        this._setVisibleState();

        var canExpandMultiple = dom.hasAttr(this._activeContainer, Selectors$1.DATA_TOGGLE_MULTIPLE);
        if (!canExpandMultiple) this._closeAllIfToggleable();

        this._toggleSelectedAccordion();

        this._activeRow = null;
        this._activeButton = null;
        this._activeContent = null;
        this._activeContainer = null;
      }
    }, {
      key: "_setActiveContent",
      value: function _setActiveContent() {
        this._activeContent = dom.find("#".concat(this._activeAccordionRowId));
      }
    }, {
      key: "_setVisibleState",
      value: function _setVisibleState() {
        var accordionButtonState = dom.attr(this._activeRow, Selectors$1.DATA_VISIBLE);
        this._nextButtonExpandState = accordionButtonState === "true" ? "false" : "true";
        this._nextContentHiddenState = this._nextButtonExpandState === "false" ? "true" : "false";
      }
    }, {
      key: "_setIds",
      value: function _setIds() {
        this._activeContainerId = dom.attr(this._activeButton, Selectors$1.DATA_PARENT);
        this._activeAccordionRowId = dom.attr(this._activeButton, Selectors$1.DATA_TARGET);
      }
    }, {
      key: "_setActiveContainer",
      value: function _setActiveContainer() {
        this._activeContainerAttr = "[".concat(Selectors$1.DATA_ACCORDION, "='").concat(this._activeContainerId, "']");
        this._activeContainer = dom.find(this._activeContainerAttr);
      }
    }, {
      key: "_setActiveRow",
      value: function _setActiveRow() {
        this._activeRowAttr = this._getAccordionRowAttr(this._activeAccordionRowId);
        this._activeRow = dom.find(this._activeRowAttr);
      }
    }, {
      key: "_getAccordionButtonSelector",
      value: function _getAccordionButtonSelector(attr) {
        return this._headers.map(function (header) {
          return "".concat(attr, " > [").concat(Selectors$1.DATA_ACCORDION_ROW, "] > ").concat(header, " [").concat(Selectors$1.DATA_TARGET, "]");
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

        var allContentAttr = "".concat(this._activeContainerAttr, " > [").concat(Selectors$1.DATA_ACCORDION_ROW, "] > [").concat(Selectors$1.ARIA_HIDDEN, "]");
        var allContent = dom.findAll(allContentAttr);

        var accordionButtonSelector = this._getAccordionButtonSelector(this._activeContainerAttr);

        var allButtons = dom.findAll(accordionButtonSelector);
        var allRows = dom.findAll("".concat(this._activeContainerAttr, " > [").concat(Selectors$1.DATA_ACCORDION_ROW, "]"));
        allContent.filter(function (content) {
          return content !== _this4._activeContent;
        }).forEach(function (content) {
          return dom.css(content, "maxHeight", null);
        });
        getFocusableElements(allContentAttr).forEach(function (element) {
          element.setAttribute(Selectors$1.TABINDEX, "-1");
        });

        this._toggleAttributeInCollection(allRows, Selectors$1.DATA_VISIBLE, "false");

        this._toggleAttributeInCollection(allButtons, Selectors$1.ARIA_EXPANDED, "false");

        this._toggleAttributeInCollection(allContent, Selectors$1.ARIA_HIDDEN, "true");
      }
    }, {
      key: "_toggleSelectedAccordion",
      value: function _toggleSelectedAccordion() {
        var _this5 = this;

        dom.attr(this._activeRow, Selectors$1.DATA_VISIBLE, this._nextButtonExpandState);
        dom.attr(this._activeButton, Selectors$1.ARIA_EXPANDED, this._nextButtonExpandState);
        dom.attr(this._activeContent, Selectors$1.ARIA_HIDDEN, this._nextContentHiddenState);
        getFocusableElements("#".concat(this._activeAccordionRowId)).forEach(function (element) {
          var value = _this5._nextButtonExpandState === "true" ? "0" : "-1";
          dom.attr(element, Selectors$1.TABINDEX, value);
        });

        if (dom.css(this._activeContent, "maxHeight")) {
          dom.css(this._activeContent, "maxHeight", null);
        } else {
          dom.css(this._activeContent, "maxHeight", "".concat(this._activeContent.scrollHeight, "px"));
        }
      }
    }, {
      key: "_toggleAttributeInCollection",
      value: function _toggleAttributeInCollection(elements, attributeName, newValue) {
        elements.forEach(function (element) {
          return dom.attr(element, attributeName, newValue);
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
    NO_DROPDOWN_ID_ERROR: "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value.",
    NO_MENU_ERROR: function NO_MENU_ERROR(attr) {
      return "Could not find menu associated with ".concat(attr, ".");
    },
    NO_DROPDOWN_ITEMS_ERROR: function NO_DROPDOWN_ITEMS_ERROR(attr) {
      return "Could not find any list items associated with ".concat(attr, ".");
    },
    NO_DROPDOWN_BUTTONS_ERROR: function NO_DROPDOWN_BUTTONS_ERROR(attr) {
      return "Could not find any button or anchor elements associated with ".concat(attr, ".");
    },
    NO_PARENT_ERROR: "Could not find dropdown button's [data-parent] attribute."
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
      _this._activeDropdown = {};
      _this._activeDropdownButton = null;
      _this._activeDropdownMenu = {};
      _this._activeDropdownLinks = [];
      _this._allowFocusReturn = true;
      _this._activeDropdownId = "";
      _this._activeDropdownAttr = "";
      _this._activeDropdownMenuId = "";
      _this._firstDropdownLink = {};
      _this._lastDropdownLink = {};
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

        this._dropdowns = dom.findAll("".concat(this._dropdownContainerAttr));
        this._dropdownButtons = dom.findAll("".concat(this._dropdownContainerAttr, " > ").concat(this._dropdownTargetAttr));

        if (this._dropdowns.length) {
          this._dropdowns.forEach(function (instance) {
            return _this2._setup(instance);
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
      key: "_setup",
      value: function _setup(instance) {
        var dropdownId = instance.getAttribute(Selectors$2.DATA_DROPDOWN);

        if (!dropdownId) {
          throw new Error(Messages$1.NO_DROPDOWN_ID_ERROR);
        }

        var dropdownAttr = "[".concat(Selectors$2.DATA_DROPDOWN, "=\"").concat(dropdownId, "\"]");
        var dropdownButton = dom.find("".concat(dropdownAttr, " > ").concat(this._dropdownTargetAttr));

        if (!dom.attr(dropdownButton, Selectors$2.DATA_PARENT)) {
          throw new Error(Messages$1.NO_PARENT_ERROR);
        }

        var dropdownMenu = dom.find("".concat(dropdownAttr, " > ul"));

        if (!dropdownMenu) {
          throw new Error(Messages$1.NO_MENU_ERROR(dropdownAttr));
        }

        dom.attr(dropdownMenu, Selectors$2.ARIA_LABELLEDBY, dropdownButton.id);
        dom.attr(dropdownButton, Selectors$2.ARIA_CONTROLS, dropdownMenu.id);
        dom.attr(dropdownButton, Selectors$2.ARIA_HASPOPUP, "true");
        dom.attr(dropdownButton, Selectors$2.ARIA_EXPANDED, "false");
        var dropdownMenuItemsAttr = "".concat(dropdownAttr, " > ul > li");
        var dropdownMenuListItems = dom.findAll(dropdownMenuItemsAttr);

        if (!dropdownMenuListItems.length) {
          throw new Error(Messages$1.NO_DROPDOWN_ITEMS_ERROR(dropdownAttr));
        }

        dropdownMenuListItems.forEach(function (item) {
          return dom.attr(item, Selectors$2.ROLE, "none");
        });

        var dropdownMenuButtons = this._getDropdownLinks(dropdownAttr);

        if (!dropdownMenuButtons.length) {
          throw new Error(Messages$1.NO_DROPDOWN_BUTTONS_ERROR(dropdownAttr));
        }

        dropdownMenuButtons.forEach(function (link) {
          dom.attr(link, Selectors$2.ROLE, "menuitem");
          dom.attr(link, Selectors$2.TABINDEX, "-1");
        });
      }
    }, {
      key: "_render",
      value: function _render(event, key) {
        event.preventDefault();
        event.stopPropagation();

        this._handleOpenDropdown(event);

        this._activeDropdownButton = event.target;

        this._setActiveDropdownId();

        this._setActiveDropdown();

        this._setActiveDropdownMenu();

        this._setVisibleState();

        this._listenToClose();

        this._startEvents();

        if (key && key === KeyCodes$1.ARROW_UP) {
          this._lastDropdownLink.focus();
        } else {
          this._firstDropdownLink.focus();
        }

        if (iOSMobile) dom.css(document.body, "cursor", "pointer");
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        event.preventDefault();
        if (iOSMobile) dom.css(document.body, "cursor", "auto");
        this.releaseFocus();

        this._handleHideState();

        this._listenToRender();

        this._stopEvents();

        if (this._allowFocusReturn) {
          this._handleReturnFocus();
        }

        this._activeDropdownButton = null;
        this._activeDropdownId = null;
        this._activeDropdown = null;
      }
    }, {
      key: "_listenToRender",
      value: function _listenToRender() {
        this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._handleClose);

        this._activeDropdownButton.addEventListener(Events$2.CLICK, this._render);
      }
    }, {
      key: "_handleHideState",
      value: function _handleHideState() {
        var _this4 = this;

        dom.attr(this._activeDropdownButton, Selectors$2.ARIA_EXPANDED, "false");
        dom.attr(this._activeDropdown, Selectors$2.DATA_VISIBLE, "false");

        this._activeDropdownLinks.forEach(function (link) {
          dom.attr(link, Selectors$2.TABINDEX, "-1");
          link.removeEventListener(Events$2.CLICK, _this4._handleClose);
        });
      }
    }, {
      key: "_stopEvents",
      value: function _stopEvents() {
        document.removeEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(Events$2.CLICK, this._handleOffMenuClick);
      }
    }, {
      key: "_setActiveDropdownId",
      value: function _setActiveDropdownId() {
        this._activeDropdownId = dom.attr(this._activeDropdownButton, Selectors$2.DATA_PARENT);
      }
    }, {
      key: "_startEvents",
      value: function _startEvents() {
        var _this5 = this;

        document.addEventListener(Events$2.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(Events$2.CLICK, this._handleOffMenuClick);
        this._activeDropdownLinks = this._getDropdownLinks(this._activeDropdownAttr);
        this._firstDropdownLink = this._activeDropdownLinks[0];
        this._lastDropdownLink = this._activeDropdownLinks[this._activeDropdownLinks.length - 1];

        this._firstDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleFirstTabClose);

        this._lastDropdownLink.addEventListener(Events$2.KEYDOWN, this._handleLastTabClose);

        this._activeDropdownLinks.forEach(function (link) {
          dom.attr(link, Selectors$2.TABINDEX, "0");
          link.addEventListener(Events$2.CLICK, _this5._handleClose);
        });

        this.captureFocus("".concat(this._activeDropdownAttr, " > ul"), {
          useArrows: true
        });
      }
    }, {
      key: "_listenToClose",
      value: function _listenToClose() {
        this._activeDropdownButton.removeEventListener(Events$2.CLICK, this._render);

        this._activeDropdownButton.addEventListener(Events$2.CLICK, this._handleClose);
      }
    }, {
      key: "_setVisibleState",
      value: function _setVisibleState() {
        dom.attr(this._activeDropdownButton, Selectors$2.ARIA_EXPANDED, "true");
        dom.attr(this._activeDropdown, Selectors$2.DATA_VISIBLE, "true");
      }
    }, {
      key: "_setActiveDropdownMenu",
      value: function _setActiveDropdownMenu() {
        this._activeDropdownMenuId = dom.attr(this._activeDropdownButton, Selectors$2.DATA_TARGET);
        this._activeDropdownMenu = dom.find("#".concat(this._activeDropdownMenuId));
      }
    }, {
      key: "_setActiveDropdown",
      value: function _setActiveDropdown() {
        this._activeDropdownAttr = "[".concat(Selectors$2.DATA_DROPDOWN, "=\"").concat(this._activeDropdownId, "\"]");
        this._activeDropdown = dom.find(this._activeDropdownAttr);
      }
    }, {
      key: "_handleOpenDropdown",
      value: function _handleOpenDropdown(event) {
        if (!this._activeDropdownButton) return;
        this._allowFocusReturn = false;

        this._handleClose(event);

        this._allowFocusReturn = true;
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
        dom.attr(this._activeDropdownButton, Selectors$2.TAB_INDEX, "-1");

        this._activeDropdownButton.focus();

        dom.attr(this._activeDropdownButton, Selectors$2.TAB_INDEX, false);
      }
    }, {
      key: "_getDropdownLinks",
      value: function _getDropdownLinks(attr) {
        return dom.findAll("".concat(attr, " > ul > li > a, ").concat(attr, " > ul > li > button"));
      }
    }]);

    return Dropdown;
  }(Utils);

  var KeyCodes$2 = {
    ESCAPE: 27
  };
  var Selectors$3 = {
    DATA_MODAL: "data-modal",
    DATA_TARGET: "data-target",
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
    NO_BUTTON_ERROR: function NO_BUTTON_ERROR(id) {
      return "Could not find modal trigger with id ".concat(id, ".");
    },
    NO_MODAL_ID_ERROR: "Could not detect an id on your [data-modal] element. Please add a value matching the modal trigger's [data-parent] attribute.",
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
      _this._activeModalSelector = "";
      _this._activeModalCloseButtons = [];
      _this._originalPagePaddingRight = "";
      _this._scrollbarOffset = 0;
      _this._modalContainerAttr = "[".concat(Selectors$3.DATA_MODAL, "]");
      return _this;
    }

    _createClass(Modal, [{
      key: "start",
      value: function start() {
        var _this2 = this;

        this._modals = dom.findAll(this._modalContainerAttr);
        getFocusableElements(this._modalContainerAttr).forEach(function (element) {
          dom.attr(element, Selectors$3.TABINDEX, "-1");
        });

        if (this._modals.length) {
          this._modals.forEach(function (instance) {
            _this2._setup(instance);
          });
        }
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this3 = this;

        this._modals.forEach(function (instance) {
          var id = dom.attr(instance, Selectors$3.DATA_MODAL);
          var button = dom.find("[".concat(Selectors$3.DATA_TARGET, "='").concat(id, "']"));

          if (!button) {
            throw new Error(Messages$2.NO_BUTTON_ERROR(id));
          }

          button.removeEventListener(Events$3.CLICK, _this3._render);
        });
      }
    }, {
      key: "_setup",
      value: function _setup(instance) {
        var modalId = dom.attr(instance, Selectors$3.DATA_MODAL);

        if (!modalId) {
          throw new Error(Messages$2.NO_MODAL_ID_ERROR);
        }

        var modal = dom.find("[".concat(Selectors$3.DATA_PARENT, "='").concat(modalId, "']"), instance);

        if (!modal) {
          throw new Error(Messages$2.NO_MODAL_ERROR(modalId));
        }

        var modalWrapper = dom.find("[".concat(Selectors$3.DATA_MODAL, "='").concat(modalId, "']"));
        dom.attr(modalWrapper, Selectors$3.ARIA_HIDDEN, "true");
        dom.attr(modalWrapper, Selectors$3.DATA_VISIBLE, "false");
        dom.attr(modal, Selectors$3.ARIA_MODAL, "true");
        dom.attr(modal, Selectors$3.ROLE, "dialog");
        var modalButton = dom.find("[".concat(Selectors$3.DATA_TARGET, "='").concat(modalId, "']"));

        if (!modalButton) {
          throw new Error(Messages$2.NO_BUTTON_ERROR(modalId));
        }

        modalButton.addEventListener(Events$3.CLICK, this._render);
      }
    }, {
      key: "_render",
      value: function _render(event) {
        event.preventDefault();
        this._activeModalButton = event.target;

        this._setActiveModalId();

        this._setActiveModalOverlay();

        this._setActiveModal();

        this._enableFocusOnChildren();

        this._handleScrollbarOffset();

        this._handleScrollStop();

        this.captureFocus(this._activeModalSelector);

        this._setAttributes();

        this._setCloseButtons();

        this._handleModalFocus();

        this._activeModalOverlay.scrollTop = 0;

        this._startEvents();
      }
    }, {
      key: "_handleClose",
      value: function _handleClose(event) {
        event.preventDefault();

        this._stopEvents();

        this._handleReturnFocus();

        this._removeAttributes();

        this.releaseFocus();

        this._handleScrollRestore();

        this._removeScrollbarOffset();

        this._disableFocusOnChildren();

        if (iOSMobile) dom.css(this._activeModalOverlay, "cursor", "auto");
        this._activeModalId = null;
        this._activeModalButton = null;
        this._activeModal = null;
      }
    }, {
      key: "_setCloseButtons",
      value: function _setCloseButtons() {
        this._activeModalCloseButtons = dom.findAll("".concat(this._activeModalSelector, " [").concat(Selectors$3.DATA_CLOSE, "]"));
      }
    }, {
      key: "_setActiveModalId",
      value: function _setActiveModalId() {
        this._activeModalId = dom.attr(this._activeModalButton, Selectors$3.DATA_TARGET);
      }
    }, {
      key: "_setActiveModalOverlay",
      value: function _setActiveModalOverlay() {
        this._activeModalOverlay = dom.find("[".concat(Selectors$3.DATA_MODAL, "='").concat(this._activeModalId, "']"));
      }
    }, {
      key: "_removeAttributes",
      value: function _removeAttributes() {
        dom.attr(this._activeModalOverlay, Selectors$3.DATA_VISIBLE, "false");
        dom.attr(this._activeModalOverlay, Selectors$3.ARIA_HIDDEN, "true");
        dom.attr(this._activeModal, Selectors$3.TABINDEX, false);
      }
    }, {
      key: "_disableFocusOnChildren",
      value: function _disableFocusOnChildren() {
        getFocusableElements(this._activeModalSelector).forEach(function (element) {
          dom.attr(element, Selectors$3.TABINDEX, "-1");
        });
      }
    }, {
      key: "_stopEvents",
      value: function _stopEvents() {
        var _this4 = this;

        document.removeEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.removeEventListener(Events$3.CLICK, this._handleOverlayClick);

        this._activeModalCloseButtons.forEach(function (button) {
          button.removeEventListener(Events$3.CLICK, _this4._handleClose);
        });
      }
    }, {
      key: "_setActiveModal",
      value: function _setActiveModal() {
        this._activeModalSelector = "[".concat(Selectors$3.DATA_PARENT, "='").concat(this._activeModalId, "']");
        this._activeModal = dom.find(this._activeModalSelector, this._activeModalOverlay);
      }
    }, {
      key: "_setAttributes",
      value: function _setAttributes() {
        dom.attr(this._activeModalOverlay, Selectors$3.ARIA_HIDDEN, "false");
        dom.attr(this._activeModalOverlay, Selectors$3.DATA_VISIBLE, "true");
        if (iOSMobile) dom.css(this._activeModalOverlay, "cursor", "pointer");
      }
    }, {
      key: "_startEvents",
      value: function _startEvents() {
        var _this5 = this;

        document.addEventListener(Events$3.KEYDOWN, this._handleEscapeKeyPress);
        document.addEventListener(Events$3.CLICK, this._handleOverlayClick);

        this._activeModalCloseButtons.forEach(function (button) {
          button.addEventListener(Events$3.CLICK, _this5._handleClose);
        });
      }
    }, {
      key: "_handleModalFocus",
      value: function _handleModalFocus() {
        dom.attr(this._activeModal, Selectors$3.TABINDEX, "-1");

        this._activeModal.focus();
      }
    }, {
      key: "_enableFocusOnChildren",
      value: function _enableFocusOnChildren() {
        getFocusableElements(this._activeModalSelector).forEach(function (element) {
          element.setAttribute(Selectors$3.TABINDEX, "0");
        });
      }
    }, {
      key: "_getScrollbarOffset",
      value: function _getScrollbarOffset() {
        return window.innerWidth - document.body.getBoundingClientRect().right;
      }
    }, {
      key: "_handleScrollbarOffset",
      value: function _handleScrollbarOffset() {
        if (!this._scrollbarIsVisible()) return;
        this._scrollbarOffset = this._getScrollbarOffset();
        this._originalPagePaddingRight = dom.css(document.body, "paddingRight");
        dom.css(document.body, "paddingRight", "".concat(this._scrollbarOffset, "px"));
      }
    }, {
      key: "_scrollbarIsVisible",
      value: function _scrollbarIsVisible() {
        if (typeof window.innerWidth === "number") {
          return window.innerWidth > document.body.getBoundingClientRect().right;
        }
      }
    }, {
      key: "_removeScrollbarOffset",
      value: function _removeScrollbarOffset() {
        var _this6 = this;

        var originalPadding = this._originalPagePaddingRight;
        dom.css(this._activeModalOverlay, "paddingLeft", "".concat(this._scrollbarOffset, "px"));
        setTimeout(function () {
          return dom.css(_this6._activeModalOverlay, "paddingLeft", "");
        }, 500);

        if (originalPadding) {
          dom.css(document.body, "paddingRight", "".concat(originalPadding, "px"));
        } else {
          dom.css(document.body, "paddingRight", "");
        }
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
        dom.attr(this._activeModalButton, Selectors$3.TABINDEX, "-1");

        this._activeModalButton.focus();

        dom.attr(this._activeModalButton, Selectors$3.TABINDEX, false);
      }
    }, {
      key: "_handleScrollRestore",
      value: function _handleScrollRestore() {
        dom.removeClass(document.body, Selectors$3.NO_SCROLL);
        dom.removeClass(document.documentElement, Selectors$3.NO_SCROLL);
      }
    }, {
      key: "_handleScrollStop",
      value: function _handleScrollStop() {
        dom.addClass(document.body, Selectors$3.NO_SCROLL);
        dom.addClass(document.documentElement, Selectors$3.NO_SCROLL);
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

        this._allTooltips = dom.findAll("[".concat(Selectors$4.DATA_TOOLTIP, "]"));

        this._allTooltips.forEach(function (instance) {
          _this._setup(instance);
        });
      }
    }, {
      key: "stop",
      value: function stop() {
        var _this2 = this;

        this._allTooltips.forEach(function (instance) {
          var id = dom.attr(instance, Selectors$4.DATA_TOOLTIP);
          var trigger = dom.find(_this2._getTrigger(id), instance);

          if (_this2._activeTooltip || _this2._activeTrigger) {
            _this2._handleClose();
          }

          trigger.removeEventListener(Events$4.MOUSEOVER, _this2._render);
          trigger.removeEventListener(Events$4.FOCUS, _this2._render);
        });
      }
    }, {
      key: "_setup",
      value: function _setup(instance) {
        var tooltipId = dom.attr(instance, Selectors$4.DATA_TOOLTIP);

        if (!tooltipId) {
          throw new Error(Messages$3.NO_ID_ERROR);
        }

        var trigger = dom.find(this._getTrigger(tooltipId), instance);
        var tooltip = dom.find("#".concat(tooltipId), instance);

        if (!trigger) {
          throw new Error(Messages$3.NO_TRIGGER_ERROR(tooltipId));
        }

        if (!tooltip) {
          throw new Error(Messages$3.NO_TOOLTIP_ERROR(tooltipId));
        }

        dom.attr(trigger, Selectors$4.ARIA_DESCRIBEDBY, tooltipId);
        dom.attr(tooltip, Selectors$4.ROLE, "tooltip");
        trigger.addEventListener(Events$4.MOUSEOVER, this._render);
        trigger.addEventListener(Events$4.FOCUS, this._render);
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
        dom.attr(this._activeTooltip, Selectors$4.DATA_VISIBLE, "true");
      }
    }, {
      key: "_setHideState",
      value: function _setHideState() {
        dom.attr(this._activeTooltip, Selectors$4.DATA_VISIBLE, "false");
      }
    }, {
      key: "_startCloseEvents",
      value: function _startCloseEvents() {
        this._activeTrigger.removeEventListener(Events$4.MOUSEOVER, this._render);

        this._activeTrigger.removeEventListener(Events$4.FOCUS, this._render);

        this._activeTrigger.addEventListener(Events$4.MOUSEOUT, this._handleClose);

        this._activeTrigger.addEventListener(Events$4.BLUR, this._handleClose);

        document.addEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);

        if (iOSMobile) {
          dom.css(document.body, "cursor", "pointer");
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
      key: "_startOpenEvents",
      value: function _startOpenEvents() {
        this._activeTrigger.removeEventListener(Events$4.MOUSEOUT, this._handleClose);

        this._activeTrigger.removeEventListener(Events$4.BLUR, this._handleClose);

        this._activeTrigger.addEventListener(Events$4.MOUSEOVER, this._render);

        this._activeTrigger.addEventListener(Events$4.FOCUS, this._render);

        document.removeEventListener(Events$4.KEYDOWN, this._handleEscapeKeyPress);
        if (iOSMobile) dom.css(document.body, "cursor", "auto");
      }
    }, {
      key: "_alignTooltip",
      value: function _alignTooltip(property) {
        var triggerSize = this._getSize(this._activeTrigger, property);

        var tooltipSize = this._getSize(this._activeTooltip, property);

        var triggerIsBigger = triggerSize > tooltipSize;
        var offset = triggerIsBigger ? (triggerSize - tooltipSize) / 2 : (tooltipSize - triggerSize) / -2;

        if (property === "height") {
          dom.css(this._activeTooltip, "top", "".concat(offset, "px"));
        } else {
          dom.css(this._activeTooltip, "left", "".concat(offset, "px"));
        }
      }
    }, {
      key: "_getTrigger",
      value: function _getTrigger(id) {
        return "[".concat(Selectors$4.DATA_TARGET, "=\"").concat(id, "\"]");
      }
    }, {
      key: "_getSize",
      value: function _getSize(element, property) {
        return Math.floor(element.getBoundingClientRect()[property]);
      }
    }, {
      key: "_isLeftOrRight",
      value: function _isLeftOrRight() {
        return dom.hasClass(this._activeTooltip, Selectors$4.DROP_LEFT_CLASS, Selectors$4.DROP_RIGHT_CLASS);
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

  exports.Accordions = Accordions;
  exports.Dropdowns = Dropdowns;
  exports.Modals = Modals;
  exports.Tooltips = Tooltips;
  exports.Undernet = Undernet;
  exports.Utils = Utils$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=undernet.bundle.js.map
