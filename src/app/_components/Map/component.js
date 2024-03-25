import dynamic from 'next/dynamic';
import { mapPropTypes } from './prop-types';

/**
 * Component that renders a map with points.
 * It's required to wrap component to div with defined height and width.
 * Example: <div style={{ height: '300px', width: '100%' }}><Map points={points} center={center} zoom={zoom} /></div>
 */
export function Map({ points, center, zoom }) {
  const Window = dynamic(() => import('./window'), {
    loading: () => <p>A map is loading</p>,
    ssr: false,
  });

  return <Window points={points} center={center} zoom={zoom} />;
}

Map.propTypes = mapPropTypes;
