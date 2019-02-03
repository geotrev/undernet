import React, { Component } from "react"
import { Link } from "react-router-dom"
import Prism from "prismjs"
import Markdown from "react-markdown"
import Loadable from "react-loadable"
import lottie from "lottie-web"
import ChevronRight from "react-feather/dist/icons/chevron-right"

import ScrollUpOnMount from "helpers/ScrollUpOnMount"
import { downloadPath, introductionPath } from "routes"

import pkg from "projectRoot/package.json"
import installNpm from "./install-npm.md"
import installAssets from "./install-assets.md"

import "./styles.scss"

const StatusBadges = Loadable({
  loader: () => import("./Badges"),
  loading: () => <span className="is-visually-hidden">Loading badges</span>,
})

export default class Home extends Component {
  constructor() {
    super()
  }

  state = {
    tiny: null,
    modular: null,
    configurable: null,
    accessible: null,
  }

  ANIMATION_DATA = [
    {
      title: "Tiny",
      subtitle:
        "CSS and JS under 12kb minified + gzipped; you can be assured performance isn’t an issue.",
    },
    {
      title: "Modular",
      subtitle:
        "Include only the pieces you need, or even namespace the components for existing projects.",
    },
    {
      title: "Configurable",
      subtitle:
        "Built for a great developer experience, you can customize and extend the library with ease.",
    },
    {
      title: "Accessible",
      subtitle:
        "Interactive components are designed with WAI-ARIA guidelines in mind to ensure your HTML is accessible.",
    },
  ]

  componentDidMount() {
    Prism.highlightAll()

    let animations = {}

    this.ANIMATION_DATA.forEach(animation => {
      const name = animation.title.toLowerCase()

      const loadedAnimation = lottie.loadAnimation({
        container: document.getElementById(`animated-${name}`),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: `assets/${name}.json`,
        name: name,
      })

      animations[name] = loadedAnimation
    })

    // play animations after 1.5 seconds,
    // otherwise page load kills first 1/3-2/3 of play time
    window.setTimeout(() => {
      Object.keys(animations).forEach(animation => animations[animation].play())
    }, 2000)

    this.setState({ ...animations })
  }

  // handleMouseEnter(animation) {
  //   return animation ? this.state[animation.name].play() : () => null
  // }

  // handleMouseLeave(animation) {
  //   return animation ? this.state[animation.name].stop() : () => null
  // }

  renderAnimatedIcon(name) {
    return <div className="animated-icon" id={`animated-${name}`} />
  }

  renderAnimations() {
    return this.ANIMATION_DATA.map(animation => {
      const animationName = animation.title.toLowerCase()
      // const animationEvent = this.state[animationName]

      return (
        <li
          className="large-3 small-6 xsmall-12 columns has-center-text has-no-padding-bottom"
          key={animation.title}
          /* onMouseEnter={this.handleMouseEnter.bind(this, animationEvent)} */
          /* onMouseLeave={this.handleMouseLeave.bind(this, animationEvent)} */
        >
          {this.renderAnimatedIcon(animationName)}
          <h2 className="h6 has-white-text">{animation.title}</h2>
          <p className="has-white-text">{animation.subtitle}</p>
        </li>
      )
    })
  }

  render() {
    return (
      <div id="home">
        <ScrollUpOnMount />

        <div className="medium-section fluid grid hero">
          <div className="row">
            <div className="xsmall-12 columns has-center-text">
              <h1 className="h3">{pkg.description}</h1>
            </div>

            <div className="xsmall-12 columns has-center-text">
              <Link to={downloadPath} className="medium button has-feather">
                Download <ChevronRight size={20} role="presentation" focusable="false" />
              </Link>
              <Link
                to={introductionPath}
                className="primary medium button has-gradient has-feather"
              >
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
                <ul className="row is-unstyled-list has-no-padding">{this.renderAnimations()}</ul>
              </div>
            </div>
          </div>
        </div>

        <div className="medium-section narrow grid">
          <div className="row">
            <div className="xsmall-12 columns has-center-text">
              <h2 className="h6">Painless Setup</h2>
              <p>Install with npm:</p>
              <Markdown source={installNpm} escapeHtml={false} />
            </div>
            <div className="xsmall-12 columns has-center-text">
              <p>Or simply link to minified assets:</p>
              <Markdown source={installAssets} escapeHtml={false} />
            </div>
            <div className="xsmall-12 columns has-center-text">
              <p>See how Undernet can improve your developer experience!</p>
              <Link
                to={introductionPath}
                className="primary medium button has-gradient has-feather"
              >
                Learn More <ChevronRight size={20} role="presentation" focusable="false" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
