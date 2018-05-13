import React from 'react'
import './Examples.scss'

import { Route } from 'react-router-dom'

import { ScrollUpOnMount } from 'helpers'
import { SideNav } from 'components'
import Grid from './Grid/Grid'
import Type from './Type/Type'
import Buttons from './Buttons/Buttons'
import Forms from './Forms/Forms'
import Modals from './Modals/Modals'

const Examples = () => {
  const navItems = [
    {
      header: "Elements",
      links: [
        { name: "Grid", url: "/examples/grid" },
        { name: "Typography", url: "/examples/typography" },
        { name: "Buttons", url: "/examples/buttons" },
        { name: "Forms", url: "/examples/forms" },
      ],
    },
    {
      header: "Components",
      links: [
        { name: "Modals", url: "/examples/modals" },
      ],
    },
  ]

  return (
    <div id="examples" className="medium-section fluid grid">
      <ScrollUpOnMount />

      <div className="row">
        <div className="xsmall-12 xlarge-2 columns collapsed examples-nav-menu">
          <SideNav navListClasses="xsmall-12 small-4 xlarge-12 columns" navItems={navItems} />
        </div>

        <div className="xsmall-12 xlarge-10 collapsed columns">
          <Route exact path="/examples/grid" component={ Grid } />
          <Route exact path="/examples/typography" component={ Type } />
          <Route exact path="/examples/buttons" component={ Buttons } />
          <Route exact path="/examples/forms" component={ Forms } />
          <Route exact path="/examples/modals" component={ Modals } />
        </div>
      </div>
    </div>
  )
}

export default Examples
