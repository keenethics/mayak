const {
  Edit,
  SimpleForm,
  SelectInput,
  NumberInput,
  BooleanInput,
  required,
  useGetList,
  SelectArrayInput,
} = require('react-admin');
const { Gender, FormatOfWork } = require('@prisma/client');
const { FormFieldWrapper } = require('../FormFieldWrapper');
const { SpecialistFormSections, SpecialistFormFields } = require('../../_lib/specialistData');
const { capitalizeFirstLetter } = require('../../_utils/common');
const { FormTranslations } = require('../../_lib/translations');
const { RESOURCES } = require('../../_lib/consts');
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

  const { data: specializationsList, isLoading: specializationsLoading } = useGetList(RESOURCES.specialization);

  const { name, label, isRequired } = SpecialistFormFields.specializations;

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
          <SelectArrayInput
            name={name}
            source={name}
            label={label}
            isLoading={specializationsLoading}
            choices={specializationsList}
            validate={isRequired && required()}
            fullWidth
          />
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
        {/* ACTIVATE */}
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
