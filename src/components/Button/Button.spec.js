import Button from './Button';

describe('<Button />', () => {
  it('renders a button by default', () => {
    const wrapper = shallow(<Button>Test</Button>);
    expect(wrapper).to.have.tagName('button');
  })
  
  it('renders an anchor if this.props.href is received', () => {
    const wrapper = shallow(<Button href="#">Test</Button>);
    expect(wrapper).to.have.tagName('a');
  })
  
  it('calls console.warn if a link button has "disabled" attribute')
})
