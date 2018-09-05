# Introduction

Thanks for using Undernet! Hit the ground running in your next project with this fully modular, highly configurable front-end framework.

Undernet is also extremely light, carrying no external dependencies apart from needing a `scss` compiler (if you aren't using the vanilla `css`).

## Get going fast!

Head over to the [download page](/docs/overview/download) to get Undernet's assets.

To use Undernet's CSS and JavaScript the quickest, link the bundled js and minified css directly in your template like so:

```html5
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

Contribute on [Github](https://www.github.com/geotrev/undernet/issues) if you have requests or a bug to report. Be sure to [read the notes](https://www.github.com/geotrev/undernet/master/CONTRIBUTING.md) on contributing a bug or pull request.
