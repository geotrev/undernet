import Overview from './Overview';

describe("<Bio />", () => {
  it("renders", () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper).to.have.length(1);
  })
})
