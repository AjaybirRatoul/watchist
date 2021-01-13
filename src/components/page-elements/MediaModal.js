import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import {
  GetWatchList,
  GetWatched,
  AddItemToWatchList,
  AddItemToWatched,
  RemoveItemFromWatchList,
  RemoveItemFromWatched,
} from "../../firebase"
import { useAuth } from "../../contexts/AuthContext"

export default function MediaModal(props) {
  // Constants for MediaModal
  const { currentUser } = useAuth()
  const [inWatchList, setInWatchList] = useState(false)
  const [inWatched, setInWatched] = useState(false)

  // Fetches user watch list and checks if current modal item exists in there
  GetWatchList(currentUser.uid).then((watchList) => {
    watchList.exists() && props.id in watchList.val() && setInWatchList(true)
  })
  // Fetches user watched items and checks if current modal item exists in there
  GetWatched(currentUser.uid).then((watched) => {
    watched.exists() && props.id in watched.val() && setInWatched(true)
  })

  // Page details for MediaModal
  return (
    <Modal
      show={props.showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        className="border-0 p-0"
        style={{ borderRadius: "3px 3px 0px 0px" }}
      >
        <div
          className="p-3"
          style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1) 5%, rgba(51, 51, 51, 0.8) 100%), url(${props.posterBackdrop})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            borderRadius: "3px 3px 0px 0px",
          }}
        >
          <div className="row m-0 justify-content-center">
            <div
              className="mb-3 d-flex justify-content-center col-8 col-sm-6 col-md-5 col-lg-3 col-xl-3 p-0 d-inline-block"
              style={{ textAlign: "center" }}
            >
              <img
                alt=""
                style={{
                  border: "1px solid #999",
                  height: "100%",
                  maxHeight: "300px",
                  maxWidth: "200px",
                }}
                src={`${props.poster}`}
              />
            </div>
            <div
              className="d-flex align-items-center col-12 col-sm-12 col-md-7 col-lg-9 col-xl-9 d-inline-block pt-2"
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
            >
              <div>
                <h4>{`${props.title} (${props.yearRelease})`}</h4>
                <p>{`${props.overview}`}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer
        className="border-0 p-4"
        style={{ backgroundColor: "black" }}
      >
        {
          /* Returns options depending on whether the item is in watched, watch list, or 
          neither and  refreshes display of items if necessary */
          inWatchList ? (
            <>
              <Button
                variant="danger"
                onClick={() => {
                  RemoveItemFromWatchList(currentUser.uid, props.id).then(
                    () => {
                      setInWatchList(false)
                      if (props.setRefreshResults) {
                        props.setRefreshResults((refreshResults) => {
                          return !refreshResults
                        })
                        props.setShowModal(false)
                      }
                    }
                  )
                }}
              >
                Remove from Watch List
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  AddItemToWatched(
                    currentUser.uid,
                    props.id,
                    props.type === "Movie" ? "movie" : "tv"
                  )
                    .then(RemoveItemFromWatchList(currentUser.uid, props.id))
                    .then(() => {
                      setInWatched(true)
                      setInWatchList(false)
                      if (props.setRefreshResults) {
                        props.setRefreshResults((refreshResults) => {
                          return !refreshResults
                        })
                        props.setShowModal(false)
                      }
                    })
                }}
              >
                Move to Watched
              </Button>
            </>
          ) : inWatched ? (
            <Button
              variant="danger"
              onClick={() => {
                RemoveItemFromWatched(currentUser.uid, props.id).then(() => {
                  setInWatched(false)
                  if (props.setRefreshResults) {
                    props.setRefreshResults((refreshResults) => {
                      return !refreshResults
                    })
                    props.setShowModal(false)
                  }
                })
              }}
            >
              Remove from Watched
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                onClick={() => {
                  AddItemToWatchList(
                    currentUser.uid,
                    props.id,
                    props.type === "Movie" ? "movie" : "tv"
                  ).then(() => {
                    setInWatchList(true)
                    if (props.setRefreshResults) {
                      props.setRefreshResults((refreshResults) => {
                        return !refreshResults
                      })
                      props.setShowModal(false)
                    }
                  })
                }}
              >
                Add to Watch List
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  AddItemToWatched(
                    currentUser.uid,
                    props.id,
                    props.type === "Movie" ? "movie" : "tv"
                  ).then(() => {
                    setInWatched(true)
                    if (props.setRefreshResults) {
                      props.setRefreshResults((refreshResults) => {
                        return !refreshResults
                      })
                      props.setShowModal(false)
                    }
                  })
                }}
              >
                Add to Watched
              </Button>
            </>
          )
        }

        <Button
          variant="secondary"
          onClick={() => {
            props.setShowModal(false)
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
