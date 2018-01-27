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

  getHumanText(str) {
    let words = str.split("_");
    let humanized = [];

    for (let i = 0; i < words.length; i++) {
      let word = words[i];
      humanized.push(word.charAt(0).toUpperCase() + word.slice(1));
    }

    return humanized.join(" ");
  }

  getListItems(obj) {
    let items = [];

    for (let item in obj) {
      let name = this.getHumanText(item);
      let route = obj[item];

      items.push(
        <li>
          <Link onClick={this.handleCollapseClick} to={route}>{name}</Link>
        </li>
      );
    }

    return items;
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

  renderLists() {
    const listData = this.props.navItems;
    let navSections = [];

    for (let section in listData) {
      let list = listData[section];
      let header = this.getHumanText(section);
      let listItems = this.getListItems(list);

      navSections.push([
        <div className="xsmall-12 small-4 xlarge-12 columns">
          <ul>
            <li><h4 className="paragraph">{header}</h4></li>
            {listItems}
          </ul>
        </div>
      ])
    }

    return navSections;
  }
}
