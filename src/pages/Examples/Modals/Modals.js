import React, { Component } from "react"
import DemoSection from "../DemoSection/DemoSection"

import { Button, HeaderText, Modal } from "components"
import Monolith from "monolith"

export default class Buttons extends Component {
  componentDidMount() {
    Monolith.modals().start()
  }

  componentWillUnmount() {
    Monolith.modals().stop()
  }

  render() {
    return (
      <DemoSection id="modals-demo">
        <div className="row">
          <div className="xsmall-12 columns">
            <HeaderText>Standard Modal</HeaderText>
            <p>A simple modal component.</p>
          </div>

          <div className="xsmall-12 columns">
            <button data-modal-button id="my-new-modal-1">
              Modal button - press me!
            </button>
            
            <button data-modal-button id="my-new-modal-2">
              Modal with a lot of content
            </button>
            
            <div className="modal-demo" aria-labelledby={this.props.labelledby} role="dialog">
              <header>
                <h2 className="h6">
                  Modal Heading
                </h2>
                <a 
                  data-modal-close
                  href="#0"
                >
                  <span aria-hidden="true">&times;</span>
                </a>
              </header>
              <section>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco.
                </p>
              </section>
              <footer>
                <a 
                  className="button modal-button" 
                  data-modal-close
                  href="#0"
                >
                  Cancel
                </a>
                <Button 
                  className="primary button modal-button" 
                  href="#0"
                >
                  OK
                </Button>
              </footer>
            </div>

            <Modal labelledby="heading1" title="Modal heading" id="my-new-modal-1">
              <section>
                <p>This is a fully accessible modal!</p>
              </section>
              <footer>
                <a className="button" data-modal-close href="#">
                  Cancel
                </a>
                <Button className="primary button" href="#0">
                  OK
                </Button>
              </footer>
            </Modal>
            
            <Modal labelledby="heading1" title="Modal heading" id="my-new-modal-2">
              <section>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
                <p>
                  Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim
                  ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore
                  excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in
                  irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum.
                  Amet culpa culpa pariatur consequat consectetur et excepteur.
                </p>
              </section>
              <footer>
                <a className="button" data-modal-close href="#">
                  Cancel
                </a>
                <Button className="primary button" href="#0">
                  OK
                </Button>
              </footer>
            </Modal>
          </div>
        </div>
      </DemoSection>
    )
  }
}