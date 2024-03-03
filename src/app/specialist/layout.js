import PropTypes from 'prop-types';

export default function Layout({ children, modal }) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.node,
};
