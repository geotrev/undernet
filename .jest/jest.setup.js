import Enzyme, { shallow, mount } from "enzyme"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

global.shallow = shallow
global.mount = mount

// Create a simple component instance with jest.mock()
// jest.mock("./path/to/Component", () => simpleMock("Component"))
global.simpleMock = mockName => {
  // eslint-disable-next-line
  return eval(`const ${mockName} = props => props.children || null; ${mockName}`)
}
