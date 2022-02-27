import React, { useContext, useEffect } from 'react'
import {
  AddBookContext,
  DispatchAddBookContext,
} from '../../context/AddBookProvider'

const InformationStep = (props) => {
  const addBookDispatch = useContext(DispatchAddBookContext)
  const { newBook, isDescriptionRequired } = useContext(AddBookContext)

  useEffect(() => {
    const { title, description } = newBook
    const canSubmit = isDescriptionRequired ? description && title : title
    addBookDispatch({
      action: 'setIsNextDisabled',
      payload: !canSubmit,
    })
  }, [newBook, addBookDispatch, isDescriptionRequired])

  const changeHandler = (e) => {
    const key = e.target.name
    addBookDispatch({
      action: 'setNewBook',
      payload: { [key]: e.target.value },
    })
  }

  return (
    <div>
      <label>
        Title
        <input
          defaultValue={newBook.title}
          type="text"
          name="title"
          onChange={changeHandler}
        />
      </label>
      <label>
        Author
        <input
          defaultValue={newBook.author}
          type="text"
          name="author"
          onChange={changeHandler}
        />
      </label>
      <label>
        ISBN
        <input
          defaultValue={newBook.isbn}
          type="text"
          name="isbn"
          onChange={changeHandler}
        />
      </label>
      <label>
        Description
        <input
          defaultValue={newBook.description}
          type="text"
          name="description"
          onChange={changeHandler}
        />
      </label>
    </div>
  )
}

InformationStep.propTypes = {}

export default InformationStep
