import React, { useState } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { Nav, Navbar, NavDropdown, Alert } from "react-bootstrap"
import logo from "../../assets/logo.png"

export default function NavigationMenu(props) {
  // Constants for navigation
  const [error, setError] = useState("")
  const activeItem = props.activeItem
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  // Logs user out
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push(`${process.env.PUBLIC_URL}/login`)
    } catch {
      setError("Failed to log out")
    }
  }

  // Component details for NavigationMenu
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand className="mr-4">
          <img
            src={logo}
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Watchist logo"
          />
          <div
            className="d-inline-block my-2"
            style={{ fontFamily: "Josefin Sans", fontSize: "20px" }}
          >
            Watchist
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              as={Link}
              name="discover"
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/`)
              }}
              active={activeItem === "discover"}
            >
              Discover
            </Nav.Link>
            <Nav.Link
              as={Link}
              name="watch-list"
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/watch-list`)
              }}
              active={activeItem === "watch-list"}
            >
              Watch List
            </Nav.Link>
            <Nav.Link
              as={Link}
              name="watched"
              onClick={() => {
                history.push(`${process.env.PUBLIC_URL}/watched`)
              }}
              active={activeItem === "watched"}
            >
              Watched
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>Signed in as:</Navbar.Text>
          <NavDropdown title={currentUser.email} id="basic-nav-dropdown">
            <Link
              to={`${process.env.PUBLIC_URL}/update-profile`}
              className="dropdown-item"
            >
              Update Profile
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
      {error && <Alert variant="danger">{error}</Alert>}
    </>
  )
}
