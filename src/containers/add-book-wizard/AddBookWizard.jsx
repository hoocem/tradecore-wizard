import React, { useState, useMemo, useEffect, useContext } from 'react'
import GenreStep from './GenreStep'
import Wizard from '../../components/wizard/Wizard'
import {
  AddBookContext,
  DispatchAddBookContext,
} from '../../context/AddBookProvider'
import SubGenreStep from './SubGenreStep'
import { DispatchGenresContext } from '../../context/GenresProvider'
import InformationStep from './InformationStep'
import http from '../../mocks/http'
import Result from '../../components/result/Result'

const defaultSteps = {
  Genre: <GenreStep />,
  Subgenre: <SubGenreStep />,
  Information: <InformationStep />,
}

// TODO: mock this on the server
const generateRandomId = () => {
  return `${Math.random().toString(36).substr(2, 9)}`
}

const AddBookWizard = (props) => {
  const genresDispatch = useContext(DispatchGenresContext)
  const addBookDispatch = useContext(DispatchAddBookContext)
  const { isNextDisabled, isPrevDisabled, activeStep, newSubgenre, newBook } =
    useContext(AddBookContext)
  const [steps, setSteps] = useState(defaultSteps)
  // const [activeStep, setActiveStep] = useState(0);

  const [submittedSuccessfully, setSubmittedSuccessfully] =
    React.useState(false)
  // const [isPrevDisabled, setIsPrevDisabled] = React.useState(true)

  const stepNames = useMemo(() => Object.keys(steps), [steps])

  const setActiveStep = (value) => {
    addBookDispatch({
      action: 'setActiveStep',
      payload: value,
    })
  }

  useEffect(() => {
    addBookDispatch({
      action: 'setStepsSetter',
      payload: setSteps,
    })
  }, [setSteps, addBookDispatch])

  useEffect(() => {
    addBookDispatch({
      action: 'setIsPrevDisabled',
      payload: activeStep === 0,
    })
  }, [activeStep, addBookDispatch])

  const renderStepContent = () => {
    const stepKey = stepNames[activeStep]
    return steps[stepKey]
  }

  const goNext = () => {
    const stepKey = stepNames[activeStep]
    if (stepKey === 'Add new subgenre') {
      const newID = generateRandomId()
      genresDispatch({
        action: 'addSubGenre',
        payload: { id: newID, ...newSubgenre },
      })
      addBookDispatch({
        action: 'setNewBook',
        payload: { subgenreId: newID },
      })
      addBookDispatch({
        action: 'setIsDescriptionRequired',
        payload: newSubgenre.isDescriptionRequired,
      })
      addBookDispatch({
        action: 'setNewSubGenre',
        payload: null,
      })
    }

    if (stepKey === 'Information') {
      return http.post('book', newBook).then(() => {
        setSubmittedSuccessfully(true)
      })
    }
    setActiveStep(activeStep + 1)
  }

  const goBack = () => {
    const stepKey = stepNames[activeStep]
    if (stepKey === 'Add new subgenre') {
      setSteps(defaultSteps)
    }
    setActiveStep(activeStep - 1)
  }

  const addNewBookHandler = () => {
    setSubmittedSuccessfully(false)
    addBookDispatch({
      action: 'reset',
    })
  }

  return submittedSuccessfully ? (
    <Result onClick={addNewBookHandler} />
  ) : (
    <Wizard
      steps={stepNames}
      activeStep={activeStep}
      onNext={goNext}
      onPrev={goBack}
      isNextDisabled={isNextDisabled}
      isPrevDisabled={isPrevDisabled}
    >
      {renderStepContent()}
    </Wizard>
  )
}

AddBookWizard.propTypes = {}

export default AddBookWizard
