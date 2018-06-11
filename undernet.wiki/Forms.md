As with buttons, forms are easy to set up and use. Use the grid component to orchestrate better layouts, as well.

```html
<form>
  <fieldset>
    <legend>
      Fieldset
    </legend>
    <div class="row">
      <div class="medium-6 xsmall-12 columns">
        <label for="input-1">
          Email
          <input type="email" id="input-1" />
        </label>
        <label for="input-2">
          Password
          <input type="password" id="input-2" />
        </label>
      </div>
      <div class="column">
        <input type="submit" value="Submit" />
      </div>
    </div>
  </fieldset>
</form>
```

Included is also the option to create radio/checkbox rows or columns with the corresponding class name: `radio-row`, `radio-column`, `checkbox-row`, or `checkbox-column`.

```html
<form>
  <div className="radio-row">
    <label for="radio1">
      <input name="gender" label="Male" value="Male" id="radio1" />
      Male
    </label>
    <label for="radio2">
      <input name="gender" label="Female" value="Female" id="radio2" />
      Female
    </label>
    <label for="radio3">
      <input name="gender" label="Non-Binary" value="Non-Binary" id="radio3" />
      Non-Binary
    </label>
  </div>
  <div class="column">
    <input type="submit" value="Submit" />
  </div>
</form>
```

Next: [Modals ►](modals)
