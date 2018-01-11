import Overview from './Overview';

describe("<Overview />", () => {
  xit("renders", () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper).to.have.length(1);
  })
})
