import { Docs } from './Docs';

describe("<Docs />", () => {
  it("renders #docs", () => {
    const wrapper = shallow(<Docs />);
    expect(wrapper).to.have.id('docs');
  })
})
