import assert from "assert"
import Undernet from "../../src/undernet"

const cleanup = require("jsdom-global")()

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
    let focusableElements
    beforeEach(() => {
      document.body.innerHTML = dom
      Undernet.Modals.start()
    })

    it("adds [role='dialog'] to [data-modal]", () => {
      assert.strictEqual("dialog", document.querySelector("[data-modal]").getAttribute("role"))
    })

    it("adds [aria-modal='true'] to [data-modal]", () => {
      assert.strictEqual("true", document.querySelector("[data-modal]").getAttribute("aria-modal"))
    })

    it("adds [aria-hidden='true'] to [data-modal-id]", () => {
      assert.strictEqual("true", document.querySelector("[data-modal-id]").getAttribute("aria-hidden"))
    })

    it("adds [data-visible='false'] to [data-modal-id]", () => {
      assert.strictEqual("false", document.querySelector("[data-modal-id]").getAttribute("data-visible"))
    })

    it(`adds [tabindex='-1'] to each focusable element within [data-modal]`, () => {
      const focusableElements = document.querySelector("[data-modal]").querySelectorAll("a")
      focusableElements.forEach(el => {
        assert.strictEqual("-1", el.getAttribute("tabindex"))
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