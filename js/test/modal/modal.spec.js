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

describe("Modals", function() {
  describe("#start", function() {
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
    })

    it("adds [aria-hidden='true'] to modal overlay", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("true")
    })

    it("adds [data-visible='false'] to modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })
      
    it("adds [role='dialog'] to modal dialog", function() {
      expect(modalDialog.getAttribute("role")).to.equal("dialog")
    })

    it("adds [aria-modal='true'] to modal dialog", function() {
      expect(modalDialog.getAttribute("aria-modal")).to.equal("true")
    })

    it(`adds [tabindex='-1'] to each focusable element within the modal dialog`, function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("-1")
      })
    })
  })

  describe("#stop", function() {
    let button
    let modalOverlay
    let modalDialog

    before(() => {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      Undernet.Modals.stop()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
      button.click()
    })

    it("does not modify [tabindex] on modal dialog when modal button is clicked", function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal(null)
    })

    it("does not modify [data-visible] on modal overlay when modal button is clicked", function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })

    it("does not modify [aria-hidden] on modal overlay when modal button is clicked", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("true")
    })

    it("does not modify [tabindex] on each focusable element within the modal dialog", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("-1")
      })
    })
  })

  describe("#_render", function() {
    let button
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
      button.click()
    })

    it("sets [tabindex='-1'] on modal dialog when modal button is clicked", function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal("-1")
    })

    it("sets [data-visible='true'] on modal overlay when modal button is clicked", function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("true")
    })

    it("sets [aria-hidden='false'] on modal overlay when modal button is clicked", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("false")
    })

    it("adds [tabindex='0'] to each focusable element within the modal dialog", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("0")
      })
    })
  })

  describe.skip("#_handleClose", function() {})
  describe.skip("#_handleOverlayClick", function() {})
  describe.skip("#_handleEscapeKeyPress", function() {})
  describe.skip("#_handleReturnFocus", function() {})
  describe.skip("#_handleScrollRestore", function() {})
  describe.skip("#_handleScrollStop", function() {})
})
