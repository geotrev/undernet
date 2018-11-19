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
})
