'use client';

import {
  ArrayInput,
  AutocompleteArrayInput,
  AutocompleteInput,
  FormDataConsumer,
  ReferenceArrayInput,
  ReferenceInput,
  SimpleFormIterator,
  required,
  useGetList,
} from 'react-admin';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { useFormContext, useWatch } from 'react-hook-form';
import PropTypes from 'prop-types';

// function TherapiesCutFormEdit({ getSource, requests, therapiesCuts, loading }) {
//   const { setValue } = useFormContext();
//   if (!therapiesCuts) return null;

//   const selectedTherapies = therapiesCuts.map(cut => cut.therapy && cut.therapy.id).filter(Boolean);

//   const requestsIds = requests.map(request => request.id);

//   return (
//     <>
//       <ReferenceInput
//         source={getSource('therapy.id')}
//         filter={{ id: { notIn: selectedTherapies } }}
//         reference="Therapy"
//         validate={required()}
//         fullWidth
//       >
//         <AutocompleteInput
//           isLoading={loading}
//           optionText="title"
//           optionValue="id"
//           label="Тип терапії"
//           onChange={(_, record) => {
//             const curTherapyData = getSource('therapy.id');
//             const index = Number(curTherapyData.split('.')[1]); // therapiesCuts.[index].therapyId
//             const newCuts = therapiesCuts.map((cut, i) => {
//               if (i !== index) {
//                 return cut;
//               }

//               return { ...cut, therapy: record, requests: [], requestsIds: [] };
//             });
//             setValue('therapiesCuts', newCuts);
//           }}
//           validate={required()}
//           fullWidth
//         />
//       </ReferenceInput>
//       <ReferenceArrayInput
//         source={getSource('requestsIds')}
//         reference="Request"
//         filter={{ id: { in: requestsIds } }}
//         sort={{ field: 'name', order: 'ASC' }}
//       >
//         <AutocompleteArrayInput
//           isLoading={loading}
//           label="Запити які лікуються типом терапії"
//           fullWidth
//           optionText="name"
//           optionValue="id"
//         />
//       </ReferenceArrayInput>
//     </>
//   );
// }

// TherapiesCutFormEdit.propTypes = {
//   getSource: PropTypes.func,
//   requests: PropTypes.array,
//   therapiesCuts: PropTypes.array,
//   loading: PropTypes.bool,
// };

// function TherapiesCutFormCreate({ getSource, resetRequests, choices, requests, loading }) {
//   return (
//     <>
//       <SelectInput
//         isLoading={loading}
//         label="Тип терапії"
//         source={getSource('therapyId')}
//         fullWidth
//         choices={choices}
//         onChange={resetRequests}
//       />
//       <AutocompleteArrayInput
//         isLoading={loading}
//         label="Запити які лікуються типом терапії"
//         fullWidth
//         source={getSource('requests')}
//         choices={requests}
//       />
//     </>
//   );
// }

// TherapiesCutFormCreate.propTypes = {
//   getSource: PropTypes.func,
//   resetRequests: PropTypes.func,
//   choices: PropTypes.array,
//   requests: PropTypes.array,
//   loading: PropTypes.bool,
//   type: PropTypes.oneOf(Object.values(FORM_TYPES)),
//   readOnly: PropTypes.bool,
// };

export function TherapiesCutsSelect({ type = 'create' }) {
  const { data: therapiesList, isLoading: therapiesLoading } = useGetList(RESOURCES.therapy);

  const { setValue } = useFormContext();

  const therapiesCuts = useWatch({ name: 'therapiesCuts' });

  const selectedTherapies = therapiesCuts?.map(cut => cut.therapy && cut.therapy.id).filter(Boolean) ?? [];
  return (
    <ArrayInput source="therapiesCuts" isLoading={therapiesLoading} label="Типи терапій">
      <SimpleFormIterator fullWidth disableReordering={true}>
        <FormDataConsumer>
          {({ scopedFormData, formData, getSource }) => {
            if (!scopedFormData || !formData) return null;

            const therapyId = scopedFormData?.therapy?.id || '0';
            const requestsIds =
              therapiesList.find(therapy => therapy.id === therapyId)?.requests.map(request => request.id) || [];
            const therapySource = getSource('therapy.id');
            const therapyIndex = Number(therapySource.split('.')[1]);

            return (
              <>
                {(type === 'create' || type === 'edit') && (
                  <>
                    <ReferenceInput
                      source={getSource('therapy.id')}
                      filter={{ id: { notIn: selectedTherapies } }}
                      reference="Therapy"
                      validate={required()}
                      fullWidth
                    >
                      <AutocompleteInput
                        isLoading={therapiesLoading}
                        optionText="title"
                        optionValue="id"
                        label="Тип терапії"
                        validate={required()}
                        onChange={(_, record) => {
                          const newCuts = therapiesCuts.map((cut, i) => {
                            if (i !== therapyIndex) {
                              return cut;
                            }

                            return { ...cut, therapy: record, requestsIds: [] };
                          });
                          setValue('therapiesCuts', newCuts);
                        }}
                        fullWidth
                      />
                    </ReferenceInput>
                    <ReferenceArrayInput
                      source={getSource('requestsIds')}
                      reference="Request"
                      filter={{ id: { in: requestsIds } }}
                      sort={{ field: 'name', order: 'ASC' }}
                    >
                      <AutocompleteArrayInput
                        isLoading={therapiesLoading}
                        label="Запити які лікуються типом терапії"
                        fullWidth
                        optionText="name"
                        optionValue="id"
                      />
                    </ReferenceArrayInput>
                  </>
                )}
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleFormIterator>
    </ArrayInput>
  );
}

TherapiesCutsSelect.propTypes = {
  getSource: PropTypes.func,
  resetRequests: PropTypes.func,
  choices: PropTypes.array,
  requests: PropTypes.array,
  loading: PropTypes.bool,
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  readOnly: PropTypes.bool,
};
