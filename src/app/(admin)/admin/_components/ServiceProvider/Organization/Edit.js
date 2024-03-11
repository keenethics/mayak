import { zodResolver } from '@hookform/resolvers/zod';
import { organizationEditValidationSchema } from '../../../_lib/validationSchemas/editOrganizationSchema';
import { OrganizationFormFields, SpecialistFormFields, SpecialistFormSections } from '../../../_lib/specialistData';
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
const { FormatOfWork } = require('@prisma/client');

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

  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  const { yearsOnMarket, formatOfWork } = OrganizationFormFields;

  return (
    <FormFieldWrapper title={SpecialistFormSections.details} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <NumberInput
          name={yearsOnMarket.name}
          source={yearsOnMarket.name}
          label={yearsOnMarket.label}
          validate={yearsOnMarket.isRequired && required()}
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

// function ServicesEdit() {
//   const { isFreeReception, description } = SpecialistFormFields;

//   return (
//     <FormFieldWrapper title={SpecialistFormSections.services}>
//       <ReferenceArrayInput source="therapiesIds" reference="Therapy">
//         <AutocompleteArrayInput optionValue="id" optionText="title" />
//       </ReferenceArrayInput>
//       <BooleanInput
//         name={isFreeReception.name}
//         source={isFreeReception.name}
//         label={isFreeReception.label}
//         className="w-max"
//       />
//       <TextInput name={description.name} source={description.name} label={description.label} fullWidth multiline />
//     </FormFieldWrapper>
//   );
// }

// function ContactsEdit() {
//   const { phone, email, website, instagram, facebook, youtube, linkedin, tiktok, viber, telegram } =
//     OrganizationFormFields;

//   const contactsList = [phone, email, website];
//   const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok, viber, telegram];

//   return (
//     <FormFieldWrapper title={SpecialistFormSections.contacts} className="mt-3">
//       <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
//         <TextInputList textInputList={contactsList} />
//       </div>
//       <div className="flex w-full flex-col flex-wrap md:flex-row md:gap-6 [&>*]:flex-grow">
//         <TextInputList textInputList={socialMediaList} className="w-1/3" />
//       </div>
//     </FormFieldWrapper>
//   );
// }

function GeneralInfoEdit() {
  const { name } = OrganizationFormFields;
  const generalInfoList = [name];
  return (
    <FormFieldWrapper title={SpecialistFormSections.general}>
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={generalInfoList} />
      </div>
      <ReferenceArrayInput source={'organizationTypesIds'} reference="OrganizationType">
        <AutocompleteArrayInput optionValue="id" optionText="name" />
      </ReferenceArrayInput>
    </FormFieldWrapper>
  );
}

const transformData = data => {
  // console.log({ data: JSON.stringify(data) });
  const therapiesToConnect = data.therapiesIds?.map(id => ({ id })) ?? [];
  const organizationTypesToConnect = data.organizationTypesIds?.map(id => ({ id }));
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

  return {
    ...data,
    organizationTypesIds: undefined,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: therapiesToConnect,
    },
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};

export function OrganizationEdit() {
  return (
    <Edit title={'Редагувати дані організації'} transform={transformData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(organizationEditValidationSchema)}>
        <GeneralInfoEdit />
        <DetailsEdit />
        <AddressesEdit />
        {/* <ServicesEdit /> */}
        <DescriptionForm label={'Опис організації'} />
        <ContactsForm />
        <ActivationForm label={'Активувати/деактивувати організацію'} />
      </SimpleForm>
    </Edit>
  );
}
