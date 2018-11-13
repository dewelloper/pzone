import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    text
  } = props
  return (
    <button className="button is-info btnToDetail" style={{display: 'block'}}
      onClick={(event) => {
        onClick && onClick(event)
        history.push(to)
      }}
     >
      {text}
      </button>
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired
}

export default withRouter(LinkButton)