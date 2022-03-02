import React from 'react'

export default function Results({ results }) {

    const displayedResults = results.map((result) => {
        return (<li id={result.id} key={result.id}>
            <h2>Name: {result.name}</h2>
            <p>Classification: {result.classfication}</p>
        </li>)
    })

    return (
        <section>
            <ul>
                { displayedResults }
            </ul>
        </section>
    )
}
