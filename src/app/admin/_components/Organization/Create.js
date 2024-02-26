import {
  BooleanInput,
  Create,
  FormDataConsumer,
  NullableBooleanInput,
  NumberInput,
  SelectInput,
  SimpleForm,
  TextInput,
  required,
} from 'react-admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrganizationSchema } from '@admin/_lib/validationSchemas/createOrganizationSchema';
import { transformOrganizationData } from '@admin/_utils/transformOrganizationData';
import { AddressInput } from './CreateAdresses';
import { SelectTherapies } from './SelectTherapies';
import { SelectOrganizationType } from './SelectOrgType';

const fieldGroupClass = 'flex flex-col md:flex-row md:gap-6';

export function OrganizationCreate() {
  return (
    <Create transform={transformOrganizationData}>
      <SimpleForm resolver={zodResolver(OrganizationSchema)}>
        <FormDataConsumer>
          {({ formData }) => (
            <>
              <p className="font-bold">Основна інформація</p>
              <SelectOrganizationType isActive={formData.isActive} />
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
              <SelectTherapies isActive={formData.isActive} />
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
