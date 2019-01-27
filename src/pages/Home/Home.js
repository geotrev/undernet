import React, { Component } from "react"
import { Link } from "react-router-dom"
import Prism from "prismjs"
import Markdown from "react-markdown"
import Loadable from "react-loadable"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import Lottie from "react-lottie"

import ScrollUpOnMount from "helpers/ScrollUpOnMount"
import { downloadPath, introductionPath } from "routes"
import "./styles.scss"

import pkg from "../../../package.json"
import installNpm from "./install-npm.md"
import installAssets from "./install-assets.md"

import tinyData from "./tiny.json"
import modularData from "./modular.json"
import configurableData from "./configurable.json"
import a11yData from "./a11y.json"

const StatusBadges = Loadable({
  loader: () => import("./Badges"),
  loading: () => <span className="is-visually-hidden">Loading badges</span>,
})

export default class Home extends Component {
  constructor() {
    super()
  }

  componentDidMount() {
    Prism.highlightAll()
  }

  PERK_COLUMNS = [
    {
      animationData: {
        loop: true,
        autoplay: true,
        animationData: tinyData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice'}
      },
      title: "Tiny",
      subtitle:
        "CSS and JS under 12kb minified + gzipped; you can be assured performance isn’t an issue.",
    },
    {
      animationData: {
        loop: true,
        autoplay: true,
        animationData: modularData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice'},
      },
      title: "Modular",
      subtitle:
        "Include only the pieces you need, or even namespace the components for existing projects.",
    },
    {
      animationData: {
        loop: true,
        autoplay: true,
        animationData: configurableData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice'},
      },
      title: "Configurable",
      subtitle:
        "Built for a great developer experience, you can customize and extend the library with ease.",
    },
    {
      animationData: {
        loop: true,
        autoplay: true,
        animationData: a11yData,
        rendererSettings: { preserveAspectRatio: 'xMidYMid slice'},
      },
      title: "Accessible",
      subtitle:
        "Interactive components are designed with WAI-ARIA guidelines in mind to ensure your HTML is accessible.",
    },
  ]

  renderPerkColumns() {
    return this.PERK_COLUMNS.map(column => {
      return (
        <li className="large-3 small-6 xsmall-12 columns has-center-text" key={column.title}>
          <Lottie
            options={column.animationData}
            height={120}
            width={120}
            isStopped={false}
            isPaused={false}/>
          />
          <h2 className="h6 has-white-text">{column.title}</h2>
          <p className="has-white-text">{column.subtitle}</p>
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
                Download <ChevronRight size={20} />
              </Link>
              <Link
                to={introductionPath}
                className="primary medium button has-gradient has-feather"
              >
                Learn More <ChevronRight size={20} />
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

        <div className="medium-section fluid grid perks">
          <div className="row has-no-padding">
            <div className="column has-no-padding">
              <div className="wide grid">
                <ul className="row is-unstyled-list has-no-padding">{this.renderPerkColumns()}</ul>
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
                Learn More <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
