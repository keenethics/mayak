'use client';

import PropTypes from 'prop-types';

export default function GlobalError({ error }) {
  return (
    <div className="w-[800]">
      <h2>Something went wrong!</h2>
      <pre>{JSON.stringify(error, null, 4)}</pre>
    </div>
  );
}

GlobalError.propTypes = {
  error: PropTypes.object,
};
