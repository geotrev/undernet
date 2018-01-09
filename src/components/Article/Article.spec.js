import React from 'react';
import Article from './Article';
import Content from 'articles/Buttons.md'

describe("<Article />", () => {
  it("can render HTML from markdown", () => {
    // const md = "# Test header \n So neat";
    const wrapper = mount(<Article>{Content}</Article>);
    expect(wrapper).to.have.descendants('h1');
    expect(wrapper).to.have.descendants('p');
  })
})
