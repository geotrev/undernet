Grab whichever source code best suits your project. Learn how to link your scripts and styles in the [Branding](/docs/overview/branding) and [JavaScript](/docs/overview/javascript) articles for the below assets.

## CDN

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [jsdelivr](https://jsdelivr.com).

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/undernet@4.4.1/dist/undernet.min.css"
  integrity="sha256-KAkOhhbOk89pSIdeP0FSuYDVBy6vldISb+BKlNr+wbs="
  crossorigin="anonymous"
/>
```

```html
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/undernet@4.4.1/dist/undernet.bundle.min.js"
  integrity="sha256-bsY+VnWNN4w3Up6W+HKi4nyIovEO9CW+zkrlW4JwD2g="
  crossorigin="anonymous"
></script>
<script type="text/javascript">
  document.addEventListener("DOMContentLoaded", Undernet.start())
</script>
```

## Minified & Compiled

Grab compiled assets if you need them statically.

- CSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.css.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.js.zip)

## Uncompiled & Unminified

Going this route allows for far more customization. These should also grant better debugging during development.

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
