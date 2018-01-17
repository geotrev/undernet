import React from 'react';
import './Docs.scss';

import { ScrollUpOnMount } from 'helpers';

import DocsNav from './DocsNav/DocsNav';
import DocsRoutes from './DocsRoutes/DocsRoutes';

const Docs = () => {
  return (
    <div id="docs" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="xsmall-12 xlarge-2 columns collapsed docs-nav-menu">
          <DocsNav />
        </div>

        <div className="xsmall-12 xlarge-10 columns">
          <DocsRoutes />
        </div>
      </div>
    </div>
  );
}

export default Docs;
