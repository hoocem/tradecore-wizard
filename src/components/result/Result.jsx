import React from 'react'
import PropTypes from 'prop-types'
import styles from './result.module.scss'
import Button from '../button/Button'

const Result = ({ onClick }) => {
  const checkmark = '\u2714'
  return (
    <div className={styles.card}>
      <div className={styles.circle}>{checkmark}</div>
      <div className={styles.text}>Book added successfully</div>
      <div>
        <Button onClick={onClick}>Add another book</Button>
      </div>
    </div>
  )
}

Result.propTypes = {
  onClick: PropTypes.func,
}

Result.defaultProps = {
  onClick: () => {},
}

export default Result
