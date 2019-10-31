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
          className="is-lg-3 is-sm-6 is-xs-12 column has-text-center has-no-p-block-end"
          key={animation.title}
        >
          <div className="animated-icon" id={`animated-${animationName}`} />
          <h2 className="h6 has-white-text-color">{animation.title}</h2>
          <p className="has-white-text-color">{animation.subtitle}</p>
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
       * persisting if a visitor returns to the home page.
       */}
      <SetMeta
        title="A modular, configuration-first front-end framework. No strings."
        description="Undernet is a highly customizable web framework for building websites."
      />

      <div className="is-section--md is-fluid grid hero">
        <div className="row">
          <div className="is-xs-12 column has-text-center">
            <PageHeader className="h3">{pkg.description}</PageHeader>
          </div>

          <div className="is-xs-12 column has-text-center">
            <Link to={downloadPath} className="button has-feather">
              Download <ChevronRight size={20} role="presentation" focusable="false" />
            </Link>
            <Link to={introductionPath} className="button is-primary has-gradient has-feather">
              Learn More <ChevronRight size={20} role="presentation" focusable="false" />
            </Link>
          </div>

          <div className="is-xs-12 column has-text-center">
            <p className="un-version has-no-m">Version {pkg.version}</p>
          </div>

          <div className="is-xs-12 column badges">
            <StatusBadges />
          </div>
        </div>
      </div>

      <div className="is-section--md is-fluid grid animations">
        <div className="row has-no-p">
          <div className="column has-no-p">
            <div className="wide grid">
              <ul className="row has-unstyled-list has-no-p">{renderAnimations()}</ul>
            </div>
          </div>
        </div>
      </div>

      <div className="is-section--md is-narrow grid">
        <div className="row">
          <div className="is-xs-12 column has-text-center">
            <h2 className="h6">Painless Setup</h2>
            <p>Install with npm:</p>
            <InstallNpm />
          </div>
          <div className="is-xs-12 column has-text-center">
            <p>Or simply link to minified assets:</p>
            <InstallAssets />
          </div>
          <div className="is-xs-12 column has-text-center">
            <p>See how Undernet can improve your developer experience!</p>
            <Link to={introductionPath} className="is-primary button has-gradient has-feather">
              Learn More <ChevronRight size={20} role="presentation" focusable="false" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
