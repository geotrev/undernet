import Download from './Download';

describe("<Download />", () => {
  it("renders", () => {
    const wrapper = shallow(<Download />);
    expect(wrapper).to.have.length(1);
  })
})
