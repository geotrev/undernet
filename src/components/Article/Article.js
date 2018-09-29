import React, { Component } from "react"
import "./Article.scss"

import { ScrollUpOnMount } from "helpers"
import Markdown from "react-markdown"
import Prism from "prismjs"
import Undernet from "undernet"

export default class Article extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Undernet.start()
    Prism.highlightAll()
  }

  componentWillUnmount() {
    Undernet.stop()
  }

  render() {
    return (
      <article className="article-wrapper has-no-padding column">
        <ScrollUpOnMount />
        <Markdown source={this.props.children} escapeHtml={false} />
      </article>
    )
  }
}
