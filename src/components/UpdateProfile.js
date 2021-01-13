import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
  // User authentication variables
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // Updates user email or password if a change is specified
  function handleSubmit(e) {
    // Prevents form from submitting
    e.preventDefault()

    // Ensures user has entered passwords that match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    // Promises for fulfilling email and password change requests
    const promises = []
    setLoading(true)
    setError("")

    // Adds promise of email change request to promises if requested by user
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }

    // Adds promise of password change request to promises if requested by user
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    // Fulfills any changes requested by user
    Promise.all(promises)
      .then(() => {
        // Navigates user to dashboard
        history.push(`${process.env.PUBLIC_URL}/`)
      })
      .catch((error) => {
        // Error handling
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("User email already exists")
            break
          case "auth/id-token-revoked":
            setError("Session expired, please login again")

            // Redirects user back to login page after 3 seconds
            setTimeout(function () {
              history.push(`${process.env.PUBLIC_URL}/login`)
            }, 3000)

            break
          case "auth/weak-password":
            setError("Use at least 6 characters in password")
            break
          default:
            setError("Failed to update account")
        }
      })

      .finally(() => {
        // Indicates all promises are fulfilled
        setLoading(false)
      })
  }

  // Page for updating user information
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            <Link to={`${process.env.PUBLIC_URL}/`}>Cancel</Link>
          </div>
        </div>
      </Container>
    </>
  )
}
