import TextInput from './TextInput';

describe('<TextInput />', () => {
  it('renders with label', () => {
    const wrapper = shallow(<TextInput label="Test" />);
    expect(wrapper).to.have.tagName('label');
  })
  
  xit('calls console.warn if this.props.label is not received', () => {
    const wrapper = mount(<TextInput />);
    console.warn = chai.spy();
    wrapper.instance();
    expect(console.warn).to.have.been.called();
  })
  
  it('renders a text input', () => {
    const wrapper = shallow(<TextInput label="Test" />);
    expect(wrapper).to.have.descendants('[type="text"]');
  })
  
  it('renders input', () => {
    const wrapper = shallow(<TextInput label="Test" />);
    expect(wrapper).to.have.descendants('input');
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
