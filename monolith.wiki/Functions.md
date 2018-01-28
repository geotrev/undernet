Monolith has only a couple functions it needs to get the job done, and they are primarily helpers for navigating simple and complex SCSS maps.

* [map-deep-get](https://css-tricks.com/snippets/sass/deep-getset-maps/)
* [scss maps](https://www.sitepoint.com/using-sass-maps/)

### `status()`

Takes a keyword as an argument, like `warning`, to capture that color's hex value within `$status-palette` in `_config.scss`.

```sass
@function status($color) {
  @return map-get($status-palette, $color);
}
```


