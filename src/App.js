import { useState, useEffect } from 'react';
import './App.css';
import TextField from './components/TextField';
import { fetchFirstPage, fetchXPage } from './apiCalls/commons';
import Results from './components/Results';

function App() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(true)

    const [results, setResults] = useState([])
    const [nextPageResults, setNextPageResults] = useState([])
    const [nextPageToken, setNextPageToken] = useState()

    const getInitialResults = async () => {
        const results = await fetchFirstPage()
        setLoading(false)

        if (results.status === 200) {
            setResults(results.data.pokemon)
            // immediately fetch next page
            getNextPage(results.data.nextPage)
        } else {
            setError("Error fetching initial results")
        }
    }
  
    const getNextPage = async (token) => {
        const nextResults = await fetchXPage(token)

        if (nextResults.status === 200) {
            setNextPageResults(nextResults.data.pokemon)
            if (nextResults.data.nextPage) {
              setNextPageToken(nextResults.data.nextPage)
            } else {
              setNextPageToken(null)
            }
        } else {
            setError(`Error fetching next page, token ${token}`)
        }
    }

    const handleNextPageClick = () => {
      setResults(nextPageResults)
      getNextPage(nextPageToken)
    }

    useEffect(() => {
      // get initial results for displaying
      setLoading(true)

      try {
          getInitialResults()
      } catch(err) {
          setError(`Something went wrong: ${err}`)
      }
    }, [])

    useEffect(() => {
      if (nextPageToken && nextPageToken.length > 0) {
        setDisabled(false)
      }
    }, [nextPageToken])

    return (
        <main className="App">
            <TextField setLoading={setLoading} setResults={setResults} />
            <button onClick={handleNextPageClick} disabled={disabled}>Next Page</button>
            <Results loading={loading} results={results} error={error} />
        </main>
    );
}

export default App;
