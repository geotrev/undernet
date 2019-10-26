Forms are a critical part of a user's experience on the web. Undernet helps forms to look the same across browsers and devices.

## Text Fields and Areas

Use consistently styled text and textarea elements. They should be wrapped in a label tag with appropriate matching `for`/`id` values.

<label for="example-name-1">
  Name
  <input id="example-name-1" type="text" value="" placeholder="Dr. Thomas Light" />
</label>
<label for="fieldset-textarea-1">
  Tell us about yourself:
  <textarea id="fieldset-textarea-1" placeholder="Tell me about yourself..."></textarea>
</label>

```html
<label for="example-name">
  Name
  <input id="example-name" type="text" value="" placeholder="Dr. Thomas Light" />
</label>
<label for="example-textarea">
  Tell us about yourself:
  <textarea id="example-textarea" placeholder="Tell me about yourself..."></textarea>
</label>
```

### A note on labels...

Undernet has an opinionated format for using labels, which is to keep your label text and input inside the label itself. The reason is three-fold: one, it makes more contextual sense; two, it helps code readability.

The third, and possibly most important reason, is for accessibility. Although it isn't technically required to keep this information in the label tag, it gives an extra boost in click area.

## Checkbox & Radio

Checkboxes and radios are inconsistent across browsers, so Undernet has a needed modifier class which you can attach to your input's label tag. The result is a consistently spaced and arranged input that uses the browser's default styling.

<label for="radio-example" class="has-check">
  <input id="radio-example" type="radio" /> Radio Input
</label>
<label for="checkbox-example" class="has-check">
  <input id="checkbox-example" type="checkbox" /> Checkbox Input
</label>

```html
<label for="radio-example" class="has-check">
  <input id="radio-example" type="radio" /> Radio Input
</label>
<label for="checkbox-example" class="has-check">
  <input id="checkbox-example" type="checkbox" /> Checkbox Input
</label>
```

## Fieldset

Use the fieldset tag to group form elements together. It should sit inside a form tag and contain a legend element describing the form.

<form>
  <fieldset>
    <legend>Sign Up For Our Newsletter</legend>
    <div class="row">
      <div class="is-xsmall-12 is-medium-6 column has-no-padding-block-end">
        <label for="fieldset-email">
          Email
          <input id="fieldset-email" type="email" value="" placeholder="person@example.com" />
        </label>
      </div>
      <div class="is-xsmall-12 is-medium-6 column has-no-padding-block-end">
        <label for="fieldset-name">
          Name
          <input id="fieldset-name" type="text" value="" placeholder="Dr. Thomas Light" />
        </label>
      </div>
      <div class="is-xsmall-12 column has-no-padding-block-end">
        <label for="fieldset-textarea">
          Tell us about yourself:
          <textarea id="fieldset-textarea" placeholder="I'm a big fan of..."></textarea>
        </label>
      </div>
      <div class="column has-no-padding-block-end">
        <label for="fieldset-check" class="has-check">
          <input id="fieldset-check" type="checkbox" /> Send me occasional marketing and product
          updates.
        </label>
        <input class="primary button" type="submit" value="Send Me the Goods!" />
      </div>
    </div>
  </fieldset>
</form>

```html
<form>
  <fieldset>
    <legend>Sign Up For Our Newsletter</legend>
    <div class="row">
      <div class="is-xsmall-12 is-medium-6 column has-no-padding-block-end">
        <label for="fieldset-email">
          Email
          <input id="fieldset-email" type="email" value="" placeholder="person@example.com" />
        </label>
      </div>
      <div class="is-xsmall-12 is-medium-6 column has-no-padding-block-end">
        <label for="fieldset-name">
          Name
          <input id="fieldset-name" type="text" value="" placeholder="Dr. Thomas Light" />
        </label>
      </div>
      <div class="is-xsmall-12 column has-no-padding-block-end">
        <label for="fieldset-textarea">
          Tell us about yourself:
          <textarea id="fieldset-textarea" placeholder="I'm a big fan of..."></textarea>
        </label>
      </div>
      <div class="column has-no-padding-block-end">
        <label for="fieldset-check" class="has-check">
          <input id="fieldset-check" type="checkbox" /> Send me occasional marketing and product
          updates.
        </label>
        <input class="primary button" type="submit" value="Send Me the Goods!" />
      </div>
    </div>
  </fieldset>
</form>
```

## Disabled States

Using the `[disabled]` attribute will visually and functionally disable the control.

The `disabled` class will visually dim the control, but not disable it functionally. The input must return `false` in JavaScript, have `aria-disabled='true'`, and still receive focus to disable the element in an accessible way.

<button disabled class="has-no-margin-block-end">Disabled Button</button>

<input type="text" disabled value="Disabled Text Input" />

<textarea disabled>Disabled Textarea.</textarea>

<label for="disabled-radio" class="has-check">
  <input id="disabled-radio" disabled type="radio" /> Disabled Radio Input
</label>
<label for="disabled-checkbox" class="has-check">
  <input id="disabled-checkbox" disabled type="checkbox" /> Disabled Checkbox Input
</label>

```html
<button disabled>Disabled Button</button>
<input type="text" disabled value="Disabled Text Input" />
<textarea disabled>Disabled Textarea.</textarea>

<label for="disabled-radio" class="has-check">
  <input id="disabled-radio" disabled type="radio" /> Disabled Radio Input
</label>
<label for="disabled-checkbox" class="has-check">
  <input id="disabled-checkbox" disabled type="checkbox" /> Disabled Checkbox Input
</label>
```

<hr />
<p class="has-text-end">Is this article inaccurate? <a href="https://github.com/geotrev/undernet/tree/master/app/docs/forms.md">Edit this page on Github!</a></p>
