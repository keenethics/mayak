import PropTypes from 'prop-types';
import { Gender } from '@prisma/client';
import { SelectInput, required } from 'react-admin';
import { getChoicesList } from '../../_utils/common';
import { FormTranslations } from '../../_lib/translations';

export function GenderSelect({ label }) {
  const genderChoicesList = getChoicesList(Object.values(Gender), FormTranslations.gender);
  return (
    <SelectInput name={'gender'} source={'gender'} label={label} validate={required()} choices={genderChoicesList} />
  );
}

GenderSelect.propTypes = {
  label: PropTypes.string,
};
