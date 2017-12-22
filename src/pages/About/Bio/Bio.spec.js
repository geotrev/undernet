import Bio from './Bio';

describe("<Bio />", () => {
  it("renders", () => {
    const wrapper = shallow(<Bio />);
    expect(wrapper).to.have.length(1);
  })
})
