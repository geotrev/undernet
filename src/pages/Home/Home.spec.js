import { Home } from './Home';

describe("<Intro />", () => {
  it("renders", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.length(1);
  })
})
