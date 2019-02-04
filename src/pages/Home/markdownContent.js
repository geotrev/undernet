import React from "react"
import Markdown from "react-markdown"
import Loadable from "react-loadable"

import installNpm from "./install-npm.md"
import installAssets from "./install-assets.md"

export const StatusBadges = Loadable({
  loader: () => import("./Badges"),
  loading: () => <span className="is-visually-hidden">Loading badges</span>,
})

export const InstallNpm = () => <Markdown source={installNpm} escapeHtml={false} />
export const InstallAssets = () => <Markdown source={installAssets} escapeHtml={false} />