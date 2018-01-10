import Overview from './Overview';

describe("<Overview />", () => {
  it("renders", () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper).to.have.length(1);
  })
})
