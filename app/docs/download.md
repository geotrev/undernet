Grab whichever source code best suits your project. Learn how to link your scripts and styles in the [Branding](/docs/overview/branding) and [JavaScript](/docs/overview/javascript) articles for the below assets.

## CDN

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [jsdelivr](https://jsdelivr.com).

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/undernet@5.0.1/dist/undernet.min.css"
  integrity="sha256-yPp2KTWKoD1Uecln9S2xXrsO76bPtRbo+b+JHF82DBQ="
  crossorigin="anonymous"
/>
```

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/undernet@5.0.1/dist/undernet.bundle.min.js"
  integrity="sha256-iO4WD9ZOeHYBdtG2QyG58i7H/6IjcTwYPhEgyl1RxB0="
  crossorigin="anonymous"
></script>
<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", Undernet.start())
</script>
```

## Minified & Compiled

Use these assets if you need static instances of the CDN bundled files.

- CSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.css.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.js.zip)

## Uncompiled & Unminified

Going this route allows for far more customization. Use this option if you intend to remove or customize your build by removing components and features you don't need.

- SCSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.scss.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.modules.js.zip)

## NPM & Yarn

You can also install with npm or yarn. See the [JavaScript](/docs/overview/javascript) article for more details.

```sh
$ npm install -D undernet
```

```sh
$ yarn add -D undernet
```

And then import as you would normally:

```js
// import all of Undernet
import Undernet from "undernet"
// or only grab a single component - great for tree shaking unneeded components
import { Modal } from "undernet"
```

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/download.md">Edit this page on Github!</a></p>
