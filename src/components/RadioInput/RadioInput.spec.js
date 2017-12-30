import RadioInput from './RadioInput';

describe('<RadioInput />', () => {
  it('renders with label', () => {
    const wrapper = shallow(<RadioInput label="Test" />);
    expect(wrapper).to.have.tagName('label');
  })
  
  it('calls console.warn if this.props.label is not received')
  
  it('renders a radio', () => {
    const wrapper = shallow(<RadioInput label="Test" />);
    expect(wrapper).to.have.descendants('[type="radio"]');
  })
  
  it('is checked when clicked')
})
