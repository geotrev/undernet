import { Home } from './Home';

describe("<Home />", () => {
  it("renders", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.length(1);
  })
})
