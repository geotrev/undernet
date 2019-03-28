import React from "react"
import PropTypes from "prop-types"

function getTag(href) {
  return href ? "a" : "button"
}

function getType(href, type) {
  return href || !type ? null : type
}

function getDisabledStatus(disabled, href) {
  const warnMsg = "*** You can't use a `disabled` state on anchor tags ***"
  if (disabled) {
    return href ? console.warn(warnMsg) : disabled
  }
}

export default function Button(props) {
  const Tag = getTag(props.href)

  return (
    <Tag
      data-parent={props.dataParent}
      data-target={props.dataTarget}
      disabled={getDisabledStatus(props.disabled, props.href)}
      className={props.className}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onClick={props.onClick}
      href={props.href}
      type={getType(props.href, props.type)}
      tabIndex={props.tabIndex}
      id={props.id}
      role={props.role}
    >
      {props.children}
    </Tag>
  )
}

Button.propTypes = {
  href: PropTypes.string,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  tabIndex: PropTypes.number,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  className: PropTypes.string,
  dataParent: PropTypes.string,
  dataTarget: PropTypes.string,
  role: PropTypes.string,
  children: PropTypes.node.isRequired,
}
