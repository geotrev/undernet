import {
  introductionPath,
  downloadPath,
  brandingPath,
  javascriptPath,
  accessibilityPath,
  gridPath,
  typographyPath,
  buttonsPath,
  formsPath,
  modalsPath,
  accordionsPath,
  alignmentPath,
  offsetOrderPath,
  textPath,
  displayPath,
  colorPath,
  spacingPath,
} from "routes"

export const ITEMS = [
  {
    header: "Overview",
    links: [
      { name: "Introduction", url: introductionPath },
      { name: "Download", url: downloadPath },
      { name: "Branding", url: brandingPath },
      { name: "JavaScript", url: javascriptPath },
      { name: "Accessibility", url: accessibilityPath },
    ],
  },
  {
    header: "Elements",
    links: [
      { name: "Grid", url: gridPath },
      { name: "Typography", url: typographyPath },
      { name: "Buttons", url: buttonsPath },
      { name: "Forms", url: formsPath },
    ],
  },
  {
    header: "Components",
    links: [{ name: "Modals", url: modalsPath }, { name: "Accordions", url: accordionsPath }],
  },
  {
    header: "Utilities",
    links: [
      { name: "Alignment", url: alignmentPath },
      { name: "Offset / Order", url: offsetOrderPath },
      { name: "Text", url: textPath },
      { name: "Display", url: displayPath },
      { name: "Color", url: colorPath },
      { name: "Spacing", url: spacingPath },
    ],
  },
]
