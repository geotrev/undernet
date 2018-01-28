import React from 'react';
import './Examples.scss';

import { ScrollUpOnMount } from 'helpers';
import { SideNav } from 'components';
import Grid from './Grid/Grid';
import Type from './Type/Type';
import Buttons from './Buttons/Buttons';
import Forms from './Forms/Forms';

const Examples = () => {
  const navItems = [
    {
      header: "Jump To Example",
      links: [
        { name: "Grid", url: "#grid" },
        { name: "Typography", url: "#typography" },
        { name: "Buttons", url: "#buttons" },
        { name: "Forms", url: "#forms" },
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
          <Grid />
          <Type />
          <Buttons />
          <Forms />
        </div>
      </div>
    </div>
  );
}

export default Examples;
