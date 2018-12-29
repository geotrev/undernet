// This is the starting DOM.
// It is assigned to document.body.innerHTML before each test suite.
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

describe("Dropdowns", function() {
  describe("API #start", function() {
    let button
    let menu

    before(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      menu = document.querySelector("#new-dropdown")
      Undernet.Dropdowns.start()
    })

    it("sets [aria-controls] on button equal to menu id", function() {
      expect(button.getAttribute("aria-controls")).to.equal(menu.id)
    })

    it("sets [aria-haspopup='true'] on button", function() {
      expect(button.getAttribute("aria-haspopup")).to.equal("true")
    })

    it("sets [aria-expanded='false'] on button", function() {
      expect(button.getAttribute("aria-expanded")).to.equal("false")
    })

    it("sets [aria-labelledby] on menu equal to button id", function() {
      expect(menu.getAttribute("aria-labelledby")).to.equal(button.id)
    })
  })

  describe("API #stop -> Dropdown Button Click", function() {
    let button
    let dropdownWrapper

    before(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      Undernet.Dropdowns.stop()
      button.click()
    })

    it("sets [aria-expanded='false'] on button", function() {
      expect(button.getAttribute("aria-expanded")).to.equal("false")
    })

    it("does not set [data-visible] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).to.equal(null)
    })
  })

  describe("#_render -> Dropdown Button Click", function() {
    let button
    let dropdownWrapper

    before(function() {
      document.body.innerHTML = dom
      button = document.querySelector("#dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      Undernet.Dropdowns.start()
      button.click()
    })

    it("sets [aria-expanded='true'] on button", function() {
      expect(button.getAttribute("aria-expanded")).to.equal("true")
    })

    it("sets [data-visible='true'] on dropdown wrapper", function() {
      expect(dropdownWrapper.getAttribute("data-visible")).to.equal("true")
    })

    it("sets focus to the first dropdown link", function() {
      const focusableElements = document.querySelectorAll("#new-dropdown a")
      expect(document.activeElement).to.equal(focusableElements[0])
    })
  })

  describe("#_renderWithKeys", function() {
    let button
    let dropdownWrapper
    let focusableElements
    let firstDropdownItem
    let lastDropdownItem

    beforeEach(function() {
      document.body.innerHTML = dom

      button = document.getElementById("dropdown-button")
      dropdownWrapper = document.querySelector("[data-dropdown='dropdown1']")
      focusableElements = document.querySelectorAll("#new-dropdown a")
      firstDropdownItem = focusableElements[0]
      lastDropdownItem = focusableElements[focusableElements.length - 1]

      Undernet.Dropdowns.stop()
      Undernet.Dropdowns.start()
      button.focus()
    })

    it("sets [data-visible='true'] on dropdown wrapper", function() {
      window.simulateKeyPress(40)
      expect(dropdownWrapper.getAttribute("data-visible")).to.equal("true")
    })

    it("sets [data-visible='true'] on dropdown wrapper", function() {
      window.simulateKeyPress(38)
      expect(dropdownWrapper.getAttribute("data-visible")).to.equal("true")
    })

    it("sets focus to first item in dropdown menu when arrow down key is pressed", function() {
      window.simulateKeyPress(40)
      expect(document.activeElement).to.equal(firstDropdownItem)
    })

    it("sets focus to first item in dropdown menu when arrow down key is pressed", function() {
      window.simulateKeyPress(38)
      expect(document.activeElement).to.equal(lastDropdownItem)
    })
  })

  describe("#_handleFirstTabClose", function() {})
  describe("#_handleLastTabClose", function() {})
  describe("#_handleClose", function() {})
  describe("#_handleEscapeKeyPress", function() {})
  describe("#_handleOffMenuClick", function() {})
  describe("#_handleReturnFocus", function() {})
  describe("#_getDropdownLinks", function() {})
  describe("#_setupDropdown", function() {})
})
