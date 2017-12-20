import FeatureImage from './FeatureImage';

describe("<FeatureImage  />", () => {
  it("has an <img />", () => {
    const wrapper = shallow(<FeatureImage />);
    expect(wrapper).to.have.descendants('img');
  })
})
