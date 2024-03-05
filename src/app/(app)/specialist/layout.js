import PropTypes from 'prop-types';

export default function Layout({ children, modal }) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.node,
};
