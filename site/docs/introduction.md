---
title: Introduction
description: About Undernet, its history, principles, supported browsers, and how to contribute.
permalink: /overview/:basename
---

# {{ page.title }}

Welcome! Undernet is a fully modular, highly configurable set of base CSS styles and interactive UI components. It is responsive and automatically handles right-to-left languages with its styles and components.

The framework is extremely light, carrying no external dependencies. It's available via CDN, [NPM](https://www.npmjs.org/package/undernet), and as a raw download.

Head over to the [download page]({{ site.data.routes.download }}) to see how you can add Undernet to your project, then learn the [JavaScript]({{ site.data.routes.javascript }}) and [CSS]({{ site.data.routes.css }}) patterns that make using the framework a breeze.

Worth noting is that most direction-based CSS in Undernet utilizes native logical properties.

This means for pages with languages reading left-to-right, a padding modifier class like `has-p-inline-start` will apply left padding to its element, but in a right-to-left page (e.g., `dir="rtl"` is on `html`), the same modifier will apply right padding to reflect the opposite page flow. **This happens automatically** and is native to [nearly all main browsers](https://www.smashingmagazine.com/2018/03/understanding-logical-properties-values/).

## About Undernet

Undernet was created with the goal of simplifying the development experience, allowing the developer to write less CSS, as well as giving an easy JavaScript API for using common interactive UI patterns.

Over time, lots of new features have been added. These include lots of helper CSS classes and Sass utilities to empower developers in building their interfaces.

Undernet can both be a prototyping tool _or_ the basis for your web app. You can easily pick and choose which modules to include, reducing the size of the overall bundle.

### Core Principles

- 🧩 **Configurable:** The framework comes with a configuration file enabling full brand control, from global, to element, to component styling.
- ♿ **Accessible:** Accessibility is baked into all facets of Undernet; everyone can use your app or website out of the box.
- 📦 **Modular:** Undernet can act independently from your core stylesheet and be added to existing projects using a style [scope]({{ site.data.routes.css }}#style-scope).
- 🚲 **Flexible:** Installation options range from NPM, CDN, to self-hosting the source files.

### Support

Undernet's CSS and JavaScript will work in _recent versions_ these browsers, including Android and iOS versions.

- Chrome ✓
- Firefox ✓
- Safari ✓
- Opera ✓

There is only one exception and that's Opera Mini, which has yet to adopt CSS logical properties.

## Contribute

Undernet supports a FOSS methodology ([free and open source](https://en.wikipedia.org/wiki/Free_and_open-source_software)). You can contribute on [Github](https://www.github.com/geotrev/undernet/) if you have questions or a want to file a bug report. Be sure to [read about contributing](https://github.com/geotrev/undernet/blob/master/CONTRIBUTING.md) before filing a bug or pull request.

{% include partials/edit-on-github.html %}
