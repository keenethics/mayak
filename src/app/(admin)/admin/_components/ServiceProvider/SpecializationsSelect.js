import PropTypes from 'prop-types';
import { SelectArrayInput, useGetList } from 'react-admin';
import { RESOURCES } from '../../_lib/consts';

export function SpecializationsSelect({ label, ...props }) {
  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(RESOURCES.specialization);

  return (
    <SelectArrayInput
      name={'specializations'}
      source={'specializations'}
      label={label}
      isLoading={specializationsLoading}
      choices={specializationsList}
      {...props}
    />
  );
}

SpecializationsSelect.propTypes = {
  label: PropTypes.string,
};
