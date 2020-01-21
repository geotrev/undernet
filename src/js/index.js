import _Collapsible from "./collapsible"
import _Accordion from "./accordion"
import _Dropdown from "./dropdown"
import _Modals from "./modal"
import _Tooltips from "./tooltip"
import { createFocusRing as _createFocusRing, createFocusTrap as _createFocusTrap } from "./helpers"

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
  createFocusTrap: _createFocusTrap,
  createFocusRing: _createFocusRing,
}

const focusRing = Undernet.createFocusRing()

Undernet.start = (id, enableFocusRing = false) => {
  Undernet.Modals.start(id)
  Undernet.Accordions.start(id)
  Undernet.Collapsibles.start(id)
  Undernet.Dropdowns.start(id)
  Undernet.Tooltips.start(id)

  if (enableFocusRing) focusRing.start()
}

Undernet.stop = (id, disableFocusRing = false) => {
  Undernet.Modals.stop(id)
  Undernet.Accordions.stop(id)
  Undernet.Collapsibles.stop(id)
  Undernet.Dropdowns.stop(id)
  Undernet.Tooltips.stop(id)

  if (disableFocusRing) focusRing.stop()
}

export default Undernet
