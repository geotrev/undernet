import Undernet from "../../"
import { find, renderDOM, simulateKeyboardEvent } from "../../helpers/test"
import { KeyCodes, Messages } from "../constants"

const dom = `
  <button data-target="modal-id">Open modal</button>

  <div class="modal-overlay" data-modal="modal-id">
    <div class="modal-dialog" data-parent="modal-id" aria-labelledby="header-id">
      <header>
        <h2 class="h6 has-no-m-block-start" id="header-id">
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
        <a class="button" data-close href="#">
          Cancel
        </a>
        <a class="primary button" href="#">
          OK
        </a>
      </footer>
    </div>
  </div>
`

console.error = jest.fn()

const activeElement = () => document.activeElement

const mockTransitionEnd = () => {
  const modal = find("[data-modal='modal-id']")
  const spy = jest.spyOn(modal, "addEventListener")

  spy.mockImplementation((event, fn) => (event === "transitionend" ? fn() : fn))

  return spy
}

describe("Modal", () => {
  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      const wrapper = renderDOM(dom)
      // When
      Undernet.Modals.start()
      // Then
      expect(wrapper).toMatchSnapshot()
      Undernet.Modals.stop()
    })
  })

  describe("API stop + #handleClick", () => {
    it("does not open modal", () => {
      // Given
      const wrapper = renderDOM(dom)
      const spy = mockTransitionEnd()

      const trigger = find("[data-target='modal-id']")
      // When
      Undernet.Modals.start()
      Undernet.Modals.stop()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
      spy.mockRestore()
      Undernet.Modals.stop()
    })
  })

  describe("#handleClick", () => {
    let wrapper, spy

    beforeEach(() => {
      wrapper = renderDOM(dom)
      spy = mockTransitionEnd()

      const trigger = find("[data-target='modal-id']")

      Undernet.Modals.start()
      trigger.click()
    })

    afterEach(() => {
      spy.mockRestore()
      Undernet.Modals.stop()
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
    let wrapper, trigger, spy

    beforeEach(() => {
      wrapper = renderDOM(dom)

      spy = mockTransitionEnd()
      trigger = find("[data-target='modal-id']")
      const closeButton = find("header [data-close]")

      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
    })

    afterEach(() => {
      spy.mockRestore()
      Undernet.Modals.stop()
    })

    it("closes modal", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to modal trigger", () => {
      expect(activeElement()).toEqual(trigger)
    })
  })

  describe("#handleOverlayClick", () => {
    it("closes modal", () => {
      // Given
      const wrapper = renderDOM(dom)
      const spy = mockTransitionEnd()
      const trigger = find("[data-target='modal-id']")
      // When
      Undernet.Modals.start()
      trigger.click()
      find("[data-modal='modal-id']").click()
      // Then
      expect(wrapper).toMatchSnapshot()
      spy.mockRestore()
      Undernet.Modals.stop()
    })
  })

  describe("#handleEscapeKeyPress", () => {
    it("closes modal", () => {
      // Given
      const wrapper = renderDOM(dom)
      const spy = mockTransitionEnd()
      const trigger = find("[data-target='modal-id']")
      // When
      Undernet.Modals.start()
      trigger.click()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(wrapper).toMatchSnapshot()
      spy.mockRestore()
      Undernet.Modals.stop()
    })
  })

  describe("#handleReturnFocus", () => {
    it("sets focus back to modal trigger", () => {
      // Given
      renderDOM(dom)

      const spy = mockTransitionEnd()
      const trigger = find("[data-target='modal-id']")
      const closeButton = find("header [data-close]")
      // When
      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
      // Then
      expect(activeElement()).toEqual(trigger)
      spy.mockRestore()
      Undernet.Modals.stop()
    })
  })

  describe("#handleScrollRestore", () => {
    let spy

    beforeEach(() => {
      renderDOM(dom)

      spy = mockTransitionEnd()
      const trigger = find("[data-target='modal-id']")
      const closeButton = find("header [data-close]")

      Undernet.Modals.start()
      trigger.click()
      closeButton.click()
    })

    afterEach(() => {
      spy.mockRestore()
      Undernet.Modals.stop()
    })

    it("removes 'no-scroll' class from <body>", () => {
      expect(find("body").className).toBe("")
    })

    it("removes 'no-scroll' class from <html>", () => {
      expect(find("html").className).toBe("")
    })
  })

  describe("#handleScrollStop", () => {
    let spy

    beforeEach(() => {
      renderDOM(dom)

      spy = mockTransitionEnd()
      const trigger = find("[data-target='modal-id']")

      Undernet.Modals.start()
      trigger.click()
    })

    afterEach(() => {
      spy.mockRestore()
      Undernet.Modals.stop()
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
