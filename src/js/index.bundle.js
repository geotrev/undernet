import Undernet from "./index"
import { isBrowserEnv } from "./utils"

if (isBrowserEnv) {
  window.Undernet = Undernet
}
