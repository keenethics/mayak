import { zodResolver } from '@hookform/resolvers/zod';
import { FormatOfWork } from '@prisma/client';
import { organizationEditValidationSchema } from '../../../_lib/validationSchemas/editOrganizationSchema';

import { ContactsForm } from '../ContactsForm';
import { ActivationForm } from '../ActivationForm';

const { Edit, SimpleForm } = require('react-admin');

const transformData = data => {
  // console.log({ data: JSON.stringify(data) });
  const therapiesToConnect = data.therapiesIds?.map(id => ({ id })) ?? [];
  const organizationTypesToConnect = data.organizationTypesIds?.map(id => ({ id }));
  const addressesToConnect = data.addresses?.filter(address => address.id).map(address => ({ id: address.id })) ?? [];
  const addressesToCreate =
    data.addresses
      ?.filter(address => !address.id)
      .map(address => ({
        ...address,
        district: { connect: { id: address.districtId } },
        districtId: undefined,
      })) ?? [];

  const unselectedAddresses =
    data.addressesIds?.filter(addressId => !addressesToConnect.some(address => address.id === addressId)) ?? [];
  // if formatOfWork is ONLINE, we need to delete all connected addresses
  const addressesToDelete =
    data.formatOfWork !== FormatOfWork.ONLINE ? unselectedAddresses.map(id => ({ id })) ?? [] : {};

  return {
    ...data,
    organizationTypesIds: undefined,
    therapiesIds: undefined,
    addressesIds: undefined,
    therapies: {
      set: [],
      connect: therapiesToConnect,
    },
    type: {
      set: [],
      connect: organizationTypesToConnect,
    },
    addresses: {
      connect: addressesToConnect,
      create: addressesToCreate,
      deleteMany: addressesToDelete,
    },
  };
};

export function OrganizationEdit() {
  return (
    <Edit title={'Редагувати дані організації'} transform={transformData} mutationMode="pessimistic">
      <SimpleForm mode="all" reValidateMode="onChange" resolver={zodResolver(organizationEditValidationSchema)}>
        {/* <GeneralInfoEdit />
        <DetailsEdit />
        <AddressesEdit /> */}
        {/* <ServicesEdit /> */}
        {/* <DescriptionForm label={'Опис організації'} /> */}
        <ContactsForm />
        <ActivationForm label={'Активувати/деактивувати організацію'} />
      </SimpleForm>
    </Edit>
  );
}
