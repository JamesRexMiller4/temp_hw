import React, { useState } from 'react'
import { fetchQuery, fetchFirstPage } from '../apiCalls/commons'

export default function TextField({ setLoading, setResults, setError }) {
    const [value, setValue] = useState("")

    const handleChange = async (e) => {
        let results;
        const query = e.target.value;
        setValue(query)
        
        setLoading(true)

        if (query === "") {
            results = await fetchFirstPage()
        } else {
            results = await fetchQuery(query)

        }
        setLoading(false)

        if (results.status === 200) {
            if (results.data.pokemon.length === 0) {
                setResults("No pokemon match that query")
            } else {
                setResults(results.data.pokemon)
            }
        } else {
            setError(`Error fetching, status code: ${results.status}`)
        }
    }

    return (
        <textarea onChange={handleChange} value={value} />
    )
}
