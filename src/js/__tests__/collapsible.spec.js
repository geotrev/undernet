import Undernet from "../"
import { find, renderDOM } from "./helpers"

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
      expect(wrapper()).toMatchSnapshot()
    })

    it("does not open collapsible by default if [data-visible='false'] is set", () => {
      find("[data-collapsible]").setAttribute("data-visible", "false")
      // When
      Undernet.Collapsibles.start()
      // Then
      expect(wrapper()).toMatchSnapshot()
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
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    it("toggles collapsible on click", () => {
      const trigger = find("button")
      // When
      Undernet.Collapsibles.start()
      trigger.click()
      // Then
      expect(wrapper()).toMatchSnapshot()
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
  const collapsibleId = "collapsible-id"
  const unMatchedCollapsibleId = "collapsible-id-no-match"
  const triggerId = "collapsible-trigger-id"

  beforeAll(() => {
    console.warning = jest.fn()
  })

  afterEach(() => {
    Undernet.Collapsibles.stop()
  })

  it("throws error if [data-collapsible] attribute is missing its value", () => {
    // Given
    renderDOM(errorDom("", unMatchedCollapsibleId, triggerId, collapsibleId))
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.warning).toBeCalledWith(
      "Could not initialize collapsible; you must include a value for the 'data-collapsible' attribute."
    )
  })

  it("throws error if [data-trigger] attribute can't be found", () => {
    // Given
    renderDOM(errorDom(collapsibleId, unMatchedCollapsibleId, triggerId, collapsibleId))
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.warning).toBeCalledWith(
      `Could not find collapsible trigger with [data-target='${collapsibleId}']; you can't have a collapsible without a trigger.`
    )
  })

  it("throws error if trigger id can't be found", () => {
    // Given
    renderDOM(errorDom(collapsibleId, collapsibleId, "", collapsibleId))
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.warning).toBeCalledWith(
      `Could not find id on collapsible trigger with [data-target='${collapsibleId}'].`
    )
  })

  it("throws error if collapsible content can't be found", () => {
    // Given
    renderDOM(errorDom(collapsibleId, collapsibleId, triggerId, unMatchedCollapsibleId))
    // When
    Undernet.Collapsibles.start()
    // Then
    expect(console.warning).toBeCalledWith(
      `Could not find collapsible content with id '${collapsibleId}'; you can't have a collapsible without content.`
    )
  })
})
