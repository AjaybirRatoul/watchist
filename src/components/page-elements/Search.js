import React, { useState } from "react"
import { Form, Button, Container, InputGroup, Alert } from "react-bootstrap"
import "font-awesome/css/font-awesome.min.css"
import MediaCard from "./MediaCard.js"
import tmdbLogo from "../../assets/tmdblogo.svg"
import { filterData, searchWithQuery } from "../../TMDb"

export default function Search() {
  // Constants for searching
  const [inputValue, setInputValue] = useState("")
  const [results, setResults] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  // Searches database with user input
  const searchDB = async () => {
    setLoading(true)

    // Fetches data
    searchWithQuery(inputValue).then((data) => {
      const filteredSearchResults = []

      // Ensures data exists and filters it of all no movie or tv items
      data.results &&
        data.results.forEach((result) => {
          if (result.media_type !== "person") {
            filteredSearchResults.push(result)
          }
        })

      // Sets error if no results are found
      if (filteredSearchResults.length === 0 && inputValue) {
        setError("No Results Found")
      }
      setResults(filteredSearchResults)

      // Indicates results are loaded
      setLoading(false)
    })
  }

  // Component details for search
  return (
    <>
      <Container className="pt-4">
        <InputGroup className="mb-1">
          <Form.Control
            className="py-2 br-0 border input-lg"
            type="search"
            placeholder="Find movies and shows"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              setError("")
            }}
            onKeyPress={(e) => {
              if (e.charCode === 13) {
                searchDB()
              }
            }}
            style={{ fontSize: "16px" }}
          />
          <InputGroup.Append>
            <Button onClick={searchDB} disabled={loading}>
              {loading ? (
                <span
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                "Search"
              )}
            </Button>
          </InputGroup.Append>
        </InputGroup>
        <div className="mt-3 mb-4 w-100 d-flex justify-content-end">
          <img
            className="m-0"
            style={{ height: "12px" }}
            src={tmdbLogo}
            alt="TMDB Logo"
          />
        </div>

        <div className="row">
          {error && (
            <Alert variant="dark" className="mx-3 w-100">
              {error}
            </Alert>
          )}
          {
            // Maps results onto the MediaCard component
            results
              ? results.map((result) => {
                  // Filters for useful data
                  const filteredData = filterData(result)
                  return (
                    <MediaCard
                      title={filteredData.title}
                      poster={filteredData.poster}
                      yearRelease={filteredData.yearRelease}
                      posterBackdrop={filteredData.posterBackdrop}
                      overview={filteredData.overview}
                      genres={filteredData.genres}
                      type={filteredData.type}
                      id={filteredData.id}
                      render={true}
                    />
                  )
                })
              : null
          }
        </div>
      </Container>
    </>
  )
}
