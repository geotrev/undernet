import React from 'react';
import './Docs.scss';

import { ScrollUpOnMount } from 'helpers';
import { SideNav } from 'components';
import DocsRoutes from './DocsRoutes/DocsRoutes';


const Docs = () => {
  const navItems = {
    getting_starting: {
      overview: "/docs/overview",
      download: "/docs/download",
      configuration: "/docs/configuration",
    },
    components: {
      grid: "/docs/grid",
      typography: "/docs/typography",
      buttons: "/docs/buttons",
      forms: "/docs/forms",
    },
    helpers: {
      classes: "/docs/classes",
      mixins: "/docs/mixins",
      functions: "/docs/functions",
    },
  }

  return (
    <div id="docs" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="xsmall-12 xlarge-2 columns collapsed docs-nav-menu">
          <SideNav navItems={navItems} />
        </div>

        <div className="xsmall-12 xlarge-10 columns">
          <DocsRoutes />
        </div>
      </div>
    </div>
  );
}

export default Docs;
