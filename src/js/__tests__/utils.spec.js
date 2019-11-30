import { find, renderDOM, simulateKeyboardEvent } from "./helpers"
import {
  dom,
  getFocusableElements,
  createFocusTrap,
  focusOnce,
  getPageBaseFontSize,
} from "../utils"

const testDom = `<div data-tester="true" tabindex="-1" data-removable class="wrapper">
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

const activeElement = () => document.activeElement

describe("dom", () => {
  describe(".addClass(element, ...classes)", () => {
    it("can add a class", () => {
      // Given
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
      const element = find(".hello.world")
      const classNameToDetect = "test-class"
      // When
      const received = dom.hasClass(element, classNameToDetect)
      // Then
      expect(received).toBe(false)
    })

    it("returns true if class can be found", () => {
      // Given
      renderDOM(testDom)
      const element = find(".hello.world")
      const classNameToDetect = "hello"
      // When
      const received = dom.hasClass(element, classNameToDetect)
      // Then
      expect(received).toBe(true)
    })

    it("returns false if class can't be found among given classes", () => {
      // Given
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
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
      renderDOM(testDom)
      const element = find(".hello.world")
      const received = dom.find(".hello.world")
      // Then
      expect(received).toEqual(element)
    })
  })

  describe(".findAll(element, parent = document)", () => {
    it("returns a collection of elements", () => {
      // Given
      renderDOM(testDom)
      const received = dom.findAll("p")
      // Then
      expect(received).toHaveLength(2)
    })
  })

  describe(".getStyle(element, property)", () => {
    it("returns css property values", () => {
      // Given
      renderDOM(testDom)
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
      renderDOM(testDom)
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

describe.only("createFocusTrap(container, options = {})", () => {
  const CONTAINER_SELECTOR = ".wrapper"
  let firstFocusableElement
  let lastFocusableElement
  let trapper

  describe("options.useArrows = false", () => {
    beforeEach(() => {
      renderDOM(testDom)
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
      renderDOM(testDom)
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
})

describe("getFocusableElements(container)", () => {
  it("returns all focusable elements within a given element", () => {
    renderDOM(testDom)
    const elements = getFocusableElements(".wrapper")
    expect(elements).toHaveLength(3)
  })
})

describe("getPageBaseFontSize", () => {
  it("returns body font size as number literal", () => {
    renderDOM(testDom)
    find("body").style.fontSize = "16px"
    expect(getPageBaseFontSize()).toBe(16)
  })
})

describe("focusOnce(element)", () => {
  let element

  beforeEach(() => {
    renderDOM(testDom)
    element = find(".wrapper")
    focusOnce(element)
  })

  it("focuses the element", () => {
    expect(document.activeElement).toEqual(element)
  })

  it("removes tabindex from focused element when blurred", () => {
    element.blur()
    expect(element.hasAttribute("tabindex")).toBe(false)
  })
})
