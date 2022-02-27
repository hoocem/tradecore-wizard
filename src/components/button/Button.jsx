import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './button.module.scss'

const Button = ({ secondary, disabled, active, children, ...rest }) => {
  const classNames = classnames(styles.button, {
    [styles.secondary]: secondary,
    [styles.disabled]: disabled,
    [styles.active]: active,
  })

  return (
    <button className={classNames} disabled={disabled} {...rest}>
      {children}
    </button>
  )
}

Button.propTypes = {
  secondary: PropTypes.bool,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  children: PropTypes.node,
}

Button.defaultProps = {
  secondary: false,
  disabled: false,
  active: false,
  children: undefined,
}

export default Button
