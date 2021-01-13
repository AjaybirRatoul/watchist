import React, { useState } from "react"
import { Card } from "react-bootstrap"
import Truncate from "react-truncate-html"
import MediaModal from "./MediaModal"

export default function MediaCard(props) {
  // Constant for rendering MediaModal
  const [showModal, setShowModal] = useState(false)

  // Component details for MediaCard
  return (
    props.render && (
      <div className="pb-4 col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2">
        <MediaModal
          {...props}
          showModal={showModal}
          setShowModal={setShowModal}
        />
        <Card className="border-0">
          <div className="embed-responsive" style={{ paddingBottom: "150%" }}>
            <div
              onClick={() => {
                setShowModal(true)
              }}
              style={{ cursor: "pointer " }}
              className="p-0 m-0"
            >
              <Card.Img
                variant="top"
                src={props.poster}
                className="embed-responsive-item"
              />
            </div>
          </div>

          <Card.Body className="p-0">
            <Card.Title className="mt-1 mb-0 p-0" style={{ fontSize: "14px" }}>
              <Truncate
                lines={2}
                portrait={2}
                dangerouslySetInnerHTML={{
                  __html: props.title,
                }}
              />
            </Card.Title>

            <div className="d-flex">
              {`${props.yearRelease} • ${props.type}`}
            </div>
            <div className="d-flex justify-content-center"></div>
          </Card.Body>
        </Card>
      </div>
    )
  )
}
