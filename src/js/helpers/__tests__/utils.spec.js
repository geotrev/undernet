import {
  TestComponent,
  GoodExtendedComponent,
  BadExtendedComponent,
} from "./set-components-fixtures"
import { find, renderDOM, simulateKeyboardEvent } from "../test"
import {
  dom,
  getFocusableElements,
  createFocusTrap,
  focusOnce,
  getPageBaseFontSize,
} from "../utils"

const testDOM = `<div data-tester="true" tabindex="-1" data-removable class="wrapper">
    <p>Hello world! <a tabindex="-1" class="first-focusable" href="#">this link is focusable</a></p>
    <input type="input" placeholder="just a little input" />
    <p style="height: 32px;" class="hello world test">Hello world again! <button tabindex="-1" class="last-focusable" type="button">I too, am focusable!</button></p>
  </div>
`

const KeyCodes = {
  TAB: 9,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
}

const Selectors = {
  TABINDEX: "tabindex",
}

console.error = jest.fn()

const activeElement = () => document.activeElement

describe("dom", () => {
  describe(".addClass(element, ...classes)", () => {
    it("can add a class", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const newClass = "test-class"
      // When
      dom.addClass(element, newClass)
      // Then
      const received = Object.values(element.classList)
      expect(received).toContainEqual(newClass)
    })

    it("can add multiple classes", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const newClass1 = "test-class-1"
      const newClass2 = "test-class-2"
      // When
      dom.addClass(element, newClass1, newClass2)
      // Then
      const received = Object.values(element.classList)
      expect(received).toEqual(expect.arrayContaining([newClass1, newClass2]))
    })
  })

  describe(".removeClass(element, ...classes)", () => {
    it("can remove a class from an element", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const removedClass = "test"
      // When
      dom.removeClass(element, removedClass)
      // Then
      const received = Object.values(element.classList)
      expect(received).not.toContainEqual(removedClass)
    })

    it("can remove multiple classes from an element", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const newClass1 = "hello"
      const newClass2 = "world"
      // When
      dom.removeClass(element, newClass1, newClass2)
      // Then
      const received = Object.values(element.classList)
      expect(received).not.toEqual(expect.arrayContaining([newClass1, newClass2]))
    })
  })

  describe(".hasClass(element, ...classes)", () => {
    it("returns false if class can't be found", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const classNameToDetect = "test-class"
      // When
      const received = dom.hasClass(element, classNameToDetect)
      // Then
      expect(received).toBe(false)
    })

    it("returns true if class can be found", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const classNameToDetect = "hello"
      // When
      const received = dom.hasClass(element, classNameToDetect)
      // Then
      expect(received).toBe(true)
    })

    it("returns false if class can't be found among given classes", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const classNameToDetect1 = "not-in-class-list"
      const classNameToDetect2 = "not-in-class-list-either"
      // When
      const received = dom.hasClass(element, classNameToDetect1, classNameToDetect2)
      // Then
      expect(received).toBe(false)
    })

    it("returns true if class can be found among given classes", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const classNameToDetect1 = "hello"
      const classNameToDetect2 = "not-in-class-list"
      // When
      const received = dom.hasClass(element, classNameToDetect1, classNameToDetect2)
      // Then
      expect(received).toBe(true)
    })
  })

  describe(".getAttr(element, attr)", () => {
    it("returns an attribute", () => {
      // Given
      renderDOM(testDOM)
      const wrapper = find(".wrapper")
      // When
      const received = dom.getAttr(wrapper, "data-tester")
      // Then
      expect(received).toBe("true")
    })
  })

  describe(".setAttr(element, attr, value)", () => {
    it("can set an attribute", () => {
      // Given
      renderDOM(testDOM)
      const wrapper = find(".wrapper")
      // When
      dom.setAttr(wrapper, "data-tester", "false")
      // Then
      const received = wrapper.dataset.tester
      expect(received).toBe("false")
    })
  })

  describe(".removeAttr(element, attr)", () => {
    it("can remove an attribute", () => {
      // Given
      renderDOM(testDOM)
      const wrapper = find(".wrapper")
      // When
      dom.removeAttr(wrapper, "data-tester")
      // Then
      const received = wrapper.dataset.tester
      expect(received).toBe(undefined)
    })
  })

  describe(".hasAttr(element, attr)", () => {
    it("can detect an attribute", () => {
      // Given
      renderDOM(testDOM)
      const wrapper = find(".wrapper")
      // When
      const received = dom.hasAttr(wrapper, "data-tester")
      // Then
      expect(received).toBe(true)
    })
  })

  describe(".find(element, parent = document)", () => {
    it("returns an element", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const received = dom.find(".hello.world")
      // Then
      expect(received).toEqual(element)
    })
  })

  describe(".findAll(element, parent = document)", () => {
    it("returns a collection of elements", () => {
      // Given
      renderDOM(testDOM)
      const received = dom.findAll("p")
      // Then
      expect(received).toHaveLength(2)
    })
  })

  describe(".getStyle(element, property)", () => {
    it("returns css property values", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      // When
      const received = dom.getStyle(element, "height")
      // Then
      expect(received).toBe("32px")
    })
  })

  describe(".setStyle(element, property, value)", () => {
    it("can set a css property", () => {
      // Given
      renderDOM(testDOM)
      const element = find(".hello.world")
      const newHeight = "60px"
      // When
      dom.setStyle(element, "height", newHeight)
      // Then
      const received = element.style.height
      expect(received).toBe(newHeight)
    })
  })
})

describe("createFocusTrap(container, options = {})", () => {
  const CONTAINER_SELECTOR = ".wrapper"
  let firstFocusableElement
  let lastFocusableElement
  let trapper

  describe("options.useArrows = false", () => {
    beforeEach(() => {
      renderDOM(testDOM)
      trapper = createFocusTrap(CONTAINER_SELECTOR)
      firstFocusableElement = find(".first-focusable")
      lastFocusableElement = find(".last-focusable")
    })

    afterEach(() => {
      trapper.stop()
    })

    it("focuses last element when tab + shift is pressed on container", () => {
      // Given
      const containerElement = find(CONTAINER_SELECTOR)
      containerElement.setAttribute(Selectors.TABINDEX, "-1")
      containerElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.TAB, true)
      // Then
      expect(activeElement()).toEqual(lastFocusableElement)
    })

    it("focuses first element when tab is pressed on last element", () => {
      // Given
      lastFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.TAB, false)
      // Then
      expect(activeElement()).toEqual(firstFocusableElement)
    })

    it("focuses last element when tab + shift is pressed on first element", () => {
      // Given
      firstFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.TAB, true)
      // Then
      expect(activeElement()).toEqual(lastFocusableElement)
    })
  })

  describe("options.useArrows = true", () => {
    beforeEach(() => {
      renderDOM(testDOM)
      trapper = createFocusTrap(CONTAINER_SELECTOR, { useArrows: true })
      firstFocusableElement = find(".first-focusable")
      lastFocusableElement = find(".last-focusable")
    })

    afterEach(() => {
      trapper.stop()
    })

    it("focuses first element when down arrow is pressed on last element", () => {
      // Given
      lastFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_DOWN, false)
      // Then
      expect(activeElement()).toEqual(firstFocusableElement)
    })

    it("focuses last element when up arrow is pressed on first element", () => {
      // Given
      firstFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_UP, false)
      // Then
      expect(activeElement()).toEqual(lastFocusableElement)
    })
  })

  describe("logging", () => {
    it("prints console error if neither first parameter or options.children are given", () => {
      // Given
      renderDOM(testDOM)
      // When
      createFocusTrap(null, { children: [] })
      // Then
      expect(console.error).toBeCalledWith(
        "createFocusTrap must be given one or both of: first parameter (as selector string) and/or options.children (array of elements)."
      )
    })

    it("prints console error if options.matchers is given a non-string matcher", () => {
      // Given
      renderDOM(testDOM)
      // When
      createFocusTrap(CONTAINER_SELECTOR, { matchers: ["a", "button", 8] })
      // Then
      expect(console.error).toBeCalledWith(
        "Invalid matcher given to options.matchers for createFocusTrap. Expected: String. Recieved: number."
      )
    })

    it("prints console error if options.matchers is not strictly an array", () => {
      // Given
      renderDOM(testDOM)
      // When
      createFocusTrap(CONTAINER_SELECTOR, { matchers: true })
      // Then
      expect(console.error).toBeCalledWith(
        "Invalid data type given to options.matchers for createFocusTrap. Expected: Array."
      )
    })

    it("prints console error if options.matchers is not strictly an array", () => {
      // Given
      renderDOM(testDOM)
      // When
      createFocusTrap(CONTAINER_SELECTOR, { matchers: [] })
      // Then
      expect(console.error).toBeCalledWith(
        "Invalid value given to options.matchers for createFocusTrap; value must be an array with at least one selector string"
      )
    })
  })
})

describe("getFocusableElements(container)", () => {
  it("returns all focusable elements within a given element", () => {
    // Given
    renderDOM(testDOM)
    // When
    const elements = getFocusableElements(".wrapper")
    // Then
    expect(elements).toHaveLength(3)
  })

  it("returns custom list of elements if matchers given", () => {})
})

describe("getPageBaseFontSize", () => {
  it("returns body font size as number literal", () => {
    // Given
    renderDOM(testDOM)
    find("body").style.fontSize = "16px"
    // Then
    expect(getPageBaseFontSize()).toBe(16)
  })
})

describe("focusOnce(element)", () => {
  let element

  beforeEach(() => {
    renderDOM(testDOM)
    element = find(".wrapper")
    focusOnce(element)
  })

  it("focuses the element", () => {
    expect(activeElement()).toEqual(element)
  })

  it("removes tabindex from focused element when blurred", () => {
    // When
    element.blur()
    // Then
    expect(element.hasAttribute("tabindex")).toBe(false)
  })
})

describe("setComponents(options = {})", () => {
  const SCOPE_1 = "#scope-1"
  const SCOPE_2 = "#scope-2"
  const COMPONENT_ATTR = "data-test-component"
  const EXTENDED_COMPONENT_ATTR = `${COMPONENT_ATTR}-extended`
  const NO_ID_ERROR = "No ID found!"
  const DUPLICATE_SCOPE_ERROR = `You tried to start an Undernet component with scope '${SCOPE_1}', but that scope is already active.\n\nYou must call COMPONENT_NAME.stop(scopeSelector) first, then.`

  describe("Extended component", () => {
    const extendedComponentDOM = `
      <div id="scope-1">
        <div ${EXTENDED_COMPONENT_ATTR}="test-id-extended">
          <div ${COMPONENT_ATTR}="test-id-1"></div>
          <div ${COMPONENT_ATTR}="test-id-2"></div>
          <div ${COMPONENT_ATTR}="test-id-3"></div>
        </div>
      </div>
    `

    const GoodExtendedFixture = new GoodExtendedComponent()
    const BadExtendedFixture = new BadExtendedComponent()

    afterEach(() => {
      GoodExtendedFixture.reset()
      BadExtendedFixture.reset()
    })

    it("puts components into separate maps for extended vs. base component class", () => {
      // Given
      renderDOM(extendedComponentDOM)
      GoodExtendedFixture.start(SCOPE_1)
      // Then
      expect(GoodExtendedFixture.scopes.get("#scope-1").elements).toHaveLength(3)
      expect(GoodExtendedFixture.extendedScopes.get("#scope-1").elements).toHaveLength(1)
    })

    it("prints console error if extended class uses same scope property name as its base component class", () => {
      // Given
      BadExtendedFixture.start(SCOPE_1)
      // Then
      expect(console.error).toBeCalledWith(DUPLICATE_SCOPE_ERROR)
    })
  })

  describe("Base component", () => {
    const componentDOM = `
      <div ${COMPONENT_ATTR}="test-id-1" class="exclude"></div>
      <div ${COMPONENT_ATTR}="test-id-2"></div>
      <div id="scope-1">
        <div ${COMPONENT_ATTR}="test-id-3"></div>
        <div ${COMPONENT_ATTR}="test-id-4"></div>
        <div ${COMPONENT_ATTR}="test-id-5"></div>
      </div>
      <div id="scope-2">
        <div ${COMPONENT_ATTR}="test-id-6"></div>
        <div ${COMPONENT_ATTR}="test-id-7"></div>
        <div ${COMPONENT_ATTR}="test-id-8" class="exclude"></div>
      </div>
    `

    const BaseFixture = new TestComponent()

    beforeEach(() => {
      renderDOM(componentDOM)
    })

    afterEach(() => {
      BaseFixture.reset()
    })

    it("sets elements to global components property if no scopeId is passed", () => {
      // Given
      BaseFixture.start()
      // Then
      expect(BaseFixture.globals).toHaveLength(8)
    })

    it("sets new entry to scope property if scopeId is passed and scope does not exist", () => {
      // Given
      BaseFixture.start(SCOPE_1)
      // Then
      expect(BaseFixture.scopes.get(SCOPE_1).elements).toHaveLength(3)
    })

    it("sets elements to global components property, but excludes existing scopes", () => {
      // Given
      const testAttrValue = element => element.getAttribute(COMPONENT_ATTR)
      BaseFixture.start(SCOPE_1)
      BaseFixture.start()

      // Then
      BaseFixture.scopes.get(SCOPE_1).elements.forEach(scopedElement => {
        BaseFixture.globals.forEach(globalElement => {
          expect(testAttrValue(scopedElement)).not.toEqual(testAttrValue(globalElement))
        })
      })
    })

    it("has correct length of elements when scoped elements are excluded from globals", () => {
      // Given
      BaseFixture.start(SCOPE_1)
      BaseFixture.start()
      // Then
      expect(BaseFixture.globals).toHaveLength(5)
    })

    it("will use custom filter function on global components", () => {
      // Given
      BaseFixture.start(null, true)
      // Then
      expect(BaseFixture.globals).toHaveLength(6)
    })

    it("will use custom filter function on scoped components", () => {
      // Given
      BaseFixture.start(SCOPE_2, true)
      // Then
      expect(BaseFixture.scopes.get(SCOPE_2).elements).toHaveLength(2)
    })

    it("prints console error if no attribute value can be found on global component", () => {
      // Given
      document.querySelector(`[${COMPONENT_ATTR}='test-id-2']`).setAttribute(COMPONENT_ATTR, "")
      BaseFixture.start()
      // Then
      expect(console.error).toBeCalledWith(NO_ID_ERROR)
    })

    it("prints console error if no attribute value can be found on scoped component", () => {
      // Given
      document.querySelector(`[${COMPONENT_ATTR}='test-id-8']`).setAttribute(COMPONENT_ATTR, "")
      BaseFixture.start(SCOPE_2)
      // Then
      expect(console.error).toBeCalledWith(NO_ID_ERROR)
    })

    it("prints console error if scope already exists with global key", () => {
      // Given
      BaseFixture.start(SCOPE_1)
      BaseFixture.start(SCOPE_1)
      // Then
      expect(console.error).toBeCalledWith(DUPLICATE_SCOPE_ERROR)
    })

    it("does not set a scope if it already exists", () => {
      // Given
      BaseFixture.start(SCOPE_1)
      BaseFixture.start(SCOPE_1)
      // Then
      expect(BaseFixture.scopes.size).toBe(1)
    })
  })
})
