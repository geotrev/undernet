import mock from 'mock-require';
import React from 'react';
import chai, { expect } from 'chai';
import spies from 'chai-spies';
import chaiEnzyme from 'chai-enzyme'
import Enzyme, { mount, shallow, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme());
chai.use(spies);

global.React = React;
global.expect = expect;
global.mount = mount;
global.render = render;
global.shallow = shallow;
global.chai = chai;
global.spy = chai.spy();

const { JSDOM } = require('jsdom');
const dom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = dom;

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};

const resizeEvent = document.createEvent('Event');
resizeEvent.initEvent('resize', true, true);

global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth;
  global.window.innerHeight = width || global.window.innerHeight;
  global.window.dispatchEvent(resizeEvent);
}

function noop() { return null }
require.extensions['.md'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;

global.window.scrollTo = noop;

// webpack aliases
mock('components', './src/components/exports.js');
mock('helpers', './src/helpers/exports.js');
mock('pages', './src/pages/exports.js');

// markdown for articles
mock('articles/Home.md', './monolith.wiki/Home.md');
mock('articles/Download.md', './monolith.wiki/Download.md');
mock('articles/Configuration.md', './monolith.wiki/Configuration.md');
mock('articles/Grid.md', './monolith.wiki/Grid.md');
mock('articles/Typography.md', './monolith.wiki/Typography.md');
mock('articles/Buttons.md', './monolith.wiki/Buttons.md');
mock('articles/Forms.md', './monolith.wiki/Forms.md');
mock('articles/Classes.md', './monolith.wiki/Classes.md');
mock('articles/Mixins.md', './monolith.wiki/Mixins.md');
mock('articles/Functions.md', './monolith.wiki/Forms.md');
