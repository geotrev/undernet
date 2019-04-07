import Undernet from "../src/index"

// This is the starting DOM.
// It is assigned to document.body.innerHTML before each test suite.
const dom = `
  <div data-accordion="accordion-1" class="accordion">
    <div class="accordion-row" data-visible="true" data-accordion-row="content-1">
      <h5 id="button-1">
        <button data-parent="accordion-1" class="accordion-button" data-target="content-1">
          Accordion Button 1
        </button>
      </h5>
      <div class="accordion-content" id="content-1">
        <p class="has-margin">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="accordion-row" data-visible="false" data-accordion-row="content-2">
      <h5 id="button-2">
        <button data-parent="accordion-1" class="accordion-button" data-target="content-2">
          Accordion Button 2
        </button>
      </h5>
      <div class="accordion-content" id="content-2">
        <p class="has-margin">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="accordion-row" data-visible="false" data-accordion-row="content-3">
      <h5 id="button-3">
        <button data-parent="accordion-1" class="accordion-button" data-target="content-3">
          Accordion Button 3
        </button>
      </h5>
      <div class="accordion-content" id="content-3">
        <p class="has-margin">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordions", () => {
  describe("API start", () => {
    let buttons
    let contents

    beforeAll(() => {
      document.body.innerHTML = dom
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
    })

    it("sets unique [aria-labelledby] on each accordion content matching its button's header id", () => {
      contents.forEach(content => {
        const header = content.previousElementSibling
        expect(content.getAttribute("aria-labelledby")).toEqual(header.id)
      })
    })

    it("sets [aria-controls] with matching value to each accordion content id", () => {
      buttons.forEach(button => {
        const content = button.parentNode.nextElementSibling
        expect(button.getAttribute("aria-controls")).toEqual(content.id)
      })
    })

    it("sets [aria-hidden='false'] on each accordion content when [data-visible='true']", () => {
      expect(contents[0].getAttribute("aria-hidden")).toEqual("false")
    })

    it("sets [aria-hidden='true'] on each accordion content when [data-visible='false']", () => {
      expect(contents[1].getAttribute("aria-hidden")).toEqual("true")
      expect(contents[2].getAttribute("aria-hidden")).toEqual("true")
    })

    it("sets [aria-expanded='true'] on each accordion button when [data-visible='true']", () => {
      expect(buttons[0].getAttribute("aria-expanded")).toEqual("true")
    })

    it("sets [aria-expanded='false'] on each accordion button when [data-visible='false']", () => {
      expect(buttons[1].getAttribute("aria-expanded")).toEqual("false")
      expect(buttons[2].getAttribute("aria-expanded")).toEqual("false")
    })

    it("sets max-height on each accordion content when [data-visible='true']", () => {
      expect(contents[0].style.maxHeight).toMatch(/px/)
    })

    it("does not set max-height on each accordion content when [data-visible='false']", () => {
      expect(contents[1].style.maxHeight).toEqual("")
      expect(contents[2].style.maxHeight).toEqual("")
    })

    it("sets [tabindex='0'] on each focusable child within accordion content when [data-visible='true']", () => {
      const children = contents[0].querySelectorAll("a")
      children.forEach(child => {
        expect(child.getAttribute("tabindex")).toEqual("0")
      })
    })

    it("sets [tabindex='-1'] on each focusable child within accordion content when [data-visible='false']", () => {
      const children1 = contents[1].querySelectorAll("a")
      const children2 = contents[2].querySelectorAll("a")
      children1.forEach(child => expect(child.getAttribute("tabindex")).toEqual("-1"))
      children2.forEach(child => expect(child.getAttribute("tabindex")).toEqual("-1"))
    })
  })

  describe("API stop -> Accordion Button Click", () => {
    let buttons
    let contents

    beforeAll(() => {
      document.body.innerHTML = dom
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
      Undernet.Accordions.stop()
    })

    it("does not set [aria-hidden='false'] on accordion content on button click", () => {
      expect(contents[2].getAttribute("aria-hidden")).toEqual("true")
    })

    it("does not set [aria-expanded='true'] on accordion button on click", () => {
      expect(buttons[2].getAttribute("aria-expanded")).toEqual("false")
    })
  })

  describe("#render -> Accordion Button Click", () => {
    describe("Button content is expanded", () => {
      let buttons
      let contents

      beforeAll(() => {
        document.body.innerHTML = dom
        buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
        contents = document.querySelectorAll(".accordion-content")
        Undernet.Accordions.start()
        buttons[0].click()
      })

      it("sets [aria-hidden='true'] on accordion content", () => {
        expect(contents[0].getAttribute("aria-hidden")).toEqual("true")
      })

      it("sets [aria-expanded='false'] on accordion", () => {
        expect(buttons[0].getAttribute("aria-expanded")).toEqual("false")
      })
    })

    describe("Button content is hidden", () => {
      let buttons
      let contents

      beforeAll(() => {
        document.body.innerHTML = dom
        buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
        contents = document.querySelectorAll(".accordion-content")
        Undernet.Accordions.start()
        buttons[2].click()
      })

      it("sets [aria-hidden='false'] on accordion content", () => {
        expect(contents[2].getAttribute("aria-hidden")).toEqual("false")
      })

      it("sets [aria-expanded='true'] on accordion", () => {
        expect(buttons[2].getAttribute("aria-expanded")).toEqual("true")
      })
    })
  })

  describe("Toggle Multiple -> Accordion Button Click", () => {
    let buttons
    let contents

    beforeAll(() => {
      document.body.innerHTML = dom
      document
        .querySelector("[data-accordion='accordion-1']")
        .setAttribute("data-toggle-multiple", null)
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
      buttons[2].click()
    })

    it("has [aria-hidden='false'] on accordion content", () => {
      expect(contents[0].getAttribute("aria-hidden")).toEqual("false")
    })

    it("has [aria-expanded='true'] on accordion button", () => {
      expect(buttons[0].getAttribute("aria-expanded")).toEqual("true")
    })

    it("sets [aria-hidden='false'] on accordion content", () => {
      expect(contents[2].getAttribute("aria-hidden")).toEqual("false")
    })

    it("sets [aria-expanded='true'] on accordion button", () => {
      expect(buttons[2].getAttribute("aria-expanded")).toEqual("true")
    })
  })

  describe("Errors", () => {})
})
