'use client';

import React, { useState } from 'react';
import CheckBox from '../../_components/CheckBox';

export default function Page() {
  const [remember, setRemember] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  return (
    <div>
      <CheckBox
        value="value"
        name="name"
        onChange={() => {
          // prettier-ignore
          setIsDisabled(state => !state);
        }}
        text="Disable next checkbox"
        subText="Some subtext"
        checked={isDisabled}
        extraClasses={{
          text: 'font-bold',
          tick: 'stroke-other-black',
        }}
      />
      <CheckBox
        value="another_value"
        name="name"
        onChange={() => {
          // prettier-ignore
          setRemember(state => !state);
        }}
        text="Remember me"
        subText="Controlled element"
        checked={remember}
        extraClasses={{
          disabledSubText: 'text-primary-600',
        }}
        disabled={isDisabled}
      />
      <CheckBox
        value="value1"
        name="name"
        onChange={() => {}}
        text="Single choice unchecked"
      />
      <CheckBox
        value="value2"
        name="name"
        onChange={() => {}}
        text="Single choice checked"
        checked={true}
      />
      <CheckBox
        value="value3"
        name="name"
        onChange={() => {}}
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        checked={true}
      />
      <CheckBox
        value="value4"
        name="name"
        disabled={true}
        onChange={() => {}}
        text="Single choice disabled unchecked"
      />
      <CheckBox
        value="value5"
        name="name"
        disabled={true}
        onChange={() => {}}
        text="Single choice disabled checked"
        subText="Hi i'm a subtext"
        checked={true}
      />
      <CheckBox
        value="value6"
        name="name"
        onChange={() => {}}
        text="Customized component"
        subText="Hi i'm a subtext"
        checked={true}
      />
    </div>
  );
}
