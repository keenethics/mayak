import PropTypes from 'prop-types';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FormDataConsumer, NumberInput, SelectArrayInput } from 'react-admin';
import { FaAngleDown } from 'react-icons/fa';

export function ServicesFormCreate({ therapiesLoading, therapiesChoices, unnecessaryForDraft }) {
  return (
    <FormDataConsumer>
      {({ formData }) => {
        const chosenCreateTherapies = therapiesChoices?.filter(el => formData.therapies?.indexOf(el.id) !== -1);

        // used to display the therapy prices only on specialist forms
        // TODO: remove once unnecessary
        const isOrganization = 'name' in formData && !('lastName' in formData);

        return (
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

ServicesFormCreate.propTypes = {
  therapiesLoading: PropTypes.bool,
  therapiesChoices: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  unnecessaryForDraft: PropTypes.bool,
};
