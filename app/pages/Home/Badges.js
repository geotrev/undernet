import React from "react"
import Markdown from "react-markdown"
import statusBadges from "./markdown/badges.md"

const Badges = () => <Markdown source={statusBadges} escapeHtml={false} />

export default Badges
