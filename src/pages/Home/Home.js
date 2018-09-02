import React, { Component } from "react"
import "./Home.scss"
import { ScrollUpOnMount } from "helpers"

import { Link } from "react-router-dom"
import ChevronRight from "react-feather/dist/icons/chevron-right"
import Markdown from "react-markdown"

import statusBadges from "./badges.md"
import installNpm from "./install-npm.md"
import installAssets from "./install-assets.md"
import tinySvg from "assets/images/tiny.svg"
import modSvg from "assets/images/modular.svg"
import configSvg from "assets/images/configurable.svg"
import a11ySvg from "assets/images/accessible.svg"

export default class Home extends Component {
  render() {
    return (
      <div id="home">
        <ScrollUpOnMount />

        <div className="small-section fluid grid hero">
          <div className="row">
            <div className="xsmall-12 columns has-center-text">
              <h1 className="h3">Modular front-end development. No strings.</h1>
            </div>

            <div className="xsmall-12 columns has-center-text">
              <Link to="docs/getting-started" className="medium button has-feather">
                Download <ChevronRight size={20} />
              </Link>
              <Link to="docs/overview" className="primary medium button has-gradient has-feather">
                Learn More <ChevronRight size={20} />
              </Link>
            </div>

            <div className="xsmall-12 columns has-center-text">
              <p className="un-version has-no-margin">Version 2.1.0</p>
            </div>

            <div className="xsmall-12 columns badges">
              <Markdown source={statusBadges} escapeHtml={false} />
            </div>
          </div>
        </div>

        <div className="small-section fluid grid perks">
          <div className="row collapsed">
            <div className="wide grid">
              <ul className="row is-unstyled-list">
                <li className="large-3 small-6 xsmall-12 columns has-center-text">
                  <img className="home-icon" src={tinySvg} role="presentation" alt="tiny" />
                  <h2 className="h6 has-white-text">Tiny</h2>
                  <p className="has-white-text">
                    CSS and JS are only 8.5kb minified + gzipped; you can be assured performance
                    isn’t an issue.
                  </p>
                </li>
                <li className="large-3 small-6 xsmall-12 columns has-center-text">
                  <img className="home-icon" src={modSvg} role="presentation" alt="modular" />
                  <h2 className="h6 has-white-text">Modular</h2>
                  <p className="has-white-text">
                    Include only the pieces you need, or even namespace the components for existing
                    projects.
                  </p>
                </li>
                <li className="large-3 small-6 xsmall-12 columns has-center-text">
                  <img
                    className="home-icon"
                    src={configSvg}
                    role="presentation"
                    alt="configurable"
                  />
                  <h2 className="h6 has-white-text">Configurable</h2>
                  <p className="has-white-text">
                    Built for a great developer experience, you can customize and extend the library
                    with ease.
                  </p>
                </li>
                <li className="large-3 small-6 xsmall-12 columns has-center-text">
                  <img className="home-icon" src={a11ySvg} role="presentation" alt="a11y" />
                  <h2 className="h6 has-white-text">Accessible</h2>
                  <p className="has-white-text">
                    Undernet is designed WAI-ARIA guidelines in mind to ensure your project is
                    accessible.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="small-section narrow grid">
          <div cassName="row">
            <div className="xsmall-12 columns has-center-text">
              <h2 className="h6">Painless Setup</h2>
              <p>Install with npm:</p>
              <Markdown source={installNpm} escapeHtml={false} />
              <br />
              <p>Or simply link to minified assets:</p>
              <Markdown source={installAssets} escapeHtml={false} />
              <br />
              <p>See how Undernet can improve your developer experience!</p>
              <Link to="docs/overview" className="primary medium button has-gradient has-feather">
                Learn More <ChevronRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
