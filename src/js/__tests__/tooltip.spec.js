import Undernet from "../"

const dom = `
  <span class="tooltip" data-tooltip="new-tooltip">
    <button class="tooltip-trigger" data-target="new-tooltip">Tooltip Button</button>
    <div class="tooltip-box" id="new-tooltip">
      This is a tooltip.
    </div>
  </span>
  <span class="tooltip" data-tooltip="new-tooltip10">
    <button class="tooltip-trigger" data-target="new-tooltip10">Tooltip Button</button>
    <div class="tooltip-box" id="new-tooltip10">
      This is a tooltip.
    </div>
  </span>
`

const KeyCodes = {
  ESCAPE: 27,
}

describe("Tooltips", () => {
  afterEach(() => {
    Undernet.Tooltips.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      document.body.innerHTML = dom
      // When
      Undernet.Tooltips.start()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("API stop -> Tooltip Focus/MouseOver", () => {
    let trigger
    let tooltip

    beforeEach(() => {
      document.body.innerHTML = dom

      trigger = document.querySelector(`[data-target='${"new-tooltip"}']`)
      tooltip = document.getElementById("new-tooltip")

      Undernet.Tooltips.start()
      Undernet.Tooltips.stop()
    })

    it("does not open tooltip on focus", () => {
      trigger.focus()
      expect(tooltip).toMatchSnapshot()
    })

    it("does not open tooltip on mouseover", () => {
      global.simulateMouseEvent("mouseover", trigger, true, true)
      expect(tooltip).toMatchSnapshot()
    })
  })

  describe("#render -> Tooltip Focus/MouseOver", () => {
    let trigger
    let tooltip

    beforeEach(() => {
      document.body.innerHTML = dom

      trigger = document.querySelector(`[data-target='${"new-tooltip"}']`)
      tooltip = document.getElementById("new-tooltip")

      Undernet.Tooltips.start()
    })

    it("opens tooltip on focus", () => {
      trigger.focus()
      expect(tooltip).toMatchSnapshot()
    })

    it("opens tooltip on mouseover", () => {
      global.simulateMouseEvent("mouseover", trigger, true, true)
      expect(tooltip).toMatchSnapshot()
    })
  })

  describe("#handleClose -> Tooltip Blur/MouseOut", () => {
    let trigger1
    let trigger2
    let tooltip

    beforeEach(() => {
      document.body.innerHTML = dom

      trigger1 = document.querySelector(`[data-target='${"new-tooltip"}']`)
      trigger2 = document.querySelector(`[data-target='${"new-tooltip10"}']`)
      tooltip = document.getElementById("new-tooltip")

      Undernet.Tooltips.start()
    })

    it("hides tooltip on mouseout event", () => {
      // When
      global.simulateMouseEvent("mouseover", trigger1, true, true)
      global.simulateMouseEvent("mouseout", trigger1, true, true)
      // Then
      expect(tooltip).toMatchSnapshot()
    })

    it("hides first tooltip if second is focused", () => {
      // When
      trigger1.focus()
      trigger2.focus()
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("#handleClose -> Escape Key Press", () => {
    it("closes tooltip", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector(`[data-target='${"new-tooltip"}']`)
      const tooltip = document.getElementById("new-tooltip")
      // When
      Undernet.Tooltips.start()
      trigger.focus()
      global.simulateKeyPress(KeyCodes.ESCAPE)
      // Then
      expect(tooltip).toMatchSnapshot()
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

describe("Tooltip Error Handling", () => {
  it("throws error if [data-tooltip] is empty", () => {
    document.body.innerHTML = errorDom("new-tooltip", "", "new-tooltip")

    try {
      Undernet.Tooltips.start()
    } catch (e) {
      expect(e.message).toEqual("Could not find your tooltip's id.")
    }
  })

  it("throws error if [data-target] attribute does not match its parent [data-tooltip]", () => {
    document.body.innerHTML = errorDom("", "new-tooltip", "new-tooltip")

    try {
      Undernet.Tooltips.start()
    } catch (e) {
      expect(e.message).toEqual("Could not find a tooltip trigger with id of new-tooltip.")
    }
  })

  it("throws error if tooltip container's [id] does not match its parent [data-tooltip]", () => {
    document.body.innerHTML = errorDom("new-tooltip", "new-tooltip", "")

    try {
      Undernet.Tooltips.start()
    } catch (e) {
      expect(e.message).toEqual("Could not find a tooltip with id of new-tooltip.")
    }
  })
})
