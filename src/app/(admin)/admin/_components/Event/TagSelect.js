import React, { useState } from 'react';

import CreatableSelect from 'react-select/creatable';
import { Loading, useGetList, useCreate } from 'react-admin';
import PropTypes from 'prop-types';
import { RESOURCES } from '@admin/_lib/consts';

let newTagsLength;

export function TagSelect({ setSelectedTags, defaultValue }) {
  const [create] = useCreate();
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState(false);
  const { data: tags, isLoading } = useGetList(RESOURCES.eventTag);

  if (isLoading) return <Loading />;

  const onChange = newTags => {
    newTagsLength = newTags.reduce((currLen, tag) => currLen + tag.label.length, 0);
    if (newTagsLength > 16) {
      setError(true);
    } else {
      setValue(newTags);
      setSelectedTags(newTags);
    }
  };

  const defaultOptions = tags.map(tag => ({ label: tag.name, value: tag.name }));
  return (
    <>
      <CreatableSelect
        placeholder="Оберіть теги..."
        styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
        isMulti
        onChange={onChange}
        value={value}
        onCreateOption={name => create(RESOURCES.eventTag, { data: { name } })}
        options={defaultOptions}
      />
      {error && (
        <p className="text-p5 text-system-error">
          Сумарна кількість символів в усіх тегах події має бути не більше, ніж 16
        </p>
      )}
    </>
  );
}

TagSelect.propTypes = {
  setSelectedTags: PropTypes.func,
  defaultValue: PropTypes.array,
};
