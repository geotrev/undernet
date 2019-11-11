import _Collapsible from "./collapsible"
import _Accordion from "./accordion"
import _Dropdown from "./dropdown"
import _Modals from "./modal"
import _Tooltips from "./tooltip"
import { createFocusRing as _createFocusRing, createFocusTrap as _createFocusTrap } from "./utils"

export const Collapsibles = new _Collapsible()
export const Accordions = new _Accordion()
export const Dropdowns = new _Dropdown()
export const Modals = new _Modals()
export const Tooltips = new _Tooltips()
export const createFocusRing = _createFocusRing
export const createFocusTrap = _createFocusTrap

const Undernet = {
  Modals,
  Collapsibles,
  Accordions,
  Dropdowns,
  Tooltips,
  Utils: {
    createFocusTrap: _createFocusTrap,
    createFocusRing: _createFocusRing,
  },
}

const focusRing = Undernet.Utils.createFocusRing()

Undernet.start = () => {
  Undernet.Modals.start()
  Undernet.Accordions.start()
  Undernet.Collapsibles.start()
  Undernet.Dropdowns.start()
  Undernet.Tooltips.start()
  focusRing.start()
}

Undernet.stop = () => {
  Undernet.Modals.stop()
  Undernet.Accordions.stop()
  Undernet.Collapsibles.stop()
  Undernet.Dropdowns.stop()
  Undernet.Tooltips.stop()
  focusRing.stop()
}

export default Undernet
