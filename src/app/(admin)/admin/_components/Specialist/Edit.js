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
  AutocompleteInput,
} = require('react-admin');
const { Gender, FormatOfWork } = require('@prisma/client');
const { FormFieldWrapper } = require('../FormFieldWrapper');
const { SpecialistFormSections, SpecialistFormFields } = require('../../_lib/specialistData');
const { capitalizeFirstLetter } = require('../../_utils/common');
const { FormTranslations } = require('../../_lib/translations');
const { TextInputList } = require('../TextInputList');

export function SpecialistEdit() {
  const getChoicesList = (list, translations) =>
    list.map(item => ({
      id: item,
      name: capitalizeFirstLetter(translations[item.toLowerCase()]) ?? item,
    }));

  const genderChoicesList = getChoicesList(Object.values(Gender), FormTranslations.gender);
  const formatOfWorkChoicesList = getChoicesList(Object.values(FormatOfWork), FormTranslations.formatOfWork);

  const { gender, yearsOfExperience, formatOfWork } = SpecialistFormFields;

  const { isFreeReception, description } = SpecialistFormFields;

  // const { data: districtsList, isLoading: districtsLoading } = useGetList(RESOURCES.district);

  const { addresses, fullAddress, nameOfClinic } = SpecialistFormFields;

  const isOnline = format => format === FormatOfWork.ONLINE;

  const { lastName, firstName, surname } = SpecialistFormFields;
  const generalInfoList = [lastName, firstName, surname];

  const { phone, email, website, instagram, facebook, youtube, linkedin, tiktok, viber, telegram } =
    SpecialistFormFields;
  const contactsList = [phone, email, website];
  const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok, viber, telegram];

  return (
    <Edit title={'Редагувати спеціаліста'} className="w-[800px]">
      <SimpleForm mode="onBlur" reValidateMode="onChange">
        {/* GENERAL */}
        <FormFieldWrapper title={SpecialistFormSections.general}>
          <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
            <TextInputList textInputList={generalInfoList} />
          </div>
          <ReferenceArrayInput source="specializationsIds" reference="Specialization">
            <AutocompleteArrayInput optionValue="id" optionText="name" />
          </ReferenceArrayInput>
        </FormFieldWrapper>
        {/* DETAILS */}

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
        {/* ADDRESSES */}
        <FormFieldWrapper title={SpecialistFormSections.addresses} className="mt-3">
          <FormDataConsumer>
            {({ formData }) =>
              isOnline(formData.formatOfWork) ? (
                <p className="mb-6 text-gray-700">Спеціаліст працює онлайн</p>
              ) : (
                <ArrayInput name={addresses.name} source={addresses.name} label={addresses.label} fullWidth>
                  <SimpleFormIterator inline fullWidth>
                    <TextInput
                      fullWidth
                      source={fullAddress.name}
                      label={fullAddress.label}
                      validate={fullAddress.isRequired && required()}
                      helperText="Вулиця, номер будинку, поверх, кабінет"
                    />
                    <TextInput
                      source={nameOfClinic.name}
                      label={nameOfClinic.label}
                      validate={nameOfClinic.isRequired && required()}
                      fullWidth
                    />
                    <ReferenceInput source="districtId" reference="District">
                      <AutocompleteInput optionValue="id" optionText="name" />
                    </ReferenceInput>
                    {/* <SelectInput
                      source={'district'}
                      label={district.label}
                      isLoading={districtsLoading}
                      choices={districtsList}
                      validate={district.isRequired && required()}
                      optionText="name"
                      optionValue="id"
                    /> */}
                  </SimpleFormIterator>
                </ArrayInput>
              )
            }
          </FormDataConsumer>
        </FormFieldWrapper>
        {/* SERVICES */}
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
        {/* CONTACTS */}
        <FormFieldWrapper title={SpecialistFormSections.contacts} className="mt-3">
          <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
            <TextInputList textInputList={contactsList} />
          </div>
          <div className="flex w-full flex-col flex-wrap md:flex-row md:gap-6 [&>*]:flex-grow">
            <TextInputList textInputList={socialMediaList} className="w-1/3" />
          </div>
        </FormFieldWrapper>
        {/* ACTIVATE */}
        <BooleanInput name="isActive" source="isActive" label="Активувати спеціаліста" className="mt-8" />
      </SimpleForm>
    </Edit>
  );
}
