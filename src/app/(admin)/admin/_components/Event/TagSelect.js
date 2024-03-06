import React from 'react';

import CreatableSelect from 'react-select/creatable';
import { Loading, useGetList, useCreate } from 'react-admin';
import PropTypes from 'prop-types';
import { RESOURCES } from '@admin/_lib/consts';

export function TagSelect({ setSelectedTags, defaultValue }) {
  const [create] = useCreate();
  const { data: tags, isLoading } = useGetList(RESOURCES.eventTag);
  if (isLoading) return <Loading />;
  const defaultOptions = tags.map(tag => ({ label: tag.name, value: tag.name }));
  return (
    <CreatableSelect
      placeholder="Оберіть теги..."
      styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
      isMulti
      onChange={setSelectedTags}
      defaultValue={defaultValue}
      onCreateOption={name => create(RESOURCES.eventTag, { data: { name } })}
      options={defaultOptions}
    />
  );
}

TagSelect.propTypes = {
  setSelectedTags: PropTypes.func,
  defaultValue: PropTypes.array,
};
