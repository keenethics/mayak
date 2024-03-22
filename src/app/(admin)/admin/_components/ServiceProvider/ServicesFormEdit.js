import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { AutocompleteArrayInput, FormDataConsumer, NumberInput, ReferenceArrayInput } from 'react-admin';
import { FaAngleDown } from 'react-icons/fa';

export function ServicesFormEdit({ therapiesChoices, unnecessaryForDraft }) {
  return (
    <FormDataConsumer>
      {({ formData }) => {
        const chosenEditTherapies = therapiesChoices?.filter(el => formData.therapiesIds?.indexOf(el.id) !== -1);

        // used to display the therapy prices only on specialist forms
        // TODO: remove once unnecessary
        const isOrganization = 'name' in formData && !('lastName' in formData);

        return (
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
                      label={`Ціна для ${el.name} від Х грн.год`}
                    />
                  ))}
                </AccordionDetails>
              </Accordion>
            )}
          </>
        );
      }}
    </FormDataConsumer>
  );
}

ServicesFormEdit.propTypes = {
  therapiesChoices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  unnecessaryForDraft: PropTypes.bool,
};
