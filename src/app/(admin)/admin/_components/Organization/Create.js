import {
  BooleanInput,
  Create,
  FormDataConsumer,
  NullableBooleanInput,
  NumberInput,
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
import { SelectFormat } from './SelectFormat';

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
                <SelectFormat isActive={formData.isActive} />
              </div>
              <AddressInput isActive={formData.isActive} />
              <p className="font-bold">Типи терапії</p>
              <SelectTherapies isActive={formData.isActive} />
              <p className="font-bold">Безкоштовний прийом</p>
              <NullableBooleanInput
                source="isFreeReception"
                validate={formData.isActive && required()}
                label="Безкоштовний прийом"
                style={{ width: '224px' }}
                falseLabel="Ні"
                trueLabel="Так"
              />
              <p className="font-bold">Контакти</p>
              <div className={fieldGroupClass}>
                <TextInput label="Номер телефону" source="phone" />
                <TextInput label="Пошта" source="email" />
                <TextInput label="Вебсайт" source="website" />
              </div>
              <p className="font-bold">Соціальні мережі</p>
              <p className="my-1 flex w-full text-primary-500">
                *Ви можете вказати від 1 до 5 посилань на соціальні мережі організації.
              </p>
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
