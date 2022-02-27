import React from 'react'
import styles from './stepper.module.scss'
import StepperItem from './StepperItem'

const Stepper = ({ steps, activeStep }) => {
  const renderStep = (title, index) => {
    const stepProps = {
      title,
      stepNumber: index + 1,
      key: `${title}-${index}`,
      status: 'wait',
    }

    if (index === activeStep) {
      stepProps.status = 'active'
    } else if (index < activeStep) {
      stepProps.status = 'done'
    }

    return <StepperItem {...stepProps} />
  }

  return <div className={styles.stepper}>{steps.map(renderStep)}</div>
}

export default Stepper
