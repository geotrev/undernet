---
title: Display
description: Use display class helpers to customize the display of page elements.
permalink: /utilities/:basename
---

# {{ page.title }}

Change an element's `display` property on the fly with these utility classes.

Note: All display modifiers use an abbreviated syntax of `d` (for 'display').

```html
<div class="is-d-flex">...</div>
<div class="is-d-block">...</div>
<div class="is-d-none">...</div>
```

## Change Display By Breakpoint

Using the breakpoints defined in `$grid-breakpoints`, you can add them to the display properties to modify display at various viewport widths. The pattern is `is-X-d-Y`, where `X` is the breakpoint, and `Y` is one of `flex`, `block`, or `none`.

```html
<p class="is-xs-d-none is-md-d-flex is-xl-d-block">
  I'm not displayed at xs, use flex at md, and become block-level at xl
</p>
```

{% include partials/edit-on-github.html %}
