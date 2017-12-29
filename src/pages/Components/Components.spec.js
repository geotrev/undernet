import { About } from './About';

describe("<About />", () => {
  it("renders #about", () => {
    const wrapper = shallow(<About />);
    expect(wrapper).to.have.id('overview');
  })
  
  it("has one .bio-wrapper (<Bio />)", () => {
    const wrapper = mount(<About />);
    expect(wrapper).to.have.descendants(".overview-wrapper");
  })
})
