'use client';

import React from 'react';
import { Create, SimpleForm, TextInput, useGetList } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformData } from '@admin/_utils/transformSpecialistFormData';
import { specialistCreateValidationSchema } from '@admin/_lib/validationSchemas/specialistSchema';
import { ActivationForm } from '@admin/components/ServiceProvider/ActivationForm';
import { ServicesForm } from '@admin/components/ServiceProvider/ServicesForm';
import { AddressesForm } from '@admin/components/ServiceProvider/AddressesForm';
import { useRedirectToList } from '@admin/components/ServiceProvider/hooks';
import { ContactsList } from '@admin/components/ContactsList';
import { SocialLinks } from '@admin/components/ServiceProvider/SocialLinks';
import { GeneralInfoEditSpec } from './GeneralInfoEditSpec';
import { DetailsEditSpec } from './DetailsEditSpec';

// const PSYCHOTHERAPIST = 'психотерапевт';
// const PSYCHOLOGIST = 'психолог';

export function SpecialistCreate() {
  const { handleError, handleSuccess } = useRedirectToList({
    successMessage: SUCCESS_NOTIFICATIONS.created,
    redirectPath: `/${RESOURCES.specialist}`,
  });

  const { data: specializationsData } = useGetList(RESOURCES.specialization);
  const { data: methodsData } = useGetList(RESOURCES.method);

  const handleTransform = data => {
    const selectedSpecializationsNameList = data.specializations.map(specializationId => {
      const specialization = specializationsData.find(s => s.id === specializationId);
      return specialization.name;
    });

    const getSelectedSpecializationMethodsList = specializationName =>
      data.specializationMethods.filter(methodId => {
        const methodData = methodsData.find(m => m.id === methodId);
        if (methodData.specialization.name.toLowerCase() === specializationName.toLowerCase()) {
          return methodId;
        }

        return null;
      });

    const getSelectedPsychotherapistMethodsList = getSelectedSpecializationMethodsList('Психотерапевт');
    const getSelectedPsychologistMethodsList = getSelectedSpecializationMethodsList('Психолог');

    const psychologistMethodsList = selectedSpecializationsNameList.includes('Психолог')
      ? getSelectedPsychologistMethodsList
      : [];
    const psychotherapistMethodsList = selectedSpecializationsNameList.includes('Психотерапевт')
      ? getSelectedPsychotherapistMethodsList
      : [];

    return transformData({
      ...data,
      specializationMethods: [...psychologistMethodsList, ...psychotherapistMethodsList],
    });
  };

  return (
    <Create
      title="Додавання нового спеціаліста"
      transform={handleTransform}
      mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
    >
      <SimpleForm resolver={zodResolver(specialistCreateValidationSchema)}>
        <GeneralInfoEditSpec />
        <DetailsEditSpec />
        <AddressesForm label="Адреси надання послуг" />
        <ServicesForm label="Послуги" />
        <TextInput name="description" source="description" label="Опис" fullWidth multiline />
        <ContactsList />
        <SocialLinks />
        <ActivationForm label="Активувати/деактивувати спеціаліста" />
      </SimpleForm>
    </Create>
  );
}
