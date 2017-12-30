import { Components } from './Components';

describe("<Components />", () => {
  it("renders #about", () => {
    const wrapper = shallow(<Components />);
    expect(wrapper).to.have.id('components');
  })
  
  it("has one .overview-wrapper (<Overview />)", () => {
    const wrapper = mount(<Components />);
    expect(wrapper).to.have.descendants(".overview-wrapper");
  })
})
