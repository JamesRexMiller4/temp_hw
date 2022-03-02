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
  const [nextPageToken, setNextPageToken] = useState("")

  const getInitialResults = async () => {
      const results = await fetchFirstPage()

      console.log(results)
      if (results.status === 200) {
        setResults(results.data.pokemon)
        setNextPageToken(results.data.nextPage)
      } else {
        setError("Error fetching initial results")
      }
    }

  useEffect(() => {
    // get initial results for displaying
    try {
      getInitialResults()
    } catch(err) {
      setError(`Something went wrong: ${err}`)
    }
  }, [])

  return (
    <main className="App">
      <TextField />
      <Results loading={loading} results={results}/>
    </main>
  );
}

export default App;
