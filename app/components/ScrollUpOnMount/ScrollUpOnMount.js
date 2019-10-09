import { useEffect } from "react"

export default function ScrollUpOnMount() {
  const observedStateOnMount = []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, observedStateOnMount)

  return null
}
