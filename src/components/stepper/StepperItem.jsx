import React from 'react'
import classNames from 'classnames'
import styles from './stepper.module.scss'

const StepperItem = ({ status, stepNumber, title }) => {
  const stepClassNames = classNames(styles.step, styles[status])
  const checkmark = '\u2714'
  return (
    <div className={stepClassNames}>
      <div className={styles.circle}>
        <span className={styles.number}>
          {status === 'done' ? checkmark : stepNumber}
        </span>
      </div>
      <div className={styles.text}>{title}</div>
    </div>
  )
}

export default StepperItem
