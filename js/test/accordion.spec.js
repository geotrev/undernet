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
        ipsum ut voluptate.
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
        ipsum ut voluptate.
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
        ipsum ut voluptate.
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
