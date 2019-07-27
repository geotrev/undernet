import Undernet from "../"
import { getFocusableElements } from "../utils"

const dom = `
  <div data-dropdown="dropdown1" class="dropdown">
    <button id="dropdown-button" data-parent="dropdown1" data-target="new-dropdown">Open Dropdown</button>
    <ul id="new-dropdown" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
      <li><a href="#">Item 2</a></li>
      <li><a href="#">Item 3</a></li>
    </ul>
  </div>
  <div data-dropdown="dropdown2" class="dropdown">
    <button id="dropdown-button2" data-parent="dropdown2" data-target="new-dropdown2">Open Dropdown 2</button>
    <ul id="new-dropdown2" class="dropdown-menu">
      <li><a href="#">Item 1</a></li>
    </ul>
  </div>
`

describe("Dropdowns", () => {
  afterEach(() => {
    Undernet.Dropdowns.stop()
  })

  describe("API start", () => {
    it("sets attributes on all dropdowns", () => {
      // Given
      document.body.innerHTML = dom
      // When
      Undernet.Dropdowns.start()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("API stop -> Dropdown Button Click", () => {
    it("does not set attributes on any dropdown", () => {
      // Given
      document.body.innerHTML = dom
      // When
      Undernet.Dropdowns.start()
      Undernet.Dropdowns.stop()
      document.querySelector("#dropdown-button").click()
      // Then
      expect(document.body).toMatchSnapshot()
    })
  })

  describe("#render -> Dropdown Button Click", () => {
    beforeEach(() => {
      document.body.innerHTML = dom
      Undernet.Dropdowns.start()
      document.querySelector("#dropdown-button").click()
    })

    it("displays clicked dropdown", () => {
      expect(document.body).toMatchSnapshot()
    })

    it("sets focus to the first dropdown link", () => {
      const focusableElements = getFocusableElements("#new-dropdown")
      expect(document.activeElement).toEqual(focusableElements[0])
    })
  })

  describe("#renderWithKeys -> Arrow Down or Up Key Press", () => {
    let button
    let firstDropdownItem
    let lastDropdownItem

    beforeEach(() => {
      document.body.innerHTML = dom
      button = document.getElementById("dropdown-button")
      const focusableElements = getFocusableElements("#new-dropdown")
      firstDropdownItem = focusableElements[0]
      lastDropdownItem = focusableElements[focusableElements.length - 1]
      Undernet.Dropdowns.start()
    })

    it("displays dropdown on down arrow key press", () => {
      // When
      global.simulateKeyPress(40, false, button)
      // Then
      expect(document.body).toMatchSnapshot()
    })

    it("displays dropdown on up arrow key press", () => {
      // When
      global.simulateKeyPress(38, false, button)
      // Then
      expect(document.body).toMatchSnapshot()
    })

    it("sets focus to first item in dropdown menu on down arrow key press", () => {
      // When
      global.simulateKeyPress(40, false, button)
      // Then
      expect(document.activeElement).toEqual(firstDropdownItem)
    })

    it("sets focus to first item in dropdown menu on up arrow key press", () => {
      // When
      global.simulateKeyPress(38, false, button)
      // Then
      expect(document.activeElement).toEqual(lastDropdownItem)
    })
  })

  describe("#handleFirstTabClose & #handleLastTabClose", () => {
    let button
    let dropdownWrapper
    let firstDropdownItem
    let lastDropdownItem

    beforeEach(() => {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      firstDropdownItem = getFocusableElements("#new-dropdown")[0]
      lastDropdownItem = getFocusableElements("#new-dropdown")[2]

      Undernet.Dropdowns.start()
      button.click()
    })

    it("displays dropdown if shift + tab key is pressed in open menu", () => {
      // When
      global.simulateKeyPress(9, true, firstDropdownItem)
      // Then
      expect(dropdownWrapper).toMatchSnapshot()
    })

    it("displays dropdown if tab key is pressed in open menu", () => {
      // When
      global.simulateKeyPress(9, false, lastDropdownItem)
      // Then
      expect(dropdownWrapper).toMatchSnapshot()
    })
  })

  describe("#handleClose -> Dropdown Menu Link Click", () => {
    let button
    let dropdownWrapper
    let focusableElements

    beforeAll(() => {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = getFocusableElements("#new-dropdown")

      Undernet.Dropdowns.start()
      button.click()
      focusableElements[0].click()
    })

    it("closes dropdown", () => {
      expect(dropdownWrapper).toMatchSnapshot()
    })

    it("sets focus back to dropdown button", () => {
      expect(document.activeElement).toEqual(button)
    })
  })

  describe("#handleEscapeKeyPress -> Escape Key Press", () => {
    it("closes dropdown", () => {
      // Given
      document.body.innerHTML = dom
      const button = document.querySelector("#dropdown-button")
      const dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      // When
      Undernet.Dropdowns.start()
      button.click()
      global.simulateKeyPress(27)
      // Then
      expect(dropdownWrapper).toMatchSnapshot()
    })
  })

  describe("#handleOffMenuClick -> Non-Dropdown Close Click", () => {
    it("closes dropdown", () => {
      // Given
      document.body.innerHTML = dom
      const button = document.querySelector("#dropdown-button")
      // When
      const dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      button.click()
      document.body.click()
      // Then
      expect(dropdownWrapper).toMatchSnapshot()
    })
  })

  describe("#handleReturnFocus -> Dropdown Close Click", () => {
    it("sets focus to dropdown button after dropdown menu is closed", () => {
      // Given
      document.body.innerHTML = dom
      const button = document.querySelector("#dropdown-button")
      // When
      Undernet.Dropdowns.start()
      button.click()
      global.simulateKeyPress(27)
      // Then
      expect(document.activeElement).toEqual(button)
    })
  })

  describe("Multiple Dropdowns", () => {
    let button1
    let button2
    let dropdownWrapper2

    beforeEach(() => {
      document.body.innerHTML = dom
      button1 = document.querySelector("#dropdown-button")
      button2 = document.querySelector("#dropdown-button2")
      dropdownWrapper2 = document.querySelector("[data-dropdown='dropdown2']")
      Undernet.Dropdowns.start()
      button1.click()
      button2.click()
    })

    it("closes first dropdown if second dropdown is clicked", () => {
      expect(document.body).toMatchSnapshot()
    })

    it("sets focus to first dropdown item of second dropdown", () => {
      const dropdown2Focusables = getFocusableElements("#new-dropdown2")
      expect(document.activeElement).toEqual(dropdown2Focusables[0])
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

describe("Dropdown Error Handling", () => {
  it("throws error if dropdown id can't be found", () => {
    document.body.innerHTML = errorDom("", "button", "dropdown", "new-dropdown", "new-dropdown")

    try {
      Undernet.Dropdowns.start()
    } catch (e) {
      expect(e.message).toEqual(
        "Could not setup dropdown. Make sure it has a valid [data-dropdown] attribute with a unique id as its value."
      )
    }
  })

  it("throws error if dropdown menu can't be found", () => {
    document.body.innerHTML = errorDom(
      "dropdown",
      "button",
      "dropdown",
      "new-dropdown",
      "new-dropdown",
      false
    )

    try {
      Undernet.Dropdowns.start()
    } catch (e) {
      expect(e.message).toEqual('Could not find menu associated with [data-dropdown="dropdown"].')
    }
  })

  it("throws error if dropdown items can't be found", () => {
    document.body.innerHTML = errorDom(
      "dropdown",
      "button",
      "dropdown",
      "new-dropdown",
      "new-dropdown",
      true,
      false
    )

    try {
      Undernet.Dropdowns.start()
    } catch (e) {
      expect(e.message).toEqual(
        'Could not find any list items associated with [data-dropdown="dropdown"].'
      )
    }
  })

  it("throws error if dropdown buttons or links can't be found", () => {
    document.body.innerHTML = errorDom(
      "dropdown",
      "button",
      "dropdown",
      "new-dropdown",
      "new-dropdown",
      true,
      true,
      false
    )

    try {
      Undernet.Dropdowns.start()
    } catch (e) {
      expect(e.message).toEqual(
        'Could not find any button or anchor elements associated with [data-dropdown="dropdown"].'
      )
    }
  })

  it("throws error if dropdown trigger's [data-target] attribute cant' be found", () => {
    document.body.innerHTML = errorDom("dropdown", "button", "", "new-dropdown", "new-dropdown")

    try {
      Undernet.Dropdowns.start()
    } catch (e) {
      expect(e.message).toEqual("Could not find dropdown button's [data-parent] attribute.")
    }
  })
})
