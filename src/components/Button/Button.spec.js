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
  
  it('button receives disabled attribute', () => {
    const wrapper = shallow(<Button disabled>Test</Button>);
    expect(wrapper).to.have.attr('disabled');
  })
  
  it('renders a "submit" button if [type="button"]', () => {
    const wrapper = shallow(<Button type="submit">Test</Button>);
    expect(wrapper).to.have.descendants('[type="submit"]');
  })
})
