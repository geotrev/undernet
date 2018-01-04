import CheckInput from './CheckInput';

describe('<CheckInput />', () => {
  it('renders with label tag', () => {
    const wrapper = shallow(<CheckInput label="Test" />);
    expect(wrapper).to.have.tagName('label');
  })
  
  it('renders label text if this.props.label is received', () => {
    const wrapper = mount(<CheckInput label="Test" />);
    expect(wrapper).to.include.text('Test');
  })
  
  it('calls console.warn if this.props.label is not received', () => {
    console.warn = chai.spy();
    const wrapper = mount(<CheckInput label="" />);
    wrapper.instance().getLabel();
    expect(console.warn).to.have.been.called();
  })
  
  it('renders a checkbox', () => {
    const wrapper = shallow(<CheckInput label="Test" />);
    expect(wrapper).to.have.descendants('[type="checkbox"]');
  })
})
