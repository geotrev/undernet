import React from "react"
import Markdown from "react-markdown"
import statusBadges from "./badges.md"

const Badges = () => <Markdown source={statusBadges} escapeHtml={false} />

export default Badges
