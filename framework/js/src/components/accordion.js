"use strict"

import Utils from "../utils"

const keyCodes = {
  SPACE: 32,
}

const selectors = {
  ACCORDION_CONTAINER: "data-accordion",
  ACCORDION_EXPANDED: "data-accordion-expanded",
  ACCORDION_BUTTON: "data-accordion-button",
  ACCORDION_CONTENT: "data-accordion-content",
  ACCORDION_MULTIPLE: "data-accordion-toggle-multiple",
  ARIA_EXPANDED: "aria-expanded",
  ARIA_HIDDEN: "aria-hidden",
  ROLE: "role",
}

const events = {
  CLICK: "click",
  KEYDOWN: "keydown",
}

const messages = {
  MISSING_ACCORDION_CONTENT:
    "You have an accordion button that is missing its content block or its [data-accordion-content] attribute.",
  MISSING_ACCORDION_BUTTONS:
    "You have an accordion component with no [data-accordion-button] children.",
}

export default class Accordion extends Utils {
  constructor() {
    super()
    this.accordionButtons = this.getElements(`[${selectors.ACCORDION_BUTTON}]`)
    this.accordionContents = this.getElements(`[${selectors.ACCORDION_CONTENT}]`)
    this.activeContainer = null

    // bind events to class
    this.getAccordion = this.getAccordion.bind(this)
    this.handleSpaceKeyPress = this.handleSpaceKeyPress.bind(this)
  }

  start() {
    if (this.accordionButtons.length) {
      this.accordionButtons.forEach(button => {
        button.setAttribute(selectors.ROLE, "heading")

        const expandState = button.parentNode.parentNode.getAttribute(selectors.ACCORDION_EXPANDED)
        const buttonContent = button.parentNode.nextElementSibling

        if (expandState === "true") {
          buttonContent.style.maxHeight = `${buttonContent.scrollHeight}px`
          button.setAttribute(selectors.ARIA_EXPANDED, "true")
        } else {
          button.setAttribute(selectors.ARIA_EXPANDED, "false")
        }

        button.addEventListener(events.CLICK, this.getAccordion)
        button.addEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
      })
    }

    if (this.accordionContents.length) {
      this.accordionContents.forEach(content => {
        content.setAttribute(selectors.ROLE, "region")
        const contentHiddenState = content.parentNode.getAttribute(selectors.ACCORDION_EXPANDED)
        const toggleContentHiddenState = contentHiddenState === "true" ? "false" : "true"
        content.setAttribute(selectors.ARIA_HIDDEN, toggleContentHiddenState)
      })
    }
  }

  stop() {
    this.accordionButtons.forEach(button => {
      button.removeEventListener(events.CLICK, this.getAccordion)
      button.removeEventListener(events.KEYDOWN, this.handleSpaceKeyPress)
    })
  }

  getAccordion(event) {
    event.preventDefault()
    this.renderAccordionContent(event)
  }

  renderAccordionContent(event) {
    this.activeButton = event.target
    const activeContentId = this.activeButton.getAttribute(selectors.ACCORDION_BUTTON)

    this.activeRow = this.activeButton.parentNode.parentNode
    this.activeContainerId = this.activeButton.getAttribute("data-accordion-parent")
    this.activeContainerSelector = `[${selectors.ACCORDION_CONTAINER}='${this.activeContainerId}']`
    this.activeContainer = document.querySelector(this.activeContainerSelector)
    this.activeContent = document.getElementById(activeContentId)

    const accordionContentHasAttr = this.activeContent.hasAttribute(selectors.ACCORDION_CONTENT)
    if (!accordionContentHasAttr) {
      throw messages.MISSING_ACCORDION_CONTENT
      return
    }

    const accordionButtonState = this.activeRow.getAttribute(selectors.ACCORDION_EXPANDED)
    const accordionContentState = this.activeContent.getAttribute(selectors.ACCORDION_CONTENT)

    this.toggleExpandState = accordionButtonState === "true" ? "false" : "true"
    this.toggleContentState = accordionContentState === "visible" ? "hidden" : "visible"
    this.toggleHiddenState = this.toggleExpandState === "false" ? "true" : "false"

    this.closeAllIfToggleable()
    this.toggleSelectedAccordion()
  }

  handleSpaceKeyPress(event) {
    if (event.which === keyCodes.SPACE) this.getAccordion(event)
  }

  closeAllIfToggleable() {
    if (this.activeContainer.hasAttribute(selectors.ACCORDION_MULTIPLE)) return

    const allRows = this.getElements(
      `${this.activeContainerSelector} [${selectors.ACCORDION_EXPANDED}]`,
    )

    const allContent = this.getElements(
      `${this.activeContainerSelector} [${selectors.ACCORDION_CONTENT}]`,
    )

    const allButtons = this.getElements(
      `${this.activeContainerSelector} [${selectors.ACCORDION_BUTTON}]`,
    )

    allContent.forEach(content => {
      if (!(content === this.activeContent)) content.style.maxHeight = null
    })

    this.toggleAttributeInCollection(allRows, selectors.ACCORDION_EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allButtons, selectors.ARIA_EXPANDED, "true", "false")
    this.toggleAttributeInCollection(allContent, selectors.ARIA_HIDDEN, "false", "true")
    this.toggleAttributeInCollection(allContent, selectors.ACCORDION_CONTENT, "visible", "hidden")
  }

  toggleSelectedAccordion() {
    this.activeRow.setAttribute(selectors.ACCORDION_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.ACCORDION_CONTENT, this.toggleContentState)
    this.activeButton.setAttribute(selectors.ARIA_EXPANDED, this.toggleExpandState)
    this.activeContent.setAttribute(selectors.ARIA_HIDDEN, this.toggleHiddenState)

    this.activeContent.style.maxHeight
      ? (this.activeContent.style.maxHeight = null)
      : (this.activeContent.style.maxHeight = `${this.activeContent.scrollHeight}px`)
  }

  toggleAttributeInCollection(elements, selector, firstAttr, secondAttr) {
    elements.forEach(element => {
      if (element.hasAttribute(selector, firstAttr)) {
        element.setAttribute(selector, secondAttr)
      }
    })
  }
}
