'use client';

import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import {
  BooleanInput,
  FormDataConsumer,
  NumberInput,
  required,
  SelectArrayInput,
  TextInput,
  useGetList,
} from 'react-admin';
import { RESOURCES } from '@admin/_lib/consts';
import { FormFieldWrapper } from '@admin/_components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@admin/_lib/specialistData';
import { FaAngleDown } from 'react-icons/fa';

export function Services() {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const { therapies, isFreeReception, description } = SpecialistFormFields;

  const therapiesChoices = therapiesList?.map(({ id, title }) => ({ id, name: title }));
  return (
    <FormFieldWrapper title={SpecialistFormSections.services}>
      <FormDataConsumer>
        {({ formData }) => {
          const chosenTherapies = therapiesList?.filter(el => formData.therapies?.indexOf(el.id) !== -1);
          return (
            <>
              <SelectArrayInput
                name={therapies.name}
                source={therapies.name}
                label={therapies.label}
                isLoading={therapiesLoading}
                choices={therapiesChoices}
                validate={therapies.isRequired && required()}
                className="w-full"
              />
              <BooleanInput
                name={isFreeReception.name}
                source={isFreeReception.name}
                label={isFreeReception.label}
                className="w-max"
              />
              <TextInput
                name={description.name}
                source={description.name}
                label={description.label}
                fullWidth
                multiline
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
            </>
          );
        }}
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}
