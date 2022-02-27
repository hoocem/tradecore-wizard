import React, { useContext, useEffect, useMemo } from 'react'
import { GenresContext } from '../../context/GenresProvider'
import {
  AddBookContext,
  DispatchAddBookContext,
} from '../../context/AddBookProvider'
import Choices from '../../components/choices/Choices'
import Button from '../../components/button/Button'
import AddSubgenreStep from './AddSubgenreStep'

const SubGenreStep = () => {
  const genres = useContext(GenresContext)
  const addBookDispatch = useContext(DispatchAddBookContext)
  const { newBook, stepsSetter, activeStep } = useContext(AddBookContext)

  useEffect(() => {
    addBookDispatch({
      action: 'setIsNextDisabled',
      payload: !newBook.subgenreId, // TODO: handle subgenreId = 0
    })
  }, [newBook, addBookDispatch])

  const subGenres = useMemo(() => {
    const { subgenres } = genres.find(({ id }) => id === newBook.genreId)
    return subgenres.map(({ id, name, isDescriptionRequired }) => ({
      value: id,
      label: name,
      isDescriptionRequired,
    }))
  }, [genres, newBook.genreId])

  const selectHandler = (id) => {
    const { isDescriptionRequired } = subGenres.find(
      ({ value }) => value === id,
    )
    addBookDispatch({
      action: 'setNewBook',
      payload: { subgenreId: id },
    })
    addBookDispatch({
      action: 'setIsDescriptionRequired',
      payload: isDescriptionRequired,
    })
  }

  const addNewHandler = () => {
    // add new step
    stepsSetter((prev) => {
      const { Genre, Subgenre, Information } = prev
      return {
        Genre,
        Subgenre,
        'Add new subgenre': <AddSubgenreStep />,
        Information,
      }
    })
    // move to next step
    addBookDispatch({
      action: 'setActiveStep',
      payload: activeStep + 1,
    })
  }

  return (
    <>
      <Choices
        defaultValue={newBook.subgenreId}
        options={subGenres}
        onSelect={selectHandler}
      />
      <Button onClick={addNewHandler}>Add new</Button>
    </>
  )
}

SubGenreStep.propTypes = {}

export default SubGenreStep
