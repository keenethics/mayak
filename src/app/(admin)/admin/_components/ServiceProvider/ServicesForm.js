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
        const chosenCreateTherapies = therapiesList?.filter(el => formData.therapies?.indexOf(el.id) !== -1);
        const chosenEditTherapies = therapiesList?.filter(el => formData.therapiesIds?.indexOf(el.id) !== -1);

        // used to display the therapy prices only on specialist forms
        const isOrganization = formData.lastName === undefined;
        // console.log(formData, therapiesList);
        // console.log(chosenEditTherapies);
        return (
          <FormFieldWrapper title={label}>
            {type === FORM_TYPES.create ? (
              <>
                <SelectArrayInput
                  name="therapies"
                  source="therapies"
                  label="Терапії"
                  isLoading={therapiesLoading}
                  choices={therapiesChoices}
                  validate={unnecessaryForDraft}
                  className="w-full"
                />
                {!isOrganization && (
                  <Accordion disabled={!formData.therapies || formData.therapies.length === 0}>
                    <AccordionSummary expandIcon={<FaAngleDown />}>Ціни на терапії</AccordionSummary>
                    <AccordionDetails>
                      {chosenCreateTherapies?.map(el => (
                        <NumberInput
                          fullWidth
                          key={el.id}
                          source={`therapyPricesCreate.${el.id}`}
                          label={`Ціна для ${el.title} від Х грн.год`}
                        />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}
              </>
            ) : (
              <>
                <ReferenceArrayInput source="therapiesIds" reference="Therapy">
                  <AutocompleteArrayInput
                    label="Терапії"
                    optionValue="id"
                    optionText="title"
                    validate={unnecessaryForDraft}
                  />
                </ReferenceArrayInput>
                {!isOrganization && (
                  <Accordion disabled={!formData.therapiesIds || formData.therapiesIds.length === 0}>
                    <AccordionSummary expandIcon={<FaAngleDown />}>Ціни на терапії</AccordionSummary>
                    <AccordionDetails>
                      {chosenEditTherapies?.map(el => (
                        <NumberInput
                          fullWidth
                          key={el.id}
                          defaultValue={
                            formData.therapyPrices?.find(therapyPrice => therapyPrice.therapy.id === el.id)?.price
                          }
                          source={`therapyPricesEdit.${el.id}`}
                          label={`Ціна для ${el.title} від Х грн.год`}
                        />
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}
              </>
            )}
            <BooleanInput
              name="isFreeReception"
              source="isFreeReception"
              label="Безкоштовний прийом"
              className="w-full"
              validate={unnecessaryForDraft}
            />
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
