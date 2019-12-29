import React, { useState } from "react"
import Markdown from "react-markdown"
import Prism from "prismjs"
import classNames from "classnames"
import PropTypes from "prop-types"
import Undernet from "undernet"

import ScrollUpOnMount from "app/components/ScrollUpOnMount"
import { useDidMount, useWillUnmount } from "app/helpers"

const SCOPE = "#article"

export default function Article(props) {
  const [domIsLoaded, setDomIsLoaded] = useState(false)

  useWillUnmount(() => Undernet.stop(SCOPE))

  useDidMount(() => {
    Prism.highlightAll()
    Undernet.start(SCOPE)
    setDomIsLoaded(true)
  })

  return (
    <article
      id="article"
      className={classNames("article-wrapper has-no-p column", { fadeIn: domIsLoaded })}
    >
      <ScrollUpOnMount />
      <Markdown source={props.children} escapeHtml={false} />
    </article>
  )
}

Article.propTypes = {
  children: PropTypes.string.isRequired,
}
