import React from 'react'
import PropTypes from 'prop-types'
import Button from '../button/Button'

const Choice = ({ value, text, active, onClick }) => {
  const clickHandler = () => {
    onClick(value, text)
  }

  return (
    <Button secondary active={active} onClick={clickHandler}>
      {text}
    </Button>
  )
}

Choice.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
}

Choice.defaultProps = {
  onClick: () => {},
  active: false,
  text: '',
}

export default React.memo(Choice)
