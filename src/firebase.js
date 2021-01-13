import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

// Firebase configuration
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
})

// Authentication instance
export const auth = app.auth()
export default app

// Adding items to user watch list
export async function AddItemToWatchList(uid, id, type) {
  const db = app.database().ref("users").child(`${uid}/watchlist`)
  await db.update({
    [id]: {
      type: type,
      ID: id,
    },
  })
}

// Removing items from user watch list
export async function RemoveItemFromWatchList(uid, id, type) {
  const db = app.database().ref("users").child(`${uid}/watchlist`)
  await db.update({
    [id]: null,
  })
}

// Adding item to watched media
export async function AddItemToWatched(uid, id, type) {
  const db = app.database().ref("users").child(`${uid}/watched`)
  await db.update({
    [id]: {
      type: type,
      ID: id,
    },
  })
}

//  Removing item from watched media
export async function RemoveItemFromWatched(uid, id) {
  const db = app.database().ref("users").child(`${uid}/watched`)
  await db.update({
    [id]: null,
  })
}

// Obtaining user watch list
export async function GetWatchList(uid) {
  const snapshot = await app
    .database()
    .ref("users")
    .child(`${uid}/watchlist/`)
    .once("value")
  return snapshot
}

// Obtaining all items user has watched
export async function GetWatched(uid) {
  const snapshot = await app
    .database()
    .ref("users")
    .child(`${uid}/watched/`)
    .once("value")
  return snapshot
}
