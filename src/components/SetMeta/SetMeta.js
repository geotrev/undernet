import React from "react"
import { Helmet } from "react-helmet"

export default function SetMeta({ title, description }) {
  return (
    <Helmet titleTemplate="Undernet – %s">
      <title itemProp="name" lang="en">
        {title}
      </title>
      <meta name="description" content={description} />
      <link rel="canonical" href={window.location.href} />
    </Helmet>
  )
}
