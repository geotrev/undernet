import Undernet from "../../"
import { find, renderDOM, simulateKeyboardEvent } from "../../helpers/test"
import { KeyCodes, Messages } from "../constants"

const dom = `
  <button data-target="modal-id">Open modal</button>

  <div className="modal-overlay" data-modal="modal-id">
    <div className="modal-dialog" data-parent="modal-id" aria-labelledby="header-id">
      <header>
        <h2 className="h6 has-no-m-block-start" id="header-id">
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

console.error = jest.fn()

const activeElement = () => document.activeElement

describe("Modal", () => {
  afterEach(() => {
    Undernet.Modals.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      const wrapper = renderDOM(dom)
      // When
      Undernet.Modals.start()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("API stop + #handleClick", () => {
    it("does not open modal", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='modal-id']")
      // When
      Undernet.Modals.start()
      Undernet.Modals.stop()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger = find("[data-target='modal-id']")

      Undernet.Modals.start()
      trigger.click()
    })

    it("opens modal", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to modal dialog", () => {
      const modalDialog = find("[data-parent]")
      expect(activeElement()).toEqual(modalDialog)
    })
  })

  describe("#handleClose", () => {
    let wrapper
    let trigger
    let closeButton

    beforeEach(() => {
      wrapper = renderDOM(dom)

      trigger = find("[data-target='modal-id']")
      closeButton = find("header [data-close]")

      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
    })

    it("closes modal", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to modal trigger", () => {
      expect(activeElement()).toEqual(trigger)
    })

    it("removes tabindex when trigger loses focus", () => {
      trigger.blur()
      expect(trigger.hasAttribute("tabindex")).toBe(false)
    })
  })

  describe("#handleOverlayClick", () => {
    it("closes modal", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='modal-id']")
      // When
      Undernet.Modals.start()
      trigger.click()
      find("[data-modal='modal-id']").click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleEscapeKeyPress", () => {
    it("closes modal", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='modal-id']")
      // When
      Undernet.Modals.start()
      trigger.click()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleReturnFocus", () => {
    it("sets focus back to modal trigger", () => {
      // Given
      renderDOM(dom)
      const trigger = find("[data-target='modal-id']")
      const closeButton = find("header [data-close]")
      // When
      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
      // Then
      expect(activeElement()).toEqual(trigger)
    })
  })

  describe("#handleScrollRestore", () => {
    let trigger
    let closeButton

    beforeEach(() => {
      renderDOM(dom)

      trigger = find("[data-target='modal-id']")
      closeButton = find("header [data-close]")

      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
    })

    it("removes 'no-scroll' class from <body>", () => {
      expect(find("body").className).toBe("")
    })

    it("removes 'no-scroll' class from <html>", () => {
      expect(find("html").className).toBe("")
    })
  })

  describe("#handleScrollStop", () => {
    beforeEach(() => {
      renderDOM(dom)
      const trigger = find("[data-target='modal-id']")

      Undernet.Modals.start()
      trigger.click()
    })

    it("sets 'no-scroll' class to <body>", () => {
      expect(find("body").className).toBe("no-scroll")
    })

    it("sets 'no-scroll' class to <html>", () => {
      expect(find("html").className).toBe("no-scroll")
    })
  })
})

const errorDom = (target, modal, parent) => `
  <button data-target="${target}">Open modal</button>

  <div className="modal-overlay" data-modal="${modal}">
    <div className="modal-dialog" data-parent="${parent}" aria-labelledby="header-id">
      <header>
        <h2 className="h6 has-no-m-block-start" id="header-id">
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

describe("Modal Warnings", () => {
  const MODAL_ID = "modal-id"

  it("prints console error if modal trigger isn't found", () => {
    // Given
    renderDOM(errorDom("", MODAL_ID, MODAL_ID))
    // When
    Undernet.Modals.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_TRIGGER_ERROR(MODAL_ID))
  })

  it("prints console error if modal id isn't found", () => {
    // Given
    renderDOM(errorDom(MODAL_ID, "", MODAL_ID))
    // When
    Undernet.Modals.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_ID_ERROR)
  })

  it("prints console error if [data-parent] attribute does not match its parent [data-modal]", () => {
    // Given
    renderDOM(errorDom(MODAL_ID, MODAL_ID, ""))
    // When
    Undernet.Modals.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_MODAL_DIALOG_ERROR(MODAL_ID))
  })
})
