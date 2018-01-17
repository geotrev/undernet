import React, { Component } from 'react'

export default class ScrollUpOnMount extends Component {
  componentDidMount(prevProps) {
    window.scrollTo(0, 0);
  }

  render() {
    return null;
  }
}
