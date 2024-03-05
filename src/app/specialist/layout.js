import PropTypes from 'prop-types';

export default function Layout({ children, modal }) {
  return (
    // After adding filters to this page, fix lg:mt-[150px] on div. This style is needed because header is fixed and
    // otherwise breaks admin panel.
    <div className="lg:mt-[150px]">
      {children}
      {modal}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  modal: PropTypes.node,
};
