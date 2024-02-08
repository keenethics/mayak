'use client';

import React, { useState } from 'react';
import { TextInputField } from '@/app/_components/InputFields';
import { Paragraph } from '@/app/_components/Typography';

export default function Page() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className="*:mx-5 *:my-9">
        <TextInputField
          value={value}
          placeholder="Full name"
          name="input_field1"
          // prettier-ignore
          onChange={e => setValue(e.target.value)}
        />
        <TextInputField
          value="value"
          name="input_field2"
          onChange={() => {}}
          placeholder="Placeholder"
          required={true}
          error={
            value === ''
              ? 'Please, enter something in the above field to remove error'
              : ''
          }
        />

        <Paragraph className="text-p1">Other input fields</Paragraph>
        <TextInputField
          value="Hello world"
          name="input_field2"
          onChange={() => {}}
          placeholder="Placeholder"
        />
        <TextInputField
          value=""
          name="input_field3"
          onChange={() => {}}
          placeholder="Placeholder"
          required={true}
        />
        <TextInputField
          value=""
          name="input_field4"
          onChange={() => {}}
          placeholder="Placeholder"
          required={true}
          error={
            value === '' ? 'Please enter some value into first input field' : ''
          }
        />
        <TextInputField value="" name="input_field2" onChange={() => {}} />
        <TextInputField
          value="Disabled"
          name="input_field5"
          onChange={() => {}}
          disabled={true}
        />
        <TextInputField
          value="Ipsum cillum mollit anim ea qui adipisicing laboris id ad non cupidatat do consectetur.Ullamco quis cillum officia mollit irure commodo pariatur dolore adipisicing in qui occaecat aliquip incididunt."
          name="input_field6"
          onChange={() => {}}
        />
      </div>
    </>
  );
}
