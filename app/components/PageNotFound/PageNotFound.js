import React from "react"

import SetMeta from "app/components/SetMeta"

const PageNotFound = () => {
  return (
    <div className="has-p-xl has-text-center">
      <SetMeta pageNotFound={true} />
      <h1>{"Sorry, that page doesn't exist. :("}</h1>
      <p className="has-no-m-block-end">{"Did you enter the URL correctly?"}</p>
    </div>
  )
}

export default PageNotFound
