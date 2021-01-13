import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert, Container } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function Login() {
  // User authentication variables
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  // Authenticates user using Firebase authentication
  async function handleSubmit(e) {
    // Prevents form from submitting
    e.preventDefault()

    // Attempts to log user in
    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push(`${process.env.PUBLIC_URL}/`)
    } catch {
      // Error handling
      setError("Email and password combination is incorrect")
    }

    // Indicates request has been made and response from server is received
    setLoading(false)
  }

  // Page for user log in
  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
        }}
      >
        <div
          className="w-100"
          style={{
            maxWidth: "400px",
          }}
        >
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4"> Log In </h2>
              {error && <Alert variant="danger"> {error} </Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label> Email </Form.Label>
                  <Form.Control type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label> Password </Form.Label>
                  <Form.Control type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Log In
                </Button>
              </Form>
              <div className="w-100 text-center mt-3">
                <Link to={`${process.env.PUBLIC_URL}/forgot-password`}>
                  {" "}
                  Forgot Password ?{" "}
                </Link>
              </div>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
            Need an account ?{" "}
            <Link to={`${process.env.PUBLIC_URL}/signup`}> Sign Up </Link>
          </div>
        </div>
      </Container>
    </>
  )
}
