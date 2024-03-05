import { FormFieldWrapper } from '@/app/admin/_components/FormFieldWrapper';
import { SpecialistFormFields, SpecialistFormSections } from '@/app/admin/_lib/specialistData';
import { TextInputList } from '@/app/admin/_components/TextInputList';

export function Contacts() {
  const { phone, email, website, instagram, facebook, youtube, linkedin, tiktok, viber, telegram } =
    SpecialistFormFields;
  const contactsList = [phone, email, website];
  const socialMediaList = [instagram, facebook, youtube, linkedin, tiktok, viber, telegram];

  return (
    <FormFieldWrapper title={SpecialistFormSections.contacts} className="mt-3">
      <div className="flex w-full flex-col md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={contactsList} />
      </div>
      <p className="flex w-full text-primary-500">
        *Ви можете вказати від 1 до 5 посилань на соціальні мережі спеціаліста.
      </p>
      <div className="flex w-full flex-col flex-wrap md:flex-row md:gap-6 [&>*]:flex-grow">
        <TextInputList textInputList={socialMediaList} className="w-1/3" />
      </div>
    </FormFieldWrapper>
  );
}
