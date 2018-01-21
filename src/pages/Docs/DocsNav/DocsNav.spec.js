import DocsNav from './DocsNav';
import { BrowserRouter as Router } from 'react-router-dom';

describe("<DocsNav />", () => {
  it("can render", () => {
    const wrapper = mount(<Router><DocsNav/></Router>);
    expect(wrapper).to.have.length(1);
    expect(wrapper).to.exist;
  })

  it("is collapsable/expandable with .docs-nav-expand", () => {
    const wrapper = mount(<Router><DocsNav /></Router>);
    const button = wrapper.find('.docs-nav-expand a');
    button.simulate('click');
    expect(wrapper).to.not.have.descendants('.is-hidden');
    button.simulate('click');
    expect(wrapper).to.have.descendants('.is-hidden');
  })

  it("closes menu when a <Link /> is clicked", () => {
    const wrapper = mount(<Router><DocsNav /></Router>);
    const link = wrapper.find('.docs-nav-menu ul a').first();
    link.simulate('click');
    expect(wrapper).to.have.descendants('.is-hidden');
  })
})
