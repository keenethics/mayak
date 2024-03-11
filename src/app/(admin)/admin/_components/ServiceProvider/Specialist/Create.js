'use client';

import React from 'react';
import { Create, NumberInput, SimpleForm, TextInput, required, useNotify, useRedirect } from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { RESOURCES, SUCCESS_NOTIFICATIONS } from '@admin/_lib/consts';
import { transformData } from '@admin/_utils/transformSpecialistFormData';
import { specialistValidationSchema } from '@/lib/validationSchemas/specialistSchema';
import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { ServicesForm } from '../ServicesForm';
import { SpecializationsSelect } from '../SpecializationsSelect';
import { FormatOfWorkSelect } from '../FormatOfWorkSelect';
import { GenderSelect } from '../GenderSelect';
import { AddressesForm } from '../AddressesForm';

const filedGroupClass = 'flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow';

export function SpecialistCreate() {
  const notify = useNotify();
  const redirect = useRedirect();

  const handleSuccess = () => {
    notify(SUCCESS_NOTIFICATIONS.created);
    redirect(`/${RESOURCES.specialist}`);
  };

  const handleError = error => {
    notify(error.message);
  };

  return (
    <>
      <Create
        title="Додавання нового спеціаліста"
        transform={transformData}
        mutationOptions={{ onSuccess: handleSuccess, onError: handleError }}
      >
        <SimpleForm resolver={zodResolver(specialistValidationSchema)}>
          <FormFieldWrapper title={'General info'}>
            <div className={filedGroupClass}>
              <TextInput key={'firstName'} name={'firstName'} type={'text'} label={"Ім'я"} validate={required()} />
              <TextInput key={'lastName'} name={'lastName'} type={'text'} label={'Last Name'} validate={required()} />
              <TextInput key={'surname'} name={'surname'} type={'text'} label={'SUname'} />
            </div>
            <SpecializationsSelect label={'Спеціалізації'} fullWidth validate={required()} />
          </FormFieldWrapper>

          <FormFieldWrapper title={'Details'} className="mt-3">
            <div className={filedGroupClass}>
              <GenderSelect label={'Стать'} />
              <NumberInput
                name={'yearsOfExperience'}
                source={'yearsOfExperience'}
                label={'Роки досвіду'}
                validate={required()}
                min="0"
              />
              <FormatOfWorkSelect label={'Формат роботи'} />
            </div>
          </FormFieldWrapper>
          <AddressesForm />
          <ServicesForm label={'Послуги'} />
          <ContactsForm />
          <ActivationForm label={'Активувати/деактивувати спеціаліста'} />
        </SimpleForm>
      </Create>
    </>
  );
}
