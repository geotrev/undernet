import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import Prism from "prismjs"
import classNames from "classnames"
import PropTypes from "prop-types"

import { COMPONENTS } from "./constants"
import ScrollUpOnMount from "app/components/ScrollUpOnMount"

export default function Article(props) {
  const [domIsLoaded, setDomIsLoaded] = useState(false)

  const componentUnmountFunction = () => {
    COMPONENTS.forEach(Component => Component.stop())
  }

  useEffect(() => {
    Prism.highlightAll()
    COMPONENTS.forEach(Component => Component.start())
    setDomIsLoaded(true)

    return componentUnmountFunction
  }, [])

  return (
    <article
      className={classNames("article-wrapper has-no-padding column", {
        fadeIn: domIsLoaded,
      })}
    >
      <ScrollUpOnMount />
      <Markdown source={props.children} escapeHtml={false} />
    </article>
  )
}

Article.propTypes = {
  children: PropTypes.string.isRequired,
}
