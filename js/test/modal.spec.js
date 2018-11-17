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
  const validateDefaultState = () => {
    let modalOverlay
    let modalDialog

    before(function() {
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
    })

    it("has [tabindex='null'] on modal dialog", function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal(null)
    })

    it("has [data-visible='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("false")
    })

    it("has [aria-hidden='true'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("true")
    })

    it("has [tabindex='-1'] on each focusable element within modal dialog", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("-1")
      })
    })
  }

  describe("API #start", function() {
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      modalOverlay = document.querySelector("[data-modal-id]")
      modalDialog = document.querySelector("[data-modal]")
    })

    validateDefaultState()

    it("sets [role='dialog'] to modal dialog", function() {
      expect(modalDialog.getAttribute("role")).to.equal("dialog")
    })

    it("sets [aria-modal='true'] to modal dialog", function() {
      expect(modalDialog.getAttribute("aria-modal")).to.equal("true")
    })
  })

  describe("API #stop", function() {
    let button

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      Undernet.Modals.stop()
      button = document.querySelector("[data-modal-button]")
      button.click()
    })

    validateDefaultState()
  })

  describe("#_render -> Modal Button Click", function() {
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

    it("has [tabindex='-1'] on modal dialog", function() {
      expect(modalDialog.getAttribute("tabindex")).to.equal("-1")
    })

    it("has [data-visible='true'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("data-visible")).to.equal("true")
    })

    it("has [aria-hidden='false'] on modal overlay", function() {
      expect(modalOverlay.getAttribute("aria-hidden")).to.equal("false")
    })

    it("has [tabindex='0'] to each focusable element within modal dialog", function() {
      const focusableElements = modalDialog.querySelectorAll("a")
      focusableElements.forEach(el => {
        expect(el.getAttribute("tabindex")).to.equal("0")
      })
    })

    it("sets focus to [data-modal]", function() {
      expect(document.activeElement).to.equal(modalDialog)
    })
  })

  describe("#_handleClose -> [data-close] Button Click", function() {
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

    validateDefaultState()
  })

  describe("#_handleOverlayClick -> [data-modal-id] Click", function() {
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

    validateDefaultState()
  })

  describe("#_handleEscapeKeyPress -> [esc] Keydown Event", function() {
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
      window.simulateKeyPress(27)
    })

    validateDefaultState()
  })

  describe("#_handleReturnFocus -> [data-close] Button Click", function() {
    let openButton
    let closeButton
    let modalOverlay
    let modalDialog

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

  describe("#_handleScrollRestore -> [data-close] Button Click", function() {
    let openButton
    let closeButton
    let modalOverlay
    let modalDialog

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

  describe("#_handleScrollStop", function() {
    let button
    let modalOverlay
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      button.click()
    })

    it("adds 'no-scroll' class to <body>", function() {
      expect(document.body.className).to.equal("no-scroll")
    })
  })
})
