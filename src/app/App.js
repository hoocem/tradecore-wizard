import { useEffect, useContext } from 'react'
import { DispatchGenresContext } from '../context/GenresProvider'
import ErrorHandler from './ErrorHandler'
import http from '../mocks/http'
import AddBookWizard from '../containers/add-book-wizard/AddBookWizard'
import AddBookProvider from '../context/AddBookProvider'

function App() {
  const genresDispatch = useContext(DispatchGenresContext)

  useEffect(() => {
    http.get('genres').then((genres) => {
      genresDispatch({
        action: 'set',
        payload: genres,
      })
    })
  }, [genresDispatch])

  return (
    <ErrorHandler>
      <div className="container">
        <AddBookProvider>
          <AddBookWizard />
        </AddBookProvider>
      </div>
    </ErrorHandler>
  )
}

export default App
