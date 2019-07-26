import _Accordion from "./accordion"
import _Dropdown from "./dropdown"
import _Modals from "./modal"
import _Tooltips from "./tooltip"
import _ContextUtil from "./utils"

export const Accordions = new _Accordion()
export const Dropdowns = new _Dropdown()
export const Modals = new _Modals()
export const Tooltips = new _Tooltips()
export const ContextUtil = new _ContextUtil()

const Undernet = {
  Modals,
  Accordions,
  Dropdowns,
  Tooltips,
  ContextUtil,
}

Undernet.start = () => {
  Undernet.Modals.start()
  Undernet.Accordions.start()
  Undernet.Dropdowns.start()
  Undernet.Tooltips.start()
  ContextUtil.enableFocusOutline()
}

Undernet.stop = () => {
  Undernet.Modals.stop()
  Undernet.Accordions.stop()
  Undernet.Dropdowns.stop()
  Undernet.Tooltips.stop()
  ContextUtil.disableFocusOutline()
}

export default Undernet
