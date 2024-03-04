import PropTypes from 'prop-types';
import { FormatOfWork } from '@prisma/client';

const relatedInstanceCore = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
};

export const districtPropType = PropTypes.shape(relatedInstanceCore);

export const therapyPropType = PropTypes.shape(relatedInstanceCore);

export const specializationPropType = PropTypes.shape(relatedInstanceCore);

export const addressPropType = PropTypes.shape({
  id: PropTypes.string,
  nameOfClinic: PropTypes.string,
  fullAddress: PropTypes.string,
  district: districtPropType,
  createdAt: PropTypes.instanceOf(Date),
});

export const specialistPropType = PropTypes.shape({
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  surname: PropTypes.string,
  specializations: PropTypes.array,
  gender: PropTypes.string,
  yearsOfExperience: PropTypes.number,
  formatOfWork: PropTypes.oneOf(Object.values(FormatOfWork)),
  addresses: PropTypes.arrayOf(addressPropType),
  therapies: PropTypes.arrayOf(therapyPropType),
  isFreeReception: PropTypes.bool,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  isActive: PropTypes.bool,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  tiktok: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
});

export const organizationTypePropType = PropTypes.shape(relatedInstanceCore);

export const organizationPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.arrayOf(organizationTypePropType),
  yearsOnMarket: PropTypes.number,
  formatOfWork: PropTypes.oneOf(Object.values(FormatOfWork)),
  addresses: PropTypes.arrayOf(addressPropType),
  therapies: PropTypes.arrayOf(therapyPropType),
  isFreeReception: PropTypes.bool,
  description: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  website: PropTypes.string,
  isActive: PropTypes.bool,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  tiktok: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
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
