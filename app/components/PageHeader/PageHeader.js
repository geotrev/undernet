import React, { createRef, useState, useEffect } from "react"
import { withLastLocation } from "react-router-last-location"
import PropTypes from "prop-types"

import { FOCUSABLE_TABINDEX, UNFOCUSABLE_TABINDEX } from "./constants"

const PageHeader = props => {
  const [tabIndex, setTabIndex] = useState(UNFOCUSABLE_TABINDEX)
  const headerRef = createRef()

  useEffect(() => {
    if (tabIndex === FOCUSABLE_TABINDEX) {
      headerRef.current.focus()
    }
  }, [tabIndex])

  useEffect(() => {
    if (props.lastLocation) setTabIndex(FOCUSABLE_TABINDEX)
  }, [])

  const handleBlur = () => {
    if (tabIndex === UNFOCUSABLE_TABINDEX) return
    setTabIndex(UNFOCUSABLE_TABINDEX)
  }

  return (
    <h1 onBlur={handleBlur} tabIndex={tabIndex} ref={headerRef} className={props.className}>
      {props.children}
    </h1>
  )
}

PageHeader.propTypes = {
  children: PropTypes.any.isRequired,
  className: PropTypes.string,
  history: PropTypes.object,
  lastLocation: PropTypes.object,
}

export default withLastLocation(PageHeader)
