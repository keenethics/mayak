import React from 'react';
import p from 'prop-types';

const XComponent = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    className={className}
  >
    <path
      d="M18.7595 0H5.24046C2.35086 0 0 2.35086 0 5.24046V18.7595C0 21.6491 2.35086 24 5.24046 24H18.7595C21.6491 24 24 21.6491 24 18.7595V5.24046C24 2.35086 21.6491 0 18.7595 0ZM22.7629 18.7595C22.7629 20.967 20.967 22.7629 18.7595 22.7629H5.24046C3.03301 22.7629 1.23711 20.967 1.23711 18.7595V5.24046C1.23711 3.03301 3.03301 1.23711 5.24046 1.23711H18.7595C20.967 1.23711 22.7629 3.03301 22.7629 5.24046V18.7595ZM13.7036 10.8652L18.3724 5.04604C18.5862 4.77956 18.5435 4.39027 18.2771 4.17645C18.0106 3.96272 17.6213 4.00533 17.4075 4.27185L12.9105 9.87672L8.41356 4.27185C8.29613 4.12553 8.11868 4.04036 7.93108 4.04036H4.28897C4.05105 4.04036 3.83421 4.17684 3.73128 4.39136C3.62835 4.60587 3.6576 4.86042 3.8065 5.04599L10.2964 13.1348L5.62753 18.954C5.41376 19.2204 5.45646 19.6097 5.72289 19.8236C5.8371 19.9152 5.97377 19.9596 6.10961 19.9596C6.29072 19.9596 6.4703 19.8804 6.59248 19.7281L11.0895 14.1233L15.5864 19.7281C15.7038 19.8745 15.8813 19.9596 16.0689 19.9596H19.711C20.0526 19.9596 20.3305 19.6827 20.3305 19.3411C20.3305 19.1834 20.2715 19.0395 20.1744 18.9303L13.7036 10.8652ZM16.3657 18.7225L5.57834 5.27748H7.63433L18.4217 18.7225H16.3657Z"
      fill="currentColor"
    />
  </svg>
);
export default XComponent;

XComponent.propTypes = {
  className: p.string,
};
