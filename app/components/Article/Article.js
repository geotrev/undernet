import React, { useState } from "react"
import Markdown from "react-markdown"
import Prism from "prismjs"
import classNames from "classnames"
import PropTypes from "prop-types"
import Undernet from "undernet"

import ScrollUpOnMount from "app/components/ScrollUpOnMount"
import ArticleFooter from "app/components/ArticleFooter"
import { useDidMount, useWillUnmount } from "app/helpers"

const SCOPE = "#article"

export default function Article({ children, name, hasAPI }) {
  const [domIsLoaded, setDomIsLoaded] = useState(false)

  useDidMount(() => {
    Prism.highlightAll()
    Undernet.start(SCOPE)
    setDomIsLoaded(true)
  })

  useWillUnmount(() => Undernet.stop(SCOPE))

  return (
    <article
      id="article"
      className={classNames("article-wrapper has-no-p column", { fadeIn: domIsLoaded })}
    >
      <ScrollUpOnMount />
      <Markdown source={children} escapeHtml={false} />
      <ArticleFooter name={name} hasAPI={hasAPI} />
    </article>
  )
}

Article.propTypes = {
  children: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hasAPI: PropTypes.bool,
}
