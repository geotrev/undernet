import React from "react"
import { Helmet } from "react-helmet"

export default function SetTitle({ title, description }) {
  return (
    <Helmet titleTemplate="Undernet – %s">
      <title itemProp="name" lang="en">
        {title}
      </title>
      <meta name="description" content={description} />
    </Helmet>
  )
}
