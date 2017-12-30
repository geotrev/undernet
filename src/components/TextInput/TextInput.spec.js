import TextInput from './TextInput';

describe('<TextInput />', () => {
  it('renders with label tag', () => {
    const wrapper = shallow(<TextInput label="Test" />);
    expect(wrapper).to.have.tagName('label');
  })
  
  it('renders label text if this.props.label is received', () => {
    const wrapper = mount(<TextInput label="Test" />);
    expect(wrapper).to.include.text('Test');
  })
  
  it('calls console.warn if this.props.label is not received', () => {
    const wrapper = mount(<TextInput label="" />);
    console.warn = chai.spy();
    wrapper.instance().getLabel();
    expect(console.warn).to.have.been.called();
  })
  
  it('renders input[type="text"]', () => {
    const wrapper = shallow(<TextInput label="Test" />);
    expect(wrapper).to.have.descendants('[type="text"]');
  })
  
  it('renders textarea if textarea="true"', () => {
    const wrapper = shallow(<TextInput textarea="true" label="Test" />);
    expect(wrapper).to.have.descendants('textarea');
  })
  
  it('handleChange is called when user types text', () => {
    const wrapper = mount(<TextInput label="Test" />);
    const input = wrapper.find('input');
    input.simulate('change', {target: {value: 'some value'}});
    expect(input).to.have.value('some value');
  })
})
