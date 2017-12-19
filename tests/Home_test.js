import Home from '../src/components/Home';

describe("<Home />", () => {
  it("has <h1> as its wrapper tag", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.tagName('h1');
  })
  
  it("has an <img>", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.descendants('img');
  })
})
