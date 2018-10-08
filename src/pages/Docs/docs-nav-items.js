import Routes from "routes"

export const ITEMS = [
  {
    header: "Overview",
    links: [
      { name: "Introduction", url: Routes.docs.overview.introduction },
      { name: "Download", url: Routes.docs.overview.download },
      { name: "Branding", url: Routes.docs.overview.branding },
      { name: "JavaScript", url: Routes.docs.overview.javascript },
      { name: "Accessibility", url: Routes.docs.overview.accessibility },
    ],
  },
  {
    header: "Elements",
    links: [
      { name: "Grid", url: Routes.docs.elements.grid },
      { name: "Typography", url: Routes.docs.elements.typography },
      { name: "Buttons", url: Routes.docs.elements.buttons },
      { name: "Forms", url: Routes.docs.elements.forms },
    ],
  },
  {
    header: "Components",
    links: [
      { name: "Modals", url: Routes.docs.components.modals },
      { name: "Accordions", url: Routes.docs.components.accordions },
    ],
  },
  {
    header: "Utilities",
    links: [
      { name: "Alignment", url: Routes.docs.utilities.alignment },
      { name: "Offset / Order", url: Routes.docs.utilities.offset_order },
      { name: "Text", url: Routes.docs.utilities.text },
      { name: "Display", url: Routes.docs.utilities.display },
      { name: "Color", url: Routes.docs.utilities.color },
      { name: "Spacing", url: Routes.docs.utilities.spacing },
    ],
  },
]
