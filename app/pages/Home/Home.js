import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import Prism from "prismjs"
import lottie from "lottie-web"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import ScrollUpOnMount from "app/components/ScrollUpOnMount"
import SetMeta from "app/components/SetMeta"
import PageHeader from "app/components/PageHeader"
import { downloadPath, introductionPath } from "app/routes"

import pkg from "projectRoot/package.json"
import { StatusBadges, InstallNpm, InstallAssets } from "./markdownContent"
import { ANIMATION_DATA } from "./animations"

import "./styles.scss"

export default function Home() {
  const loadAnimations = () => {
    ANIMATION_DATA.forEach(data => {
      const name = data.title.toLowerCase()

      const loadedAnimation = lottie.loadAnimation({
        container: document.getElementById(`animated-${name}`),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: `assets/${name}.json`,
        name,
      })

      data.animation = loadedAnimation
    })

    window.setTimeout(() => {
      ANIMATION_DATA.forEach(instance => instance.animation.play())
    }, 1500)
  }

  const componentUnmountFunction = () => {
    ANIMATION_DATA.forEach(instance => instance.animation.destroy())
  }

  const observedStateOnMount = []
  useEffect(() => {
    Prism.highlightAll()
    loadAnimations()

    return componentUnmountFunction
  }, observedStateOnMount)

  const renderAnimations = () => {
    return ANIMATION_DATA.map(animation => {
      const animationName = animation.title.toLowerCase()

      return (
        <li
          className="large-3 small-6 xsmall-12 columns has-center-text has-no-padding-bottom"
          key={animation.title}
        >
          <div className="animated-icon" id={`animated-${animationName}`} />
          <h2 className="h6 has-white-text">{animation.title}</h2>
          <p className="has-white-text">{animation.subtitle}</p>
        </li>
      )
    })
  }

  return (
    <div id="home">
      <ScrollUpOnMount />

      {/*
       * Title is set here _and_ in public/index.html...
       * Doing so prevents title changes on other pages from
       * persisting if a visitor return to the home page.
       */}
      <SetMeta
        title="A modular, configuration-first front-end framework. No strings."
        description="Undernet is a highly customizable web framework for building websites."
      />

      <div className="medium-section fluid grid hero">
        <div className="row">
          <div className="xsmall-12 columns has-center-text">
            <PageHeader className="h3">{pkg.description}</PageHeader>
          </div>

          <div className="xsmall-12 columns has-center-text">
            <Link to={downloadPath} className="medium button has-feather">
              Download <ChevronRight size={20} role="presentation" focusable="false" />
            </Link>
            <Link to={introductionPath} className="primary medium button has-gradient has-feather">
              Learn More <ChevronRight size={20} role="presentation" focusable="false" />
            </Link>
          </div>

          <div className="xsmall-12 columns has-center-text">
            <p className="un-version has-no-margin">Version {pkg.version}</p>
          </div>

          <div className="xsmall-12 columns badges">
            <StatusBadges />
          </div>
        </div>
      </div>

      <div className="medium-section fluid grid animations">
        <div className="row has-no-padding">
          <div className="column has-no-padding">
            <div className="wide grid">
              <ul className="row is-unstyled-list has-no-padding">{renderAnimations()}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className="medium-section narrow grid">
        <div className="row">
          <div className="xsmall-12 columns has-center-text">
            <h2 className="h6">Painless Setup</h2>
            <p>Install with npm:</p>
            <InstallNpm />
          </div>
          <div className="xsmall-12 columns has-center-text">
            <p>Or simply link to minified assets:</p>
            <InstallAssets />
          </div>
          <div className="xsmall-12 columns has-center-text">
            <p>See how Undernet can improve your developer experience!</p>
            <Link to={introductionPath} className="primary medium button has-gradient has-feather">
              Learn More <ChevronRight size={20} role="presentation" focusable="false" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
