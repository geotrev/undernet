import React, { useState, useEffect } from "react"
import Markdown from "react-markdown"
import Prism from "prismjs"
import classNames from "classnames"
import PropTypes from "prop-types"

import Undernet from "undernet"
import { COMPONENTS } from "./constants"
import ScrollUpOnMount from "app/components/ScrollUpOnMount"

export default function Article(props) {
  const [domIsLoaded, setDomIsLoaded] = useState(false)

  const componentUnmountFunction = () => {
    COMPONENTS.forEach(component => Undernet[component].stop())
  }

  useEffect(() => {
    Prism.highlightAll()
    COMPONENTS.forEach(component => Undernet[component].start())
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
  children: PropTypes.any,
}
