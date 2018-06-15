import React, { Component } from "react"
import "./Article.scss"

import Markdown from "react-markdown"
import Prism from "prismjs"

export default class Article extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Prism.highlightAll()
  }

  render() {
    return (
      <article className="article-wrapper collapsed column">
        <Markdown source={this.props.children} escapeHtml={false} />
      </article>
    )
  }
}
