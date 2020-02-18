---
title: Text
description: Use text helper classes to apply style changes on the fly.
permalink: /utilities/:basename
---

# {{ page.title }}

When you need to add custom font styles in specific places, rely on these utility classes to handle it.

## Font Family

Change an element and/or it's children to use sans or sans-serif font family as defined in your `_config.scss`.

<p class="filler has-p has-font-sans">I'm in sans-serif font</p>
<p class="filler has-p has-font-serif">I'm in serif font</p>

```html
<p class="has-font-sans">I'm in sans-serif font</p>
<p class="has-font-serif">I'm in serif font</p>
```

## Text Align

Align text start, right, or end.

<p class="filler has-p has-text-start">I'm aligned left (right for rtl)</p>
<p class="filler has-p has-text-center">I'm aligned center</p>
<p class="filler has-p has-text-end">I'm aligned right (left for rtl)</p>

```html
<p class="has-text-start">I'm aligned left</p>
<p class="has-text-center">I'm aligned center</p>
<p class="has-text-end">I'm aligned right</p>
```

## Font Weight

Make your font bold or italic.

<p class="filler has-p has-font-bold">I'm bold</p>
<p class="filler has-p has-font-italic">I'm italic</p>

```html
<p class="has-font-bold">I'm bold</p>
<p class="has-font-italic">I'm italic</p>
```

{% include partials/edit-on-github.html %}
