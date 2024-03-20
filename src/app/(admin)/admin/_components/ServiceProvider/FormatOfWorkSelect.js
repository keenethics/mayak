import PropTypes from 'prop-types';
import { FormatOfWork } from '@prisma/client';
import { SelectInput } from 'react-admin';
import { FormTranslations } from '@admin/_lib/translations';
import { getChoicesList } from '@admin/_utils/common';

export function FormatOfWorkSelect({ label, ...props }) {
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);
  return (
    <SelectInput name="formatOfWork" source="formatOfWork" label={label} choices={formatOfWorkChoicesList} {...props} />
  );
}

FormatOfWorkSelect.propTypes = {
  label: PropTypes.string,
};
