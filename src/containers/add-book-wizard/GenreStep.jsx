import { useContext, useEffect, useMemo } from 'react'
import Choices from '../../components/choices/Choices'
import { GenresContext } from '../../context/GenresProvider'
import {
  AddBookContext,
  DispatchAddBookContext,
} from '../../context/AddBookProvider'

const GenreStep = (props) => {
  const genres = useContext(GenresContext)
  const addBookDispatch = useContext(DispatchAddBookContext)
  const { newBook } = useContext(AddBookContext)

  useEffect(() => {
    addBookDispatch({
      action: 'setIsNextDisabled',
      payload: !newBook.genreId, // TODO: handle genreId = 0
    })
  }, [newBook, addBookDispatch])

  const formattedGenres = useMemo(() => {
    return genres.map(({ id, name }) => ({ value: id, label: name }))
  }, [genres])

  const selectHandler = (id) => {
    addBookDispatch({
      action: 'setNewBook',
      payload: { genreId: id },
    })
  }

  return (
    <Choices
      defaultValue={newBook.genreId}
      options={formattedGenres}
      onSelect={selectHandler}
    />
  )
}

GenreStep.propTypes = {}

export default GenreStep
