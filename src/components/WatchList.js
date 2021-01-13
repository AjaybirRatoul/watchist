import React, { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import NavigationMenu from "./page-elements/NavigationMenu.js"
import MediaCard from "./page-elements/MediaCard.js"
import { Container } from "react-bootstrap"
import { GetWatchList } from "../firebase"
import { filterData, searchWithID } from "../TMDb"
import { Link } from "react-router-dom"

export default function WatchList() {
  // Constants for authentication and result loading
  const { currentUser } = useAuth()
  const [results, setResults] = useState([])
  const [refreshResults, setRefreshResults] = useState(false)
  const [loading, setLoading] = useState(true)

  // Loads items in users watch list
  useEffect(() => {
    setLoading(true)

    // Captures a snapshot of users watch list items from Firebase
    GetWatchList(currentUser.uid).then((res) => {
      // Ensures snapshot path is no null
      if (res.exists()) {
        const newResults = []
        const promises = []

        // Iterates through each item in object obtaining its details from TMDb database
        Object.keys(res.val()).forEach((key) => {
          promises.push(
            searchWithID(res.val()[key].ID, res.val()[key].type).then(
              (data) => {
                newResults.push({
                  ...data,
                  ...{ media_type: res.val()[key].type },
                })
              }
            )
          )
        })

        // Fulfills all promises of fetching media data
        Promise.all(promises).finally(() => {
          // Indicates all promises have been fulfilled
          setResults(newResults)
          setLoading(false)
        })
      } else {
        // If path from Firebase does not exist, results are set to an empty array
        setResults([])
        setLoading(false)
      }
    })
  }, [refreshResults, currentUser.uid])

  // Page details for Watch List
  return (
    <>
      <NavigationMenu activeItem="watch-list" />
      <Container className="pt-5">
        {results.length > 0 ? (
          <div className="row">
            {
              // Maps results onto the MediaCard component
              results.map((result) => {
                // Filters for useful data
                const filteredData = filterData(result)
                return (
                  <MediaCard
                    title={filteredData.title}
                    poster={filteredData.poster}
                    yearRelease={filteredData.yearRelease}
                    posterBackdrop={filteredData.posterBackdrop}
                    overview={filteredData.overview}
                    type={filteredData.type}
                    id={filteredData.id}
                    render={true}
                    refreshResults={refreshResults}
                    setRefreshResults={setRefreshResults}
                  />
                )
              })
            }
          </div>
        ) : !loading ? (
          // displays message if user has no items in watch list
          <h4 style={{ textAlign: "center" }}>
            It looks a bit empty here...
            <br />
            <Link to={`${process.env.PUBLIC_URL}/`}>Discover</Link> you next
            favourite movie or show
          </h4>
        ) : null}
      </Container>
    </>
  )
}
