import React, { createRef, useState, useEffect } from "react"
import { withLastLocation } from "react-router-last-location"
import PropTypes from "prop-types"

import { FOCUSABLE_TABINDEX, UNFOCUSABLE_TABINDEX } from "./constants"

const PageHeader = props => {
  const [tabIndex, setTabIndex] = useState(FOCUSABLE_TABINDEX)
  const headerRef = createRef()

  useEffect(() => {
    if (props.lastLocation) {
      headerRef.current.focus()
    } else {
      setTabIndex(UNFOCUSABLE_TABINDEX)
    }
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
  lastLocation: PropTypes.object,
}

export default withLastLocation(PageHeader)
