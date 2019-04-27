import Undernet from "../src/index"

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
  describe("API start", () => {
    let button
    let menu

    beforeAll(() => {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      menu = document.querySelector("#new-dropdown")
      Undernet.Dropdowns.start()
    })

    it("sets [aria-controls] on button equal to menu id", () => {
      expect(button.getAttribute("aria-controls")).toEqual(menu.id)
    })

    it("sets [aria-haspopup='true'] on button", () => {
      expect(button.getAttribute("aria-haspopup")).toEqual("true")
    })

    it("sets [aria-expanded='false'] on button", () => {
      expect(button.getAttribute("aria-expanded")).toEqual("false")
    })

    it("sets [aria-labelledby] on menu equal to button id", () => {
      expect(menu.getAttribute("aria-labelledby")).toEqual(button.id)
    })
  })

  describe("API stop -> Dropdown Button Click", () => {
    let button
    let dropdownWrapper

    beforeAll(() => {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      Undernet.Dropdowns.stop()
      button.click()
    })

    it("sets [aria-expanded='false'] on button", () => {
      expect(button.getAttribute("aria-expanded")).toEqual("false")
    })

    it("does not set [data-visible] on dropdown wrapper", () => {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual(null)
    })
  })

  describe("#render -> Dropdown Button Click", () => {
    let button
    let dropdownWrapper
    let focusableElements

    beforeAll(() => {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = document.querySelectorAll("#new-dropdown a")
      Undernet.Dropdowns.start()
      button.click()
    })

    it("sets [aria-expanded='true'] on button", () => {
      expect(button.getAttribute("aria-expanded")).toEqual("true")
    })

    it("sets [data-visible='true'] on dropdown wrapper", () => {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("true")
    })

    it("sets [tabindex='0'] on each dropdown menu link", () => {
      focusableElements.forEach(item => {
        expect(item.getAttribute("tabindex")).toEqual("0")
      })
    })

    it("sets focus to the first dropdown link", () => {
      expect(document.activeElement).toEqual(focusableElements[0])
    })
  })

  describe("#renderWithKeys -> Arrow Down or Up Key Press", () => {
    let button
    let dropdownWrapper
    let focusableElements
    let firstDropdownItem
    let lastDropdownItem

    beforeEach(() => {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = document.querySelectorAll("#new-dropdown a")
      firstDropdownItem = focusableElements[0]
      lastDropdownItem = focusableElements[focusableElements.length - 1]

      Undernet.Dropdowns.stop()
      Undernet.Dropdowns.start()
    })

    it("sets [data-visible='true'] on dropdown wrapper", () => {
      global.simulateKeyPress(40, false, button)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("true")
    })

    it("sets [data-visible='true'] on dropdown wrapper", () => {
      global.simulateKeyPress(38, false, button)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("true")
    })

    it("sets focus to first item in dropdown menu when arrow down key is pressed", () => {
      global.simulateKeyPress(40, false, button)
      expect(document.activeElement).toEqual(firstDropdownItem)
    })

    it("sets focus to first item in dropdown menu when arrow down key is pressed", () => {
      global.simulateKeyPress(38, false, button)
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
      firstDropdownItem = document.querySelectorAll("#new-dropdown a")[0]
      lastDropdownItem = document.querySelectorAll("#new-dropdown a")[2]

      Undernet.Dropdowns.start()
      button.click()
    })

    it("sets [data-vislble='false'] on dropdown wrapper if shift + tab key is pressed in open menu", () => {
      global.simulateKeyPress(9, true, firstDropdownItem)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })

    it("sets [data-visible='false'] on dropdown wrapper if tab key is pressed in open menu", () => {
      global.simulateKeyPress(9, false, lastDropdownItem)
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
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
      focusableElements = document.querySelectorAll("#new-dropdown a")

      Undernet.Dropdowns.start()
      button.click()
      focusableElements[0].click()
    })

    it("sets [data-visible='false'] on dropdown wrapper", () => {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })

    it("sets [aria-expanded='false'] on dropdown button", () => {
      expect(button.getAttribute("aria-expanded")).toEqual("false")
    })

    it("sets [tabindex='-1'] on each dropdown menu link", () => {
      focusableElements.forEach(item => {
        expect(item.getAttribute("tabindex")).toEqual("-1")
      })
    })

    it("sets focus back to dropdown button", () => {
      expect(document.activeElement).toEqual(button)
    })
  })

  describe("#handleEscapeKeyPress -> Escape Key Press", () => {
    let button
    let dropdownWrapper

    beforeAll(() => {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      button.click()
      global.simulateKeyPress(27)
    })

    it("sets [data-visible='false'] on dropdown wrapper", () => {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleOffMenuClick -> Non-Dropdown Close Click", () => {
    let button
    let dropdownWrapper

    beforeAll(() => {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      button.click()
      document.body.click()
    })

    it("sets [data-visible='false'] on dropdown wrapper", () => {
      expect(dropdownWrapper.getAttribute("data-visible")).toEqual("false")
    })
  })

  describe("#handleReturnFocus -> Dropdown Close Click", () => {
    let button

    beforeAll(() => {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      Undernet.Dropdowns.start()
      button.click()
      global.simulateKeyPress(27)
    })

    it("sets focus to dropdown button after dropdown menu is closed", () => {
      expect(document.activeElement).toEqual(button)
    })
  })

  describe("Multiple Dropdowns", () => {
    let button1
    let button2
    let dropdownWrapper1
    let dropdownWrapper2

    beforeAll(() => {
      document.body.innerHTML = dom
      button1 = document.querySelector("#dropdown-button")
      button2 = document.querySelector("#dropdown-button2")
      dropdownWrapper1 = document.querySelector("[data-dropdown='dropdown1']")
      dropdownWrapper2 = document.querySelector("[data-dropdown='dropdown2']")
      Undernet.Dropdowns.start()
    })

    it("closes first dropdown if second dropdown is clicked", () => {
      button1.click()
      expect(dropdownWrapper1.getAttribute("data-visible")).toEqual("true")
      expect(dropdownWrapper2.getAttribute("data-visible")).toEqual(null)
      button2.click()
      expect(dropdownWrapper1.getAttribute("data-visible")).toEqual("false")
      expect(dropdownWrapper2.getAttribute("data-visible")).toEqual("true")
    })

    it("sets focus to first dropdown item of second dropdown", () => {
      const dropdown2Focusables = dropdownWrapper2.querySelectorAll("a")
      button1.click()
      button2.click()
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
