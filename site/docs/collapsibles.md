---
title: Collapsibles
description: A component for hiding or showing content in a collapsible container.
permalink: /components/:basename
---

# {{ page.title }}

Use a collapsible to hide or show a single panel of content.

## Basic Collapsible

Check out this example collapsible:

<div class="collapsible" data-collapsible="collapsible-1">
  <h5>
    <button class="collapsible-trigger" id="trigger-1" data-target="collapsible-1">
      Press to collapse
    </button>
  </h5>
  <div class="collapsible-content" id="collapsible-1">
    <p class="has-p">
      It's just lorem ipsum. Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna ipsum ut voluptate. <a>A link,</a> and <a>another link!</a>
    </p>
  </div>
</div>
<br/>
```html
<div class="collapsible" data-collapsible="collapsible-id">
  <h5>
    <button class="collapsible-trigger" id="collapsible-trigger-id" data-target="collapsible-id">
      Press to collapse
    </button>
  </h5>
  <div class="collapsible-content" id="collapsible-id">
    <p class="has-p">
      It's just lorem ipsum. Consectetur eiusmod laboris in non id tempor exercitation ipsum
      cupidatat magna ipsum ut voluptate. <a>A link,</a> and <a>another link!</a>
    </p>
  </div>
</div>
```

## Controlling Visibility

Any given collapsible's content will be expanded by default. To force the content to be hidden at page load, add `data-visible="false"` on the wrapper.

<div class="collapsible" data-visible="false" data-collapsible="collapsible-2">
  <h5>
    <button class="collapsible-trigger" id="trigger-2" data-target="collapsible-2">
      Open for cake
    </button>
  </h5>
  <div class="collapsible-content" id="collapsible-2">
    <p class="has-p">
      Sorry, just gibberish. Consectetur eiusmod laboris in non id tempor exercitation ipsum cupidatat magna ipsum ut voluptate. <a>A link,</a> and <a>another link!</a>
    </p>
  </div>
</div>
<br/>
```html
<div class="collapsible" data-collapsible="collapsible-id" data-visible="false">
  ...
</div>
```

## Trigger & Content

You can use any trigger element you want for custom styling, although Undernet's own `collapsible-trigger` class can get you started. Just be sure to add the correct `data-*` attributes and you're good to go.

Similarly, you can replace the content element with any element you want as long as its `id` matches the trigger's `data-target` attribute. You shouldn't need to remove the `collapsible-content` class as its only purpose is visibility control.

Lastly, avoid adding margin or padding directly to the `collapsible-content` element; this will change collapse spacing and potentially break visibility. Instead, add a new element inside with its own margin/padding, as shown in the above examples.

## Disabled State

Handle the disabled state using `aria-disabled` on the trigger. Avoid using the `disabled` attribute as it is not consistent between screen readers. Undernet will detect `aria-disabled` and mark the element and behavior appropriately.

## Focusable Content

If you include links, buttons, or other focusable elements within collapsible content, `tabindex="-1"` is added to those elements while the content is not visible to ensure keyboard navigation remains on visible elements only.

## Requirements

Two main pieces are required: a single line of JS and correct HTML markup.

### HTML

A collapsible needs a few attributes and classes to work correctly. A strict HTML structure is needed for accessibility.

```html
<div class="collapsible" data-collapsible="collapsible-id">
  <h5>
    <button class="collapsible-trigger" id="collapsible-trigger-id" data-target="collapsible-id">
      ...
    </button>
  </h5>
  <div class="collapsible-content" id="collapsible-id">
    ...
  </div>
</div>
```

#### Primary Attributes

- `data-collapsible`: the main attribute for a collapsible component. It should have a unique value matching its trigger's `data-target` attribute.
- `data-target`: an attribute on a trigger. It should have a value equal to the collapsible content's `id` attribute.
- `data-visible`: an attribute denoting if collapsible content is visible; `false` by default. Set to `true` if you want the collapsible to be expanded on page load.

#### Accessibility

A few key attributes are added for you when the collapsible is instantiated. These help assistive technologies know how to treat and navigate through the component.

- **Header:** The collapsible trigger must have a header element that reflects the correct hierarchy of the page (`h1`, `h2`, etc...).
- `aria-labelledby`: an attribute added to collapsible content, telling assistive technologies the content is associated with its corresponding trigger.
- `aria-controls`: an attribute added to a trigger, telling assistive technologies which content block corresponds to it.
- `aria-expanded`: an attribute added to a trigger, telling assistive technologies if collapsible content is visible.
- `aria-hidden`: an attribute added to collapsible content, telling assistive technologies that the element can be ignored if it's set to `true`.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html) on best-practices for the collapse UI pattern.

#### Styling Classes

- `collapsible`: adds special styling for a trigger and content block.
- `collapsible-trigger`: adds styling for a trigger.
- `collapsible-content`: adds styling for a collapsible content block.

{% include partials/edit-on-github.html component="collapsible" %}
