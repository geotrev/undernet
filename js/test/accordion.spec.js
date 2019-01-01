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

describe.only("Accordions", function() {
  describe("#start", function() {
    let wrapper
    let rows
    let buttons
    let contents

    before(function() {
      document.body.innerHTML = dom
      wrapper = document.querySelector("[data-accordion='accordion-1']")
      rows = document.querySelectorAll("[data-accordion-row]")
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
    })

    it("sets unique [aria-labelledby] on each accordion content matching its button's header id", function() {
      contents.forEach(content => {
        const header = content.previousElementSibling
        expect(content.getAttribute("aria-labelledby")).to.equal(header.id)
      })
    })

    it("sets [aria-controls] with matching value to each accordion content id", function() {
      buttons.forEach(button => {
        const content = button.parentNode.nextElementSibling
        expect(button.getAttribute("aria-controls")).to.equal(content.id)
      })
    })

    it("sets [aria-hidden='false'] on each accordion content with [data-visible='true']", function() {
      expect(contents[0].getAttribute("aria-hidden")).to.equal("false")
    })

    it("sets [aria-hidden='true'] on each accordion content with [data-visible='false']", function() {
      expect(contents[1].getAttribute("aria-hidden")).to.equal("true")
      expect(contents[2].getAttribute("aria-hidden")).to.equal("true")
    })

    it("sets [aria-expanded='true'] on each accordion button with [data-visible='true']", function() {
      expect(buttons[0].getAttribute("aria-expanded")).to.equal("true")
    })

    it("sets [aria-expanded='false'] on each accordion button with [data-visible='false']", function() {
      expect(buttons[1].getAttribute("aria-expanded")).to.equal("false")
      expect(buttons[2].getAttribute("aria-expanded")).to.equal("false")
    })

    it("sets max-height on each accordion content with [data-visible='true']", function() {
      expect(contents[0].style.maxHeight).to.have.string("px")
    })

    it("does not set max-height on each accordion content with [data-visible='false']", function() {
      expect(contents[1].style.maxHeight).to.equal("")
      expect(contents[2].style.maxHeight).to.equal("")
    })

    it("sets [tabindex='0'] on each focusable child within accordion content if [data-visible='true']", function() {
      const children = contents[0].querySelectorAll("a")
      children.forEach(child => {
        expect(child.getAttribute("tabindex")).to.equal("0")
      })
    })

    it("sets [tabindex='-1'] on each focusable child within accordion content if [data-visible='false']", function() {
      const children1 = contents[1].querySelectorAll("a")
      children1.forEach(child => {
        expect(child.getAttribute("tabindex")).to.equal("-1")
      })

      const children2 = contents[2].querySelectorAll("a")
      children1.forEach(child => {
        expect(child.getAttribute("tabindex")).to.equal("-1")
      })
    })
  })

  describe("#stop", function() {})
  describe("#_setupAccordion", function() {})
  describe("#_getPossibleAccordionHeaderAttrs", function() {})
  describe("#_getAccordionRowAttr", function() {})
  describe("#_render", function() {})
  describe("#_handleSpaceKeyPress", function() {})
  describe("#_closeAllIfToggleable", function() {})
  describe("#_toggleSelectedAccordion", function() {})
  describe("#_toggleAttributeInCollection", function() {})
  describe("Errors", function() {})
  describe("Toggle Multiple", function() {})
})
