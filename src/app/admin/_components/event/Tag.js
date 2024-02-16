import React from 'react';

import CreatableSelect from 'react-select/creatable';
import { Loading, useGetList, useCreate } from 'react-admin';
import PropTypes from 'prop-types';

export function Tag({ setSelectedTags }) {
  const [create] = useCreate();
  const { data: tags, isLoading } = useGetList('EventTag');
  if (isLoading) return <Loading />;
  const defaultOptions = tags.map(tag => ({ label: tag.name, value: tag.name }));
  return (
    <CreatableSelect
      placeholder="Choose tags..."
      styles={{ menu: base => ({ ...base, zIndex: 9999 }) }}
      isMulti
      onChange={setSelectedTags}
      onCreateOption={name => create('EventTag', { data: { name } })}
      options={defaultOptions}
    />
  );
}

Tag.propTypes = {
  setSelectedTags: PropTypes.func,
};
