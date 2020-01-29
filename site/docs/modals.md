---
title: Modals
description: A component for showing content in a modal dialog user interface.
permalink: /components/:basename
---

# {{ page.title }}

Use modals to focus the user experience on a critical task or set of information. Modals have simple base styling, with the contents using a semantic markup structure. You can use utility classes or your own custom CSS to style the modal content (including header, footer, and content).

Try to keep the modal dialog as high in the document tree as possible. While the dialog is styled in a way to make it mostly capable of being nested in divs or other wrappers, doing so comes with a risk of interfering with the fullscreen effect of the dialog.

Worth noting: there can only be one modal open at a time. Stacked modals are not supported.

## Basic Modal

Check out this example modal:

<button data-target="new-modal">Open modal</button>

<div class="modal-overlay" data-modal="new-modal">
  <div class="modal-dialog" data-parent="new-modal" aria-labelledby="header-id">
    <header class="is-d-flex has-justify-content-space-between has-align-items-center">
      <h2 class="h5 has-no-m" id="header-id">
        Modal Header
      </h2>
      <a class="has-font-size-sm" data-close href="#">
        Close
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer class="is-d-flex has-justify-content-flex-end">
      <a class="button has-no-m-block-end has-m-inline-end-sm" data-close href="#">
        Cancel
      </a>
      <a class="button is-primary has-no-m-block-end">
        OK
      </a>
    </footer>
  </div>
</div>

```html
<button data-target="modal-id">Open modal</button>

<div class="modal-overlay" data-modal="modal-id">
  <div class="modal-dialog" data-parent="modal-id" aria-labelledby="header-id">
    <header class="is-d-flex has-justify-content-space-between has-align-items-center">
      <h2 class="h5 has-no-m" id="header-id">
        Modal Header
      </h2>
      <a class="has-font-size-sm" data-close href="#">
        Close
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer class="is-d-flex has-justify-content-flex-end">
      <a class="button has-no-m-block-end has-m-inline-end-sm" data-close href="#">
        Cancel
      </a>
      <a class="button is-primary has-no-m-block-end">
        OK
      </a>
    </footer>
  </div>
</div>
```

## Long Content

The modal will be able to handle long-content with ease, turning the overlay into a scrollable area.

<button data-target="new-modal-3">Open long-content modal</button>

<div class="modal-overlay" data-modal="new-modal-3">
  <div class="modal-dialog" data-parent="new-modal-3" aria-labelledby="header-id">
    <header class="is-d-flex has-justify-content-space-between has-align-items-center">
      <h2 class="h5 has-no-m" id="header-id">
        Modal Header
      </h2>
      <a class="has-font-size-sm" data-close href="#">
        Close
      </a>
    </header>
    <section>
      Run up and down stairs kitty power and milk the cow. Love i like cats because they are fat and fluffy. Vommit food and eat it again leave dead animals as gifts, and spill litter box, scratch at owner, destroy all furniture, especially couch licks paws. Eat from dog's food loved it, hated it, loved it, hated it. Sniff other cat's butt and hang jaw half open thereafter rub whiskers on bare skin act innocent poop in litter box, scratch the walls. Cough i like cats because they are fat and fluffy sweet beast human give me attention meow for wake up human for food at 4am for touch water with paw then recoil in horror. Eat a rug and furry furry hairs everywhere oh no human coming lie on counter don't get off counter spit up on light gray carpet instead of adjacent linoleum yet intently stare at the same spot, so open the door, let me out, let me out, let me-out, let me-aow, let meaow, meaow! cry louder at reflection but mice. Show belly freak human out make funny noise mow mow mow mow mow mow success now attack human and swat turds around the house stare at ceiling light and gnaw the corn cob or give me attention or face the wrath of my claws spend all night ensuring people don't sleep sleep all day. Lick human with sandpaper tongue. Sit and stare mew licks your face ooh, are those your $250 dollar sandals? lemme use that as my litter box. Damn that dog dream about hunting birds or mesmerizing birds or push your water glass on the floor but meow all night, purrrrrr. Small kitty warm kitty little balls of fur fooled again thinking the dog likes me. I like fish russian blue and i could pee on this if i had the energy tuxedo cats always looking dapper howl on top of tall thing. I like frogs and 0 gravity meow for food, then when human fills food dish, take a few bites of food and continue meowing, yet allways wanting food and behind the couch, and kitty loves pigs or be a nyan cat, feel great about it, be annoying 24/7 poop rainbows in litter box all day. Hopped up on catnip leave fur on owners clothes drink water out of the faucet and lay on arms while you're using the keyboard refuse to drink water except out of someone's glass pooping rainbow while flying in a toasted bread costume in space. Lick butt and make a weird face. Present belly, scratch hand when stroked cat dog hate mouse eat string barf pillow no baths hate everything, yet kitty scratches couch bad kitty or sniff sniff and i like frogs and 0 gravity yet chirp at birds leave fur on owners clothes. Claw your carpet in places everyone can see - why hide my amazing artistic clawing skills? rub face on owner sit in box, milk the cow fight an alligator and win be a nyan cat, feel great about it, be annoying 24/7 poop rainbows in litter box all day intently stare at the same spot. Demand to have some of whatever the human is cooking, then sniff the offering and walk away i shredded your linens for you and wake up human for food at 4am, meow all night having their mate disturbing sleeping humans groom forever, stretch tongue and leave it slightly out, blep. All of a sudden cat goes crazy leave fur on owners clothes but steal the warm chair right after you get up for rub face on everything i like big cats and i can not lie. Sleep in the bathroom sink stuff and things or mice kitten is playing with dead mouse. Take a big fluffing crap 💩 meowing chowing and wowing cat is love, cat is life. Why must they do that chase laser loved it, hated it, loved it, hated it. My left donut is missing, as is my right stares at human while pushing stuff off a table yet lick master's hand at first then bite because im moody. Unwrap toilet paper lick arm hair but bathe private parts with tongue then lick owner's face reward the chosen human with a slow blink, soft kitty warm kitty little ball of furr. Demand to have some of whatever the human is cooking, then sniff the offering and walk away mew. Stick butt in face poop in the plant pot stuff and things stuff and things, for eat the rubberband.
    </section>
    <footer class="is-d-flex has-justify-content-flex-end">
      <a class="button has-no-m-block-end has-m-inline-end-sm" data-close href="#">
        Cancel
      </a>
      <a class="button is-primary has-no-m-block-end">
        OK
      </a>
    </footer>
  </div>
</div>

## Dialog Positioning

By adding flex modifier classes onto the overlay, you can position the dialog within its overlay.

For example, to center the dialog, add `is-d-flex has-align-items-center` to the overlay (wrapper) element.

<button data-target="new-modal-2">Open centered modal</button>

<div class="modal-overlay is-d-flex has-align-items-center" data-modal="new-modal-2">
  <div class="modal-dialog" data-parent="new-modal-2" aria-labelledby="header-id-2">
    <header class="is-d-flex has-justify-content-space-between has-align-items-center">
      <h2 class="h5 has-no-m" id="header-id">
        Modal Header
      </h2>
      <a class="has-font-size-sm" data-close href="#">
        Close
      </a>
    </header>
    <section>
      <p>Some modal content here</p>
    </section>
    <footer class="is-d-flex has-justify-content-flex-end">
      <a class="button has-no-m-block-end has-m-inline-end-sm" data-close href="#">
        Cancel
      </a>
      <a class="button is-primary has-no-m-block-end">
        OK
      </a>
    </footer>
  </div>
</div>

```html
<button data-target="modal-id">Open centered modal</button>

<div class="modal-overlay is-d-flex has-align-items-center" data-modal="modal-id">
  <div class="modal-dialog" data-parent="modal-id" aria-labelledby="header-id">
    ...
  </div>
</div>
```

Learn more about [alignment]({{ site.data.routes.alignment }}) and [display]({{ site.data.routes.display }}) utilities.

## Requirements

Two main pieces are required: an API call and correct HTML markup.

### HTML

#### Trigger Attributes

For the modal button, it should have two main properties:

```html
<button data-target="modal-id">Press me</button>
```

- `data-target`: an attribute containing a unique id pointing to the modal overlay's `data-modal` attribute.

#### Modal Attributes

For the modal itself, you can add a few more things.

```html
<div class="modal-overlay" data-modal="modal-id">
  <div class="modal-dialog" data-parent="modal-id" aria-labelledby="header-id">
    <header>
      <h2 id="header-id">
        Modal Header
      </h2>
      <a data-close href="#">
        Close
      </a>
    </header>
    <section>
      ...
    </section>
    <footer>
      <a data-close href="#">...</a>
    </footer>
  </div>
</div>
```

While optional, using `header` and `footer` elements provides semantic meaning for the dialog. It's highly recommended to use this structure.

- `data-modal`: an attribute with a value matching its trigger element's `data-target` attribute.
- `data-parent`: an attribute pointing to the modal wrapper. It should equal the value of the element with `data-modal`.
- `data-close`: an attribute indicating a button or link will close the active modal dialog.

#### Accessibility

The below attributes you should add to elements yourself. They increase the content's accessibility for users with assistive technologies, such as screen readers.

- `aria-hidden`: an attribute that should be attached to any icons (close or otherwise) in the modal, such as a "close" icon (in lieu of text). Screen readers are inconsistent with icons, so they should be hidden instead. When using an icon, make sure you have `is-visually-hidden` text describing the action.
- `aria-labelledby`: an attribute to be attached to the `modal-dialog` element. It should have a matching value to the header element's `id`.

[See WAI-ARIA documentation](https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html) on best-practices for the dialog modal UI pattern.

#### Styling Classes

- `modal-overlay`: adds overlay styling for the modal background.
- `modal-dialog`: the container for dialog content.

Edit much of the styling within `_config.scss`.

{% include partials/edit-on-github.html component="modal" %}
