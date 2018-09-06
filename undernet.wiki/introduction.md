# Introduction

Thanks for using Undernet! Hit the ground running in your next project with this fully modular, highly configurable front-end framework.

Undernet is also extremely light, carrying no external dependencies apart from needing a SCSS compiler (if you aren't using the vanilla CSS).

## Get Started

The quickest way to use Undernet is to link the bundled js and minified css directly in your template like so:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>I'm using Undernet!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="path/to/undernet.min.css">
    <!-- Add new styles after -->
  </head>
  <body>
    ...
    <script type="text/javascript" src="path/to/undernet.bundle.min.js" async></script>
    <script type="text/javascript">
      document.addEventListener('DOMContentLoaded', Undernet.start())
    </script>
  </body>
</html>
```

Head over to the [download page](/docs/overview/download) to get Undernet's assets, or see other options for [including it in your pipeline](/docs/overview/build-tooling).

## About Undernet

Undernet was created with the goal of simplifying the developer experience, by writing less CSS and giving an easy JavaScript API for using common interactive UI patterns.

Undernet can both be a prototyping tool or the basis for your web app.

## Contribute

Undernet is completely open source!

Contribute on [Github](https://www.github.com/geotrev/undernet/issues) if you have requests or a bug to report. Be sure to [read the suggestions](https://www.github.com/geotrev/undernet/master/CONTRIBUTING.md) on filing a bug or pull request.
