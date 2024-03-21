import { ArrayInput, BooleanInput, required, SelectInput, SimpleFormIterator } from 'react-admin';
import { FORM_TYPES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { clientCategoryType } from '@/app/(admin)/admin/_lib/specialistPropTypes';

function ClientCategoryForm({ getSource, clientCategory }) {
  return (
    <>
      <BooleanInput
        defaultValue={false}
        source={getSource('isWorkingWith')}
        label="Працює з категорією"
        fullWidth
        className="mb-[-0.6rem] mt-4"
      />
      <SelectInput
        label="Категорії"
        source={getSource('clientCategory')}
        optionText="title"
        optionValue="id"
        validate={required()}
        choices={clientCategory.map(({ id, title }) => ({ id, title }))}
      />
    </>
  );
}

ClientCategoryForm.propTypes = {
  getSource: PropTypes.func.isRequired,
  clientCategory: PropTypes.arrayOf(clientCategoryType),
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
};

function HelperText({ children }) {
  return <p className="mb-6 text-gray-700">{children}</p>;
}

HelperText.propTypes = {
  children: PropTypes.node,
};

// eslint-disable-next-line react/prop-types
export function ClientCategoriesEditForReference({ label, className }) {
  // const { data: clientCategory, isLoading } = useGetList(RESOURCES.clientCategory);
  // const choices = clientCategory.map(({ id, title }) => ({ id, name: title }));
  const defaultValue = 'lifestyle';
  const dummyChoices = [
    { id: 'tech', name: 'Tech' },
    { id: 'lifestyle', name: 'Lifestyle' },
    { id: 'people', name: 'People' },
  ];
  // if (isLoading) return <Loading />;
  return (
    <FormFieldWrapper title={label} className={className}>
      <ArrayInput source="clientCategoriesOnSpecialists" label="">
        <SimpleFormIterator inline disableReordering fullWidth>
          <SelectInput
            label="Категорія"
            source="clientCategory.title"
            defaultValue={defaultValue}
            choices={dummyChoices}
          />
          <BooleanInput label="Чи працює з нею?" source="isWorkingWith" />
        </SimpleFormIterator>
      </ArrayInput>
    </FormFieldWrapper>
  );
}

export function ClientCategoriesEditForm({ label, className }) {
  // const { data: clientCategory, isLoading } = useGetList(RESOURCES.clientCategory);
  // if (isLoading) return <Loading />;

  return (
    <FormFieldWrapper title={label} className={className}>
      <ArrayInput source="clientCategoriesOnSpecialists" label="">
        <SimpleFormIterator>
          <SelectInput
            source="category"
            defaultValue="lifestyle"
            choices={[
              { id: 'tech', name: 'Tech' },
              { id: 'lifestyle', name: 'Lifestyle' },
              { id: 'people', name: 'People' },
            ]}
          />
          <BooleanInput label="Чи працює з нею?" source="isWorkingWith" />
        </SimpleFormIterator>
      </ArrayInput>
    </FormFieldWrapper>
  );
}

ClientCategoriesEditForm.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
