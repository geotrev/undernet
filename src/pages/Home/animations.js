import tinyData from "./tiny.json"
import modularData from "./modular.json"
import configurableData from "./configurable.json"
import a11yData from "./a11y.json"

export default [
  {
    animationData: {
      loop: true,
      autoplay: true,
      animationData: tinyData,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
    },
    title: "Tiny",
    subtitle:
      "CSS and JS under 12kb minified + gzipped; you can be assured performance isn’t an issue.",
  },
  {
    animationData: {
      loop: true,
      autoplay: true,
      animationData: modularData,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    },
    title: "Modular",
    subtitle:
      "Include only the pieces you need, or even namespace the components for existing projects.",
  },
  {
    animationData: {
      loop: true,
      autoplay: true,
      animationData: configurableData,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    },
    title: "Configurable",
    subtitle:
      "Built for a great developer experience, you can customize and extend the library with ease.",
  },
  {
    animationData: {
      loop: true,
      autoplay: true,
      animationData: a11yData,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
    },
    title: "Accessible",
    subtitle:
      "Interactive components are designed with WAI-ARIA guidelines in mind to ensure your HTML is accessible.",
  },
]