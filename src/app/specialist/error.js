'use client';

import PropTypes from 'prop-types';

export default function Error({ error }) {
  return (
    <>
      <h2>Something went wrong!</h2>
      <pre>{JSON.stringify(error, null, 4)}</pre>
    </>
  );
}

Error.propTypes = {
  error: PropTypes.object,
};
