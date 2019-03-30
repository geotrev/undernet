import React, { Component } from "react"
import Markdown from "react-markdown"
import Prism from "prismjs"
import Undernet from "undernet"
import classNames from "classnames"
import PropTypes from "prop-types"

import ScrollUpOnMount from "helpers/ScrollUpOnMount"
import "./styles.scss"

export default class Article extends Component {
  constructor() {
    super()
    this.state = {
      mounted: false,
    }
  }

  static propTypes = {
    children: PropTypes.any,
  }

  componentDidMount() {
    Undernet.start()
    Prism.highlightAll()

    this.setState({
      mounted: true,
    })
  }

  componentWillUnmount() {
    Undernet.stop()
  }

  render() {
    return (
      <article
        className={classNames("article-wrapper has-no-padding column", {
          fadeIn: this.state.mounted,
        })}
      >
        <ScrollUpOnMount />
        <Markdown source={this.props.children} escapeHtml={false} />
      </article>
    )
  }
}
