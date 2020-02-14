import { focusOnce } from "undernet/helpers/focus-once"

const headerJumpBtn = document.getElementById("header-jump-button")
const footerJumpBtn = document.getElementById("footer-jump-button")

const handleHeaderJump = () => {
  focusOnce(document.querySelector("main"))
}

const handleFooterJump = () => {
  focusOnce(document.querySelector("header"))
}

headerJumpBtn.addEventListener("click", handleHeaderJump)
footerJumpBtn.addEventListener("click", handleFooterJump)
