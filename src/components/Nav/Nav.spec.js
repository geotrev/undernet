import Nav from './Nav';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

function NavComponent() {
  return mount(<Router>
    <Nav />
  </Router>);
}

describe("<Nav />", () => {
  it("renders", () => {
    const wrapper = NavComponent();
    expect(wrapper).to.have.length(1);
  })
  
  it("is a <nav>", () => {
    const wrapper = NavComponent();
    expect(wrapper).to.have.tagName('nav');
  })
})
