import React from "react";
import { NumberInput, required, SelectInput } from "react-admin";
import { FormatOfWork, Gender } from "@prisma/client";
import { FormFieldWrapper } from "@/app/admin/_components/FormFieldWrapper";
import { SpecialistFormFields, SpecialistFormSections } from "@/app/admin/_lib/specialistData";
import { FormTranslations } from "@/app/admin/_lib/translations";
import { capitalizeFirstLetter } from "@/app/admin/_utils/common";

export function Details() {
  const getChoicesList = (list, translations) =>
    list.map(item => ({
      id: item,
      name: capitalizeFirstLetter(translations[item.toLowerCase()]) ?? item
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
