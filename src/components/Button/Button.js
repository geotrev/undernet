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

export default function Button({
  href,
  disabled,
  type,
  id,
  tabIndex,
  onClick,
  onBlur,
  onFocus,
  className,
  dataParent,
  dataTarget,
  role,
  children,
}) {
  const Tag = getTag(href)
  return (
    <Tag
      data-parent={dataParent}
      data-target={dataTarget}
      disabled={getDisabledStatus(disabled, href)}
      className={className}
      onFocus={onFocus}
      onBlur={onBlur}
      onClick={onClick}
      href={href}
      type={getType(href, type)}
      tabIndex={tabIndex}
      id={id}
      role={role}
    >
      {children}
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
