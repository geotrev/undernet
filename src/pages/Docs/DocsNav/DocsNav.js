import React, { Component } from 'react';
import './DocsNav.scss';

import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

export default class DocsNav extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      menuIsOpen: true, 
      menuClasses: '',
      buttonText: ''
    }
  }
  
  componentWillMount() {
    this.setState({
      menuClasses: 'xsmall-order-2 xsmall-12 columns docs-nav-menu',
      buttonText: this.getButtonText()
    })
  }
  
  getButtonText() {
    let label = '';
    
    if (this.state.menuIsOpen === true) {
      label = 'Hide Menu'
    } else {
      label = 'Show Menu'
    }
    
    return label;
  }
  
  handleClick(e) {
    e.preventDefault();
    let hideClass = '';
    
    if (this.state.menuIsOpen === true) {
      hideClass = 'is-not-displayed';
    } else {
      hideClass = '';
    }
    
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
      menuClasses: `xsmall-order-2 xsmall-12 columns docs-nav-menu ${hideClass}`,
      buttonText: this.getButtonText()
    });
  }
  
  render() {
    return (
      <div className="docs-nav-wrapper row">
        <div className="docs-nav-expand show-on-xsmall hide-on-xlarge">
          <a
            onClick={this.handleClick.bind(this)}
            className="show-on-xsmall hide-on-xlarge" 
            href="#">
              {this.state.buttonText} <ChevronDown size={20} />
          </a>
        </div>
        
        <div className={this.state.menuClasses}>
          <nav>
            <h3 className="paragraph"><strong>Explore Monolith</strong></h3>
            <h4 className="paragraph">Getting Started</h4>
            <ul>
              <li><NavLink activeClassName="selected" to='/docs/overview'>Overview</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/download'>Download</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/configuration'>Configuration</NavLink></li>
            </ul>
            <h4 className="paragraph">Components</h4>
            <ul>
              <li><NavLink activeClassName="selected" to='/docs/grid'>Grid</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/typography'>Typography</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/buttons'>Buttons</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/forms'>Forms</NavLink></li>
            </ul>
            <h4 className="paragraph">Helpers</h4>
            <ul>
              <li><NavLink activeClassName="selected" to='/docs/classes'>Classes</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/mixins'>Mixins</NavLink></li>
              <li><NavLink activeClassName="selected" to='/docs/functions'>Functions</NavLink></li>
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}
