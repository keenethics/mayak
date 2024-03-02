import PropTypes from 'prop-types';

export const specialistPropType = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  surname: PropTypes.string,
  specializations: PropTypes.array,
  gender: PropTypes.string,
  yearsOfExperience: PropTypes.number,
  formatOfWork: PropTypes.string,
  addresses: PropTypes.array,
  therapies: PropTypes.array,
  isFreeReception: PropTypes.bool,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  isActive: PropTypes.bool,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  tiktok: PropTypes.string,
});

export const specialistContactPropType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.element,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  href: PropTypes.string,
});

export const specialistLabelPropType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.element,
  content: PropTypes.string,
  color: PropTypes.string,
});

export const specialistSocialsPropType = PropTypes.shape({
  id: PropTypes.string,
  icon: PropTypes.element,
  href: PropTypes.string,
});
