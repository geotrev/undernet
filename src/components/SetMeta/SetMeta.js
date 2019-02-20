import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

const SetMeta = ({ title, description }) => (
  <Helmet titleTemplate="Undernet – %s">
    <title itemProp="name" lang="en">
      {title}
    </title>
    <meta name="description" content={description} />
    <link rel="canonical" href={window.location.href} />
  </Helmet>
)

SetMeta.proptypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default SetMeta
