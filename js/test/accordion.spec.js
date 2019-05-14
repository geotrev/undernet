import Undernet from "../src/index"

const dom = `
  <div data-accordion="accordion-1" class="accordion">
    <div class="accordion-row" data-visible="true" data-accordion-row="content-1">
      <h5>
        <button id="button-1" data-parent="accordion-1" class="accordion-button" data-target="content-1">
          Accordion Button 1
        </button>
      </h5>
      <div class="accordion-content" id="content-1">
        <p class="has-margin">
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
        <p class="has-margin">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordions", () => {
  describe("API start", () => {
    let buttons
    let contents

    beforeAll(() => {
      document.body.innerHTML = dom
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
    })

    it("sets unique [aria-labelledby] on each accordion content matching its button's id", () => {
      contents.forEach(content => {
        const button = content.previousElementSibling.children[0]
        expect(content.getAttribute("aria-labelledby")).toEqual(button.id)
      })
    })

    it("sets [aria-controls] with matching value to each accordion content id", () => {
      buttons.forEach(button => {
        const content = button.parentNode.nextElementSibling
        expect(button.getAttribute("aria-controls")).toEqual(content.id)
      })
    })

    it("sets [aria-hidden='false'] on each accordion content when [data-visible='true']", () => {
      expect(contents[0].getAttribute("aria-hidden")).toEqual("false")
    })

    it("sets [aria-hidden='true'] on each accordion content when [data-visible='false']", () => {
      expect(contents[1].getAttribute("aria-hidden")).toEqual("true")
    })

    it("sets [aria-expanded='true'] on each accordion button when [data-visible='true']", () => {
      expect(buttons[0].getAttribute("aria-expanded")).toEqual("true")
    })

    it("sets [aria-expanded='false'] on each accordion button when [data-visible='false']", () => {
      expect(buttons[1].getAttribute("aria-expanded")).toEqual("false")
    })

    it("sets max-height on each accordion content when [data-visible='true']", () => {
      expect(contents[0].style.maxHeight).toMatch(/px/)
    })

    it("does not set max-height on each accordion content when [data-visible='false']", () => {
      expect(contents[1].style.maxHeight).toEqual("")
    })

    it("sets [tabindex='0'] on each focusable child within accordion content when [data-visible='true']", () => {
      const children = contents[0].querySelectorAll("a")
      children.forEach(child => {
        expect(child.getAttribute("tabindex")).toEqual("0")
      })
    })

    it("sets [tabindex='-1'] on each focusable child within accordion content when [data-visible='false']", () => {
      const children1 = contents[1].querySelectorAll("a")
      children1.forEach(child => expect(child.getAttribute("tabindex")).toEqual("-1"))
    })
  })

  describe("API stop -> Accordion Button Click", () => {
    let buttons
    let contents

    beforeAll(() => {
      document.body.innerHTML = dom
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
      Undernet.Accordions.stop()
    })

    it("does not set [aria-hidden='false'] on accordion content on button click", () => {
      expect(contents[1].getAttribute("aria-hidden")).toEqual("true")
    })

    it("does not set [aria-expanded='true'] on accordion button on click", () => {
      expect(buttons[1].getAttribute("aria-expanded")).toEqual("false")
    })
  })

  describe("#render -> Accordion Button Click (no toggle-multiple)", () => {
    describe("Button content is expanded", () => {
      let buttons
      let contents
      let rows

      beforeAll(() => {
        document.body.innerHTML = dom
        buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
        contents = document.querySelectorAll(".accordion-content")
        rows = document.querySelectorAll("[data-accordion-row]")
        Undernet.Accordions.start()
        buttons[1].click()
      })

      it("sets [data-visible='true'] on accordion row", () => {
        expect(rows[0].getAttribute("data-visible")).toEqual("false")
        expect(rows[1].getAttribute("data-visible")).toEqual("true")
      })

      it("sets [aria-hidden='false'] on accordion content", () => {
        expect(contents[0].getAttribute("aria-hidden")).toEqual("true")
        expect(contents[1].getAttribute("aria-hidden")).toEqual("false")
      })

      it("sets [aria-expanded='true'] on accordion", () => {
        expect(buttons[0].getAttribute("aria-expanded")).toEqual("false")
        expect(buttons[1].getAttribute("aria-expanded")).toEqual("true")
      })

      it("sets max-height on accordion", () => {
        expect(contents[0].style.maxHeight).toEqual("")
        expect(contents[1].style.maxHeight).toMatch(/px/)
      })
    })
  })

  describe("Toggle Multiple -> Accordion Button Click", () => {
    let buttons
    let contents

    beforeAll(() => {
      document.body.innerHTML = dom
      document
        .querySelector("[data-accordion='accordion-1']")
        .setAttribute("data-toggle-multiple", null)
      buttons = document.querySelectorAll("[data-accordion-row] [data-target]")
      contents = document.querySelectorAll(".accordion-content")
      Undernet.Accordions.start()
      buttons[1].click()
    })

    it("has [aria-hidden='false'] on accordion content", () => {
      expect(contents[0].getAttribute("aria-hidden")).toEqual("false")
      expect(contents[1].getAttribute("aria-hidden")).toEqual("false")
    })

    it("has [aria-expanded='true'] on accordion button", () => {
      expect(buttons[0].getAttribute("aria-expanded")).toEqual("true")
      expect(buttons[1].getAttribute("aria-expanded")).toEqual("true")
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
        <p class="has-margin">
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
