import DocsRoutes from './DocsRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function routes() {
  return mount(<Router>
    <DocsRoutes />
  </Router>);
}

describe("<DocsRoutes />", () => {
  it("can render", () => {
    const wrapper = routes();
    expect(wrapper).to.have.length(1);
    expect(wrapper).to.exist
  })
})
