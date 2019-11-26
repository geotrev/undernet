import { docPages } from "app/routes"

const {
  introduction,
  download,
  css,
  javascript,
  grid,
  typography,
  buttons,
  forms,
  modals,
  collapsibles,
  accordions,
  dropdowns,
  tooltips,
  alignment,
  offsetOrder,
  text,
  display,
  color,
  spacing,
} = docPages

export const NAV_DATA = [
  {
    header: "Overview",
    links: [
      { name: "Introduction", url: introduction },
      { name: "Download", url: download },
      { name: "CSS", url: css },
      { name: "JavaScript", url: javascript },
    ],
  },
  {
    header: "Layout",
    links: [
      { name: "Flex Grid", url: grid },
      { name: "Alignment", url: alignment },
      { name: "Offset / Order", url: offsetOrder },
      { name: "Spacing", url: spacing },
    ],
  },
  {
    header: "Elements",
    links: [
      { name: "Buttons", url: buttons },
      { name: "Forms", url: forms },
      { name: "Typography", url: typography },
    ],
  },
  {
    header: "Components",
    links: [
      { name: "Collapsibles", url: collapsibles },
      { name: "Accordions", url: accordions },
      { name: "Dropdowns", url: dropdowns },
      { name: "Modals", url: modals },
      { name: "Tooltips", url: tooltips },
    ],
  },
  {
    header: "Utilities",
    links: [
      { name: "Color", url: color },
      { name: "Display", url: display },
      { name: "Text", url: text },
    ],
  },
]
