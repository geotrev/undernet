Monolith has only a couple functions it needs to get the job done, and they are primarily helpers for finding styles and managing `scss maps`.

Currently, `map-deep-get` from Hugo Giraudel and a simple color helper for the status palette are the only

* [map-deep-get](https://css-tricks.com/snippets/sass/deep-getset-maps/)
* [scss maps](https://www.sitepoint.com/using-sass-maps/)

### `status()`

Takes a keyword as an argument, like `warning`, to capture that color's hex value within `$status-palette` in `_config.scss`.

```sass
@function status($color) {
  @return map-get($status-palette, $color);
}
```


