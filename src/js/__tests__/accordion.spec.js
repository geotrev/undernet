import Undernet from "../"

const dom = `
  <div data-accordion="accordion-1" class="accordion">
    <div class="accordion-row" data-visible="true" data-accordion-row="content-1">
      <h5>
        <button id="button-1" data-parent="accordion-1" class="accordion-button" data-target="content-1">
          Accordion Button 1
        </button>
      </h5>
      <div class="accordion-content" id="content-1">
        <p class="has-m">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="accordion-row" data-visible="false" data-accordion-row="content-2">
      <h5>
        <button id="button-2" data-parent="accordion-1" class="accordion-button" data-target="content-2">
          Accordion Button 2
        </button>
      </h5>
      <div class="accordion-content" id="content-2">
        <p class="has-m">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordions", () => {
  afterEach(() => {
    Undernet.Accordions.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      document.body.innerHTML = dom
      // When
      Undernet.Accordions.start()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("API stop -> Accordion Button Click", () => {
    it("does not open accordion", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("#button-2")
      const content = document.querySelector("#content-2")
      // When
      Undernet.Accordions.start()
      Undernet.Accordions.stop()
      trigger.click()
      // Then
      expect(content).toMatchSnapshot()
    })
  })

  describe("#render -> Accordion Button Click (no toggle multiple)", () => {
    it("opens clicked accordion and closes all others", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("#button-2")
      // When
      Undernet.Accordions.start()
      trigger.click()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("#render -> Accordion Button Click (toggle multiple)", () => {
    it("opens clicked accordion and doesn't close the others", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("#button-2")
      document
        .querySelector("[data-accordion='accordion-1']")
        .setAttribute("data-toggle-multiple", null)
      // When
      Undernet.Accordions.start()
      trigger.click()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })
})

const errorDom = (accordion, accordionRow, headerId, target, parent, contentId, visible = true) => `
  <div data-accordion="${accordion}" class="accordion">
    <div class="accordion-row" ${
      visible ? 'data-visible="false" ' : ""
    }data-accordion-row="${accordionRow}">
      <h5>
        <button id="${headerId}" data-parent='${parent}' class="accordion-button" data-target="${target}">
          Accordion Button 1
        </button>
      </h5>
      <div class="accordion-content" id="${contentId}">
        <p class="has-m">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordion Error Handling", () => {
  it("throws error if [data-visible] attribute can't be found", () => {
    document.body.innerHTML = errorDom(
      "new-accordion",
      "content",
      "button",
      "content",
      "new-accordion",
      "content",
      false
    )

    try {
      Undernet.Accordions.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not find accordion row with [data-visible] attribute associated with [data-target='content']."
      )
    }
  })

  it("throws error if [data-accordion-row] attribute can't be found", () => {
    document.body.innerHTML = errorDom(
      "new-accordion",
      "",
      "button",
      "content",
      "new-accordion",
      "content"
    )

    try {
      Undernet.Accordions.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not find [data-accordion-row] associated with [data-target='content']."
      )
    }
  })

  it("throws error if button header id can't be found", () => {
    document.body.innerHTML = errorDom(
      "new-accordion",
      "content",
      "",
      "content",
      "new-accordion",
      "content"
    )

    try {
      Undernet.Accordions.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not find an id on your header associated with [data-accordion-row='content']."
      )
    }
  })

  // Why won't these pass?

  it("throws error if [data-parent] on trigger can't be found", () => {
    document.body.innerHTML = errorDom(
      "new-accordion",
      "content",
      "button",
      "content",
      "",
      "content"
    )

    try {
      Undernet.Accordions.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not find [data-accordion] attribute associated with [data-target='content']."
      )
    }
  })

  it("throws error if content can't be found", () => {
    document.body.innerHTML = errorDom(
      "new-accordion",
      "content",
      "button",
      "content",
      "new-accordion",
      ""
    )

    try {
      Undernet.Accordions.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not find accordion content block with id 'content'; should match trigger with [data-target='content']."
      )
    }
  })
})
