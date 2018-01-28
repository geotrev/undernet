import Forms from './Forms';

describe("<Forms />", () => {
  it("can render", () => {
    const wrapper = shallow(<Forms />);
    expect(wrapper).to.have.length(1);
    expect(wrapper).to.exist;
  })
})
