import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"

import { titleTemplate } from "./constants"

export default function SetMeta(props) {
  return (
    <Helmet titleTemplate={titleTemplate("%s")}>
      <title itemProp="name" lang="en">
        {props.title}
      </title>

      <meta name="description" content={props.description} />

      {!props.pageNotFound && <link rel="canonical" href={window.location.href} />}
      {props.pageNotFound && <meta name="prerender-status-code" content="404" />}
    </Helmet>
  )
}

SetMeta.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  pageNotFound: PropTypes.bool,
}

SetMeta.defaultProps = {
  title: "Page Not Found",
  description: "",
  pageNotFound: false,
}
