import Docs from './Docs';
import { BrowserRouter as Router } from 'react-router-dom';

import DocsRoutes from './DocsRoutes/DocsRoutes';

describe("<Docs />", () => {
  it("renders #docs", () => {
    const wrapper = shallow(<Docs />);
    expect(wrapper).to.have.id('docs');
  })

  it("has one <DocsNav />", () => {
    const wrapper = mount(<Router><Docs/></Router>);
    expect(wrapper).to.have.exactly(1).descendants('.side-nav-wrapper');
  })

  it("has one <DocsRoutes />", () => {
    const wrapper = mount(<Router><Docs/></Router>);
    expect(wrapper).to.have.exactly(1).descendants('.docs-routes-wrapper');
  })
})
