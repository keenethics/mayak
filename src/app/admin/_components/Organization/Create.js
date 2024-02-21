import {
  ArrayInput,
  BooleanField,
  BooleanInput,
  Create,
  NumberInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  SimpleFormIterator,
  TextInput,
  required,
} from 'react-admin';
import { SelectDistrict } from './SelectDistrict';
import { SelectTherapies } from './SelectTherapies';
import { useWatch } from 'react-hook-form';
import { AddressInput } from './CreateAdresses';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

// function AddressInput() {
//   const format = useWatch({ name: 'formatOfWork' });
//   const disabled = format === 'ONLINE' || !format;
//   return (
//     <ArrayInput source="addresses" label="Адреси">
//       <SimpleFormIterator inline disableReordering disableAdd={disabled}>
//         <TextInput source="fullAddress" label="Повна адреса" disabled={disabled} />
//         <SelectDistrict disabled={disabled} />
//       </SimpleFormIterator>
//     </ArrayInput>
//   );
// }

export function CreateOrganization() {
  return (
    <Create>
      <SimpleForm>
        <p className="font-bold">Основна інформація</p>
        <SelectArrayInput
          source="type"
          choices={[
            { id: 'PSY_CENTER', name: 'Психологічний центр' },
            { id: 'HOSPITAL', name: 'Лікарня' },
            { id: 'SOCIAL_SERVICE', name: 'Соціальна служба' },
          ]}
          label="Тип організації"
          validate={required()}
        />
        <TextInput source="name" label="Назва організації" validate={required()} />
        <NumberInput source="yearsOnMarket" label="Роки на ринку" />
        <p className="font-bold">Формат послуг та адреси</p>
        <div className={fieldGroupClass}>
          <SelectInput
            source="formatOfWork"
            label="Формат послуг"
            choices={[
              { id: 'OFFLINE', name: 'Офлайн' },
              { id: 'ONLINE', name: 'Онлайн' },
              { id: 'BOTH', name: 'Офлайн + онлайн' },
            ]}
            validate={required()}
          />
        </div>
        <AddressInput />
        <p className="font-bold">Типи терапії</p>
        <SelectTherapies />
        <BooleanInput source="isFreeReception" label="Безкоштовна консультація" validate={required()} />
        <p className="font-bold">Контакти</p>
        <div className={fieldGroupClass}>
          <TextInput label="Номер телефону" source="phone" />
          <TextInput label="Пошта" source="email" />
          <TextInput label="Вебсайт" source="website" />
        </div>
        <p className="font-bold">Опис</p>
        <TextInput source="description" className="w-96" label="Опис" validate={required()} multiline />
      </SimpleForm>
    </Create>
  );
}
