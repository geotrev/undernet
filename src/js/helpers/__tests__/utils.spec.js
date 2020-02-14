import { renderDOM, simulateKeyboardEvent } from "../test"
import { queryAll, getFocusableElements, createFocusTrap, focusOnce } from "../"

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

describe("createFocusTrap(container, options = {})", () => {
  const CONTAINER_SELECTOR = ".wrapper"
  let firstFocusableElement
  let lastFocusableElement
  let trapper

  describe("options.useArrows = false", () => {
    beforeEach(() => {
      renderDOM(testDOM)
      trapper = createFocusTrap(CONTAINER_SELECTOR)
      firstFocusableElement = document.querySelector(".first-focusable")
      lastFocusableElement = document.querySelector(".last-focusable")
    })

    afterEach(() => {
      trapper.stop()
    })

    it("focuses last element when tab + shift is pressed on container", () => {
      // Given
      const containerElement = document.querySelector(CONTAINER_SELECTOR)
      containerElement.setAttribute(Selectors.TABINDEX, "-1")
      containerElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.TAB, true)
      // Then
      expect(document.activeElement).toEqual(lastFocusableElement)
    })

    it("focuses first element when tab is pressed on last element", () => {
      // Given
      lastFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.TAB, false)
      // Then
      expect(document.activeElement).toEqual(firstFocusableElement)
    })

    it("focuses last element when tab + shift is pressed on first element", () => {
      // Given
      firstFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.TAB, true)
      // Then
      expect(document.activeElement).toEqual(lastFocusableElement)
    })
  })

  describe("options.useArrows = true", () => {
    beforeEach(() => {
      renderDOM(testDOM)
      trapper = createFocusTrap(CONTAINER_SELECTOR, { useArrows: true })
      firstFocusableElement = document.querySelector(".first-focusable")
      lastFocusableElement = document.querySelector(".last-focusable")
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
      expect(document.activeElement).toEqual(firstFocusableElement)
    })

    it("focuses last element when up arrow is pressed on first element", () => {
      // Given
      firstFocusableElement.focus()
      trapper.start()
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_UP, false)
      // Then
      expect(document.activeElement).toEqual(lastFocusableElement)
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

describe("queryAll(selector)", () => {
  it("returns an array of elements", () => {
    // Given
    renderDOM(testDOM)
    // When
    const elements = queryAll("p")
    // Then
    expect(Array.isArray(elements)).toBe(true)
  })

  it("returns the correct number of elements", () => {
    // Given
    renderDOM(testDOM)
    const queried = document.querySelectorAll("p")
    // When
    const elements = queryAll("p")
    // Then
    expect(elements.length).toEqual(queried.length)
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

describe("focusOnce(element)", () => {
  let element

  beforeEach(() => {
    renderDOM(testDOM)
    element = document.querySelector(".wrapper")
    focusOnce(element)
  })

  it("focuses the element", () => {
    expect(document.activeElement).toEqual(element)
  })

  it("removes tabindex from focused element when blurred", () => {
    // When
    element.blur()
    // Then
    expect(element.hasAttribute("tabindex")).toBe(false)
  })
})
