import { useEffect } from "react"

export default function ScrollUpOnMount() {
  const onMountOnly = []

  useEffect(() => {
    window.scrollTo(0, 0)
  }, onMountOnly)

  return null
}
