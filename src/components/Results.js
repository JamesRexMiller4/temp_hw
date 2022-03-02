import React from 'react'

export default function Results({ loading, results, error }) {

    const displayedResults = Array.isArray(results) ? results.map((result) => {
        return (<li id={result.id} key={result.id}>
            <h2>Name: {result.name}</h2>
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
