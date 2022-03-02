import { useState, useEffect } from 'react';
import './App.css';
import TextField from './components/TextField';
// import axios from "axios";
import { fetchFirstPage, fetchXPage } from './apiCalls/commons';
import Results from './components/Results';

function App() {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [results, setResults] = useState([])
    const [nextPageResults, setNextPageResults] = useState([])
    const [nextPageToken, setNextPageToken] = useState("")

    const getInitialResults = async () => {
        const results = await fetchFirstPage()
        setLoading(false)

        if (results.status === 200) {
            setResults(results.data.pokemon)
            getNextPage(results.data.nextPage)
        } else {
            setError("Error fetching initial results")
        }
    }
  
    const getNextPage = async (token) => {
        const nextResults = await fetchXPage(token)

        if (nextResults.status = 200) {
            setNextPageResults(nextResults.data.pokemon)
            setNextPageToken(nextResults.data.nextPage)
        } else {
            setError(`Error fetching next page, token ${token}`)
        }
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

    return (
        <main className="App">
            <TextField />
            <Results loading={loading} results={results} error={error} />
        </main>
    );
}

export default App;
