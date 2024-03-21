import {
  ArrayInput,
  BooleanInput,
  FormDataConsumer,
  required,
  SelectInput,
  SimpleFormIterator,
  useGetList,
} from 'react-admin';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import PropTypes from 'prop-types';
import { FormFieldWrapper } from '@admin/components/FormFieldWrapper';
import { clientCategoryType } from '@/app/(admin)/admin/_lib/specialistPropTypes';
import Loading from '@/app/loading';

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

export function ClientCategoriesCreateForm({ label, className }) {
  const { data: clientCategory, isLoading } = useGetList(RESOURCES.clientCategory);
  if (isLoading) return <Loading />;
  return (
    <FormFieldWrapper title={label} className={className}>
      <ArrayInput source="clientCategories" label="">
        <SimpleFormIterator inline disableReordering fullWidth>
          <FormDataConsumer>
            {({ scopedFormData, getSource }) => {
              if (!scopedFormData) return null;
              return <ClientCategoryForm getSource={getSource} clientCategory={clientCategory} />;
            }}
          </FormDataConsumer>
        </SimpleFormIterator>
      </ArrayInput>
    </FormFieldWrapper>
  );
}

ClientCategoriesCreateForm.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
};
