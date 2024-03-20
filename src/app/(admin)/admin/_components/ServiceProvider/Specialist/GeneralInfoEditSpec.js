import { CheckboxGroupInput, required, TextInput, useGetList } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa';
import { useWatch } from 'react-hook-form';
import { SpecializationsSelect } from './SpecializationsSelect';

export function GeneralInfoEditSpec({ type = FORM_TYPES.create }) {
  const specializationsNameToWatch = type === FORM_TYPES.create ? 'specializations' : 'specializationsIds';
  const specializationsIdList = useWatch({ name: specializationsNameToWatch });

  const { data: specializations } = useGetList(RESOURCES.specialization);

  const specializationsWithMethodsList = specializationsIdList
    ? specializations?.filter(
      ({ id, name }) =>
        specializationsIdList?.includes(id) &&
          (name.toLowerCase() === 'психолог' || name.toLowerCase() === 'психотерапевт'),
    )
    : [];
  specializationsIdList?.filter(({ id }) => specializations.find(s => s.id === id));

  return (
    <FormFieldWrapper title="Основна інформація">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInput key="firstName" name="firstName" type="text" label={`Ім'я`} validate={required()} />
        <TextInput key="lastName" name="lastName" type="text" label="Прізвище" validate={required()} />
        <TextInput key="surname" name="surname" type="text" label="По-батькові" />
      </div>
      <SpecializationsSelect type={type} label="Спеціалізації" fullWidth />
      {specializationsWithMethodsList?.map(specialization => {
        const label = specialization.name.toLowerCase();

        return (
          <Accordion className="mb-6" key={specialization.id}>
            <AccordionSummary expandIcon={<FaAngleDown />}>Методи і напрямки для {label}a</AccordionSummary>
            <AccordionDetails>
              <CheckboxGroupInput
                source="method"
                name="spezialization.method"
                choices={[
                  { id: 'u001', name: 'Арт-терапія' },
                  { id: 'u002', name: 'Гештальт терапія' },
                  { id: 'u003', name: 'Десенсибілізація та репроцесуалізація рухом очей (EMDR)' },
                  { id: 'u004', name: 'Діалектично-поведінкова терапія' },
                ]}
                row={false}
                label={false}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </FormFieldWrapper>
  );
}

GeneralInfoEditSpec.propTypes = {
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};
