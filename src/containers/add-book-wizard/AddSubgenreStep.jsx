import React, { useContext, useEffect, useState } from 'react'
import {
  AddBookContext,
  DispatchAddBookContext,
} from '../../context/AddBookProvider'

const AddSubgenreStep = () => {
  const addBookDispatch = useContext(DispatchAddBookContext)
  const { newBook } = useContext(AddBookContext)

  const [checked, setChecked] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    addBookDispatch({
      action: 'setIsNextDisabled',
      payload: !name,
    })
  }, [newBook, addBookDispatch, name])

  useEffect(() => {
    addBookDispatch({
      action: 'setNewSubGenre',
      payload: {
        genreId: newBook.genreId,
        name,
        isDescriptionRequired: checked,
      },
    })
  }, [name, checked, addBookDispatch, newBook.genreId])

  const handleNameChange = (e) => setName(e.target.value)

  const handleCheckBoxChange = () => setChecked(!checked)

  return (
    <div>
      <label>
        Subgenre name
        <input type="text" onChange={handleNameChange} />
      </label>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={handleCheckBoxChange}
          placeholder="Subgenre name"
        />
        <span style={{ marginLeft: '5px' }}>
          Description is required for this subgenre
        </span>
      </label>
    </div>
  )
}

AddSubgenreStep.propTypes = {}

export default AddSubgenreStep
