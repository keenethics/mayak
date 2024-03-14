import { useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';
import {
  AutocompleteArrayInput,
  BooleanInput,
  FormDataConsumer,
  NumberInput,
  ReferenceArrayInput,
  SelectArrayInput,
  required,
  useGetList,
} from 'react-admin';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa';

export function ServicesForm({ label, type = FORM_TYPES.create }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));

  const isActive = useWatch({ name: 'isActive' });
  const unnecessaryForDraft = isActive && required();

  return (
    <FormDataConsumer>
      {({ formData }) => {
        const chosenTherapies = therapiesList?.filter(el => formData.therapies?.indexOf(el.id) !== -1);
        return (
          <FormFieldWrapper title={label}>
            {type === FORM_TYPES.create ? (
              <SelectArrayInput
                name="therapies"
                source="therapies"
                label="Терапії"
                isLoading={therapiesLoading}
                choices={therapiesChoices}
                validate={unnecessaryForDraft}
                className="w-full"
              />
            ) : (
              <ReferenceArrayInput source="therapiesIds" reference="Therapy">
                <AutocompleteArrayInput
                  label="Терапії"
                  optionValue="id"
                  optionText="title"
                  validate={unnecessaryForDraft}
                />
              </ReferenceArrayInput>
            )}
            <BooleanInput
              name="isFreeReception"
              source="isFreeReception"
              label="Безкоштовний прийом"
              className="w-full"
              validate={unnecessaryForDraft}
            />
            <Accordion disabled={!formData.therapies || formData.therapies.length === 0}>
              <AccordionSummary expandIcon={<FaAngleDown />}>Ціни на терапії</AccordionSummary>
              <AccordionDetails>
                {chosenTherapies?.map(el => (
                  <NumberInput
                    fullWidth
                    key={el.id}
                    source={`therapyPrices.${el.id}`}
                    /* this source is not removed from formData after the therapy is deselected
                    it should be removed from the payload manually when transforming and validating the formData */
                    label={`Ціна для ${el.title} від Х грн.год`}
                  />
                ))}
              </AccordionDetails>
            </Accordion>
          </FormFieldWrapper>
        );
      }}
    </FormDataConsumer>
  );
}

ServicesForm.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
};
