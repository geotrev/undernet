---
title: Accordions
description: A component that composes a series of collapsible containers.
permalink: /components/:basename
---

# {{ page.title }}

Use an accordion to orchestrate collapsibles together.

This component extends the [collapsible component]({{ site.data.routes.collapsibles }}) to add additional features.

## Basic Accordion

By default, an accordion will allow one collapsible's content to be visible at a time. If you wish to have more than one open on page load, simply remove `data-visible='false'` from each collapsible you want visible. However, once a collapsible trigger is clicked, the others will close like normal as well.

Check out this example accordion:

<div data-accordion="accordion1" class="accordion">
  <div class="collapsible" data-collapsible="collapsible-1">
    <h5>
      <button class="collapsible-trigger" id="button1" data-parent="accordion1" data-target="collapsible-1">
        People
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-1">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate. <a>A link,</a> and <a>another link!</a>
      </p>
    </div>
  </div>
  <div class="collapsible" data-visible="false" data-collapsible="collapsible-2">
    <h5>
      <button class="collapsible-trigger" id="button2" data-parent="accordion1" data-target="collapsible-2">
        Maps
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-2">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate. <a>A link,</a> and <a>another link!</a>
      </p>
    </div>
  </div>
  <div class="collapsible" data-visible="false" data-collapsible="collapsible-3">
    <h5>
      <button class="collapsible-trigger" id="button3" data-parent="accordion1" data-target="collapsible-3">
        Contact
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-3">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate. <a>A link,</a> and <a>another link!</a>
      </p>
    </div>
  </div>
</div>
<br/>

```html
<div data-accordion="accordion-id" class="accordion">
  <div class="collapsible" data-collapsible="collapsible-id-1">
    <h5>
      <button
        class="collapsible-trigger"
        id="accordionn-button-id"
        data-parent="accordion-id"
        data-target="collapsible-id-1"
      >
        People
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-id-1">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna ipsum ut
        voluptate.
      </p>
    </div>
  </div>
  <div class="collapsible" data-visible="false" data-collapsible="collapsible-id-2">
    <h5>
      <button
        class="collapsible-trigger"
        id="button2"
        data-parent="accordion-id"
        data-target="collapsible-id-2"
      >
        Maps
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-id-2">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna ipsum ut
        voluptate.
      </p>
    </div>
  </div>
  <div class="collapsible" data-visible="false" data-collapsible="collapsible-id-3">
    <h5>
      <button
        class="collapsible-trigger"
        id="button3"
        data-parent="accordion-id"
        data-target="collapsible-id-3"
      >
        Contact
      </button>
    </h5>
    <div class="collapsible-content" id="collapsible-id-3">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna ipsum ut
        voluptate.
      </p>
    </div>
  </div>
</div>
```

## Allow Multiple to Expand

Add `data-toggle-multiple` on the accordion wrapper to allow each collapsible to expand independently. This reverses the default behavior described above.

<div data-accordion="accordion2" class="accordion" data-toggle-multiple>
  <div class="collapsible" data-collapsible="content4">
    <h5>
      <button class="collapsible-trigger" id="button4" data-parent="accordion2" data-target="content4">
        People
      </button>
    </h5>
    <div class="collapsible-content" id="content4">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="collapsible" data-visible="false" data-collapsible="content5">
    <h5>
      <button class="collapsible-trigger" id="button5" data-parent="accordion2" data-target="content5">
        Maps
      </button>
    </h5>
    <div class="collapsible-content" id="content5">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
  <div class="collapsible" data-visible="false" data-collapsible="content6">
    <h5>
      <button class="collapsible-trigger" id="button6" data-parent="accordion2" data-target="content6">
        Contact
      </button>
    </h5>
    <div class="collapsible-content" id="content6">
      <p class="has-p">
        Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna
        ipsum ut voluptate.
      </p>
    </div>
  </div>
</div>
<br/>

```html
<div data-accordion="accordion-id" class="accordion" data-toggle-multiple>
  ...
</div>
```

## Requirements

Two main pieces are required: an API call and correct HTML markup.

#### Primary Attributes

- `data-accordion`: an attribute for the accordion wrapper. It should have a unique value matching each collapsible trigger's `data-parent` attribute.
- `data-parent`: an attribute on each collapsible trigger. It should have a value matching the wrapper's `data-accordion` attribute.

#### Accessibility

All accessibility is handled by the [collapsible]({{ site.data.routes.collapsibles }}) sub-components.

This component currently does not handle trapping of focus using arrow keys between collapsible triggers. If you desire this feature, you will need to implement it yourself (for now).

#### Styling Classes

- `accordion`: adds styling to the accordion wrapper.

{% include partials/edit-on-github.html component="accordion" %}
