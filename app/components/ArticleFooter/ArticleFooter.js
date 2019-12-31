import React from "react"
import PropTypes from "prop-types"

const PRISM_LANG_JS_CLASS = "language-s"

export default function ArticleFooter({ name, hasAPI }) {
  const renderAPIExamples = (scope = false) => {
    const scopeString = scope ? "#wrapper-element" : ""

    return <pre className={PRISM_LANG_JS_CLASS}>{`Undernet.${name}.start(${scopeString})`}</pre>
  }

  const renderComponentAPI = () => {
    if (!hasAPI) return

    return (
      <>
        <h3>API</h3>

        <p>
          {
            "Call one of the following scripts from Undernet's JavaScript (not both!). This should happen only once on page load."
          }
        </p>
        <pre className={PRISM_LANG_JS_CLASS}>{"Undernet.start()"}</pre>
        {renderAPIExamples()}

        <p>
          {
            "Alternatively, if you're using a UI framework like React, you can do any of the above API calls but pass a selector string to scope Undernet and its events within the corresponding element:"
          }
        </p>
        {renderAPIExamples(true)}
      </>
    )
  }

  return (
    <>
      {renderComponentAPI()}
      <hr />
      <p className="has-text-end">
        {"Is this article inaccurate? "}
        <a
          href={`https://github.com/geotrev/undernet/tree/master/app/docs/${name.toLowerCase()}.md`}
        >
          {"Edit this page on Github!"}
        </a>
      </p>
    </>
  )
}

ArticleFooter.propTypes = {
  name: PropTypes.string.isRequired,
  hasAPI: PropTypes.bool,
}
