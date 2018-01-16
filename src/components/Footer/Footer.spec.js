import Footer from './Footer';

describe("<Footer />", () => {
  it("renders", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper).to.have.length(1);
    expect(wrapper).to.exist
  })
})
