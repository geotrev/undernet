import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

export default class SetMeta extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Helmet titleTemplate="Undernet – %s">
        <title itemProp="name" lang="en">
          {this.props.title}
        </title>
        <meta name="description" content={this.props.description} />
        <link rel="canonical" href={window.location.href} />
      </Helmet>
    )
  }
}
