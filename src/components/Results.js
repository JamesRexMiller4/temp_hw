import React from 'react'

export default function Results({ loading, results, error }) {

    const displayedResults = Array.isArray(results) ? results.map((result, idx) => {
        return (<li id={result.id} key={idx}>
            <h2>Name: {result.name}</h2>
            <p>Pokemon ID: {result.id}</p>
            <p>Classification: {result.classfication}</p>
        </li>)
    }) : results

    return (
        <section>
            { loading ? 
                <p>Fetching results...</p> 
            : error ? 
                <p style={{ color: "red" }}>{error}</p>
            :(
                <ul>
                    { displayedResults }
                </ul>
            )}
        </section>
    )
}
