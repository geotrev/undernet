import Undernet from "../"
import { getFocusableElements } from "../utils"
import { find, renderDOM, simulateKeyboardEvent } from "./helpers"

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

const KeyCodes = {
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ESCAPE: 27,
  TAB: 9,
}

const activeElement = () => document.activeElement

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
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("API stop + #handleClick", () => {
    it("does not open dropdown", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      Undernet.Dropdowns.stop()
      trigger.click()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("#handleClick", () => {
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger = find("#trigger-id-1")

      Undernet.Dropdowns.start()
      trigger.click()
    })

    it("opens clicked dropdown", () => {
      expect(wrapper()).toMatchSnapshot()
    })

    it("sets focus to the first dropdown link", () => {
      const focusableElements = getFocusableElements("#new-dropdown")
      expect(activeElement()).toEqual(focusableElements[0])
    })
  })

  describe("#handleArrowKeyPress", () => {
    let wrapper
    let trigger
    let focusableElements

    beforeEach(() => {
      wrapper = renderDOM(dom)

      trigger = find("#trigger-id-1")
      focusableElements = getFocusableElements("#new-dropdown")

      Undernet.Dropdowns.start()
    })

    it("opens dropdown on down arrow key press", () => {
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_DOWN, false, trigger)
      // Then
      expect(wrapper()).toMatchSnapshot()
    })

    it("opens dropdown on up arrow key press", () => {
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_UP, false, trigger)
      // Then
      expect(wrapper()).toMatchSnapshot()
    })

    it("sets focus to first item in dropdown menu on down arrow key press", () => {
      // Given
      const firstDropdownItem = focusableElements[0]
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_DOWN, false, trigger)
      // Then
      expect(activeElement()).toEqual(firstDropdownItem)
    })

    it("sets focus to first item in dropdown menu on up arrow key press", () => {
      // Given
      const lastDropdownItem = focusableElements[focusableElements.length - 1]
      // When
      simulateKeyboardEvent(KeyCodes.ARROW_UP, false, trigger)
      // Then
      expect(activeElement()).toEqual(lastDropdownItem)
    })
  })

  describe("#handleFirstTabClose & #handleLastTabClose", () => {
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger = find("#trigger-id-1")

      Undernet.Dropdowns.start()
      trigger.click()
    })

    it("closes dropdown if shift + tab key is pressed in open menu", () => {
      // Given
      const firstDropdownItem = getFocusableElements("#new-dropdown")[0]
      // When
      simulateKeyboardEvent(KeyCodes.TAB, true, firstDropdownItem)
      // Then
      expect(wrapper()).toMatchSnapshot()
    })

    it("closes dropdown if tab key is pressed in open menu", () => {
      // Given
      const dropdownMenuItems = getFocusableElements("#new-dropdown")
      const lastDropdownItem = dropdownMenuItems[dropdownMenuItems.length - 1]
      // When
      simulateKeyboardEvent(KeyCodes.TAB, false, lastDropdownItem)
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("#handleClose", () => {
    let wrapper
    let trigger

    beforeEach(() => {
      wrapper = renderDOM(dom)

      trigger = find("#trigger-id-1")
      const focusableElements = getFocusableElements("#new-dropdown")

      Undernet.Dropdowns.start()
      trigger.click()
      focusableElements[0].click()
    })

    it("closes dropdown", () => {
      expect(wrapper()).toMatchSnapshot()
    })

    it("sets focus back to dropdown button", () => {
      expect(activeElement()).toEqual(trigger)
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
      const trigger = find("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      trigger.click()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("#handleOffMenuClick", () => {
    it("closes dropdown", () => {
      // Given
      const wrapper = renderDOM(dom)
      const trigger = find("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      trigger.click()
      find("body").click()
      // Then
      expect(wrapper()).toMatchSnapshot()
    })
  })

  describe("#handleReturnFocus", () => {
    it("sets focus to dropdown trigger", () => {
      // Given
      renderDOM(dom)
      const trigger = find("#trigger-id-1")
      // When
      Undernet.Dropdowns.start()
      trigger.click()
      simulateKeyboardEvent(KeyCodes.ESCAPE)
      // Then
      expect(activeElement()).toEqual(trigger)
    })
  })

  describe("Multiple Dropdowns", () => {
    let wrapper

    beforeEach(() => {
      wrapper = renderDOM(dom)

      const trigger1 = find("#trigger-id-1")
      const trigger2 = find("#trigger-id-2")

      Undernet.Dropdowns.start()
      trigger1.click()
      trigger2.click()
    })

    it("closes first dropdown if second dropdown is clicked", () => {
      expect(wrapper()).toMatchSnapshot()
    })

    it("sets focus to first dropdown item of second dropdown", () => {
      const dropdown2Focusables = getFocusableElements("#dropdown-id-2")
      expect(activeElement()).toEqual(dropdown2Focusables[0])
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
    ${hasUl &&
      `<ul id="${menuId}" class="dropdown-menu">
      ${hasItems &&
        `<li>
        ${hasButtons && `<a href="#">Item 1</a>` || ""}
      </li>` || ""}
    </ul>` || ""}
  </div>
`

describe("Dropdown Warnings", () => {
  beforeAll(() => {
    console.warning = jest.fn()
  })

  it("prints warning if dropdown id can't be found", () => {
    // Given
    renderDOM(errorDom("", "trigger-id", "dropdown-id", "menu-id", "menu-id"))
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.warning).toBeCalledWith(
      "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value."
    )
  })

  it("prints warning if dropdown menu can't be found", () => {
    // Given
    renderDOM(errorDom("dropdown-id", "trigger-id", "dropdown-id", "menu-id", "menu-id", false))
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.warning).toBeCalledWith(
      'Could not find menu associated with [data-dropdown="dropdown-id"].'
    )
  })

  it("prints warning if dropdown items can't be found", () => {
    // Given
    renderDOM(
      errorDom("dropdown-id", "trigger-id", "dropdown-id", "menu-id", "menu-id", true, false)
    )
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.warning).toBeCalledWith(
      'Could not find any list items associated with [data-dropdown="dropdown-id"].'
    )
  })

  it("prints warning if dropdown buttons or links can't be found", () => {
    // Given
    renderDOM(
      errorDom("dropdown-id", "trigger-id", "dropdown-id", "menu-id", "menu-id", true, true, false)
    )
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.warning).toBeCalledWith(
      'Could not find any button or anchor elements associated with [data-dropdown="dropdown-id"].'
    )
  })

  it("prints warning if dropdown trigger's [data-target] attribute cant' be found", () => {
    // Given
    renderDOM(errorDom("dropdown-id", "trigger-id", "", "menu-id", "menu-id"))
    // When
    Undernet.Dropdowns.start()
    // Then
    expect(console.warning).toBeCalledWith(
      "Could not find dropdown button's [data-parent] attribute."
    )
  })
})
