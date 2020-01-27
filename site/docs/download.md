---
title: Download
description: Get the framework using CDN, npm, or download the raw source code assets.
permalink: /overview/:basename
---

# {{ page.title }}

There's three ways to grab Undernet for your project: CDN, NPM, or the raw source code.

See related documentation to learn the patterns and API in the framework's [CSS]({{ site.data.routes.css }}) and [JavaScript]({{ site.data.routes.javascript }}).

## CDN (easiest)

The quickest way to use Undernet is to link the bundled js and minified css using a CDN, such as [jsdelivr](https://jsdelivr.com). Note that this route doesn't allow you to customize the style. For that, refer to the NPM or source code options further below.

Include the link tag before your custom CSS to get styles, and the script tag at the end of your `<body>` content.

{% include partials/install-cdn.html %}

Note that if you plan to link to and start Undernet via `<script>` tag, it's recommended to add an event listener for `DOMContentLoaded`, as shown above, to ensure the page is ready.

Head over to the [JavaScript]({{ site.data.routes.javascript }}) page to see more examples, including in UI frameworks like React.

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

Again, reference the [JavaScript]({{ site.data.routes.javascript }}) page on examples and export options.

### Getting Sass from the NPM module

When you import the Sass with NPM, you have two options:

1. Import `undernet.scss` straight into a stylesheet (similar to linking to undernet.css, but it's precompiled).
2. Import two separate files: a config with Sass helpers, then a file with the core framework with optional style scope. This route enables deep brand customization.

In these examples, the Webpack shorthand `~` is used to access `node_modules`, however any alternative will do fine.

#### Option 1: Import `undernet.scss`

This is the most straightforward. Simply add an import _one time_ in your application.

```scss
@import "~undernet/src/scss/undernet";
```

#### Option 2: Custom Setup

As mentioned, this method requires at least two files. The first file is your config, which will have Sass helpers like variables, functions, and mixins. This file can be imported wherever you want, as many times as you need, to get access to those utilities.

In your app, create a file called `_config.scss` like so:

```scss
@import "~undernet/src/scss/utilities/functions";

// Add config overrides here!

@import "~undernet/src/scss/config";
@import "~undernet/src/scss/utilities/mixins";
```

Note the comment; you can insert or import your variable overrides before the original `config` as all variables use the [Sass `!default` rule](https://sass-lang.com/documentation/variables#default-values).

The next file should import the core framework, including all elements, components, and class utilities (you can forego any components/elements that aren't relevant to your needs). **Only import this file once at the global level**. Your custom config should be imported at the top.

Let's call this next file `_custom-undernet.scss`:

```scss
@import "path/to/your/config";

// .#{$style-scope} {
@import "~undernet/src/scss/utilities/reset";
@import "~undernet/src/scss/layout/grid";
@import "~undernet/src/scss/elements/typography";
@import "~undernet/src/scss/elements/button";
@import "~undernet/src/scss/elements/form";
@import "~undernet/src/scss/components/collapsible";
@import "~undernet/src/scss/components/dropdown";
@import "~undernet/src/scss/components/modal";
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
<link href="path/to/custom-undernet.css" rel="stylesheet" />
<!-- all your other stylesheets/style tags after -->
```

If you used a style scope, you can put the import or link tag anywhere, just be conscious of how the style cascade will change if you do so.

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

{% include partials/edit-on-github.html %}
