import ContextUtil, { dom, getFocusableElements } from "../utils"

const testDom = `<div data-tester="true" data-removable class="wrapper">
    <p>Hello world! <a href="#">this link is focusable</a> </p>
    <p class="hello world test">Hello world again! <button type="button">I too, am focusable!</button></p>
  </div>\
`

describe("dom", () => {
  beforeEach(() => {
    document.body.innerHTML = testDom
  })

  it("can get an attribute", () => {})
  it("can set an attribute", () => {})
  it("can remove an attribute", () => {})
  it("can detect an attribute", () => {})
  it("can retrieve an element", () => {})
  it("can retrieve a collection of elements", () => {})
  it("can retrieve css properties", () => {})
  it("can set css properties", () => {})
  it("can add a class", () => {})
  it("can add multiple classes", () => {})
  it("can remove a class from", () => {})
  it("can remove multiple classes from", () => {})
  it("can detect a class", () => {})
  it("can detect a class from multiple inputs", () => {})
})

describe("getFocusableElements", () => {
  it("returns all focusable elements within a wrapper", () => {
    document.body.innerHTML = testDom
    const elements = getFocusableElements(".wrapper")
    expect(elements).toHaveLength(2)
  })
})

describe("ContextUtil", () => {})
