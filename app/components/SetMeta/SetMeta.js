import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

export default class SetMeta extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    pageNotFound: PropTypes.bool,
  }

  static defaultProps = {
    title: "Page Not Found",
    description: "",
    pageNotFound: false,
  }

  render() {
    return (
      <Helmet titleTemplate="Undernet – %s">
        <title itemProp="name" lang="en">
          {this.props.title}
        </title>

        <meta name="description" content={this.props.description} />
        <link rel="canonical" href={window.location.href} />

        {this.props.pageNotFound && <meta name="prerender-status-code" content="404" />}
      </Helmet>
    )
  }
}
