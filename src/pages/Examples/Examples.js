import React from 'react';
import './Examples.scss';

import { ScrollUpOnMount } from 'helpers';
import { SideNav } from 'components';
// import Grid from './Sections/Grid';
// import Typography from './Sections/Typography';
// import Buttons from './Sections/Buttons';
// import Forms from './Sections/Forms';

const Examples = () => {
  const navItems = [
    {
      header: "Jump To Example",
      links: [
        { name: "Grid", url: "/examples#grid" },
        { name: "Typography", url: "/examples#typography" },
        { name: "Buttons", url: "/examples#buttons" },
        { name: "Forms", url: "/examples#forms" },
      ],
    },
  ]

  return (
    <div id="examples" className="medium-section fluid grid">
      <ScrollUpOnMount />
      <div className="row">
        <div className="xsmall-12 xlarge-2 columns collapsed examples-nav-menu">
          <SideNav navListClasses="column" navItems={navItems} />
        </div>

        <div className="xsmall-12 xlarge-10 columns">
          {/* <Grid />       */}
          {/* <Typography /> */}
          {/* <Buttons />    */}
          {/* <Forms />      */}
        </div>
      </div>
    </div>
  );
}

export default Examples;
