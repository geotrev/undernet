import Undernet from "../.."
import { find, renderDOM } from "../../helpers/test"
import { Messages } from "../constants"

const dom = `
  <div class="collapsible" data-collapsible="collapsible-id">
    <h5>
      <button id="collapsible-trigger-id" class="collapsible-trigger" data-target="collapsible-id">
        Collapsible Trigger
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-id">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate. <a href="#">E pluribus unum.</a>
      </p>
    </div>
  </div>
`

console.error = jest.fn()

describe("Collapsible", () => {
  let wrapper

  beforeEach(() => {
    wrapper = renderDOM(dom)
  })

  afterEach(() => {
    Undernet.Collapsibles.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // When
      Undernet.Collapsibles.start()
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("does not open collapsible by default if [data-visible='false'] is set", () => {
      find("[data-collapsible]").setAttribute("data-visible", "false")
      // When
      Undernet.Collapsibles.start()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("API stop + #handleClick", () => {
    it("does not toggle collapsible on click", () => {
      const trigger = find("button")
      // When
      Undernet.Collapsibles.start()
      Undernet.Collapsibles.stop()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    it("toggles collapsible on click", () => {
      const trigger = find("button")
      // When
      Undernet.Collapsibles.start()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })
})

const errorDom = (collapsibleId, collapsibleTriggerId, triggerId, contentId) => `
  <div class="collapsible" data-collapsible="${collapsibleId}">
    <h5>
      <button id="${triggerId}" class="collapsible-trigger" data-target="${collapsibleTriggerId}">
        Collapsible Trigger
      </button>
    </h5>
    <div class="collapsible-content" id="${contentId}">
      <p class="has-m">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate. <a href="#">E pluribus unum.</a>
      </p>
    </div>
  </div>
`

describe("Collapsible Warnings", () => {
  const COLLAPSIBLE_ID = "collapsible-id"
  const UNMATCHED_COLLAPSIBLE_ID = "collapsible-id-no-match"
  const COLLAPSIBLE_TRIGGER_ID = "collapsible-trigger-id"

  afterEach(() => {
    Undernet.Collapsibles.stop()
  })

  it("prints console error if [data-collapsible] attribute is missing its value", () => {
    // Given
    renderDOM(errorDom("", UNMATCHED_COLLAPSIBLE_ID, COLLAPSIBLE_TRIGGER_ID, COLLAPSIBLE_ID))
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_COLLAPSIBLE_ID_ERROR)
  })

  it("prints console error if [data-trigger] attribute can't be found", () => {
    // Given
    renderDOM(
      errorDom(COLLAPSIBLE_ID, UNMATCHED_COLLAPSIBLE_ID, COLLAPSIBLE_TRIGGER_ID, COLLAPSIBLE_ID)
    )
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_TRIGGER_ERROR(COLLAPSIBLE_ID))
  })

  it("prints console error if trigger id can't be found", () => {
    // Given
    renderDOM(errorDom(COLLAPSIBLE_ID, COLLAPSIBLE_ID, "", COLLAPSIBLE_ID))
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_TRIGGER_ID_ERROR(COLLAPSIBLE_ID))
  })

  it("prints console error if collapsible content can't be found", () => {
    // Given
    renderDOM(
      errorDom(COLLAPSIBLE_ID, COLLAPSIBLE_ID, COLLAPSIBLE_TRIGGER_ID, UNMATCHED_COLLAPSIBLE_ID)
    )
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_CONTENT_ERROR(COLLAPSIBLE_ID))
  })
})
