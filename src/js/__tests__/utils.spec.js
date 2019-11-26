import { dom, getFocusableElements } from "../utils"

const testDom = `<div data-tester="true" data-removable class="wrapper">
    <p>Hello world! <a href="#">this link is focusable</a> </p>
    <p style="height: 32px;" class="hello world test">Hello world again! <button type="button">I too, am focusable!</button></p>
  </div>\
`

describe("dom", () => {
  describe(".addClass(element, ...classes)", () => {
    it("can add a class", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const newClass = "test-class"
      // When
      dom.addClass(element, newClass)
      // Then
      const received = Object.values(element.classList)
      expect(received).toContainEqual(newClass)
    })

    it("can add multiple classes", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
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
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const removedClass = "test"
      // When
      dom.removeClass(element, removedClass)
      // Then
      const received = Object.values(element.classList)
      expect(received).not.toContainEqual(removedClass)
    })

    it("can remove multiple classes from an element", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
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
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const classNameToDetect = "test-class"
      // When
      const received = dom.hasClass(element, classNameToDetect)
      // Then
      expect(received).toEqual(false)
    })

    it("returns true if class can be found", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const classNameToDetect = "hello"
      // When
      const received = dom.hasClass(element, classNameToDetect)
      // Then
      expect(received).toEqual(true)
    })

    it("returns false if class can't be found among given classes", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const classNameToDetect1 = "not-in-class-list"
      const classNameToDetect2 = "not-in-class-list-either"
      // When
      const received = dom.hasClass(element, classNameToDetect1, classNameToDetect2)
      // Then
      expect(received).toEqual(false)
    })

    it("returns true if class can be found among given classes", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const classNameToDetect1 = "hello"
      const classNameToDetect2 = "not-in-class-list"
      // When
      const received = dom.hasClass(element, classNameToDetect1, classNameToDetect2)
      // Then
      expect(received).toEqual(true)
    })
  })

  describe(".getAttr(element, attr)", () => {
    it("returns an attribute", () => {
      // Given
      document.body.innerHTML = testDom
      const wrapper = document.querySelector(".wrapper")
      // When
      const received = dom.getAttr(wrapper, "data-tester")
      // Then
      expect(received).toEqual("true")
    })
  })

  describe(".setAttr(element, attr, value)", () => {
    it("can set an attribute", () => {
      // Given
      document.body.innerHTML = testDom
      const wrapper = document.querySelector(".wrapper")
      // When
      dom.setAttr(wrapper, "data-tester", "false")
      // Then
      const received = wrapper.dataset.tester
      expect(received).toEqual("false")
    })
  })

  describe(".removeAttr(element, attr)", () => {
    it("can remove an attribute", () => {
      // Given
      document.body.innerHTML = testDom
      const wrapper = document.querySelector(".wrapper")
      // When
      dom.removeAttr(wrapper, "data-tester")
      // Then
      const received = wrapper.dataset.tester
      expect(received).toEqual(undefined)
    })
  })

  describe(".hasAttr(element, attr)", () => {
    it("can detect an attribute", () => {
      // Given
      document.body.innerHTML = testDom
      const wrapper = document.querySelector(".wrapper")
      // When
      const received = dom.hasAttr(wrapper, "data-tester")
      // Then
      expect(received).toEqual(true)
    })
  })

  describe(".find(element, parent = document)", () => {
    it("returns an element", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const received = dom.find(".hello.world")
      // Then
      expect(received).toEqual(element)
    })
  })

  describe(".findAll(element, parent = document)", () => {
    it("returns a collection of elements", () => {
      // Given
      document.body.innerHTML = testDom
      const received = dom.findAll("p")
      // Then
      expect(received).toHaveLength(2)
    })
  })

  describe(".getStyle(element, property)", () => {
    it("returns css property values", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      // When
      const received = dom.getStyle(element, "height")
      // Then
      expect(received).toEqual("32px")
    })
  })

  describe(".setStyle(element, property, value)", () => {
    it("can set a css property", () => {
      // Given
      document.body.innerHTML = testDom
      const element = document.querySelector(".hello.world")
      const newHeight = "60px"
      // When
      dom.setStyle(element, "height", newHeight)
      // Then
      const received = element.style.height
      expect(received).toEqual(newHeight)
    })
  })
})

describe("getFocusableElements(container)", () => {
  it("returns all focusable elements within a given element", () => {
    document.body.innerHTML = testDom
    const elements = getFocusableElements(".wrapper")
    expect(elements).toHaveLength(2)
  })
})
