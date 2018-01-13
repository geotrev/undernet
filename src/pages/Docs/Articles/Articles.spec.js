import { Template, Home } from './Articles';

describe("<Articles />", () => {  
  let wrapper;
  
  it("renders #articles-wrapper", () => {
    wrapper = shallow(<Template />);
    expect(wrapper).to.have.length(1);
  })
  
  it("can render with children", () => {
    wrapper = shallow(<Template>Testiness</Template>);
    expect(wrapper).to.include.text("Testiness")
  })
})
