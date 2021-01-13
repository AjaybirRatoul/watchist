import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase"

// Creating context for user authentication
const AuthContext = React.createContext()

// For external use of AuthContext
export function useAuth() {
  return useContext(AuthContext)
}

// User authentication functions
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  // Signing user up
  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  // Logging user in
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  // Logging user out
  function logout() {
    return auth.signOut()
  }

  // Resetting password for user
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  // Updating email for user
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  // Updating password for user
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  // Updates user logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  // Encapsulating user authentication functions and variables
  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  // Returns children with value passed down
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
