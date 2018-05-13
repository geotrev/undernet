import React from 'react'
import DemoSection from '../DemoSection/DemoSection'

import { Button, HeaderText, Modal } from 'components'

const Buttons = () => {
  return (
    <DemoSection>
      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Standard Modal</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <button data-modal-button id="my-new-modal">Modal button</button>

          <Modal modalLabel="heading1" title="This is a heading! (h2)" modalId="my-new-modal">
            <section>
              <p>Dolor labore non sint consectetur commodo enim do aute duis veniam esse enim ullamco. Fugiat nostrud eu incididunt voluptate ipsum quis irure dolor ad dolore excepteur veniam officia occaecat consequat occaecat veniam. Non occaecat minim in irure minim eu culpa non dolor fugiat ex deserunt dolore sit aliqua ipsum ipsum. Amet culpa culpa pariatur consequat consectetur et excepteur.</p>
            </section>
            <footer>
              <a className="button" data-modal-close href="#">Cancel</a>
              <Button className="primary button" href="#0">OK</Button>
            </footer>
          </Modal>
        </div>
      </div>
    </DemoSection>
  )
}

export default Buttons
