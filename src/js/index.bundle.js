import Undernet from "./index"
import { isBrowserEnv } from "./helpers"

if (isBrowserEnv) {
  window.Undernet = Undernet
}
