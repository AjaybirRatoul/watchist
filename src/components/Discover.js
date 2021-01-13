import React from "react"
import NavigationMenu from "./page-elements/NavigationMenu.js"
import Search from "./page-elements/Search.js"

/* Convert this dashboard to a functional one where users can search for movies and shows */

export default function Discover() {
  return (
    <>
      <NavigationMenu activeItem="discover" />
      <Search />
    </>
  )
}
