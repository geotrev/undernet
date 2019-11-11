import Undernet from "../"

const dom = `
  <div data-accordion="accordion-id" class="accordion">
    <div class="collapsible" data-collapsible="collapsible-id-1">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="accordion-id" data-target="collapsible-id-1">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-1">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="collapsible" data-collapsible="collapsible-id-2" data-visible="false">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="accordion-id" data-target="collapsible-id-2">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-2">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordion", () => {
  let wrapper

  beforeEach(() => {
    wrapper = () => document.querySelector("[data-accordion='accordion-id']")
  })

  afterEach(() => Undernet.Accordions.stop())

  describe("API start", () => {
    beforeEach(() => {
      document.body.innerHTML = dom
    })

    it("sets attributes on collapsibles", () => {
      Undernet.Accordions.start()
      expect(wrapper()).toMatchSnapshot()
    })

    it("can open multiple collapsibles initially", () => {
      // Given
      document
        .querySelector("[data-collapsible='collapsible-id-2']")
        .removeAttribute("data-visible")
      // When
      Undernet.Accordions.start()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("API stop -> handleClick", () => {
    it("does not toggle collapsible", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target='collapsible-id-2']")
      // When
      Undernet.Accordions.start()
      Undernet.Accordions.stop()
      trigger.click()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    it("opens closed collapsible", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target='collapsible-id-2']")
      // When
      Undernet.Accordions.start()
      trigger.click()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })

    it("closes open collapsible", () => {
      // Given
      document.body.innerHTML = dom
      const trigger = document.querySelector("[data-target='collapsible-id-1']")
      // When
      Undernet.Accordions.start()
      trigger.click()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })

    describe("Multiple visible by default", () => {
      beforeEach(() => {
        document.body.innerHTML = dom
        wrapper()
          .querySelector("[data-collapsible='collapsible-id-2']")
          .removeAttribute("data-visible")
      })

      describe("open collapsible click", () => {
        it("keeps other collapsibles open", () => {
          // Given
          const trigger = document.querySelector("[data-target='collapsible-id-1']")
          Undernet.Accordions.start()
          // When
          trigger.click()
          // Then
          expect(wrapper()).toMatchSnapshot()
        })
      })

      describe("closed collapsible click", () => {
        it("closes other collapsibles", () => {
          // Given
          const trigger = document.querySelector("[data-target='collapsible-id-1']")
          Undernet.Accordions.start()
          // When
          // close collapsible
          trigger.click()
          // re-open collapsible
          trigger.click()
          // Then
          expect(wrapper()).toMatchSnapshot()
        })
      })
    })
  })

  describe("#setToggleMultiple", () => {
    beforeEach(() => {
      document.body.innerHTML = dom
      wrapper().setAttribute("data-toggle-multiple", null)
    })

    it("retains visible state of unselected collapsibles on click", () => {
      // Given
      const trigger = document.querySelector("[data-target='collapsible-id-2']")
      Undernet.Accordions.start()
      // When
      trigger.click()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })
})

const errorDom = (accordionId = "", parentId = "") => `
  <div data-accordion="${accordionId}" class="accordion">
    <div class="collapsible" data-collapsible="collapsible-id-1">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="${parentId}" data-target="collapsible-id-1">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-1">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
    <div class="collapsible" data-collapsible="collapsible-id-2">
      <h5>
        <button id="collapsible-trigger-id" class="collapsible-trigger" data-parent="accordion-id" data-target="collapsible-id-2">
          Collapsible Trigger
        </button>
      </h5>
      <div class="collapsible-content" id="collapsible-id-2">
        <p class="has-p">
          Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
          ipsum ut voluptate. <a href="#">E pluribus unum.</a>
        </p>
      </div>
    </div>
  </div>
`

describe("Accordion Error Handling", () => {
  beforeEach(() => {
    console.warn = jest.fn()
  })

  afterEach(() => {
    Undernet.Accordions.stop()
  })

  it("logs warning if accordion id can't be found", () => {
    // Given
    const noIdWarning =
      "Could not initialize accordion; you must include a value for the 'data-accordion' attribute."
    document.body.innerHTML = errorDom("accordion-id", "")
    const trigger = document.querySelector("[data-target='collapsible-id-1']")
    // When
    Undernet.Accordions.start()
    trigger.click()
    // Then
    expect(console.warn).toBeCalledWith(noIdWarning)
  })

  it("logs warning if accordion element can't be found", () => {
    // Given
    const noAccordionWarning = "Could not find element matching [data-accordion='accordion-id']"
    document.body.innerHTML = errorDom("", "accordion-id")
    const trigger = document.querySelector("[data-target='collapsible-id-1']")
    // When
    Undernet.Accordions.start()
    trigger.click()
    // Then
    expect(console.warn).toBeCalledWith(noAccordionWarning)
  })
})
