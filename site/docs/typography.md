Typography in Undernet makes up for a large chunk of the customization options. Headers and many of the individual paragraph and inline text tags are modifiable.

Undernet also comes with each text style in class form, so if you need a header styled as a paragraph, you can simply use the `paragraph` class.

## Headers

Headers can vary a lot within a project. For that reason, headers use a scss map consisting of sizing by breakpoint (small, medium, large by default, but you can add more), as well as a separate map for color, weight, and margin.

These maps output their keys and values as css properties. This means you can add any `property: value` normally found in CSS into these maps.

<div class="row">
  <div class="xsmall-12 medium-6 columns has-no-padding-bottom">
    <p class="h1">Header 1</p>
  </div>
  <div class="xsmall-12 medium-6 columns has-no-padding-bottom">
    <p class="h2">Header 2</p>
  </div>
  <div class="xsmall-12 medium-6 columns has-no-padding-bottom">
    <p class="h3">Header 3</p>
  </div>
  <div class="xsmall-12 medium-6 columns has-no-padding-bottom">
    <p class="h4">Header 4</p>
  </div>
  <div class="xsmall-12 medium-6 columns has-no-padding-bottom">
    <p class="h5">Header 5</p>
  </div>
  <div class="xsmall-12 medium-6 columns has-no-padding-bottom">
    <p class="h6">Header 6</p>
  </div>
</div>

```html
<h1>Header 1</h1>
<h2>Header 2</h2>
<h3>Header 3</h3>
<h4>Header 4</h4>
<h5>Header 5</h5>
<h6>Header 6</h6>
```

## Paragraphs, Code & Inline Text

Paragraphs use the default font size, with a margin bottom. All text (like what you're reading now) uses paragraph style as the default.

```html
<p>
  Paragraphs use the default font size, with a margin bottom. All text (like what you're reading
  now) uses paragraph style as the default. Just a regular old paragraph. I debated using a lorem
  ipsum generator here, but I think typing out coherent thoughts is on the upswing.
</p>
```

Write long-form, pre-formatted text with ease:

<pre>
function() {
  console.log("'pre' tag, for retaining whitespace")
}
</pre>

```html
<pre>
  function() {
    console.log("'pre' tag, for retaining whitespace")
  }
</pre>
```

Use inline text tags as well:

<ul>
  <li><em>'em' tag</em>, for adding emphasis</li>
  <li><strong>'strong' tag</strong>, for adding importance</li>
  <li><code>'code' tag</code>, for showing one-line code snippets</li>
  <li><small>'small' tag</small>, for making text a little bit smaller</li>
  <li><mark>'mark' tag</mark>, for highlighting content</li>
  <li><u>'u' tag</u>, for differentiating emphasis</li>
</ul>

```html
<em>'em' tag</em>, for adding emphasis 
<strong>'strong' tag</strong>, for adding importance
<code>'code' tag</code>, for showing one-line code snippets 
<small>'small' tag</small>, for making text a little bit smaller
<mark>'mark' tag</mark>, for highlighting content 
<u>'u' tag</u>, for adding emphasis
```

## Lists

Ordered and unordered lists can be styled as well. You can change the bullet style for each, if you don't like the default `disc` and `decimal` variants.

<div class="row">
  <div class="xsmall-12 medium-6 columns">
    <p><strong>Unordered List</strong></p>
    <ul>
      <li>Unordered item</li>
      <li>Unordered item</li>
      <li>Unordered item</li>
    </ul>
  </div>
</div>

```html
<ul>
  <li>Unordered item</li>
  <li>Unordered item</li>
  <li>Unordered item</li>
</ul>
```

<div class="row">
  <div class="xsmall-12 medium-6 columns">
    <p><strong>Ordered List</strong></p>
    <ol>
      <li>Item #1</li>
      <li>Item #2</li>
      <li>Item #3</li>
    </ol>
  </div>
</div>

```html
<ol>
  <li>Item #1</li>
  <li>Item #2</li>
  <li>Item #3</li>
</ol>
```

<hr />
<p class="has-right-text">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/site/docs/typography.md">Edit this page on Github!</a></p>
