import React from "react"
import Markdown from "react-markdown"
import Prism from "prismjs"
import Undernet from "undernet"
import classNames from "classnames"
import PropTypes from "prop-types"

import ScrollUpOnMount from "app/components/ScrollUpOnMount"

export default class Article extends React.Component {
  constructor() {
    super()

    this.state = {
      domIsLoaded: false,
    }
  }

  COMPONENTS = ["Tooltips", "Accordions", "Modals", "Dropdowns"]

  static propTypes = {
    children: PropTypes.any,
  }

  componentDidMount() {
    Prism.highlightAll()

    // initialize all Undernet components
    // DO NOT init focus outline - it is set up in layouts/Main
    this.COMPONENTS.forEach(component => Undernet[component].start())

    this.setState({ domIsLoaded: true })
  }

  componentWillUnmount() {
    this.COMPONENTS.forEach(component => Undernet[component].stop())
  }

  render() {
    return (
      <article
        className={classNames("article-wrapper has-no-padding column", {
          fadeIn: this.state.domIsLoaded,
        })}
      >
        <ScrollUpOnMount />
        <Markdown source={this.props.children} escapeHtml={false} />
      </article>
    )
  }
}
