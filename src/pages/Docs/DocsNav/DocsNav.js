import React, { Component } from 'react';
import './DocsNav.scss';

import classNames from 'classnames';
import { Button } from 'components'
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

export default class DocsNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuIsOpen: true,
      buttonText: ''
    }

    this.checkWidth = this.checkWidth.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCollapseClick = this.handleCollapseClick.bind(this);
  }

  componentWillMount() {
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);

    if (window.outerWidth < 1200) {
      this.setState({
        menuIsOpen: false,
        buttonText: 'Show Menu'
      })
    } else {
      this.setState({
        menuIsOpen: true,
        buttonText: 'Hide Menu'
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWidth);
  }

  handleCollapseClick() {
    if (window.outerWidth > 1199) return;
    this.setState({
      menuIsOpen: false,
      buttonText: 'Show Menu'
    })
  }

  checkWidth() {
    if (window.outerWidth > 1199) {
      this.setState({
        menuIsOpen: true,
        buttonText: 'Hide Menu'
      })
    }
  }

  handleClick(e) {
    e.preventDefault();
    let buttonText = '';

    if (this.state.menuIsOpen === true) {
      buttonText = 'Show Menu';
    } else {
      buttonText = 'Hide Menu';
    }

    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      buttonText: buttonText
    });
  }

  render() {
    return (
      <div className="fluid grid docs-nav-wrapper">
        <div className="row show-on-xsmall hide-on-xlarge docs-nav-expand">
          <Button
            onClick={this.handleClick}
            href="#"
            className={ classNames("show-on-xsmall hide-on-xlarge", {
              "rotate-180": !this.state.menuIsOpen
            }
          )}>
            {this.state.buttonText} <ChevronDown size={20} />
          </Button>
        </div>

        <nav className={ classNames("row collapsed docs-nav-menu", {
          "is-not-displayed": !this.state.menuIsOpen
        })}>
          <div className="xsmall-12 columns">
            <h3 className="paragraph"><strong>Explore Monolith</strong></h3>
          </div>
          <div className="xsmall-12 small-4 xlarge-12 columns">
            <ul>
              <li><h4 className="paragraph">Getting Started</h4></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/overview'>Overview</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/download'>Download</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/configuration'>Configuration</Link></li>
            </ul>
          </div>
          <div className="xsmall-12 small-4 xlarge-12 columns">
            <ul>
              <li><h4 className="paragraph">Components</h4></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/grid'>Grid</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/typography'>Typography</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/buttons'>Buttons</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/forms'>Forms</Link></li>
            </ul>
          </div>
          <div className="xsmall-12 small-4 xlarge-12 columns">
            <ul>
              <li><h4 className="paragraph">Helpers</h4></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/classes'>Classes</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/mixins'>Mixins</Link></li>
              <li><Link onClick={this.handleCollapseClick} to='/docs/functions'>Functions</Link></li>
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}
