import { CheckboxGroupInput, ReferenceArrayInput, useGetList } from 'react-admin';
import PropTypes from 'prop-types';
import { FORM_TYPES, RESOURCES } from '@admin/_lib/consts';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { FaAngleDown } from 'react-icons/fa';

const PSYCHOTHERAPIST = 'психотерапевт';
const PSYCHOLOGIST = 'психолог';

export function SpecializationMethodsList({ specializationsIdList, type, className }) {
  const { data: specializationsData } = useGetList(RESOURCES.specialization);
  const { data: methodsData } = useGetList(RESOURCES.method, {
    pagination: { page: 1, perPage: 200 },
    sort: { field: 'title', order: 'ASC' },
  });

  const specializationsWithMethodsList = specializationsIdList
    ? specializationsData
      ?.filter(
        ({ id, name }) =>
          specializationsIdList?.includes(id) &&
            (name.toLowerCase() === PSYCHOLOGIST || name.toLowerCase() === PSYCHOTHERAPIST),
      )
      .map(s => ({
        ...s,
        specializationMethods: methodsData
          ?.filter(m => m.specialization.name.toLowerCase() === s.name.toLowerCase())
          .map(({ id, title }) => ({ id, name: title })),
      }))
    : [];

  return (
    <ul className={className}>
      {specializationsWithMethodsList?.map(specialization => {
        const label = specialization.name.toLowerCase();
        const name = specialization.name.toLowerCase() === 'психолог' ? 'psychologist' : 'psychotherapist';

        return (
          <li key={specialization.id} className="mb-6">
            <Accordion>
              <AccordionSummary expandIcon={<FaAngleDown />}>Методи і напрямки для {label}a</AccordionSummary>
              <AccordionDetails>
                {type === 'create' ? (
                  <CheckboxGroupInput
                    source="specializationMethods"
                    name="specializationMethods"
                    optionText="name"
                    choices={specialization.specializationMethods}
                    row={false}
                    label={false}
                  />
                ) : (
                  <ReferenceArrayInput
                    source={`specializationMethodsIds[${name}]`}
                    reference="Method"
                    filter={{ specializationId: specialization.id }}
                    perPage={100}
                  >
                    <CheckboxGroupInput
                      optionText="title"
                      name={`specializationMethodsIds[${name}]`}
                      row={false}
                      label={false}
                    />
                  </ReferenceArrayInput>
                )}
              </AccordionDetails>
            </Accordion>
          </li>
        );
      })}
    </ul>
  );
}

SpecializationMethodsList.propTypes = {
  specializationsIdList: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.oneOf(Object.values(FORM_TYPES)),
  className: PropTypes.string,
};
