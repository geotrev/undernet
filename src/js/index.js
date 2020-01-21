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

Undernet.start = (scopeId, enableFocusRing = false) => {
  Undernet.Modals.start(scopeId)
  Undernet.Accordions.start(scopeId)
  Undernet.Collapsibles.start(scopeId)
  Undernet.Dropdowns.start(scopeId)
  Undernet.Tooltips.start(scopeId)

  if (enableFocusRing) focusRing.start()
}

Undernet.stop = (scopeId, disableFocusRing = false) => {
  Undernet.Modals.stop(scopeId)
  Undernet.Accordions.stop(scopeId)
  Undernet.Collapsibles.stop(scopeId)
  Undernet.Dropdowns.stop(scopeId)
  Undernet.Tooltips.stop(scopeId)

  if (disableFocusRing) focusRing.stop()
}

export default Undernet
