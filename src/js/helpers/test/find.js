export const find = selector => {
  const elements = document.querySelectorAll(selector)

  if (elements.length > 1) {
    throw new Error(
      `Tried to find 1 instance of '${selector}', but found ${elements.length} instead.`
    )
  }

  return elements[0]
}
