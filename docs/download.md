# Download

Grab whichever source code best suits your project. Learn how to link your scripts and styles in the [Branding](/docs/overview/branding) and [JavaScript](/docs/overview/javascript) articles for the below assets.

## CDN

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [jsdelivr](https://jsdelivr.com).

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/undernet@3.1.3/dist/undernet.min.css" integrity="sha256-WZw0OFyjMnh8vR2D4DvSj08CppbVaGp0QF5ksQEKAsM=" crossorigin="anonymous">
```

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/undernet@3.1.3/dist/undernet.bundle.min.js" integrity="sha256-VLvc0wO2OS0ZRD/dBCflvfkJ5VktaEyFB/r3CGLYeec=" crossorigin="anonymous"></script>
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', Undernet.start())
</script>
```

## Minified & Compiled

Grab compiled assets if you need them statically.

- CSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.css.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.js.zip)

## Uncompiled & Unminified

Going this route allows for far more customization, but do so at your own risk. For the JavaScript in particular, you can exclude any unneeded component imports under the main `undernet.js` file.

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

<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/docs/download.md">Edit this page on Github!</a></p>
