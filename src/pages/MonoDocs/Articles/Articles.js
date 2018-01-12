import React, { Component } from 'react';

import { Article } from 'components';

import HomeMd from 'articles/Home.md';
import DownloadMd from 'articles/Download.md';
import ConfigMd from 'articles/Configuration.md';
import GridMd from 'articles/Grid.md';
import TypeMd from 'articles/Typography.md';
import ButtonsMd from 'articles/Buttons.md';
import FormsMd from 'articles/Forms.md';
import ClassesMd from 'articles/Classes.md';
import MixinsMd from 'articles/Mixins.md';
import FunctionsMd from 'articles/Functions.md';

class Template extends Component {
  render() {
    return (
      <div className="row">
        <div class="column">
          {this.props.children}
        </div>
      </div>
    );
  }
}

const Home = () => {
  return ( <Template><Article>{HomeMd}</Article></Template> )
}
const Download = () => {
  return ( <Template><Article>{DownloadMd}</Article></Template> )
}
const Config = () => {
  return ( <Template><Article>{ConfigMd}</Article></Template> )
}

const Grid = () => {
  return ( <Template><Article>{GridMd}</Article></Template> )
}
const Type = () => {
  return ( <Template><Article>{TypeMd}</Article></Template> )
}
const Buttons = () => {
  return ( <Template><Article>{ButtonsMd}</Article></Template> )
}
const Forms = () => {
  return ( <Template><Article>{FormsMd}</Article></Template> )
}

const Classes = () => {
  return ( <Template><Article>{ClassesMd}</Article></Template> )
}
const Mixins = () => {
  return ( <Template><Article>{MixinsMd}</Article></Template> )
}
const Functions = () => {
  return ( <Template><Article>{FunctionsMd}</Article></Template> )
}

export {
  Home, Download, Config, 
  Grid, Type, Buttons, Forms, 
  Classes, Mixins, Functions,
}
