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
      menuClasses: '',
      buttonClasses: '',
      buttonText: ''
    }
    
    this.checkWidth = this.checkWidth.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCollapseClick = this.handleCollapseClick.bind(this);
  }

  componentWillMount() {
    this.checkWidth();
    window.addEventListener('resize', this.checkWidth);
    this.setState({
      menuIsOpen: true,
      menuClasses: 'xsmall-order-2 xsmall-12 columns docs-nav-menu',
      buttonClasses: 'show-on-xsmall hide-on-xlarge',
      buttonText: 'Hide Menu'
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.checkWidth);
  }
  
  handleCollapseClick() {
    if (window.outerWidth > 1199) return;
    this.setState({
      menuIsOpen: false,
      menuClasses: 'xsmall-order-2 xsmall-12 columns docs-nav-menu is-not-displayed',
      buttonClasses: 'show-on-xsmall hide-on-xlarge',
      buttonText: 'Show Menu'
    })
  }

  checkWidth() {
    if (window.outerWidth > 1199) {
      this.setState({
        menuIsOpen: true,
        menuClasses: 'xsmall-order-2 xsmall-12 columns docs-nav-menu',
        buttonClasses: 'show-on-xsmall hide-on-xlarge',
        buttonText: 'Hide Menu'
      })
    }
  }

  handleClick(e) {
    e.preventDefault();
    let hideClass = '';
    let label = '';
    let rotateClass = '';

    if (this.state.menuIsOpen === true) {
      hideClass = 'is-not-displayed';
      label = 'Show Menu';
      rotateClass = 'rotate-180';
    } else {
      label = 'Hide Menu';
    }

    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      menuClasses: `xsmall-order-2 xsmall-12 docs-nav-menu columns ${hideClass}`,
      buttonClasses: `show-on-xsmall hide-on-xlarge ${rotateClass}`,
      buttonText: label
    });
  }

  render() {
    return (
      <div className="docs-nav-wrapper row">
        <div className="docs-nav-expand show-on-xsmall hide-on-xlarge">
          <Button
            onClick={this.handleClick}
            className={this.state.buttonClasses}
            href="#">
              {this.state.buttonText} <ChevronDown size={20} />
          </Button>
        </div>

        <nav className={this.state.menuClasses}>
          <h3 className="paragraph"><strong>Explore Monolith</strong></h3>
          <h4 className="paragraph">Getting Started</h4>
          <ul>
            <li><Link onClick={this.handleCollapseClick} to='/docs/overview'>Overview</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/download'>Download</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/configuration'>Configuration</Link></li>
          </ul>
          <h4 className="paragraph">Components</h4>
          <ul>
            <li><Link onClick={this.handleCollapseClick} to='/docs/grid'>Grid</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/typography'>Typography</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/buttons'>Buttons</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/forms'>Forms</Link></li>
          </ul>
          <h4 className="paragraph">Helpers</h4>
          <ul>
            <li><Link onClick={this.handleCollapseClick} to='/docs/classes'>Classes</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/mixins'>Mixins</Link></li>
            <li><Link onClick={this.handleCollapseClick} to='/docs/functions'>Functions</Link></li>
          </ul>
        </nav>
      </div>
    )
  }
}
