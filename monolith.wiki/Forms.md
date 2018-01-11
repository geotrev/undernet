As with buttons, forms are easy to set up and use. Even more, you can include the grid inside of your `form` elements to create better layouts!

You can create any form structure you want with the same tags you already know:

```html
<form>
  <fieldset>
    <legend>
      Fieldset (no classes)
    </legend>
    <div class="row">
      <div class="medium-6 xsmall-12 columns">
        <label for="form">
          Email
          <input type="email" />
        </label>
        <label for="form">
          Password
          <input type="password" />
        </label>
      </div>
      <div class="medium-6 xsmall-12 columns">
        <label for="form">
          Address Ln 1
          <input type="email" />
        </label>
        <label for="form">
          Address Ln 2
          <input type="password" />
        </label>
      </div>
      <div class="column">
        <input type="submit" value="Submit" />
      </div>
    </div>
  </fieldset>
</form>
```

[Next: Helper Classes ⟶](classes)