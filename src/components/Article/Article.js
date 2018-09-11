import React, { Component } from "react"
import "./Article.scss"

import Markdown from "react-markdown"
import Prism from "prismjs"
import Undernet from "undernet"

export default class Article extends Component {
  constructor() {
    super()
  }

  componentPage() {
    const components = ["/modals", "/accordions"]

    components.map(urlStr => {
      if (window.location.href.includes(urlStr)) {
        return true
      }
    })

    return false
  }

  componentDidMount() {
    if (this.componentPage()) {
      Undernet.start()
    }

    Prism.highlightAll()
  }

  componentWillUnmount() {
    if (this.componentPage()) {
      Undernet.stop()
    }
  }

  render() {
    return (
      <article className="article-wrapper has-no-padding column">
        <Markdown source={this.props.children} escapeHtml={false} />
      </article>
    )
  }
}
