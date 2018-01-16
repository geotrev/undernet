import Template, {
  Overview, Download, Config,
  Grid, Type, Buttons, Forms,
  Classes, Mixins, Functions
} from './Articles';

describe("<Articles />", () => {
  let wrapper;

  it("renders #articles-wrapper", () => {
    wrapper = shallow(<Template></Template>);
    expect(wrapper).to.have.length(1);
  })

  it("can render Template (with children)", () => {
    wrapper = shallow(<Template>Testiness</Template>);
    expect(wrapper).to.include.text("Testiness")
  })

  it("can render Overview", () => {
    wrapper = shallow(<Overview />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Download", () => {
    wrapper = shallow(<Download />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Config", () => {
    wrapper = shallow(<Config />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Grid", () => {
    wrapper = shallow(<Grid />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Type", () => {
    wrapper = shallow(<Type />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Buttons", () => {
    wrapper = shallow(<Buttons />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Forms", () => {
    wrapper = shallow(<Forms />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Classes", () => {
    wrapper = shallow(<Classes />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Mixins", () => {
    wrapper = shallow(<Mixins />);
    expect(wrapper).to.have.length(1);
  })

  it("can render Functions", () => {
    wrapper = shallow(<Functions />);
    expect(wrapper).to.have.length(1);
  })
})
