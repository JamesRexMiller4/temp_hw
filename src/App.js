import { useState, useEffect } from 'react';
import './App.css';
import TextField from './components/TextField';
// import axios from "axios";
import { fetchFirstPage } from './apiCalls/commons';
import Results from './components/Results';

function App() {
  const [results, setResults] = useState("")
  const [nextPageToken, setNextPageToken] = useState("")

  useEffect(() => {
    // get initial results for displaying
    const results = fetchFirstPage()

    if (results.status === 200) {
      setResults(results.data.pokemon)
      setNextPageToken(results.data.nextPage)
    }

  }, [])

  return (
    <main className="App">
      <TextField />
      <Results />
    </main>
  );
}

export default App;
