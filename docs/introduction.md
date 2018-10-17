# Introduction

Thanks for using Undernet! Hit the ground running in your next project with this fully modular, highly configurable front-end framework.

Undernet is extremely light, carrying no external dependencies apart from needing a SCSS compiler (if you aren't using the compiled CSS).

## Get Started

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [unpkg](https://www.unpkg.com).

```html
<link rel="stylesheet" href="https://unpkg.com/undernet@2.3.0/dist/undernet.min.css" integrity="sha256-A/vIR0IinRgHj5h+UCNE7KHMtKlCGl3Nf0gPdpZFz2A" crossorigin="anonymous">
```

```html
<script type="text/javascript" src="https://unpkg.com/undernet@2.3.0/dist/undernet.bundle.min.js" integrity="sha256-BRMcJimNgrAvje7cWFw//oHmCTmll6cH3g8Frb6rx2k" crossorigin="anonymous"></script>
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', Undernet.start())
</script>
```

Head over to the [download page](/docs/overview/download) to get Undernet's assets, or see other options for [including it in your pipeline](/docs/overview/javascript).

## About Undernet

Undernet was created with the goal of simplifying the developer experience, by writing less CSS and giving an easy JavaScript API for using common interactive UI patterns.

Undernet can both be a prototyping tool or the basis for your web app.

### Core Principles

- **Configuration:** The framework comes with a configuration file that you can update with your intended brand attributes, including colors, typography, grid, forms, and more.
- **Semantics:** If markup is required, it's logical and written with accessibility in mind.
- **Modularity:** Can act independent from your core stylesheet; the framework is specifically designed to be scoped and controlled as an alternative, to existing projects.
- **Agility:** Because all that's needed is an understanding of semantic HTML (and possibly SCSS), you will quickly get to developing without worrying about tons of custom styling/javascript.

### Support

Undernet's CSS and JavaScript will work in recent versions of these browsers:

- Chrome ✓
- Firefox ✓
- Safari ✓
- Opera ✓
- MS Edge ✓
- IE 11 ✓

## Contribute

Undernet is completely open source!

Contribute on [Github](https://www.github.com/geotrev/undernet/issues) if you have questions or a want to file a bug report. Be sure to [read about contributing](https://github.com/geotrev/undernet/blob/master/CONTRIBUTING.md) before filing a bug or pull request.

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/introduction.md">Edit this page on Github!</a></p>
