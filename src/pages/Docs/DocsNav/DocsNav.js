import React, { Component } from 'react';
import './DocsNav.scss';

import { Button } from 'components'
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

export default class DocsNav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      menuIsOpen: true,
      hidden: '',
      rotated: '',
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
        hidden: 'is-not-displayed',
        rotated: 'rotate-180',
        buttonText: 'Show Menu'
      })
    } else {
      this.setState({
        menuIsOpen: true,
        hidden: '',
        rotated: '',
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
      hidden: 'is-not-displayed',
      rotated: 'rotate-180',
      buttonText: 'Show Menu'
    })
  }

  checkWidth() {
    if (window.outerWidth > 1199) {
      this.setState({
        menuIsOpen: true,
        hidden: '',
        rotated: '',
        buttonText: 'Hide Menu'
      })
    }
  }

  handleClick(e) {
    e.preventDefault();
    let hidden = '';
    let buttonText = '';
    let rotated = '';

    if (this.state.menuIsOpen === true) {
      hidden = 'is-not-displayed';
      buttonText = 'Show Menu';
      rotated = 'rotate-180';
    } else {
      buttonText = 'Hide Menu';
    }

    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      hidden: hidden,
      rotated: rotated,
      buttonText: buttonText
    });
  }

  render() {
    return (
      <div className="row docs-nav-wrapper">
        <div className="show-on-xsmall hide-on-xlarge docs-nav-expand ">
          <Button
            onClick={this.handleClick}
            className={"show-on-xsmall hide-on-xlarge " + this.state.rotated}
            href="#">
              {this.state.buttonText} <ChevronDown size={20} />
          </Button>
        </div>

        <nav className={"xsmall-order-2 xsmall-12 columns docs-nav-menu " + this.state.hidden}>
          <h3 className="paragraph"><strong>Explore Monolith</strong></h3>
          <ul>
            <li><h4 className="paragraph">Getting Started</h4></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/overview'>Overview</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/download'>Download</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/configuration'>Configuration</Link></li>
          </ul>
          <ul>
            <li><h4 className="paragraph">Components</h4></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/grid'>Grid</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/typography'>Typography</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/buttons'>Buttons</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/forms'>Forms</Link></li>
          </ul>
          <ul>
            <li><h4 className="paragraph">Helpers</h4></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/classes'>Classes</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/mixins'>Mixins</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/functions'>Functions</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}
