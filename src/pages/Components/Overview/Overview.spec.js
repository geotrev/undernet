import Overview from './Overview';

describe("<Overview />", () => {
  it("renders", () => {
    const wrapper = shallow(<Overview />);
    expect(wrapper).to.have.length(1);
  })
  
  it("this.props.text can receive a string", () => {
    const wrapper = mount(<Overview text="Testy Test" />);
    expect(wrapper).to.include.text("Testy Test");
  })
})
