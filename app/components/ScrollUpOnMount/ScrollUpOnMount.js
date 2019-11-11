import { useEffect } from "react"

export default function ScrollUpOnMount() {
  const observedState = []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, observedState)

  return null
}
