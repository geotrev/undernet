import React from "react"
import Loadable from "react-loadable"
import { LoadingSpinner } from "components"

export const Introduction = Loadable({
  loader: () => import("./introduction.js"),
  loading: () => <LoadingSpinner />,
})

export const Download = Loadable({
  loader: () => import("./download.js"),
  loading: () => <LoadingSpinner />,
})

export const Branding = Loadable({
  loader: () => import("./branding.js"),
  loading: () => <LoadingSpinner />,
})

export const JavaScript = Loadable({
  loader: () => import("./javascript.js"),
  loading: () => <LoadingSpinner />,
})

export const Accessibility = Loadable({
  loader: () => import("./accessibility.js"),
  loading: () => <LoadingSpinner />,
})

export const Grid = Loadable({
  loader: () => import("./grid.js"),
  loading: () => <LoadingSpinner />,
})

export const Typography = Loadable({
  loader: () => import("./typography.js"),
  loading: () => <LoadingSpinner />,
})

export const Buttons = Loadable({
  loader: () => import("./buttons.js"),
  loading: () => <LoadingSpinner />,
})

export const Forms = Loadable({
  loader: () => import("./forms.js"),
  loading: () => <LoadingSpinner />,
})

export const Modals = Loadable({
  loader: () => import("./modals.js"),
  loading: () => <LoadingSpinner />,
})

export const Accordions = Loadable({
  loader: () => import("./accordions.js"),
  loading: () => <LoadingSpinner />,
})

export const Alignment = Loadable({
  loader: () => import("./alignment.js"),
  loading: () => <LoadingSpinner />,
})

export const OffsetOrder = Loadable({
  loader: () => import("./offset_order.js"),
  loading: () => <LoadingSpinner />,
})

export const Text = Loadable({
  loader: () => import("./text.js"),
  loading: () => <LoadingSpinner />,
})

export const Display = Loadable({
  loader: () => import("./display.js"),
  loading: () => <LoadingSpinner />,
})

export const Color = Loadable({
  loader: () => import("./color.js"),
  loading: () => <LoadingSpinner />,
})

export const Spacing = Loadable({
  loader: () => import("./spacing.js"),
  loading: () => <LoadingSpinner />,
})
