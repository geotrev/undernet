import Home from '../src/components/Home';

describe("<Home />", () => {
  it("has <h1> as its wrapper tag", () => {
    const wrapper = shallow(<Home name="Luke Skywalker" />);
    expect(wrapper).to.have.tagName('h1');
  })
  
  it("has an <img>", () => {
    const wrapper = mount(<Home name="Luke Skywalker" />);
    expect(wrapper).to.have.descendants('img');
  })
})
