import React, { createContext, useReducer } from 'react'

export const DispatchGenresContext = createContext(null)
export const GenresContext = createContext(null)

const reducer = (state, update) => {
  if (update.action === 'set') {
    return update.payload
  }

  if (update.action === 'addSubGenre') {
    const { genreId, name, isDescriptionRequired, id } = update.payload
    return state.map((genre) => {
      if (genre.id === genreId) {
        return {
          ...genre,
          subgenres: [...genre.subgenres, { id, name, isDescriptionRequired }],
        }
      }
      return genre
    })
  }

  return state
}

const GenresProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, [])
  console.log('genres = ', state)

  return (
    <DispatchGenresContext.Provider value={dispatch}>
      <GenresContext.Provider value={state}>{children}</GenresContext.Provider>
    </DispatchGenresContext.Provider>
  )
}

export default GenresProvider
