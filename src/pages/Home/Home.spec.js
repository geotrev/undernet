import { Home } from './Home';

describe("<Home />", () => {
  it("renders #home", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.id('home');
  })
  
  it("has one .intro-wrapper (<Intro />)", () => {
    const wrapper = mount(<Home />);
    expect(wrapper).to.have.descendants('.intro-wrapper');
  })
  
  it("has one <img> (<FeatureImage />)", () => {
    const wrapper = mount(<Home />);
    expect(wrapper).to.have.descendants('img');
  })
})
