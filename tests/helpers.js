import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme'

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme())

global.React = React;
global.expect = expect;
global.mount = mount;
global.shallow = shallow;
