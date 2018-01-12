import {
  Home, Download, Config,
  Grid, Type, Buttons, Forms,
  Classes, Mixins, Functions
} from './Articles';

describe("<Home />", () => {
  it("renders", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).to.have.length(1);
  })
})
