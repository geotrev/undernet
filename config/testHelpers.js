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

function noop() { return null }
require.extensions['.md'] = noop;
require.extensions['.scss'] = noop;
require.extensions['.css'] = noop;
require.extensions['.svg'] = noop;
require.extensions['.png'] = noop;
require.extensions['.jpg'] = noop;
global.window.scrollTo = noop;
