import {
  BooleanInput,
  Create,
  FormDataConsumer,
  NullableBooleanInput,
  NumberInput,
  SelectArrayInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { SelectTherapies } from './SelectTherapies';
import { AddressInput } from './CreateAdresses';
import { zodResolver } from '@hookform/resolvers/zod/src/zod';
import { OrganizationSchema } from '@admin/_utils/validationSchemas/createOrganizationSchema';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

export function CreateOrganization() {
  return (
    <Create>
      <SimpleForm resolver={zodResolver(OrganizationSchema)}>
        <FormDataConsumer>
          {({ formData }) => (
            <>
              <p className="font-bold">Основна інформація</p>
              <SelectArrayInput
                source="type"
                choices={[
                  { id: 'PSY_CENTER', name: 'Психологічний центр' },
                  { id: 'HOSPITAL', name: 'Лікарня' },
                  { id: 'SOCIAL_SERVICE', name: 'Соціальна служба' },
                ]}
                validate={formData.isActive && required()}
                label="Тип організації"
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
                  validate={formData.isActive && required()}
                />
              </div>
              <AddressInput isActive={formData.isActive} />
              <p className="font-bold">Типи терапії</p>
              <SelectTherapies validate={formData.isActive && required()} />
              <p className="font-bold">Безкоштовна консультація</p>
              <NullableBooleanInput
                source="isFreeReception"
                validate={formData.isActive && required()}
                label="Безкоштовна консультація"
                className="w-96"
                falseLabel="Ні"
                trueLabel="Так"
              />
              <p className="font-bold">Контакти</p>
              <div className={fieldGroupClass}>
                <TextInput label="Номер телефону" source="phone" />
                <TextInput label="Пошта" source="email" />
                <TextInput label="Вебсайт" source="website" />
              </div>
              <p className="font-bold">Опис</p>
              <TextInput
                source="description"
                validate={formData.isActive && required()}
                className="w-96"
                label="Опис"
                multiline
              />
              <BooleanInput source="isActive" defaultValue={false} label="Активний" />
            </>
          )}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
}
