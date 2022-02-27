import React, { createContext, useReducer } from 'react'

export const DispatchAddBookContext = createContext(null)
export const AddBookContext = createContext(null)

const initState = {
  newBook: {
    genreId: null,
    subgenreId: null,
    title: null,
    author: undefined,
    isbn: undefined,
    description: undefined,
  },
  newSubgenre: null,
  isNextDisabled: true,
  isPrevDisabled: true,
  isDescriptionRequired: false,
  stepsSetter: null,
  activeStep: 0,
}

const reducer = (state, update) => {
  if (update.action === 'setNewBook') {
    return {
      ...state,
      newBook: {
        ...state.newBook,
        ...update.payload,
      },
    }
  }

  if (update.action === 'setIsNextDisabled') {
    return {
      ...state,
      isNextDisabled: update.payload,
    }
  }

  if (update.action === 'setIsPrevDisabled') {
    return {
      ...state,
      isPrevDisabled: update.payload,
    }
  }

  if (update.action === 'setIsDescriptionRequired') {
    return {
      ...state,
      isDescriptionRequired: update.payload,
    }
  }

  if (update.action === 'setStepsSetter') {
    return {
      ...state,
      stepsSetter: update.payload,
    }
  }

  if (update.action === 'setActiveStep') {
    return {
      ...state,
      activeStep: update.payload,
    }
  }

  if (update.action === 'setNewSubGenre') {
    return {
      ...state,
      newSubgenre: update.payload,
    }
  }

  if (update.action === 'reset') {
    return { ...initState, stepsSetter: state.stepsSetter }
  }

  return state
}

const AddBookProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <DispatchAddBookContext.Provider value={dispatch}>
      <AddBookContext.Provider value={state}>
        {children}
      </AddBookContext.Provider>
    </DispatchAddBookContext.Provider>
  )
}

export default AddBookProvider
