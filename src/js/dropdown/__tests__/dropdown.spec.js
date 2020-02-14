import Undernet from "../../"
import { renderDOM, simulateKeyboardEvent } from "../../helpers/test"
import { KeyCodes, Messages } from "../constants"

const dom = `
  <div data-dropdown="dropdown-id-1" class="dropdown">
    <button id="trigger-id-1" data-parent="dropdown-id-1" data-target="new-dropdown">Open Dropdown</button>
    <ul id="new-dropdown" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
      <li><a href="#">Item 3</a></li>
    </ul>
  </div>
  <div data-dropdown="dropdown2" class="dropdown">
    <button id="trigger-id-2" data-parent="dropdown2" data-target="dropdown-id-2">Open Dropdown 2</button>
    <ul id="dropdown-id-2" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
    </ul>
  </div>
`

console.error = jest.fn()

describe("Dropdown", () => {
  afterEach(() => {
    Undernet.Dropdowns.stop()
  })

  describe("API start", () => {
    it("sets attributes", () => {
      // Given
      const wrapper = renderDOM(dom)
      // When
      Undernet.Dropdowns.start()
      // Then
      expect(wrapper).toMatchSnapshot()
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
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger = document.querySelector("#trigger-id-1")

      Undernet.Dropdowns.start()
      trigger.click()
    })

    it("opens clicked dropdown", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to the first dropdown link", () => {
      const firstItem = document.querySelector("#new-dropdown a")
      expect(document.activeElement).toEqual(firstItem)
    })
  })

  describe("#handleArrowKeyPress", () => {
    let wrapper, trigger, firstItem, lastItem

    beforeEach(() => {
      wrapper = renderDOM(dom)

      trigger = document.querySelector("#trigger-id-1")
      const items = document.querySelectorAll("#new-dropdown a")
      firstItem = items[0]
      lastItem = items[items.length - 1]

      Undernet.Dropdowns.start()
    })

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
      const items = document.querySelectorAll("#new-dropdown a")
      firstItem = items[0]
      lastItem = items[items.length - 1]

      Undernet.Dropdowns.start()
      trigger.click()
    })

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
      document.querySelector("#new-dropdown a").click()
    })

    it("closes dropdown", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus back to dropdown button", () => {
      expect(document.activeElement).toEqual(trigger)
    })

    it("removes tabindex when trigger loses focus", () => {
      trigger.blur()
      expect(trigger.hasAttribute("tabindex")).toBe(false)
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
    })
  })

  describe("Multiple Dropdowns", () => {
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger1 = document.querySelector("#trigger-id-1")
      const trigger2 = document.querySelector("#trigger-id-2")

      Undernet.Dropdowns.start()
      trigger1.click()
      trigger2.click()
    })

    it("closes first dropdown if second dropdown is clicked", () => {
      expect(wrapper).toMatchSnapshot()
    })

    it("sets focus to first dropdown item of second dropdown", () => {
      const firstItem = document.querySelector("#dropdown-id-2 a")
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
