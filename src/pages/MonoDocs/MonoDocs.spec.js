import { MonoDocs } from './MonoDocs';

describe("<Components />", () => {
  it("renders #components", () => {
    const wrapper = shallow(<Components />);
    expect(wrapper).to.have.id('components');
  })
})
