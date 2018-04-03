import React from 'react';
import './Footer.scss';

import { Github, Twitter } from 'react-feather';

const Footer = () => {
  return (
    <div className="footer-wrapper small-section fluid grid">
      <div className="row">
        <div className="collapsed column">
          <p className="has-center-text">Monolith is a CSS framework created and maintained by <a href="http://www.geotrev.com">George Treviranus</a>.</p>
          <p className="has-center-text">
            <a className="has-feather" href='https://www.github.com/geotrev/monolith'>
              <Github />
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
