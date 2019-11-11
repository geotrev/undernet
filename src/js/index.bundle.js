import Undernet from "./index"
import { browserEnv } from "./utils"

if (browserEnv) {
  window.Undernet = Undernet
}
