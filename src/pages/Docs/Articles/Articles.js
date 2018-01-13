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

export class Template extends Component {
  render() {
    return (
      <div className="articles-wrapper row">
        <div class="column">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const Home = () => {
  return ( <Template><Article>{HomeMd}</Article></Template> )
}
export const Download = () => {
  return ( <Template><Article>{DownloadMd}</Article></Template> )
}
export const Config = () => {
  return ( <Template><Article>{ConfigMd}</Article></Template> )
}

export const Grid = () => {
  return ( <Template><Article>{GridMd}</Article></Template> )
}
export const Type = () => {
  return ( <Template><Article>{TypeMd}</Article></Template> )
}
export const Buttons = () => {
  return ( <Template><Article>{ButtonsMd}</Article></Template> )
}
export const Forms = () => {
  return ( <Template><Article>{FormsMd}</Article></Template> )
}

export const Classes = () => {
  return ( <Template><Article>{ClassesMd}</Article></Template> )
}
export const Mixins = () => {
  return ( <Template><Article>{MixinsMd}</Article></Template> )
}
export const Functions = () => {
  return ( <Template><Article>{FunctionsMd}</Article></Template> )
}
