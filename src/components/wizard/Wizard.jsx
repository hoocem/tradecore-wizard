import React from 'react'
import styles from './wizard.module.scss'
import Stepper from '../stepper/Stepper'
import Button from '../button/Button'

const noop = () => {}

const Wizard = ({
  steps,
  activeStep,
  isNextDisabled,
  isPrevDisabled,
  onNext,
  onPrev,
  children,
}) => {
  const isLastStep = activeStep === steps.length - 1

  return (
    <div className={styles.wizardCard}>
      <h3 className={styles.title}>Add book - New book</h3>
      <Stepper steps={steps} activeStep={activeStep} />
      {children}
      <div className={styles.navigation}>
        <Button secondary disabled={isPrevDisabled} onClick={onPrev}>
          Back
        </Button>
        <Button disabled={isNextDisabled} onClick={onNext}>
          {isLastStep ? 'Complete' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

Wizard.propTypes = {}

Wizard.defaultProps = {
  steps: [],
  activeStep: 0,
  onPrev: noop,
  onNext: noop,
}

export default Wizard
