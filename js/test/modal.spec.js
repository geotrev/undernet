// This is the starting DOM.
// It is assigned to document.body.innerHTML before each test suite.
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

// Begin modal tests.

describe("Modals", function() {
  describe("API #start", function() {
    let modalDialog
    let modalOverlay

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      modalDialog = document.querySelector("[data-modal]")
      modalOverlay = document.querySelector("[data-modal-id]")
    })

    it(`has no [tabindex] on modal dialog`, function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal(null)
    })

    it(`sets [data-visible='false'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })

    it(`sets [aria-hidden='true'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("true")
    })

    it(`sets [tabindex='-1'] on each focusable element`, function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("-1")
      })
    })

    it("sets [role='dialog'] to modal dialog", function() {
      expect(modalDialog.getAttribute("role")).to.equal("dialog")
    })

    it("sets [aria-modal='true'] to modal dialog", function() {
      expect(modalDialog.getAttribute("aria-modal")).to.equal("true")
    })

    it("sets [aria-labelledby] on modal dialog equal to header id", function() {
      const header = document.querySelector("h2")
      expect(modalDialog.getAttribute("aria-labelledby")).to.equal(header.id)
    })
  })

  describe("API #stop -> Modal Button Click", function() {
    let button
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      Undernet.Modals.stop()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
      button.click()
    })

    it(`has [data-visible='false'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })

    it(`does not set [tabindex] on modal dialog`, function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal(null)
    })
  })

  describe("#_render -> Modal Button Click", function() {
    let button
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalDialog = document.querySelector("[data-modal]")
      modalOverlay = document.querySelector("[data-modal-id]")
      button.click()
    })

    it(`sets [tabindex='-1'] on modal dialog`, function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal("-1")
    })

    it(`sets [data-visible='true'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("true")
    })

    it(`sets [aria-hidden='false'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("false")
    })

    it(`sets [tabindex='0'] on each focusable element`, function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("0")
      })
    })

    it("sets focus to [data-modal]", function() {
      expect(document.activeElement).to.equal(modalDialog)
    })
  })

  describe("#_handleClose -> Modal Close Button Click", function() {
    let openButton
    let closeButton
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      openButton = document.querySelector("[data-modal-button]")
      closeButton = document.querySelector("[data-close]")
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
      openButton.click()
      closeButton.click()
    })

    it(`sets [data-visible='false'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })

    it(`removes [tabindex] on modal dialog`, function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal(null)
    })

    it(`sets [aria-hidden='true'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("true")
    })

    it(`sets [tabindex='-1'] on each focusable element`, function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("-1")
      })
    })

    it("sets focus to [data-modal-button]", function() {
      expect(document.activeElement).to.equal(openButton)
    })
  })

  describe("#_handleOverlayClick -> Modal Overlay Click", function() {
    let button
    let modalOverlay

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal-id]")
      button.click()
      modalOverlay.click()
    })

    it(`sets [data-visible='false'] on modal overlay`, function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })
  })

  describe("#_handleEscapeKeyPress -> Escape Key Press", function() {
    let button
    let modalOverlay

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalOverlay = document.querySelector("[data-modal-id]")
    })

    it(`sets [data-visible='false'] on modal overlay`, function() {
      button.click()
      window.simulateKeyPress(27)
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })
  })

  describe("#_handleReturnFocus -> Modal Close Button Click", function() {
    let openButton
    let closeButton

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      openButton = document.querySelector("[data-modal-button]")
      closeButton = document.querySelector("[data-close]")
      openButton.click()
      closeButton.click()
    })

    it("sets focus back to [data-modal-button]", function() {
      expect(document.activeElement).to.equal(openButton)
    })
  })

  describe("#_handleScrollRestore -> Modal Close Button Click", function() {
    let openButton
    let closeButton

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      openButton = document.querySelector("[data-modal-button]")
      closeButton = document.querySelector("[data-close]")
      openButton.click()
      closeButton.click()
    })

    it("removes 'no-scroll' class from <body>", function() {
      expect(document.body.className).to.equal("")
    })
  })

  describe("#_handleScrollStop -> Modal Button Click", function() {
    let button

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      button.click()
    })

    it("sets 'no-scroll' class to <body>", function() {
      expect(document.body.className).to.equal("no-scroll")
    })
  })
})
