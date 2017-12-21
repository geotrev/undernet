import { About } from './About';

describe("<About />", () => {
  it("renders #about", () => {
    const wrapper = shallow(<About />);
    expect(wrapper).to.have.id('about');
  })
})
