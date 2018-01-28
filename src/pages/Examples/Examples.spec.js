import Examples from './Examples';
import { BrowserRouter as Router } from 'react-router-dom';

describe("<Examples />", () => {
  it("renders #examples", () => {
    const wrapper = shallow(<Examples />);
    expect(wrapper).to.have.id('examples');
  })
})
