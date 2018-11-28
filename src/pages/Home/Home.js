import React, { Component } from "react"
import { Link } from "react-router-dom"
import Prism from "prismjs"
import Markdown from "react-markdown"
import Loadable from "react-loadable"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import "./Home.scss"

import { ScrollUpOnMount } from "helpers"
import { downloadPath, introductionPath } from "routes"

import pkg from "../../../package.json"
import installNpm from "./install-npm.md"
import installAssets from "./install-assets.md"
import tinySvg from "assets/images/tiny.svg"
import modSvg from "assets/images/modular.svg"
import configSvg from "assets/images/configurable.svg"
import a11ySvg from "assets/images/accessible.svg"

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

  render() {
    return (
      <div id="home">
        <ScrollUpOnMount />

        <div className="medium-section fluid grid hero">
          <div className="row">
            <div className="xsmall-12 columns has-center-text">
              <h1 className="h3">
                A modular front-end component library for modern web development.
              </h1>
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
            <div classname="column has-no-padding">
              <div className="wide grid">
                <ul className="row is-unstyled-list has-no-padding">
                  <li className="large-3 small-6 xsmall-12 columns has-center-text">
                    <img
                      className="home-icon"
                      src={tinySvg}
                      role="presentation"
                      alt=""
                      aria-hidden="true"
                    />
                    <h2 className="h6 has-white-text">Tiny</h2>
                    <p className="has-white-text">
                      CSS and JS are only 8.5kb minified + gzipped; you can be assured performance
                      isn’t an issue.
                    </p>
                  </li>
                  <li className="large-3 small-6 xsmall-12 columns has-center-text">
                    <img
                      className="home-icon"
                      src={modSvg}
                      role="presentation"
                      alt=""
                      aria-hidden="true"
                    />
                    <h2 className="h6 has-white-text">Modular</h2>
                    <p className="has-white-text">
                      Include only the pieces you need, or even namespace the components for
                      existing projects.
                    </p>
                  </li>
                  <li className="large-3 small-6 xsmall-12 columns has-center-text">
                    <img
                      className="home-icon"
                      src={configSvg}
                      role="presentation"
                      alt=""
                      aria-hidden="true"
                    />
                    <h2 className="h6 has-white-text">Configurable</h2>
                    <p className="has-white-text">
                      Built for a great developer experience, you can customize and extend the
                      library with ease.
                    </p>
                  </li>
                  <li className="large-3 small-6 xsmall-12 columns has-center-text">
                    <img
                      className="home-icon"
                      src={a11ySvg}
                      role="presentation"
                      alt=""
                      aria-hidden="true"
                    />
                    <h2 className="h6 has-white-text">Accessible</h2>
                    <p className="has-white-text">
                      Undernet is designed with WAI-ARIA guidelines in mind to ensure your project
                      is accessible.
                    </p>
                  </li>
                </ul>
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
              <br />
              <p>Or simply link to minified assets:</p>
              <Markdown source={installAssets} escapeHtml={false} />
              <br />
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
