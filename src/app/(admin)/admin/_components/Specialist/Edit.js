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
const { FormFieldWrapper } = require('../FormFieldWrapper');
const { SpecialistFormSections, SpecialistFormFields } = require('../../_lib/specialistData');
const { capitalizeFirstLetter } = require('../../_utils/common');
const { FormTranslations } = require('../../_lib/translations');
const { TextInputList } = require('../TextInputList');

function AddressForm({ getSource, disabled }) {
  const { fullAddress, nameOfClinic } = SpecialistFormFields;
  return (
    <>
      <TextInput
        disabled={disabled}
        fullWidth
        source={getSource(fullAddress.name)}
        label={fullAddress.label}
        validate={fullAddress.isRequired && required()}
        helperText="Вулиця, номер будинку, поверх, кабінет"
      />
      <TextInput
        disabled={disabled}
        source={getSource(nameOfClinic.name)}
        label={nameOfClinic.label}
        validate={nameOfClinic.isRequired && required()}
        fullWidth
      />
      <ReferenceInput source={getSource('districtId')} reference="District">
        <SelectInput disabled={disabled} optionText="name" optionValue="id" />
      </ReferenceInput>
    </>
  );
}

AddressForm.propTypes = {
  getSource: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
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
                      <AddressForm scopedFormData={scopedFormData} getSource={getSource} disabled />
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
        <TextInput
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

function ContactsEdit() {
  const { phone, email, website, instagram, facebook, youtube, linkedin, tiktok, viber, telegram } =
    SpecialistFormFields;

  const contactsList = [phone, email, website];
  const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok, viber, telegram];

  return (
    <FormFieldWrapper title={SpecialistFormSections.contacts} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={contactsList} />
      </div>
      <div className="flex w-full flex-col flex-wrap md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={socialMediaList} className="w-1/3" />
      </div>
    </FormFieldWrapper>
  );
}

const transformData = data => {
  const addressesToConnect = data.addresses.filter(address => address.id).map(address => ({ id: address.id }));
  const addressesToCreate = data.addresses
    .filter(address => !address.id)
    .map(address => ({
      ...address,
      district: { connect: { id: address.districtId } },
      districtId: undefined,
    }));

  const addressesToDelete = data.addressesIds
    .filter(addressId => !addressesToConnect.some(address => address.id === addressId))
    .map(id => ({ id }));

  return {
    ...data,
    specializationsIds: undefined,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: data.therapiesIds?.map(id => ({ id })),
    },
    specializations: {
      set: [],
      connect: data.specializationsIds?.map(id => ({ id })),
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
    <Edit title={'Редагувати спеціаліста'} className="w-[800px]" transform={transformData} mutationMode="pessimistic">
      <SimpleForm mode="onBlur" reValidateMode="onChange">
        {/* GENERAL */}
        <GeneralInfoEdit />
        {/* DETAILS */}
        <DetailsEdit />
        {/* ADDRESSES */}
        <AddressesEdit />
        {/* SERVICES */}
        <ServicesEdit />
        {/* CONTACTS */}
        <ContactsEdit />
        {/* ACTIVATE */}
        <BooleanInput name="isActive" source="isActive" label="Активувати спеціаліста" className="mt-8" />
      </SimpleForm>
    </Edit>
  );
}
