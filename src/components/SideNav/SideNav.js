import React, { Component } from 'react';
import './SideNav.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'react-feather';

import Button from '../Button/Button';

export default class SideNav extends Component {
  constructor(props) {
    super(props)
    this.state = { menuIsOpen: null }

    this.getWidth = this.getWidth.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleCollapseClick = this.handleCollapseClick.bind(this);
  }

  componentWillMount() {
    this.getWidth();
    window.addEventListener('resize', this.getWidth);

    if (window.outerWidth < 1200) {
      this.setState({ menuIsOpen: false })
    } else {
      this.setState({ menuIsOpen: true })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.getWidth);
  }

  handleCollapseClick() {
    if (window.outerWidth > 1199) return;
    this.setState({ menuIsOpen: false })
  }

  getWidth() {
    if (window.outerWidth > 1199) {
      this.setState({ menuIsOpen: true })
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.setState({ menuIsOpen: !this.state.menuIsOpen });
  }

  render() {
    const buttonClasses = classNames("is-flex is-hidden-on-xlarge", {
      "rotate-180": !this.state.menuIsOpen
    })

    const menuClasses = classNames("row collapsed side-nav-menu", {
      "is-hidden": !this.state.menuIsOpen
    })

    return (
      <div className="fluid grid side-nav-wrapper">
        <div className="row is-flex is-hidden-on-xlarge side-nav-expand">
          <Button
            onClick={this.handleClick}
            href="#"
            className={ buttonClasses }>
            Explore <ChevronDown size={20} />
          </Button>
        </div>

        <nav className={ menuClasses }>
          {this.renderLists()}
        </nav>
      </div>
    )
  }

  renderListItems(items) {
    let list = [];

    for (let i = 0; i < items.length; i++) {
      let name = items[i].name;
      let url = items[i].url;

      list.push(
        <li key={i}>
          <Link onClick={this.handleCollapseClick} to={url}>{name}</Link>
        </li>
      );
    };

    return list;
  }

  renderLists() {
    const listData = this.props.navItems;
    let navSections = [];

    listData.map((section, index) => {
      let listItems = this.renderListItems(section.links);

      return navSections.push(
        <div className={this.props.navListClasses} key={index}>
          <ul>
            <li><h4 className="paragraph">{section.header}</h4></li>
            {listItems}
          </ul>
        </div>
      );
    });

    return navSections;
  }
}
