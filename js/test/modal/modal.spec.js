const dom = `
  <button href="#" data-modal-button data-target="new-modal">Open modal</button>
  
  <div className="modal-overlay" data-modal-id="new-modal">
    <div className="modal-dialog" data-parent="new-modal" aria-labelledby="header-id" data-modal>
      <header>
        <h2 className="h6 has-no-margin-top" id="header-id">
          Modal Header
        </h2>
        <a data-close href="#">
          <span aria-hidden="true">&times;</span>
        </a>
      </header>
      <section>
        <p>Some modal content here</p>
      </section>
      <footer>
        <a className="button" data-close href="#">
          Cancel
        </a>
        <a className="primary button" href="#">
          OK
        </a>
      </footer>
    </div>
  </div>
`

describe("Modals", () => {
  describe("#setup", () => {
    beforeEach(() => {
      document.body.innerHTML = dom
      Undernet.Modals.start()
    })

    it("adds [role='dialog'] to [data-modal]", () => {
      const fixture = document.querySelector("[data-modal]")
      expect(fixture.getAttribute("role")).to.equal("dialog")
    })

    it("adds [aria-modal='true'] to [data-modal]", () => {
      const fixture = document.querySelector("[data-modal]")
      expect(fixture.getAttribute("aria-modal")).to.equal("true")
    })

    it("adds [aria-hidden='true'] to [data-modal-id]", () => {
      const fixture = document.querySelector("[data-modal-id]")
      expect(fixture.getAttribute("aria-hidden")).to.equal("true")
    })

    it("adds [data-visible='false'] to [data-modal-id]", () => {
      const fixture = document.querySelector("[data-modal-id]")
      expect(fixture.getAttribute("data-visible")).to.equal("false")
    })

    it(`adds [tabindex='-1'] to each focusable element within [data-modal]`, () => {
      const focusableElements = document.querySelector("[data-modal]").querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("-1")
      })
    })
  })

  describe.skip("#start", () => {})
  describe.skip("#stop", () => {})
  describe.skip("#_handleClose", () => {})
  describe.skip("#_handleOverlayClick", () => {})
  describe.skip("#_handleEscapeKeyPress", () => {})
  describe.skip("#_handleReturnFocus", () => {})
  describe.skip("#_handleScrollRestore", () => {})
  describe.skip("#_handleScrollStop", () => {})
})
