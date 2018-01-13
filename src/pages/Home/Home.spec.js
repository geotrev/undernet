import { Home } from './Home';

describe("<Home />", () => {
  it("renders #home", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.id('home');
  })
  
  it("has one <h1> and one <h2>", () => {
    const wrapper = mount(<Home />);
    expect(wrapper).to.have.exactly(1).descendants('h1');
    expect(wrapper).to.have.exactly(1).descendants('h2');
  })
})
