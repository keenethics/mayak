import { Create, NumberInput, SelectArrayInput, SelectInput, SimpleForm, TextInput, required } from 'react-admin';
import { SelectDistrict } from './SelectDistrict';
import { SelectTherapies } from './SelectTherapies';
import { useWatch } from 'react-hook-form';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

function AddressInput() {
  const format = useWatch({ name: 'format' });
  const disabled = format === 'ONLINE';
  return (
    <>
      <TextInput source="fullAddress" label="Повна адреса" disabled={format === 'ONLINE'} />
      <SelectDistrict disabled={disabled} />
    </>
  );
}

export function CreateOrganization() {
  return (
    <Create>
      <SimpleForm>
        <p className="font-bold">Основна інформація</p>
        <TextInput source="name" label="Ім'я організації" validate={required()} />
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
        <NumberInput source="yearsOnMarket" label="Роки на ринку" />
        <TextInput source="description" className="w-96" label="Опис" multiline />
        <SelectTherapies />
        <p className="font-bold">Формат роботи та локація</p>
        <div className={fieldGroupClass}>
          <SelectInput
            source="formatOfWork"
            label="Формат роботи"
            choices={[
              { id: 'OFFLINE', name: 'Офлайн' },
              { id: 'ONLINE', name: 'Онлайн' },
              { id: 'BOTH', name: 'Офлайн + онлайн' },
            ]}
            validate={required()}
          />
          <AddressInput />
        </div>
        <p className="font-bold">Контакти</p>
        <div className={fieldGroupClass}>
          <TextInput label="Номер телефону" source="phone" />
          <TextInput label="Пошта" source="email" />
          <TextInput label="Вебсайт" source="website" />
        </div>
      </SimpleForm>
    </Create>
  );
}
