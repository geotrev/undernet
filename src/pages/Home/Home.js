import React from "react"
import "./Home.scss"

import { ScrollUpOnMount } from "helpers"
import Perks from "./Perks/Perks"

const Home = () => {
  return (
    <div id="home" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <Perks />
    </div>
  )
}

export default Home
