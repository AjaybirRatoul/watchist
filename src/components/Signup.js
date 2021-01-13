import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Signup() {
  // User authentication variables
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { login, signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // Registers user with Firebase authentication
  async function handleSubmit(e) {
    // Prevents form from submitting
    e.preventDefault()

    // Ensures user has entered passwords that match
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    // Attempts to create an account with Firebase authentication
    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push(`${process.env.PUBLIC_URL}/`)
    } catch (error) {
      // Error handling
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("User email already exists")
          break
        case "auth/weak-password":
          setError("Use at least 6 characters in password")
          break
        default:
          setError("Failed to create an account")
      }
    }

    // Indicates request has been made and response from server is received
    setLoading(false)
  }

  // Sign up page
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Sign Up</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Text id="passwordHelpBlock" muted>
                    Must be at least 6 characters long
                  </Form.Text>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    required
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Already have an account?{" "}
            <Link to={`${process.env.PUBLIC_URL}/login`}>Log In</Link>
          </div>
        </div>
        <h1 className="mx-5">OR</h1>
        <div>
          <Button
            onClick={async () => {
              await login(
                process.env.REACT_APP_TEST_EMAIL,
                process.env.REACT_APP_TEST_PASSWORD
              )
              history.push(`${process.env.PUBLIC_URL}/`)
            }}
            className="btn-lg"
          >
            Try It Out
          </Button>
        </div>
      </Container>
    </>
  )
}
