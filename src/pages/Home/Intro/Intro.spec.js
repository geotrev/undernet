import Intro from './Intro';

describe("<Intro />", () => {
  it("has an <h1>", () => {
    const wrapper = shallow(<Intro greeting="Luke Skywalker" />);
    expect(wrapper).to.have.descendants('h1');
  })
  
  it("this.props.greeting receives a string", () => {
    const wrapper = mount(<Intro greeting="Test" />);
    const header = wrapper.find('p');
    expect(header).to.include.text("Test")
  })
})
