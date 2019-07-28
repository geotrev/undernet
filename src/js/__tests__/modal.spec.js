import Undernet from "../"
import { getFocusableElements } from "../utils"

const dom = `
  <button data-target="new-modal">Open modal</button>

  <div className="modal-overlay" data-modal="new-modal">
    <div className="modal-dialog" data-parent="new-modal" aria-labelledby="header-id">
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
  afterEach(() => {
    Undernet.Modals.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      document.body.innerHTML = dom
      // When
      Undernet.Modals.start()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("API stop -> Modal Button Click", () => {
    it("does not set attributes", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target]")
      // When
      Undernet.Modals.start()
      Undernet.Modals.stop()
      trigger.click()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("#render -> Modal Button Click", () => {
    beforeEach(() => {
      document.body.innerHTML = dom

      const trigger = document.querySelector("[data-target]")

      Undernet.Modals.start()
      trigger.click()
    })

    it("displays modal", () => {
      expect(document.body).toMatchSnapshot()
    })

    it("sets focus to modal dialog", () => {
      const modalDialog = document.querySelector("[data-parent]")
      expect(document.activeElement).toEqual(modalDialog)
    })
  })

  describe("#handleClose -> Modal Close Button Click", () => {
    let trigger
    let closeButton

    beforeAll(() => {
      document.body.innerHTML = dom

      trigger = document.querySelector("[data-target]")
      closeButton = document.querySelector("[data-close]")

      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
    })

    it("closes modal", () => {
      expect(document.body).toMatchSnapshot()
    })

    it("sets focus to modal trigger", () => {
      expect(document.activeElement).toEqual(trigger)
    })
  })

  describe("#handleOverlayClick -> Modal Overlay Click", () => {
    it("closes modal", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target]")
      const modalOverlay = document.querySelector("[data-modal]")
      // When
      Undernet.Modals.start()
      trigger.click()
      modalOverlay.click()
      // Then
      expect(modalOverlay).toMatchSnapshot()
    })
  })

  describe("#handleEscapeKeyPress -> Escape Key Press", () => {
    it("closes modal", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target]")
      const modalOverlay = document.querySelector("[data-modal]")
      // When
      Undernet.Modals.start()
      trigger.click()
      global.simulateKeyPress(27)
      // Then
      expect(modalOverlay).toMatchSnapshot()
    })
  })

  describe("#handleReturnFocus -> Modal Close Button Click", () => {
    it("sets focus back to modal trigger", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target]")
      const closeButton = document.querySelector("[data-close]")
      // When
      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
      // Then
      expect(document.activeElement).toEqual(trigger)
    })
  })

  describe("#handleScrollRestore -> Modal Close Button Click", () => {
    let trigger
    let closeButton

    beforeAll(() => {
      document.body.innerHTML = dom

      trigger = document.querySelector("[data-target]")
      closeButton = document.querySelector("[data-close]")

      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
    })

    it("removes 'no-scroll' class from <body>", () => {
      expect(document.body.className).toEqual("")
    })

    it("removes 'no-scroll' class from <html>", () => {
      expect(document.documentElement.className).toEqual("")
    })
  })

  describe("#handleScrollStop -> Modal Button Click", () => {
    beforeAll(() => {
      document.body.innerHTML = dom

      const trigger = document.querySelector("[data-target]")

      Undernet.Modals.start()
      trigger.click()
    })

    it("sets 'no-scroll' class to <body>", () => {
      expect(document.body.className).toEqual("no-scroll")
    })

    it("sets 'no-scroll' class to <html>", () => {
      expect(document.documentElement.className).toEqual("no-scroll")
    })
  })
})

const errorDom = (target, modal, parent) => `
  <button data-target="${target}">Open modal</button>

  <div className="modal-overlay" data-modal="${modal}">
    <div className="modal-dialog" data-parent="${parent}" aria-labelledby="header-id">
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

describe("Modal Error Handling", () => {
  it("throws error if modal button isn't found", () => {
    document.body.innerHTML = errorDom("", "new-modal", "new-modal")

    try {
      Undernet.Modals.start()
    } catch (e) {
      expect(e.message).toEqual("Could not find modal trigger with id new-modal.")
    }
  })

  it("throws error if [data-modal] attribute is empty", () => {
    document.body.innerHTML = errorDom("new-modal", "", "new-modal")

    try {
      Undernet.Modals.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not detect an id on your [data-modal] element. Please add a value matching the modal trigger's [data-parent] attribute."
      )
    }
  })

  it("throws error if [data-parent] attribute does not match its parent [data-modal]", () => {
    document.body.innerHTML = errorDom("new-modal", "new-modal", "")

    try {
      Undernet.Modals.start()
    } catch (e) {
      expect(e.message).toEqual(
        `Could not find a [data-parent='new-modal'] attribute within your [data-modal='new-modal'] element.`
      )
    }
  })
})
