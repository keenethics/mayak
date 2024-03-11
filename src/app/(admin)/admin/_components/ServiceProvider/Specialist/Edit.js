import { zodResolver } from '@hookform/resolvers/zod';
import { specialistEditValidationSchema } from '@/lib/validationSchemas/specialistSchema';
import { SpecialistFormFields, SpecialistFormSections } from '../../../_lib/specialistData';
import { FormFieldWrapper } from '../../FormFieldWrapper';
import { capitalizeFirstLetter } from '../../../_utils/common';
import { FormTranslations } from '../../../_lib/translations';
import { TextInputList } from '../../TextInputList';
import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';
import { DescriptionForm } from '../DescriptionForm';

const {
  Edit,
  SimpleForm,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  TextInput,
  AutocompleteArrayInput,
  ReferenceArrayInput,
  FormDataConsumer,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
} = require('react-admin');

const PropTypes = require('prop-types');
const { Gender, FormatOfWork } = require('@prisma/client');

function AddressForm({ getSource, readOnly }) {
  const { fullAddress, nameOfClinic } = SpecialistFormFields;
  return (
    <>
      <TextInput
        InputProps={{
          readOnly,
        }}
        fullWidth
        source={getSource(fullAddress.name)}
        label={fullAddress.label}
        validate={fullAddress.isRequired && required()}
        helperText="Вулиця, номер будинку, поверх, кабінет"
      />
      <TextInput
        InputProps={{
          readOnly,
        }}
        source={getSource(nameOfClinic.name)}
        label={nameOfClinic.label}
        validate={nameOfClinic.isRequired && required()}
        fullWidth
      />
      <ReferenceInput source={getSource('districtId')} reference="District">
        <SelectInput
          optionText="name"
          optionValue="id"
          InputProps={{
            readOnly,
          }}
        />
      </ReferenceInput>
    </>
  );
}

AddressForm.propTypes = {
  getSource: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

function AddressesEdit() {
  const { addresses } = SpecialistFormFields;

  const isOnline = format => format === FormatOfWork.ONLINE;

  return (
    <FormFieldWrapper title={SpecialistFormSections.addresses} className="mt-3">
      <FormDataConsumer>
        {({ formData }) => {
          if (!formData) return null;
          return isOnline(formData.formatOfWork) ? (
            <p className="mb-6 text-gray-700">Спеціаліст працює онлайн</p>
          ) : (
            <ArrayInput name={addresses.name} source={addresses.name} label={addresses.label} fullWidth readOnly>
              <SimpleFormIterator inline fullWidth readOnly={true}>
                <FormDataConsumer>
                  {({ scopedFormData, getSource }) => {
                    if (!scopedFormData) return null;
                    return scopedFormData.id ? (
                      <AddressForm scopedFormData={scopedFormData} getSource={getSource} readOnly />
                    ) : (
                      <AddressForm scopedFormData={scopedFormData} getSource={getSource} />
                    );
                  }}
                </FormDataConsumer>
              </SimpleFormIterator>
            </ArrayInput>
          );
        }}
      </FormDataConsumer>
    </FormFieldWrapper>
  );
}

function DetailsEdit() {
  const getChoicesList = (list, translations) =>
    list.map(item => ({
      id: item,
      name: capitalizeFirstLetter(translations[item.toLowerCase()]) ?? item,
    }));

  const genderChoicesList = getChoicesList(Object.values(Gender), FormTranslations.gender);
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  const { gender, yearsOfExperience, formatOfWork } = SpecialistFormFields;

  return (
    <FormFieldWrapper title={SpecialistFormSections.details} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <SelectInput
          name={gender.name}
          source={gender.name}
          label={gender.label}
          validate={gender.isRequired && required()}
          choices={genderChoicesList}
        />
        <NumberInput
          name={yearsOfExperience.name}
          source={yearsOfExperience.name}
          label={yearsOfExperience.label}
          validate={yearsOfExperience.isRequired && required()}
          min="0"
        />
        <SelectInput
          name={formatOfWork.name}
          source={formatOfWork.name}
          label={formatOfWork.label}
          choices={formatOfWorkChoicesList}
          validate={formatOfWork.isRequired && required()}
          className="flex-1"
        />
      </div>
    </FormFieldWrapper>
  );
}

function GeneralInfoEdit() {
  const { lastName, firstName, surname } = SpecialistFormFields;
  const generalInfoList = [lastName, firstName, surname];

  return (
    <FormFieldWrapper title={SpecialistFormSections.general}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={generalInfoList} />
      </div>
      <ReferenceArrayInput source={'specializationsIds'} reference="Specialization">
        <AutocompleteArrayInput optionValue="id" optionText="name" />
      </ReferenceArrayInput>
    </FormFieldWrapper>
  );
}

function ServicesEdit() {
  const { isFreeReception, description } = SpecialistFormFields;

  return (
    <FormFieldWrapper title={SpecialistFormSections.services}>
      <ReferenceArrayInput source="therapiesIds" reference="Therapy">
        <AutocompleteArrayInput optionValue="id" optionText="title" />
      </ReferenceArrayInput>
      <BooleanInput
        name={isFreeReception.name}
        source={isFreeReception.name}
        label={isFreeReception.label}
        className="w-max"
      />
      <TextInput name={description.name} source={description.name} label={description.label} fullWidth multiline />
    </FormFieldWrapper>
  );
}

const transformData = data => {
  // console.log({ data: JSON.stringify(data) });
  const therapiesToConnect = data.therapiesIds?.map(id => ({ id })) ?? [];
  const specializationsToConnect = data.specializationsIds?.map(id => ({ id }));
  const addressesToConnect = data.addresses?.filter(address => address.id).map(address => ({ id: address.id })) ?? [];
  const addressesToCreate =
    data.addresses
      ?.filter(address => !address.id)
      .map(address => ({
        ...address,
        district: { connect: { id: address.districtId } },
        districtId: undefined,
      })) ?? [];

  const unselectedAddresses =
    data.addressesIds?.filter(addressId => !addressesToConnect.some(address => address.id === addressId)) ?? [];
  // if formatOfWork is ONLINE, we need to delete all connected addresses
  const addressesToDelete =
    data.formatOfWork !== FormatOfWork.ONLINE ? unselectedAddresses.map(id => ({ id })) ?? [] : {};
  // console.log({ addressesToDelete: JSON.stringify(addressesToDelete) });
  return {
    ...data,
    specializationsIds: undefined,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: therapiesToConnect,
    },
    specializations: {
      set: [],
      connect: specializationsToConnect,
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};

export function SpecialistEdit() {
  return (
    <Edit
      title={'Редагувати дані спеціаліста'}
      // className="w-[800px]"
      transform={transformData}
      mutationMode="pessimistic"
    >
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(specialistEditValidationSchema)}>
        {/* GENERAL */}
        <GeneralInfoEdit />
        {/* DETAILS */}
        <DetailsEdit />
        {/* ADDRESSES */}
        <AddressesEdit />
        {/* SERVICES */}
        <ServicesEdit />
        <FormFieldWrapper title={'Послуги'}>
          <ReferenceArrayInput source="therapiesIds" reference="Therapy">
            <AutocompleteArrayInput optionValue="id" optionText="title" />
          </ReferenceArrayInput>
          <BooleanInput
            name={'isFreeReception'}
            source={'isFreeReception'}
            label={'Безкоштовний прийом'}
            className="w-max"
          />

          <DescriptionForm label={'Опис спеціаліста'} />
          {/* <TextInput name={'description'} source={'description'} label={'Опис'} fullWidth multiline /> */}
        </FormFieldWrapper>
        {/* CONTACTS */}
        <ContactsForm />
        {/* <ContactsEdit /> */}
        <ActivationForm label={'Активувати/деактивувати спеціаліста'} />
      </SimpleForm>
    </Edit>
  );
}
