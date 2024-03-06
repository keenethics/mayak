import React from 'react';
import PropTypes from 'prop-types';

export function TagList({ tags = [], isLoading, error }) {
  const tagItems = tags.map(tag => (
    <div className="rounded-full bg-[#2194f3] px-4 py-2 text-other-white" key={tag.id}>
      {tag.name}
    </div>
  ));

  if (error) {
    return (
      <div className="flex gap-2">
        <p>Error happened while fetching tags</p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex gap-2">
        <p>Loading...</p>
      </div>
    );
  }
  return <div className="flex gap-2">{tagItems}</div>;
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    }),
  ),
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};
