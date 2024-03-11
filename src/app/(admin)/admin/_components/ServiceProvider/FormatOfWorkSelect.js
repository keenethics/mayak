import PropTypes from 'prop-types';
import { FormatOfWork } from '@prisma/client';
import { SelectInput, required } from 'react-admin';
import { FormTranslations } from '../../_lib/translations';
import { getChoicesList } from '../../_utils/common';

export function FormatOfWorkSelect({ label }) {
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);
  return (
    <SelectInput
      name={'formatOfWork'}
      source={'formatOfWork'}
      label={label}
      choices={formatOfWorkChoicesList}
      validate={required()}
      className="flex-1"
    />
  );
}

FormatOfWorkSelect.propTypes = {
  label: PropTypes.string,
};
