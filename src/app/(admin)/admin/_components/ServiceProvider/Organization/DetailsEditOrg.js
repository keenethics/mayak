import { NumberInput } from 'react-admin';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function DetailsEditOrg({ validate }) {
  return (
    <FormFieldWrapper title={'Деталі'} className="mt-3">
      <div className={fieldGroupClass}>
        <NumberInput
          name={'yearsOnMarket'}
          source={'yearsOnMarket'}
          label={'Років на ринку'}
          validate={validate}
          min="0"
        />
        <FormatOfWorkSelect label={'Формат роботи'} validate={validate} className="flex-1" />
      </div>
    </FormFieldWrapper>
  );
}

DetailsEditOrg.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
