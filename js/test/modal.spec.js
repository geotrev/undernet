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

// This is a helper function to check key attributes on the
// modal, essentially confirming open vs. closed state.
const validateModalState = (newState = {}) => {
  const state = Object.assign(
    {
      modalDialogTabindex: null,
      dataVisible: "false",
      ariaHidden: "true",
      focusableElementsTabindex: "-1",
    },
    newState,
  )

  let modalOverlay
  let modalDialog

  before(function() {
    modalOverlay = document.querySelector("[data-modal-id]")
    modalDialog = document.querySelector("[data-modal]")
  })

  it(`has [tabindex='${state.modalDialogTabindex}'] on modal dialog`, function() {
    expect(modalDialog.getAttribute("tabindex")).to.equal(state.modalDialogTabindex)
  })

  it(`has [data-visible='${state.dataVisible}'] on modal overlay`, function() {
    expect(modalOverlay.getAttribute("data-visible")).to.equal(state.dataVisible)
  })

  it(`has [aria-hidden='${state.ariaHidden}'] on modal overlay`, function() {
    expect(modalOverlay.getAttribute("aria-hidden")).to.equal(state.ariaHidden)
  })

  it(`has [tabindex='${state.focusableElementsTabindex}'] on each focusable element`, function() {
    const focusableElements = modalDialog.querySelectorAll("a")
    focusableElements.forEach(el => {
      expect(el.getAttribute("tabindex")).to.equal(state.focusableElementsTabindex)
    })
  })
}

// Begin modal tests.

describe("Modals", function() {
  describe("API #start", function() {
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      modalDialog = document.querySelector("[data-modal]")
    })

    validateModalState()

    it("sets [role='dialog'] to modal dialog", function() {
      expect(modalDialog.getAttribute("role")).to.equal("dialog")
    })

    it("sets [aria-modal='true'] to modal dialog", function() {
      expect(modalDialog.getAttribute("aria-modal")).to.equal("true")
    })
  })

  describe("API #stop -> Modal Button Click", function() {
    let button

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      Undernet.Modals.stop()
      button = document.querySelector("[data-modal-button]")
      button.click()
    })

    validateModalState()
  })

  describe("#_render -> Modal Button Click", function() {
    let button
    let modalDialog

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      modalDialog = document.querySelector("[data-modal]")
      button.click()
    })

    validateModalState({
      modalDialogTabindex: "-1",
      dataVisible: "true",
      ariaHidden: "false",
      focusableElementsTabindex: "0",
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

    validateModalState()
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

    validateModalState()
  })

  describe("#_handleEscapeKeyPress -> Escape Key Press", function() {
    let button

    before(function() {
      document.body.innerHTML = dom
      Undernet.Modals.start()
      button = document.querySelector("[data-modal-button]")
      button.click()
      window.simulateKeyPress(27)
    })

    validateModalState()
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

    it("adds 'no-scroll' class to <body>", function() {
      expect(document.body.className).to.equal("no-scroll")
    })
  })
})
