import React from 'react';
import DemoSection from '../DemoSection/DemoSection';

import {
  Button,
  TextInput,
  RadioInput,
  CheckInput,
  HeaderText
} from 'components';

const Forms = () => {
  return (
    <DemoSection>
      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Input Field and Textarea</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <TextInput label="Input Field" id="textinput1" />
            <TextInput label="Disabled Text Field" id="textinput3" disabled />
          </form>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <TextInput textarea="true" label="Text Area" id="textinput2" />
            <TextInput textarea="true" label="Disabled Text Area" id="textinput4" className="disabled" disabled />
          </form>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Radio Input</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <label> Radio Column </label>
            <div className="radio-column">
              <RadioInput name="gender" label="Male" value="Male" id="radio1" />
              <RadioInput name="gender" label="Female" value="Female" id="radio2" />
              <RadioInput name="gender" label="Non-Binary" value="Non-Binary" id="radio3" />
            </div>
          </form>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <label> Radio Row </label>
            <div className="radio-row">
              <RadioInput name="gender" label="Male" value="Male" id="radio4" />
              <RadioInput name="gender" label="Female" value="Female" id="radio5" />
              <RadioInput name="gender" label="Non-Binary" value="Non-Binary" id="radio6" />
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Checkbox Input</HeaderText>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <label> Checkboxes Column </label>
            <div className="checkbox-column">
              <CheckInput id="check1" label="Samus" />
              <CheckInput id="check2" label="Captain Falcon" />
              <CheckInput id="check3" label="Marth" />
              <CheckInput id="check4" label="Mega Man" />
              <CheckInput id="check5" label="Roy" />
            </div>
          </form>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <label>Checkboxes Row</label>
            <div className="checkbox-row">
              <CheckInput id="check6" label="Samus" />
              <CheckInput id="check7" label="Captain Falcon" />
              <CheckInput id="check8" label="Marth" />
              <CheckInput id="check9" label="Mega Man" />
              <CheckInput id="check10" label="Roy" />
            </div>
          </form>
        </div>
      </div>

      <div className="row">
        <div className="xsmall-12 columns">
          <HeaderText>Fieldset</HeaderText>
          <div className="xsmall-12 collapsed columns">
            <p>Laid out using grid classes.</p>
          </div>
        </div>

        <div className="xsmall-12 columns">
          <form>
            <fieldset>
              <legend>
                Fieldset
              </legend>

              <div className="row">
                <div className="medium-6 xsmall-12 columns">
                  <TextInput label="Email" id="field1"  className="text-field" type="email" />
                </div>
                <div className="medium-6 xsmall-12 columns">
                  <TextInput label="Password" id="field2" className="text-field" type="password" />
                </div>
              </div>

              <div className="row">
                <div className="medium-6 xsmall-12 columns">
                  <TextInput label="Address Ln 1" id="field3" />
                </div>
                <div className="medium-6 xsmall-12 columns">
                  <TextInput label="Address Ln 2" id="field4" />
                </div>
              </div>

              <div className="row">
                <div className="column">
                  <Button type="button">Submit</Button>
                </div>
              </div>

            </fieldset>
          </form>
        </div>

      </div>
    </DemoSection>
  );
}

export default Forms;
