import { TextInput } from 'react-admin';
import { FormFieldWrapper } from '../FormFieldWrapper';

const fieldGroupClass = 'flex w-full flex-col md:flex-row md:gap-6';

export function ContactsForm() {
  return (
    <FormFieldWrapper title="Контакти" className="mt-3 w-full">
      <div className={fieldGroupClass}>
        <TextInput label="Номер телефону" source="phone" />
        <TextInput label="Пошта" source="email" />
        <TextInput label="Вебсайт" source="website" />
      </div>
      <p className="font-bold text-primary-700">Соціальні мережі</p>
      <div className={fieldGroupClass}>
        <TextInput label="Instagram" source="instagram" />
        <TextInput label="Facebook" source="facebook" />
        <TextInput label="YouTube" source="youtube" />
      </div>
      <div className={fieldGroupClass}>
        <TextInput label="LinkedIn" source="linkedin" />
        <TextInput label="TikTok" source="tiktok" />
      </div>
      <div className={fieldGroupClass}>
        <TextInput label="Viber" source="viber" />
        <TextInput label="Telegram" source="telegram" />
      </div>
    </FormFieldWrapper>
  );
}
