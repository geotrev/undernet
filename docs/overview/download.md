---
layout: docs
title: Undernet – Download
---

# Download

There's three ways to grab Undernet for your project: CDN, NPM, or the raw source code.

See related documentation to learn the patterns and API in the framework's [CSS](/docs/overview/cs) and [JavaScript](/docs/overview/javascript).

## CDN (easiest)

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [jsdelivr](https://jsdelivr.com). Note that this route doesn't allow you to customize the style. For that, refer to the NPM or source code options further below.

Include the link tag before your custom CSS to get styles, and the script tag at the end of your `<body>` content.

```html
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/undernet@7.0.1/dist/undernet.min.css"
      integrity="sha256-KnjOnhVxsQ42o63VhArthjIVrK/sdtfSRKHpN6CLQVk="
      crossorigin="anonymous"
    />
    <!-- add other styles here -->
  </head>
  <body>
    <!-- add page content here -->
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/undernet@7.0.1/dist/undernet.bundle.min.js"
      integrity="sha256-60/3iJ2c/cnnr92z0U3w5R6Fq4+gjZmukb1D8RK9j3w="
      crossorigin="anonymous"
    ></script>
    <script type="text/javascript">
      document.addEventListener("DOMContentLoaded", Undernet.start)
    </script>
  </body>
</html>
```

Note that if you plan to link to and start Undernet via `<script>` tag, it's recommended to add an event listener for `DOMContentLoaded`, as shown above, to ensure the page is ready.

Head over to the [JavaScript](/docs/overview/javascript) page to see more examples, including in UI frameworks like React.

## NPM or Yarn

Install and setup with npm or yarn.

```sh
$ npm install -D undernet
```

```sh
$ yarn add -D undernet
```

Unlike if you use the CDN, the default export of the module _does not_ attach Undernet to the `window`.

Also, note that Undernet uses global DOM variables like `window` and `document`, which would normally break server-side rendering. To avoid conflicts, module scripts internally check against these globals before execution.

### Getting Sass from the NPM module

With NPM, you need to set up two files which import Undernet's Sass partials. In these examples, the Webpack shorthand `~` is used to access `node_modules`, however any alternative will do fine.

The first file is your config, which will have Sass helpers like variables, functions, and mixins. This can be imported wherever you want, as many times as you need, to get access to those utilities.

In your app, create a file called `_config.scss` like so:

```scss
@import "~undernet/src/scss/utilities/functions";
// Add config overrides here!
@import "~undernet/src/scss/config";
@import "~undernet/src/scss/utilities/mixins";
```

Note the comment; you can insert or import your variable overrides before the original `config` as all variables use the [Sass `!default` rule](https://sass-lang.com/documentation/variables#default-values).

The next file should import the core framework, including all elements, components, and class utilities (you can forego any components/elements that aren't relevant to you). **Only import this file once at the global level**, otherwise you'll duplicate the selectors for each redundant import. Your application's Sass entry file is a good place to import it.

Create a file called `_undernet.scss` like so:

```scss
@import "path/to/config";
// .#{$style-scope} {
@import "~undernet/src/scss/utilities/reset";
@import "~undernet/src/scss/layout/grid";
@import "~undernet/src/scss/elements/typography";
@import "~undernet/src/scss/elements/button";
@import "~undernet/src/scss/elements/form";
@import "~undernet/src/scss/components/dropdown";
@import "~undernet/src/scss/components/modal";
@import "~undernet/src/scss/components/accordion";
@import "~undernet/src/scss/components/tooltip";
@import "~undernet/src/scss/utilities/classes";
// }
@import "~undernet/src/scss/utilities/globals";
```

Finally, import `_undernet.scss` to your app's Sass entry file, wherever that might be:

```css
@import "path/to/custom-undernet";
// all your other styles after
```

... or link to the compiled CSS in your layout, before your app-specific styles..

```html
<link rel="stylesheet" ref="path/to/custom-undernet.css" />
<!-- all your other stylesheets/style tags after -->
```

If you used a style scope, you can disregard importing before all other styles.

## Source Files

Lastly, if you want to host the source files or minified versions directly, you can do that too:

### Minified & Compiled

Use these assets if you need static instances of the CDN bundled files.

- CSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.css.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.js.zip)

### Uncompiled & Unminified

Going this route allows for far more customization. Use this option if you intend to remove or customize your build by removing components and features you don't need.

- SCSS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.scss.zip)
- JS: [Download](https://github.com/geotrev/undernet/raw/master/dist/undernet.modules.js.zip)

{% include edit-on-github.html %}
