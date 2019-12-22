import { docPages } from "app/routes"

export const NAV_DATA = [
  {
    header: "Overview",
    links: [
      { name: "Introduction", url: docPages.introduction },
      { name: "Download", url: docPages.download },
      { name: "CSS", url: docPages.css },
      { name: "JavaScript", url: docPages.javascript },
    ],
  },
  {
    header: "Layout",
    links: [
      { name: "Flex Grid", url: docPages.grid },
      { name: "Alignment", url: docPages.alignment },
      { name: "Offset / Order", url: docPages.offsetOrder },
      { name: "Spacing", url: docPages.spacing },
    ],
  },
  {
    header: "Elements",
    links: [
      { name: "Buttons", url: docPages.buttons },
      { name: "Forms", url: docPages.forms },
      { name: "Typography", url: docPages.typography },
    ],
  },
  {
    header: "Components",
    links: [
      { name: "Collapsibles", url: docPages.collapsibles },
      { name: "Accordions", url: docPages.accordions },
      { name: "Dropdowns", url: docPages.dropdowns },
      { name: "Modals", url: docPages.modals },
      { name: "Tooltips", url: docPages.tooltips },
    ],
  },
  {
    header: "Utilities",
    links: [
      { name: "Color", url: docPages.color },
      { name: "Display", url: docPages.display },
      { name: "Text", url: docPages.text },
    ],
  },
]
