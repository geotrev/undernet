import React from 'react';
import './Footer.scss';

import Nav from '../Nav/Nav';

const Footer = () => {
  return (
    <div className="footer-wrapper small-section fluid grid">
      <div className="row">
        <div className="collapsed column">
          <p className="has-center-text">Monolith is a CSS framework created and maintained by <a href="www.geotrev.com">George Treviranus</a>.</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
