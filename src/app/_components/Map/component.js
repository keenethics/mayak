import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

export function Map({ points, center, zoom }) {
  const Window = dynamic(() => import('./window'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return <Window points={points} center={center} zoom={zoom} />;
}

Map.propTypes = {
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  center: PropTypes.arrayOf(PropTypes.number).isRequired,
  zoom: PropTypes.number.isRequired,
};
