import PropTypes from 'prop-types';
import { Gender } from '@prisma/client';
import { SelectInput } from 'react-admin';
import { getChoicesList } from '@admin/_utils/common';
import { FormTranslations } from '@admin/_lib/translations';

export function GenderSelect({ label, ...props }) {
  const genderChoicesList = getChoicesList(Object.values(Gender), FormTranslations.gender);
  return <SelectInput name="gender" source="gender" label={label} choices={genderChoicesList} {...props} />;
}

GenderSelect.propTypes = {
  label: PropTypes.string,
};
