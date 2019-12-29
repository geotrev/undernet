import Undernet from "../../"
import { find, renderDOM, simulateMouseEvent, simulateKeyboardEvent } from "../../helpers/test"
import { KeyCodes, Messages, Selectors } from "../constants"

const dom = `
  <span class="tooltip" data-tooltip="tooltip-id-1">
    <button class="tooltip-trigger" data-target="tooltip-id-1">Tooltip Button</button>
    <div class="tooltip-box" id="tooltip-id-1">
      This is a tooltip.
    </div>
  </span>
  <span class="tooltip" data-tooltip="tooltip-id-2">
    <button class="tooltip-trigger" data-target="tooltip-id-2">Tooltip Button</button>
    <div class="tooltip-box" id="tooltip-id-2">
      This is a tooltip.
    </div>
  </span>
`

console.error = jest.fn()

describe("Tooltip", () => {
  afterEach(() => {
    Undernet.Tooltips.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      const wrapper = renderDOM(dom)
      // When
      Undernet.Tooltips.start()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("API stop + Focus/Mouseover", () => {
    let wrapper
    let trigger

    beforeEach(() => {
      wrapper = renderDOM(dom)
      trigger = find("[data-target='tooltip-id-1']")

      Undernet.Tooltips.start()
      Undernet.Tooltips.stop()
    })

    it("does not open tooltip on focus", () => {
      trigger.focus()
      expect(wrapper).toMatchSnapshot()
    })

    it("does not open tooltip on mouseover", () => {
      simulateMouseEvent("mouseover", trigger)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleEvent", () => {
    let wrapper
    let trigger

    beforeEach(() => {
      wrapper = renderDOM(dom)
      trigger = find("[data-target='tooltip-id-1']")

      Undernet.Tooltips.start()
    })

    it("opens tooltip on focus", () => {
      trigger.focus()
      expect(wrapper).toMatchSnapshot()
    })

    it("opens tooltip on mouseover", () => {
      simulateMouseEvent("mouseover", trigger)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleClose (Blur/Mouseout)", () => {
    let wrapper
    let trigger1
    let trigger2

    beforeEach(() => {
      wrapper = renderDOM(dom)
      trigger1 = find("[data-target='tooltip-id-1']")
      trigger2 = find("[data-target='tooltip-id-2']")

      Undernet.Tooltips.start()
    })

    it("hides tooltip on mouseout event", () => {
      // When
      simulateMouseEvent("mouseover", trigger1)
      simulateMouseEvent("mouseout", trigger1)
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("hides first tooltip if second is focused", () => {
      // When
      trigger1.focus()
      trigger2.focus()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("will hide hovered tooltip when second is focused", () => {
      // When
      simulateMouseEvent("mouseover", trigger1)
      trigger2.focus()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("will hide focused tooltip when second is hovered", () => {
      // When
      trigger1.focus()
      simulateMouseEvent("mouseover", trigger2)
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleEscapeKeyPress", () => {
    it("closes tooltip", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("[data-target='tooltip-id-1']")
      // When
      Undernet.Tooltips.start()
      trigger.focus()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("Drop Direction", () => {
    let wrapper
    let trigger1
    let tooltip

    beforeEach(() => {
      wrapper = renderDOM(dom)
      trigger1 = find("[data-target='tooltip-id-1']")
      tooltip = find("#tooltip-id-1")

      Undernet.Tooltips.start()
    })

    it("renders left", () => {
      // Given
      tooltip.classList.add(Selectors.DROP_INLINE_START_CLASS)
      // When
      trigger1.focus()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("renders right", () => {
      // Given
      tooltip.classList.add(Selectors.DROP_INLINE_END_CLASS)
      // When
      trigger1.focus()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("renders bottom", () => {
      // Given
      tooltip.classList.add("is-drop-block-end")
      // When
      trigger1.focus()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })
})

const errorDom = (target, tooltip, id) => `
  <span class="tooltip" data-tooltip="${tooltip}">
    <button class="tooltip-trigger" data-target="${target}">Tooltip Button</button>
    <div class="tooltip-box" id="${id}">
      This is a tooltip.
    </div>
  </span>
`

describe("Tooltip Warnings", () => {
  const TOOLTIP_ID = "tooltip-id"

  it("prints console error if [data-tooltip] is empty", () => {
    // Given
    renderDOM(errorDom(TOOLTIP_ID, "", TOOLTIP_ID))
    // When
    Undernet.Tooltips.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_ID_ERROR)
  })

  it("prints console error if [data-target] attribute does not match its parent [data-tooltip]", () => {
    // Given
    renderDOM(errorDom("", TOOLTIP_ID, TOOLTIP_ID))
    // When
    Undernet.Tooltips.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_TRIGGER_ERROR(TOOLTIP_ID))
  })

  it("prints console error if tooltip container's [id] does not match its parent [data-tooltip]", () => {
    // Given
    renderDOM(errorDom(TOOLTIP_ID, TOOLTIP_ID, ""))
    // When
    Undernet.Tooltips.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_TOOLTIP_ERROR(TOOLTIP_ID))
  })
})
