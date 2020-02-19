import Undernet from "../../"
import { renderDOM, simulateKeyboardEvent } from "../../helpers/test"
import { KeyCodes, Messages } from "../constants"

const dom = `
  <div data-dropdown="dropdown-1" class="dropdown">
    <button id="trigger-id-1" data-parent="dropdown-1" data-target="dropdown-menu-1">Open Dropdown</button>
    <ul id="dropdown-menu-1" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
      <li><a href="#">Item 3</a></li>
    </ul>
  </div>
`

console.error = jest.fn()

describe("Dropdown", () => {
  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      const wrapper = renderDOM(dom)
      // When
      Undernet.Dropdowns.start()
      // Then
      expect(wrapper).toMatchSnapshot()
      Undernet.Dropdowns.stop()
    })
  })

  describe("API stop + #handleClick", () => {
    it("does not open dropdown", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = document.querySelector("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      Undernet.Dropdowns.stop()
      trigger.click()
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    let wrapper, firstItem

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger = document.querySelector("#trigger-id-1")
      firstItem = document.querySelector("#dropdown-menu-1 a")

      Undernet.Dropdowns.start()
      trigger.click()
    })

    afterEach(() => Undernet.Dropdowns.stop())

    it("opens clicked dropdown", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to the first dropdown link", () => {
      expect(document.activeElement).toEqual(firstItem)
    })
  })

  describe("#handleArrowKeyPress", () => {
    let wrapper, trigger, firstItem, lastItem

    beforeEach(() => {
      wrapper = renderDOM(dom)

      trigger = document.querySelector("#trigger-id-1")
      const items = document.querySelectorAll("#dropdown-menu-1 a")
      firstItem = items[0]
      lastItem = items[items.length - 1]

      Undernet.Dropdowns.start()
    })

    afterEach(() => Undernet.Dropdowns.stop())

    it("opens dropdown on down arrow key press", () => {
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_DOWN, false, trigger)
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("opens dropdown on up arrow key press", () => {
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_UP, false, trigger)
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to first item in dropdown menu on down arrow key press", () => {
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_DOWN, false, trigger)
      // Then
      expect(document.activeElement).toEqual(firstItem)
    })

    it("sets focus to first item in dropdown menu on up arrow key press", () => {
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_UP, false, trigger)
      // Then
      expect(document.activeElement).toEqual(lastItem)
    })
  })

  describe("#handleFirstTabClose & #handleLastTabClose", () => {
    let wrapper, firstItem, lastItem

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger = document.querySelector("#trigger-id-1")
      const items = document.querySelectorAll("#dropdown-menu-1 a")
      firstItem = items[0]
      lastItem = items[items.length - 1]

      Undernet.Dropdowns.start()
      trigger.click()
    })

    afterEach(() => Undernet.Dropdowns.stop())

    it("closes dropdown if shift + tab key is pressed in open menu while first child is focused", () => {
      // When
      simulateKeyboardEvent(KeyCodes.TAB, true, firstItem)
      // Then
      expect(wrapper).toMatchSnapshot()
    })

    it("closes dropdown if tab key is pressed in open menu while last child is focused", () => {
      // When
      simulateKeyboardEvent(KeyCodes.TAB, false, lastItem)
      // Then
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe("#handleClose", () => {
    let wrapper
    let trigger

    beforeEach(() => {
      wrapper = renderDOM(dom)

      trigger = document.querySelector("#trigger-id-1")

      Undernet.Dropdowns.start()
      trigger.click()
      document.querySelector("#dropdown-menu-1 a").click()
    })

    afterEach(() => Undernet.Dropdowns.stop())

    it("closes dropdown", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus back to dropdown button", () => {
      expect(document.activeElement).toEqual(trigger)
    })
  })

  describe("#handleEscapeKeyPress", () => {
    it("closes dropdown", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = document.querySelector("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      trigger.click()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(wrapper).toMatchSnapshot()
      Undernet.Dropdowns.stop()
    })
  })

  describe("#handleOffMenuClick", () => {
    it("closes dropdown", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = document.querySelector("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      trigger.click()
      document.querySelector("body").click()
      // Then
      expect(wrapper).toMatchSnapshot()
      Undernet.Dropdowns.stop()
    })
  })

  describe("#handleReturnFocus", () => {
    it("sets focus to dropdown trigger", () => {
      // Given
      renderDOM(dom)
      const trigger = document.querySelector("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      trigger.click()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(document.activeElement).toEqual(trigger)
      Undernet.Dropdowns.stop()
    })
  })

  describe("Multiple Dropdowns", () => {
    let wrapper

    beforeEach(() => {
      const newDOM = dom.concat(`
        <div data-dropdown="dropdown-2" class="dropdown">
          <button id="trigger-id-2" data-parent="dropdown-2" data-target="dropdown-menu-2">Open Dropdown 2</button>
          <ul id="dropdown-menu-2" class="dropdown-menu">
            <li><a href="#">Item 1</a></li>
          </ul>
        </div>
      `)
      wrapper = renderDOM(newDOM)

      const trigger1 = document.querySelector("#trigger-id-1")
      const trigger2 = document.querySelector("#trigger-id-2")

      Undernet.Dropdowns.start()
      trigger1.click()
      trigger2.click()
    })

    afterEach(() => Undernet.Dropdowns.stop())

    it("closes first dropdown if second dropdown is clicked", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to first dropdown item of second dropdown", () => {
      const firstItem = document.querySelector("#dropdown-menu-2 a")
      expect(document.activeElement).toEqual(firstItem)
    })
  })
})

// prettier-ignore
const errorDom = (
  dropdown,
  buttonId,
  parent,
  target,
  menuId,
  hasUl = true,
  hasItems = true,
  hasButtons = true
) => `
  <div data-dropdown="${dropdown}" class="dropdown">
    <button id="${buttonId}" data-parent="${parent}" data-target="${target}">Open Dropdown 2</button>
    ${hasUl && `<ul id="${menuId}" class="dropdown-menu">
      ${hasItems && `<li>
        ${hasButtons && `<a href="#">Item 1</a>` || ""}
      </li>` || ""}
    </ul>` || ""}
  </div>
`

describe("Dropdown Warnings", () => {
  const DROPDOWN_ATTR = '[data-dropdown="dropdown-id"]'

  it("prints console error if dropdown id can't be found", () => {
    // Given
    renderDOM(errorDom("", "trigger-id", "dropdown-id", "menu-id", "menu-id"))
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_DROPDOWN_ID_ERROR)
  })

  it("prints console error if dropdown menu can't be found", () => {
    // Given
    renderDOM(errorDom("dropdown-id", "trigger-id", "dropdown-id", "menu-id", "menu-id", false))
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_MENU_ERROR(DROPDOWN_ATTR))
  })

  it("prints console error if dropdown items can't be found", () => {
    // Given
    renderDOM(
      errorDom("dropdown-id", "trigger-id", "dropdown-id", "menu-id", "menu-id", true, false)
    )
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_DROPDOWN_ITEMS_ERROR(DROPDOWN_ATTR))
  })

  it("prints console error if dropdown buttons or links can't be found", () => {
    // Given
    renderDOM(
      errorDom("dropdown-id", "trigger-id", "dropdown-id", "menu-id", "menu-id", true, true, false)
    )
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_DROPDOWN_ACTIONS_ERROR(DROPDOWN_ATTR))
  })

  it("prints console error if dropdown trigger's [data-target] attribute cant' be found", () => {
    // Given
    renderDOM(errorDom("dropdown-id", "trigger-id", "", "menu-id", "menu-id"))
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.error).toBeCalledWith(Messages.NO_PARENT_ERROR)
  })
})
