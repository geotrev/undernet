import { useDidMount } from "app/helpers"

export default function ScrollUpOnMount() {
  useDidMount(() => {
    window.scrollTo(0, 0)
  })

  return null
}
