import FeatureImage from './FeatureImage';

describe("<FeatureImage  />", () => {
  it("renders", () => {
    const wrapper = shallow(<FeatureImage />);
    expect(wrapper).to.have.length(1);
  })
  
  it("has an <img />", () => {
    const wrapper = shallow(<FeatureImage />);
    expect(wrapper).to.have.tagName('img');
  })
})
