import { NumberInput } from 'react-admin';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { GenderSelect } from '../GenderSelect';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';

export function DetailsEditSpec({ validate }) {
  return (
    <FormFieldWrapper title={'Деталі'} className="mt-3">
      <div className={'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow'}>
        <GenderSelect label={'Стать'} validate={validate} />
        <NumberInput name={'yearsOfExperience'} source={'yearsOfExperience'} label={'Роки стажу'} min="0" />
        <FormatOfWorkSelect label={'Формат роботи'} validate={validate} className="flex-1" />
      </div>
    </FormFieldWrapper>
  );
}

DetailsEditSpec.propTypes = {
  validate: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
};
