import React from 'react';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme'

import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

chai.use(chaiEnzyme())

// tests below

import Home from '../src/components/Home';

describe("<Home />", () => {
  it("has <h1> as its wrapper tag", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.tagName('h1');
  })
  
  it("has an <img>", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.descendants('img');
  })
})
