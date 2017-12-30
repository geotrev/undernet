import CheckInput from './CheckInput';

describe('<CheckInput />', () => {
  it('renders with label', () => {
    const wrapper = shallow(<CheckInput label="Test" />);
    expect(wrapper).to.have.tagName('label');
  })
  
  it('calls console.warn if this.props.label is not received')
  
  it('renders a checkbox', () => {
    const wrapper = shallow(<CheckInput label="Test" />);
    expect(wrapper).to.have.descendants('[type="checkbox"]');
  })
  
  it('is checked when clicked')
})
