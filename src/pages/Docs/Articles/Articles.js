import React, { Component } from 'react';
import './Articles.scss';

import { Article } from 'components';

import OverviewMd from 'articles/Home.md';
import DownloadMd from 'articles/Download.md';
import ConfigMd from 'articles/Configuration.md';
import GridMd from 'articles/Grid.md';
import TypeMd from 'articles/Typography.md';
import ButtonsMd from 'articles/Buttons.md';
import FormsMd from 'articles/Forms.md';
import ClassesMd from 'articles/Classes.md';
import MixinsMd from 'articles/Mixins.md';
import FunctionsMd from 'articles/Functions.md';

export class Template extends Component {
  render() {
    return (
      <div className="articles-wrapper row">
        {this.props.children}
      </div>
    );
  }
}

export const Overview = () => {
  return ( 
    <div className="column">
      <h1>Overview</h1>
      <Template><Article>{OverviewMd}</Article></Template>
    </div>
  )
}
export const Download = () => {
  return ( 
    <div className="column">
      <h1>Download</h1>
      <Template><Article>{DownloadMd}</Article></Template>
    </div>
  )
}
export const Config = () => {
  return ( 
    <div className="column">
      <h1>Configuration</h1>
      <Template><Article>{ConfigMd}</Article></Template>
    </div>
  )
}

export const Grid = () => {
  return ( 
    <div className="column">
      <h1>Grid</h1>
      <Template><Article>{GridMd}</Article></Template>
    </div>
  )
}
export const Type = () => {
  return ( 
    <div className="column">
      <h1>Typography</h1>
      <Template><Article>{TypeMd}</Article></Template>
    </div>
  )
}
export const Buttons = () => {
  return ( 
    <div className="column">
      <h1>Buttons</h1>
      <Template><Article>{ButtonsMd}</Article></Template>
    </div>
  )
}
export const Forms = () => {
  return ( 
    <div className="column">
      <h1>Forms</h1>
      <Template><Article>{FormsMd}</Article></Template>
    </div>
  )
}

export const Classes = () => {
  return ( 
    <div className="column">
      <h1>Classes</h1>
      <Template><Article>{ClassesMd}</Article></Template>
    </div>
  )
}
export const Mixins = () => {
  return ( 
    <div className="column">
      <h1>Mixins</h1>
      <Template><Article>{MixinsMd}</Article></Template>
    </div>
  )
}
export const Functions = () => {
  return ( 
    <div className="column">
      <h1>Functions</h1>
      <Template><Article>{FunctionsMd}</Article></Template>
    </div>
  )
}
