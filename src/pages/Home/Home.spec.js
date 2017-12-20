import { Home } from './Home';

describe("<Home />", () => {
  it("renders #home", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.id('home');
  })
})
