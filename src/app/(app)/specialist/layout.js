import PropTypes from 'prop-types';

export default function Layout({ children, modal }) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.node,
};
