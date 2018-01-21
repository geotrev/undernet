Monolith is a set of configurable components, so the most effective way to use it is to integrate it with your asset pipeline. Monolith can easily sit inside its own folder for you to customize when needed, then you can link to it via your global stylesheets/layouts.

[Download SCSS](https://github.com/geotrev/monolith/raw/master/src/SCSS/monolith-scss.zip)

Contents:
```
monolith-scss/
— components/
— helpers/
— _config.scss
— monolith.scss
```

* Components: Source code for Monolith’s core components.
* Helpers: Mixins, functions, and class helpers to help with generating styles in `components/`.
* _config.scss: Configuration for core components. E.g., branding, color, typography, spacing, etc.
* monolith.scss: 

Now you can import `monolith.scss` as if it were any other stylesheet:

```sass
@import ‘path/to/monolith’;
```

### Grab the compiled CSS
You can also add the compiled CSS to your project (much like you would with Bootstrap or Foundation) by downloading it and adding it to your layouts:

[Get CSS](https://www.github.com/geotrev/monolith/raw/master/src/CSS/monolith-css.zip)

```html
<link rel=“stylesheet” href=“path/to/monolith.css” />
```

_NOTE: Monolith will have all styles set to its defaults in the compiled CSS. You can simply override them by adding styles after Monolith in the source order, if you need to._