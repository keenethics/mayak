import { FormTranslations } from '@admin/_lib/translations';
import { capitalizeFirstLetter } from '@admin/_utils/common';
import { SelectInput, required } from 'react-admin';
import { FormatOfWork } from '@prisma/client';
import PropTypes from 'prop-types';

export function SelectFormat({ isActive }) {
  const getChoicesList = (list, translations) =>
    list.map(item => ({
      id: item,
      name: capitalizeFirstLetter(translations[item.toLowerCase()]) ?? item,
    }));

  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  return (
    <SelectInput
      source="formatOfWork"
      label="Формат послуг"
      validate={isActive && required()}
      choices={formatOfWorkChoicesList}
    />
  );
}

SelectFormat.propTypes = {
  isActive: PropTypes.bool,
};
